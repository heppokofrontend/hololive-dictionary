type Options = {
  noSensitive?: boolean;
};

/**
 * 名前とあだ名の読みがな全てで、関連した情報に変換できる辞書データを作る
 * @param yomiSet - 名前とあだ名の読み仮名セット
 * @param kakiSet - 変換後語句のセット
 * @param type - 品詞名
 * @param prefix - 変換時に使うプレフィックス記号
 * @returns - 辞書データのまとまり
 */
const compile = (
  yomiSet: string[] = [],
  kakiSet: string[] = [],
  type: PartsOfSpeech.win,
  prefix: string = '',
) => {
  const result: WordSet[] = [];

  for (const yomi of yomiSet) {
    if (!yomi) {
      continue;
    }

    for (const kaki of kakiSet) {
      result.push([`${prefix}${yomi}`, kaki, type]);
    }
  }

  return result;
};

/**
 * 辞書データを整形
 */
export const makeWordSet = (argDict: LiverData[], argOptions: Options = {}) => {
  // ライバーごとに配列がネストした辞書情報
  const dictionaryData = argDict.map((data) => {
    const options: Options = {
      noSensitive: false,
      ...argOptions,
    };
    const { name, alias, marks, tags, fans, sensitiveTags, twitter, others, flags } = data;
    /** １人分の辞書データのまとまり */
    const wordsets: WordSet[] = [];
    /** 名前の読みと書き。各変換のよみとして利用される */
    const nameSet = {
      // フルネームと、スペース区切りで分けた値を処理するときに、名字がないパターンを想定して重複を処理
      yomi: [...new Set([name[0].replace(/\s/g, ''), ...name[0]?.split(/\s/)])],
      kaki: [...new Set([name[1].replace(/\s/g, ''), ...name[1]?.split(/\s/)])],
    };

    // 英語表記名の場合を解決
    if (/^[a-zA-Z0-9]+$/.test(name[1].replace(/\s/g, ''))) {
      nameSet.yomi.push(name[0].replace(/\s/g, ''));
      nameSet.kaki.push(name[1]);
    }

    // あだ名の読みをnameに追加
    for (const [yomi, kaki] of alias) {
      nameSet.yomi.push(yomi);
      // 読みと書きが同じ場合、書きが省略されることを考慮
      nameSet.kaki.push(kaki || yomi);
    }

    // 名前を辞書データに追加
    nameSet.yomi.forEach((yomi, idx) => {
      wordsets.push([yomi, nameSet.kaki[idx], '人名']);
    });

    // 名前意外の情報を辞書データに追加。残りの候補「！？＋＊｜ー」
    wordsets.push(...compile(nameSet.yomi, marks, '名詞', '：')); //:絵文字: の表現から
    wordsets.push(...compile(nameSet.yomi, tags, '名詞', '＃')); // ハッシュタグ
    wordsets.push(...compile(nameSet.yomi, fans, '名詞', '〜')); // 繋がってるイメージから
    wordsets.push(...compile(nameSet.yomi, twitter, '名詞', '＠')); // メンション

    if (!options.noSensitive) {
      wordsets.push(...compile(nameSet.yomi, sensitiveTags, '名詞', '＃'));
    }

    // その他の関連用語を追加
    if (Array.isArray(others)) {
      for (const [yomi, kaki] of others) {
        wordsets.push([yomi, kaki, '名詞']);
      }
    }

    return wordsets;
  });

  // ネストを解除し、読みと語句（書き）が揃っている物だけにフィルタする
  return dictionaryData.flat().filter(([yomi, kaki]) => !!yomi && !!kaki);
};
