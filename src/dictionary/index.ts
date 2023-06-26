import { hololive } from './hololive';
import { holostars } from './holostars';

export const dictionary: LiverData[] = [
  {
    name: ['たにごう もとあき', '谷郷 元昭'],
    alias: [['やごー', 'YAGOO']],
    marks: [],
    tags: [],
    fans: [],
    twitter: ['@tanigox'],
    others: [
      ['やごー', 'YAGOO'],
      ['おしま', '推しマ'],
      ['おしごと', '推し事'],
      ['あおがみ', '青上'],
      ['あおがみこうこう', '青上高校'],
      ['めんげん', 'メン限'],
      ['ごばん', '誤BAN'],
      ['まるやまえきまえ', '○△駅前'],
      ['とつまち', '凸待ち'],
    ],
  },

  ...hololive,
  ...holostars,
];
