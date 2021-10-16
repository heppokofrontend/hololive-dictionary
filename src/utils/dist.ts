import fs from 'fs';
import path from 'path';

const dictionary = path.join(__dirname, '..', '..', 'dictionary');

/**
 * CSV、TSV形式、GoogleIME向けのテキストファイルを書き出す
 * @param wordSet - 辞書データ
 * @param fileName - 書き出しファイル名
 */
export const dist = (argWordSet: WordSet[], fileName: string) => {
  /** 登録済みの辞書情報 */
  const entried: string[] = [];
  /** 重複を除いたデータ */
  const wordSet = argWordSet.filter(item => {
    const val = item.join('');

    if (entried.includes(val)) {
      return false;
    }

    entried.push(val);

    return true;
  });
  const CSV = wordSet.map(item => item.join(',')).join('\n');
  const TSV = wordSet.map(item => item.join('\t')).join('\n');
  const googleIME = (() => {
    /**
    * String.prototype.replaceの第２引数用
    * @param ｓ - ひらがな１文字
    * @returns - カタカナ１文字
    */
    const replacer = (s: string) => String.fromCharCode(s.charCodeAt(0) + 0x60);

    // GoogleIME用に読み仮名（`item[0]`）をカタカナに変換する
    return wordSet.map(item => {
      item[0] = item[0].replace(/[ぁ-ん]/g, replacer);

      return item.join('\t');
    }).join('\r\n');
  })();

  // Mac向け辞書データの書き出し
  fs.writeFileSync(
    path.join(dictionary, 'mac', `mac-ime-dict--${fileName}.txt`),
    CSV.replace(/,名詞$/gm, ',普通名詞').replace(/'/g, ''), // 'があるとmacOSは読み込めない
  );

  // Win標準向け辞書データの書き出し
  fs.writeFileSync(
    path.join(dictionary, 'win', `ms-ime-dict--${fileName}.txt`),
    Buffer.from(`\ufeff${TSV.replace(/〜/g, '～')}`, 'utf16le'),
  );

  // GoogleIME向け辞書データの書き出し
  fs.writeFileSync(
    path.join(dictionary, 'win', `google-ime-dict--${fileName}.txt`),
    googleIME.replace(/〜/g, '～'),
  );
};
