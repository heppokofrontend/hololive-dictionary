import { holostarsEn } from './en';
import { holostarsJp } from './jp';

export const holostars: LiverData[] = [
  {
    name: ['', ''],
    alias: [
      ['ほろすたーず', 'HOLOSTARS'],
      ['ほろすた', 'HOLOSTARS'],
    ],
    marks: [''],
    tags: [
      ['#ホロスタ民', 'ファンネーム'],
      ['#HolostArt', '全体二次創作タグ'],
    ],
    fans: ['ホロスタ民'],
    twitter: ['@holostarstv'],
    flags: {
      isGroupName: true,
    },
  },

  ...holostarsJp,
  ...holostarsEn,
];
