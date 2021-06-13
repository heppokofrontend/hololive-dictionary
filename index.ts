import fs from 'fs';
import path from 'path';
import {dictionary} from './src/dictionary';

/**
 * 品詞
 * @description
 * その他は省略。基本「名詞」と「人名」のみを利用。Macは書き出し時に調整。
 * 基本はWindowsベースで記述すること。
 */
namespace PartsOfSpeech {
  /** @see　https://blogs.windows.com/japan/2017/02/17/imejptips4/ */
  export type win = '名詞' | '短縮よみ' | '人名' | '地名' | '顔文字';
  /** @see https://support.apple.com/ja-jp/guide/japanese-input-method/jpim10211/6.3/mac/11.0 */
  export type mac = '普通名詞' | 'サ変名詞' | '人名' | '地名' | '形容詞' | '副詞' | '接尾語' | '動詞';
};
/** 辞書データ１行分。[よびがな、語句、品詞] */
type WordSet = [string, string, PartsOfSpeech.win];

/**
 * 辞書データ
 * @description - dictionary.tsに書かれた内容を整形したもの
 */
const dataSet: WordSet[] = (() => {
  /**
   * 名前とあだ名の読みがな全てで、関連した情報に変換できる辞書データを作る
   * @param yomiSet - 名前とあだ名の読み仮名セット
   * @param kakiSet - 変換後語句のセット
   * @param type - 品詞名
   * @param prefix - 変換時に使うプレフィックス記号
   * @returns - 辞書データのまとまり
   */
  const multi = (yomiSet: string[] = [], kakiSet: string[] = [], type: PartsOfSpeech.win, prefix: string = '') => {
    const result: WordSet[] = [];

    for (const yomi of yomiSet) {
      for (const kaki of kakiSet) {
        result.push([
          `${prefix}${yomi}`,
          kaki,
          type,
        ]);
      }
    }

    return result;
  };

  return dictionary.map(({name, alias, marks, tags, fans, twitter}) => {
    /** １人分の辞書データのまとまり */
    const wordsets: WordSet[] = [];
    /** 名前の読みと書き。各変換のよみとして利用される */
    const nameSet = {
      yomi: [...new Set([name[0].replace(/\s/g, ''), ...name[0]?.split(/\s/)])],
      kaki: [...new Set([name[1].replace(/\s/g, ''), ...name[1]?.split(/\s/)])],
    };

    // あだ名の読みをnameに追加
    for (const [yomi, kaki] of alias) {
      nameSet.yomi.push(yomi);
      nameSet.kaki.push(kaki);
    }

    // 名前を辞書データに追加
    nameSet.yomi.forEach((yomi, idx) => {
      wordsets.push([yomi, nameSet.kaki[idx], '人名']);
    });

    // その他の情報を辞書データに追加
    wordsets.push(...multi(nameSet.yomi, marks, '名詞', '：'));
    wordsets.push(...multi(nameSet.yomi, tags, '名詞', '＃'));
    wordsets.push(...multi(nameSet.yomi, fans, '名詞', '＊'));
    wordsets.push(...multi(nameSet.yomi, twitter, '名詞', '＠'));

    return wordsets;
  }).flat().filter((item: any) => !!item[0]);
})();
const CSV = dataSet.map(item => item.join(',')).join('\n');
const TSV = dataSet.map(item => item.join('\t')).join('\n');
const googleIME = (() => {
  /**
   * String.prototype.replaceの第２引数用
   * @param ｓ - ひらがな１文字
   * @returns - カタカナ１文字
   */
  const replacer = (s: string) => String.fromCharCode(s.charCodeAt(0) + 0x60);

  // GoogleIME用に読み仮名（`item[0]`）をカタカナに変換する
  return dataSet.map(item => {
    item[0] = item[0].replace(/[ぁ-ん]/g, replacer);

    return item.join('\t');
  }).join('\n');
})();

// Mac向け辞書データの書き出し
fs.writeFileSync(
  path.join(__dirname, 'dist', 'mac', 'mac-ime-dict.txt'),
  CSV.replace(/,名詞$/gm, ',普通名詞')
);

// Win標準向け辞書データの書き出し
fs.writeFileSync(path.join(__dirname, 'dist', 'win', 'ms-ime-dict.txt'), TSV, {
  encoding: 'utf16le',
});

// GoogleIME向け辞書データの書き出し
fs.writeFileSync(path.join(__dirname, 'dist', 'win', 'google-ime-dict.txt'), googleIME);
