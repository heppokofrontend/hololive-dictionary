# Contributing

このリポジトリにコントリビューロしてくださる方へ。

## npm comannds

- `prettier` - コードをフォーマットします
- `generate` - 辞書データを出力します

## `./src/dictionary/**` - 配信者情報

各配信者情報を次のような構造で管理しています。

```
グループ名
  └ 言語・国別名
    └ 世代名
      ├ 個人名
      ├ 個人名
      └ 個人名
```

型[`LiverData`](./src/types/global/index.d.ts)を参考に、情報をアップデートを行います。

### コラボ名・複数の配信者を指す言葉

その名詞で最初に登場する配信者の`.ts`ファイルの`others`に記述します。

- ねぽらぼ　 → 　 momosuzu-nene.ts
- 紫龍組　 → 　 murasaki-shion.ts

名前が明示的に登場しない場合は、デビューが早い配信者の`.ts`ファイルの`others`に記述します。

- 同居ーず　 → 　 hoshimachi-suisei.ts
- バカタレ共　 → 　 shirakami-fubuki.ts

※ 名前などについては他の項目の変換元に利用されるためその限りではないですが、基本的には変換が難しいもののみを管理します。

### 「う＋濁音」

macOS では「ゔ」を変換で用いますが生成時に調整されるので、辞書データ上は「ヴ」と表記してください。

### アルファベットで検索する用語

例：

- `ｍｙｔｈ` -> `myth`
- `ｔｍｔ` -> `tmt`

Windows ではアルファベットの大文字小文字を区別しないため、データ内では全角小文字統一で登録します。  
出力時は macOS 向けのときのみ全角に変換し、1 文字目を大文字のパターンを追加します。

## Pull Request

見ていただきありがとうございます！

1. [フォークしてください](https://github.com/heppokofrontend/hololive-dictionary/fork)
2. 作業ブランチを作成してください: `git switch -c my-new-feature`
3. 差分をコミットしてください: `git commit -am 'Add some feature'`
4. ブランチをプッシュしてください: `git push origin my-new-feature`
5. [PR を立ててください](https://github.com/heppokofrontend/hololive-dictionary/pulls)

PR は main ブランチで大丈夫です。  
取り込み作業を開始すると競合することがありますが、そうした PR は取り込み時にこちらで解決します。
