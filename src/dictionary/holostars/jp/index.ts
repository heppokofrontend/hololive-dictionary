import { holostarsJpGen1 } from './gen1';
import { holostarsJpGen2 } from './gen2';
import { holostarsJpGen3 } from './gen3';

export const holostarsJp: LiverData[] = [
  {
    name: ['だいどう しのゔ', '大道 シノヴ'],
    alias: [],
    marks: [],
    tags: [
      ['#大道シノヴ', '全般'],
      ['#押忍絵', 'ファンアート'],
    ],
    fans: ['ホロスタ民'],
    twitter: ['@daidoushinove'],
    flags: {
      isActive: false,
    },
  },
  ...holostarsJpGen1,
  ...holostarsJpGen2,
  ...holostarsJpGen3,
];
