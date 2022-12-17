
function copyText(arg) {
    const text = arg.text;
    if (text.length > 0) {
        navigator.clipboard.writeText(text);
    }
}
chrome.runtime.onInstalled.addListener((details) => {
    // コンテキストメニューに追加
    let menu_id = chrome.contextMenus.create({
        id: 'copy_url_md_format',
        title: 'Copy [Title](URL)',
        contexts: ['page'],
        type: 'normal',
        visible: true
    });

    // 選択時の処理
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        try {
            let text_to_be_copied = '['+tab.title+']('+tab.url+')';
            const tabId = tab.id;
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: copyText,
                args: [{text: text_to_be_copied}]
            });
        } catch (err) {
            console.error('Fail to copy: ', err);
        }
    });
});

