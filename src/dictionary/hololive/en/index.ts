import { hololiveEnGen1 } from './gen1';
import { hololiveEnGen1_5 } from './gen1.5';
import { hololiveEnGen2 } from './gen2';
import { hololiveEnGen3 } from './gen3';

export const hololiveEn: LiverData[] = [
  {
    name: ['おめがあるふぁ', 'オメガα'],
    alias: [
      ['おめが', 'Omegaα'],
      ['あるふぁ', 'Omegaα'],
      ['おめがあるふぁ', 'Omegaα'],
    ],
    marks: [],
    tags: [
      ['#omegallery', 'ファンアート'],
      ['#omegarchive', 'Q&A'],
    ],
    fans: [],
    twitter: ['@omegaalpha_en'],
  },
  ...hololiveEnGen1,
  ...hololiveEnGen1_5,
  ...hololiveEnGen2,
  ...hololiveEnGen3,
];
