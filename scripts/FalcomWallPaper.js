// START ===ファルコム壁紙ダウンロード=== 最終更新:2022/02/07
// ===ユーザー設定領域===
const _savePath = 'D:\\Pictures'; // 保存フォルダパス ※バックスラッシュは2個必要
// ==================
const _copy = copy;
// 表示中のページから、jpg形式の画像ファイルを検索する関数。
const getPictures = () => document.querySelectorAll('img[src$=".jpg"], a[href$=".jpg"]');
// aria2cの"--input-file"形式のダウンロードリストを作成する関数。
const createDownloadList = () => {
	Object.values(getPictures()).reduce((text, item) => {
		// ダウンロードリンクをhref属性から、href属性が存在しなければsrc属性から取得する。
		const downloadLink = item.href ? item.href : item.src;
		// ダウンロードリンクから公開年月とファイル名を取得する。
		const [year, month, fileName] = downloadLink.split('/').slice(-3);
		// ヘッダー、サムネイル画像はダウンロードリストに登録しない。
		if (/^([a-z]+|[0-9]+).jpg$/.test(fileName)) return text;
		// ダウンロードディレクトリを"ユーザー設定領域の保存フォルダパス\Falcom\公開年\公開月\"に指定する。
		const saveDir = `${_savePath}\\Falcom\\${year}\\${month}`;
		// aria2c形式でダウンロードリンク、ダウンロードディレクトリ、Cookieオプションを出力する。
		return `${text}${downloadLink}\n dir=${saveDir}\n header=Cookie: f_opt_in=1\n`;
	}, '');
};
// 入力されたテキストをクリップボードにコピーする関数。
const outputText = text => {
	// Chromeのcopyコマンドで、テキストをクリップボードにコピーする。
	_copy(text);
	// コピーしたテキストの内容と、その完了通知をコンソールに表示する。
	return console.log(text, '\"以上の内容をクリップボードにコピーしました。\"');
};
// ダウンロードリストを作成し、クリップボードにコピーする。
outputText(createDownloadList());
// END ===ファルコムダウンロード===
