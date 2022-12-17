
chrome.runtime.onInstalled.addListener((details) => {
    console.log(details.reason);
    // コンテキストメニューに追加
    let menu_id = chrome.contextMenus.create({
        id: "copy_url_md_format",
        title: "Copy URL in MD format",
        contexts: ["all"],
        type: "normal",
        visible: true/*,
        onclick: (info, tab) => {
            console.log('context cliked!');
            console.log(info);
            console.log(tab);
        }*/
    });
    console.log('created menu id:'+menu_id);

    // 選択時の処理
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        console.log('context cliked!');
        console.log(info);
        console.log(tab);
    });
});
