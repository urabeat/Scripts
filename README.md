# downloadscript
aria2cの"--input-file"形式のダウンロードリストを作成するスクリプトです。
該当スクリプトをコピーし、GoogleChromeのデベロッパーツールのコンソールタブに貼り付けて実行してください。
そうすると自動的にクリップボードにコピーされます。

・aria2cの使い方（簡易）
1. aria2c.exeと同じフォルダにdllist.txtを作成。
2. スクリプトで得たダウンロードリンクをdllist.txtに貼り付けて保存。
3. コマンドプロンプトで"aria2c --input-file=dllist.txt" などでダウンロードを実行。