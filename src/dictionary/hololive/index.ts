import { hololiveEn } from './en';
import { hololiveId } from './id';
import { hololiveJp } from './jp';

export const hololive: LiverData[] = [
  ...hololiveJp,
  ...hololiveId,
  ...hololiveEn,

  {
    name: ['ゆうじんえー', '友人A'],
    alias: [['えーちゃん', 'Aちゃん']],
    marks: ['👓'],
    tags: [
      ['#絵ーちゃん', 'ファンアート'],
      ['#よなよなえーぼいす', 'ボイスツイートリクエスト'],
    ],
    fans: [],
    twitter: ['@achan_UGA'],
  },
  {
    name: ['はるさき のどか', '春先 のどか'],
    alias: [],
    marks: ['📝'],
    tags: [['#のどかあーと', 'ファンアート'], '#春先のどかは研修中'],
    fans: [],
    twitter: ['@harusakinodoka'],
  },
];
