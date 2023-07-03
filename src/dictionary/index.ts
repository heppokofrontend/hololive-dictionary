import { hololive } from './hololive';
import { holostars } from './holostars';

export const dictionary: LiverData[] = [
  {
    name: ['', ''],
    alias: [
      ['かばー', 'Cover'],
      ['かばー', 'カバー株式会社'],
    ],
    marks: [''],
    tags: ['#カバー株式会社'],
    fans: [],
    twitter: ['@cover_corp'],
    flags: {
      isGroupName: true,
    },
  },
  {
    name: ['たにごう もとあき', '谷郷 元昭'],
    alias: [['やごー', 'YAGOO']],
    marks: [],
    tags: [],
    fans: [],
    twitter: ['@tanigox'],
    others: [
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
