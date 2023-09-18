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

1. 最新 main ブランチから resolve ブランチを切る
   1. `git switch main`
   1. `git pull`
   1. `git switch resolve/pr-20` (PR の ID)
   1. `git push -u origin HEAD`
1. PR の向き先を resolve ブランチに変更する
1. PR をマージする
1. resolve ブランチで release ブランチに対して`rebase`を行う
   1. `git fetch`
   1. `git rebase origin/release/v1.8.0`
1. 競合したら再生成して、rebase を続行する
   1. `yarn generate`
   1. `git add .`
   1. `git rebase --continue`
   1. `git push -f`
1. PR を立てて、resolve ブランチを release ブランチにマージする
1. fork されたリポジトリからの PR が無くなるまで最初に戻って繰り返す
1. 最終的な release ブランチを main にマージする
