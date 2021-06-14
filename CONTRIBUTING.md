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

型`LiverData`を参考に、情報をアップデートを行います。


## pull request

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D