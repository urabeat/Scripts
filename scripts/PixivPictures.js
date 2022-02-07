// START ===Pixiv画像ダウンロード=== 最終更新:2021/11/28
// ===ユーザー設定領域===
const _savePath = 'D:\\Pictures'; // 保存フォルダパス ※バックスラッシュは2個必要
const _sleepTime = 1.0; // すべて見るボタン展開後に待機する秒数。低スペックなら数値を増やしてください。 ※単位は秒
// ==================
const _copy = copy;
// すべて見るボタンが表示されているならボタンをクリックし、指定秒数待機する。
if (document.querySelector('div[class="sc-emr523-2 wEKy"]')) {
	document.querySelector('div[class="sc-emr523-2 wEKy"]').click();
	await new Promise(resolve => setTimeout(resolve, _sleepTime * 1000));
}
// 表示中のページから、画像ファイルを検索する関数。
const getPictures = () => document.querySelectorAll('a[href$=".jpg"], a[href$=".png"], a[href$=".gif"], a[href$=".bmp"]');
// ユーザー情報を取得する関数。
const getUserNameAndId = () => {
	// ユーザー名とユーザーIDを取得する。
	const user = document.querySelector('a[class="sc-d98f2c-0 sc-fujyAs eEzOcr"]');
	const userName = user.innerText.split('\n')[0];
	const userId = user.href.split('/')[user.href.split('/').length - 1];
	return `${userName}_${userId}`;
};
// 作品タイトルを取得する関数。
const getArtNumber = () => document.querySelector('h1[class="sc-1u8nu73-3 huVRfc"]').innerText;
// aria2cの"--input-file"形式のダウンロードリストを作成する関数。
const createDownloadList = () =>
	// getPictures()で取得した、すべての画像ファイルからダウンロードリンクを取得する。
	Object.values(getPictures()).reduce((text, item) => {
		// ダウンロードリンクをhref属性から、href属性が存在しなければsrc属性から取得する。
		const downloadLink = item.href ? item.href : item.src;
		// メインフォルダ名を"ユーザー名_ユーザーID"、サブフォルダ名を"作品タイトル_作品ID"に設定する。
		const mainFolderName = getUserNameAndId();
		const subFolderName = `${getArtNumber()}_${location.href.split('/').slice(-1)[0]}`;
		// ダウンロードディレクトリを"ユーザー設定領域の保存フォルダパス\Pixiv\ユーザー名_ユーザーID\作品タイトル_作品ID\"に指定する。
		const saveDir = `${_savePath}\\Pixiv\\${mainFolderName}\\${subFolderName}`;
		// aria2c形式でダウンロードリンク、ダウンロードディレクトリ、リファラ指定オプションを出力する。
		return `${text}${downloadLink}\n referer=${location.href}\n dir=${saveDir}\n`;
	}, '');
// 入力されたテキストをクリップボードにコピーする関数。
const outputText = text => {
	// Chromeのcopyコマンドで、テキストをクリップボードにコピーする。
	_copy(text);
	// コピーしたテキストの内容と、その完了通知をコンソールに表示する。
	return console.log(text, '\"以上の内容をクリップボードにコピーしました。\"');
};
// ダウンロードリストを作成し、クリップボードにコピーする。
outputText(createDownloadList());
// END ===Pixiv画像ダウンロード===
