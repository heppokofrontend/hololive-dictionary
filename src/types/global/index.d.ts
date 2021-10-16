/** ライバー情報のデータ構造 */
declare type LiverData = {
  /** よみ、語句 */
  name: [string, string],
  /** あだ名。[よみがな, 語句][] */
  alias: ([string, string] | [string])[],
  /** 推しマーク */
  marks: string[],
  /** ハッシュタグ */
  tags: string[],
  /** センシティブなハッシュタグ */
  sensitiveTags?: string[],
  /** ファンネーム */
  fans: string[],
  /** Twitter */
  twitter: string[],
  /** 通常の変換が難しいその他の関連用語を[よみがな, 語句][]形式で */
  others?: [string, string][],
  /** メンバーの属性 */
  flags?: {
    /** 活動しているかどうか */
    activity: '活動中' | '卒業' | '活動終了',
  },
}

/**
 * 品詞
 * @description
 * その他は省略。基本「名詞」と「人名」のみを利用。Macは書き出し時に調整。
 * 基本はWindowsベースで記述すること。
 */
declare namespace PartsOfSpeech {
  /** @see　https://blogs.windows.com/japan/2017/02/17/imejptips4/ */
  export type win = '名詞' | '短縮よみ' | '人名' | '地名' | '顔文字';
  /** @see https://support.apple.com/ja-jp/guide/japanese-input-method/jpim10211/6.3/mac/11.0 */
  export type mac = '普通名詞' | 'サ変名詞' | '人名' | '地名' | '形容詞' | '副詞' | '接尾語' | '動詞';
};

/** 辞書データ１行分。[よびがな、語句、品詞] */
declare type WordSet = [string, string, PartsOfSpeech.win];
