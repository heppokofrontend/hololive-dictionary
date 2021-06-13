declare type Dictionary = {
  /** よみ、語句 */
  name: [string, string],
  /** あだ名。[よみがな, 語句][] */
  alias: [string, string][],
  /** 推しマーク */
  marks: string[],
  /** ハッシュタグ */
  tags: string[],
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
