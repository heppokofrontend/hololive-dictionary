import fs from 'fs';
import dict from './src/dict.mjs';

const forMac = dict.map(item => item.join(',')).join('\n');
const forMSIME = dict.map(item => item.join('\t')).join('\n');
const forGoogleIME = (() => {
  const callback = c => String.fromCharCode(c.charCodeAt(0) + 0x60);

  return dict.map(item => {
    item[0] = item[0].replace(/[ぁ-ん]/g, callback);

    return item.join('\t');
  }).join('\n');
})();

fs.writeFileSync('./dist/mac/mac-ime-dict.txt', forMac);
fs.writeFileSync('./dist/win/ms-ime-dict.txt', forMSIME);
fs.writeFileSync('./dist/win/google-ime-dict.txt', forGoogleIME);
