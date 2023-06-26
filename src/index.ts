import { dictionary } from './dictionary';
import { makeWordSet } from './utils/makeWordSet';
import { dist } from './utils/dist';

// TODO: 今後必要があれば、ここで書き出し内容ごとに処理とオプションを追加していくか、
//       生成時に必要な情報を選択できるようにするかもしれない( ˘ω˘ )
dist(makeWordSet(dictionary), 'all');
dist(
  makeWordSet(dictionary, {
    noSensitive: true,
  }),
  'all-no-sensitive',
);
