import fs from 'fs';
import dict from './src/dict.mjs';

/** [string, string, string][] を作る */
const parsed = (() => {
  return dict.map(({name}) => [
    [
      name[0],
      name[1],
      '人名',
    ],
  ]);
})().flat();
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
