# fork 先からの PR のマージ手順

PR をそのままマージすると、リリースブランチを立てずに main ブランチへ取り込むことになる。  
また、生成済みの辞書データを含む PR が複数立っていると 1 つ取り込んだ次点で競合するので、以下の手順で吸収する。

## release ブランチがまだない時

1. 最新 main ブランチ から release ブランチを切る
   1. `git switch main`
   1. `git pull`
   1. `git switch release/v1.8.0`
   1. `git push -u origin HEAD`

## マージ手順

1. **CI：**最新 main ブランチから resolve ブランチを切る
1. **CI：**PR の向き先を resolve ブランチに変更する
1. **手動：**PR をマージする
1. **手動：**release ブランチに resolve ブランチを`merge`する
   1. `git switch release/v1.8.0`
   1. `git pull`
   1. `git fetch`
   1. `git merge origin/resolve/pr-20`
1. **手動：**競合したら再生成して、マージを続行する
   1. `yarn generate`
   1. `git add .`
   1. `git merge --continue`
   1. `git push`
1. **手動：**fork されたリポジトリからの PR が無くなるまで 3 番に戻って繰り返す
1. **手動：**最終的な release ブランチを main にマージする

test
