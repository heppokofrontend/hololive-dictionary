# Contributing

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

型`LiverData`を参考に、情報をアップデートを行います。

### コラボ名・複数の配信者を指す言葉

その名詞で最初に登場する配信者の`.ts`ファイルの`others`に記述します。

- ねぽらぼ　→　momosuzu-nene.ts
- 紫龍組　→　murasaki-shion.ts

名前が明示的に登場しない場合は、デビューが早い配信者の`.ts`ファイルの`others`に記述します。

- 同居ーず　→　hoshimachi-suisei.ts
- バカタレ共　→　shirakami-fubuki.ts

※ 名前などについては他の項目の変換元に利用されるためその限りではないですが、基本的には変換が難しいもののみを管理します。

## pull request

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D