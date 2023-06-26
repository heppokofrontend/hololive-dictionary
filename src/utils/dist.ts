import fs from 'fs';
import path from 'path';

const dictionary = path.join(__dirname, '..', '..', 'dictionary');

const isHalfAlphanumeric = (str: string) => {
  return /^[a-zA-Z0-9]+$/.test(str);
};

const toFullWidth = (str: string) => {
  return str.replace(/[A-Za-z0-9]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) + 0xfee0);
  });
};

const addUpperCasePattern = (array: WordSet[]): WordSet[] => {
  const result: WordSet[] = [];
  for (const wordSet of array) {
    const [yomi, ...item] = wordSet;

    if (isHalfAlphanumeric(yomi)) {
      result.push(wordSet);
      const upperCaseYomi: WordSet = [yomi[0].toUpperCase() + yomi.slice(1), ...item];
      result.push(upperCaseYomi);
    } else {
      result.push(wordSet);
    }
  }
  return result;
};

const addHalfWidthPattern = (array: WordSet[]): WordSet[] => {
  const result: WordSet[] = [];
  for (const wordSet of array) {
    const [yomi, ...item] = wordSet;

    if (isHalfAlphanumeric(yomi)) {
      const halfWidthItem: WordSet = [toFullWidth(yomi), ...item];
      result.push(halfWidthItem);
    } else {
      result.push(wordSet);
    }
  }
  return result;
};

/**
 * CSV、TSV形式、GoogleIME向けのテキストファイルを書き出す
 * @param wordSet - 辞書データ
 * @param fileName - 書き出しファイル名
 */
export const dist = (argWordSet: WordSet[], fileName: string) => {
  /** 登録済みの辞書情報 */
  const entried: string[] = [];
  /** 重複を除いたデータ */
  const wordSet = argWordSet.filter((item) => {
    const val = item.join('');

    if (entried.includes(val)) {
      return false;
    }

    entried.push(val);

    return true;
  });

  // 登録単語一覧
  const list = [
    '# 登録される単語一覧',
    '',
    '⚠ WindowsとmacOSでは一部差異があります。',
    '',
    'たとえばmacOSでは…',
    '',
    '- 「`VU`」と入力すると、「`ヴ`」ではなく「`ゔ`」が入力されるため変換前が異なります。',
    '- ファンネームを変換するためなどに使われる「`～`」は、見た目は同じでもOS間で異なる文字が採用されているため変換前が異なります。',
    "- 「**Ninomae Ina'nis**」のようなクオートを含む単語が登録できないため「`'`」が省略されています。",
    '',
    '|変換前|変換後|説明文|',
    '|:--|:--|:--|',
    ...wordSet.map(([before, after, _, description]) => {
      return `|${['`' + before + '`', after, description].join('|')}|`;
    }),
  ]
    .join('\n')
    .replace(/〜/g, '～');

  fs.writeFileSync(path.join(__dirname, '..', '..', `WORD_LIST.md`), list);

  // Mac向け辞書データの書き出し
  const CSV = addHalfWidthPattern(
    addUpperCasePattern(
      wordSet.map(([yomi, ...wordData]) => {
        return [yomi.replace(/ヴ/gm, 'ゔ'), ...wordData];
      }),
    ),
  )
    .map((item) => item.join(','))
    .join('\n');
  fs.writeFileSync(
    path.join(dictionary, 'mac', `mac-ime-dict--${fileName}.txt`),
    CSV.replace(/,名詞,/gm, ',普通名詞,')
      .replace(/,名詞$/gm, ',普通名詞')
      .replace(/'/g, '') // 'があるとmacOSは読み込めない
      .replace(/～/g, '〜'),
  );

  // Win標準向け辞書データの書き出し
  const TSV = wordSet.map((item) => item.join('\t')).join('\n');
  fs.writeFileSync(
    path.join(dictionary, 'win', `ms-ime-dict--${fileName}.txt`),
    Buffer.from(`\ufeff${TSV.replace(/〜/g, '～')}`, 'utf16le'),
  );

  // GoogleIME向け辞書データの書き出し
  const googleIME = (() => {
    /**
     * String.prototype.replaceの第２引数用
     * @param ｓ - ひらがな１文字
     * @returns - カタカナ１文字
     */
    const replacer = (s: string) => String.fromCharCode(s.charCodeAt(0) + 0x60);

    // GoogleIME用に読み仮名（`item[0]`）をカタカナに変換する
    return wordSet
      .map((item) => {
        item[0] = item[0].replace(/[ぁ-ん]/g, replacer);

        return item.join('\t');
      })
      .join('\r\n');
  })();
  fs.writeFileSync(
    path.join(dictionary, 'win', `google-ime-dict--${fileName}.txt`),
    googleIME.replace(/〜/g, '～'),
  );
};
