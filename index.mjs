import fs from 'fs';
import dict from './src/dict.mjs';

/**
 * ? 品詞について
 * WinIME - 「名詞」「人名」「地名」「短縮よみ」「顔文字」「その他」
 * Mac - 「普通名詞」「サ変名詞」「人名」「地名」「形容詞」「副詞」「接尾語」「動詞」その他すべての品詞
 */

/** [string, string, string][] を作る */
const parsed = (() => {
  const single = (data, type) => {
    if (!data) {
      return;
    }

    return [
      data[0],
      data[1],
      type,
    ]
  };
  const multi = (name, marks = [], type) => {
    const result = [];

    for (const mark of marks) {
      result.push([
        `＠${name[0]}`,
        mark,
        type,
      ]);
    }

    return result;
  };

  return dict.map(({name, marks}) => {
    const data = [];

    if (name) {
      data.push(single(name, '人名'));
      data.push(...multi(name, marks, '人名'));
    }

    return data;
  });
})().flat().filter(item => !!item);
const CSV = parsed.map(item => item.join(',')).join('\n');
const TSV = parsed.map(item => item.join('\t')).join('\n');
const googleIME = (() => {
  const callback = c => String.fromCharCode(c.charCodeAt(0) + 0x60);

  // 読み仮名をカタカナに変換する
  return parsed.map(item => {
    item[0] = item[0].replace(/[ぁ-ん]/g, callback);

    return item.join('\t');
  }).join('\n');
})();

fs.writeFileSync('./dist/mac/mac-ime-dict.txt', CSV);
fs.writeFileSync('./dist/win/ms-ime-dict.txt', TSV);
fs.writeFileSync('./dist/win/google-ime-dict.txt', googleIME);
