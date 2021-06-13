import fs from 'fs';
import path from 'path';
import {dictionary} from './src/dict';

/**
 * 品詞について
 *
 * WinIME - 「名詞」「人名」「地名」「短縮よみ」「顔文字」「その他」
 * Mac - 「普通名詞」「サ変名詞」「人名」「地名」「形容詞」「副詞」「接尾語」「動詞」その他すべての品詞
 */
type PartsOfSpeech = '普通名詞' | 'サ変名詞' | '人名' | '地名' | '形容詞' | '副詞' | '接尾語' | '動詞';
/** 辞書データ１行分。[よびがな、語句、品詞] */
type WordSet = [string, string, PartsOfSpeech];

/**
 * dict.tsに書かれた内容を整形する
 */
const dataSet: WordSet[] = (() => {
  /** 1つの読みに対して語句が複数ある */
  const multi = (names: string[] = [], marks: string[] = [], type: PartsOfSpeech, prefix: string) => {
    const result: WordSet[] = [];

    for (const name of names) {
      for (const mark of marks) {
        result.push([
          `${prefix}${name}`,
          mark,
          type,
        ]);
      }
    }

    return result;
  };

  return dictionary.map(({name, alias, marks}) => {
    const data: WordSet[] = [];
    const nameSet = {
      yomi: [name[0].replace(/\s/g, ''), ...name[0]?.split(/\s/)],
      kaki: [name[1].replace(/\s/g, ''), ...name[1]?.split(/\s/)],
    };

    // あだ名の読みをnameに追加
    for (const item of alias) {
      nameSet.yomi.push(item[0]);
      nameSet.kaki.push(item[1]);
    }

    // 名前
    nameSet.yomi.forEach((yomi, idx) => {
      data.push([yomi, nameSet.kaki[idx], '人名']);
    });

    // その他の情報
    data.push(...multi(nameSet.yomi, marks, '人名', '：'));

    return data;
  });
})().flat().filter((item: any) => !!item[0]);
const CSV = dataSet.map(item => item.join(',')).join('\n');
const TSV = dataSet.map(item => item.join('\t')).join('\n');
const googleIME = (() => {
  const callback = (c: string) => String.fromCharCode(c.charCodeAt(0) + 0x60);

  // 読み仮名をカタカナに変換する
  return dataSet.map(item => {
    item[0] = item[0].replace(/[ぁ-ん]/g, callback);

    return item.join('\t');
  }).join('\n');
})();


fs.writeFileSync(path.join(__dirname, 'dist', 'mac', 'mac-ime-dict.txt'), CSV);
fs.writeFileSync(path.join(__dirname, 'dist', 'win', 'ms-ime-dict.txt'), TSV, {
  encoding: 'utf16le',
});
fs.writeFileSync(path.join(__dirname, 'dist', 'win', 'google-ime-dict.txt'), googleIME);
