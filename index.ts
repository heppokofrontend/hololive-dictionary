import fs from 'fs';
import path from 'path';
import {dictionary} from './src/dict';

/**
 * ? 品詞について
 * WinIME - 「名詞」「人名」「地名」「短縮よみ」「顔文字」「その他」
 * Mac - 「普通名詞」「サ変名詞」「人名」「地名」「形容詞」「副詞」「接尾語」「動詞」その他すべての品詞
 */
type PartsOfSpeech = '普通名詞' | 'サ変名詞' | '人名' | '地名' | '形容詞' | '副詞' | '接尾語' | '動詞';


const parsed: [string, string, PartsOfSpeech][] = (() => {
  const single = (data: [string, string], type: PartsOfSpeech): [string, string, PartsOfSpeech] => {
    return [
      data[0],
      data[1],
      type,
    ];
  };
  // const multi = (name, marks = [], type) => {
  //   const result = [];

  //   for (const mark of marks) {
  //     result.push([
  //       `＠${name[0]}`,
  //       mark,
  //       type,
  //     ]);
  //   }

  //   return result;
  // };

  return dictionary.map(({name, marks}) => {
    const data: [string, string, PartsOfSpeech][] = [];
    const nameYomi = name[0]?.split(/\s/);
    const nameKaki = name[1]?.split(/\s/);

    // 名前
    data.push(single([nameYomi[0], nameKaki[0]], '人名'));
    data.push(single([nameYomi[1], nameKaki[1]], '人名'));
    data.push(single([nameYomi.join(''), nameKaki.join('')], '人名'));
    // data.push(...multi(name, marks, '人名'));

    return data;
  });
})().flat().filter((item: any) => !!item[0]);
const CSV = parsed.map(item => item.join(',')).join('\n');
const TSV = parsed.map(item => item.join('\t')).join('\n');
const googleIME = (() => {
  const callback = (c: string) => String.fromCharCode(c.charCodeAt(0) + 0x60);

  // 読み仮名をカタカナに変換する
  return parsed.map(item => {
    item[0] = item[0].replace(/[ぁ-ん]/g, callback);

    return item.join('\t');
  }).join('\n');
})();


fs.writeFileSync(path.join(__dirname, 'dist', 'mac', 'mac-ime-dict.txt'), CSV);
fs.writeFileSync(path.join(__dirname, 'dist', 'win', 'ms-ime-dict.txt'), TSV, {
  encoding: 'utf16le',
});
fs.writeFileSync(path.join(__dirname, 'dist', 'win', 'google-ime-dict.txt'), googleIME);
