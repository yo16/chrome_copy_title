
function copyText(arg) {
    const text = arg.text;
    if (text.length > 0) {
        navigator.clipboard.writeText(text);
    }
}
chrome.runtime.onInstalled.addListener((details) => {
    // コンテキストメニューに追加
    chrome.contextMenus.create({
        id: 'copy_url_md_format_topmenu',
        title: 'Copy Title,URL',
        contexts: ['page'],
        type: 'normal',
        visible: true,
    });
    chrome.contextMenus.create({
        id: 'copy_url_md_format_mdformat',
        title: 'Markdown: [Title](URL)',
        contexts: ['page'],
        type: 'normal',
        visible: true,
        parentId: 'copy_url_md_format_topmenu',
    });
    chrome.contextMenus.create({
        id: 'copy_url_md_format_title',
        title: 'Title only',
        contexts: ['page'],
        type: 'normal',
        visible: true,
        parentId: 'copy_url_md_format_topmenu',
    });
    chrome.contextMenus.create({
        id: 'copy_url_md_format_htmlformat',
        title: 'HTML: <a href="URL">Title</a>',
        contexts: ['page'],
        type: 'normal',
        visible: true,
        parentId: 'copy_url_md_format_topmenu',
    });
});

// 選択時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
    // ３つのサブメニュー以外は何もしない
    let menu_id = info.menuItemId;
    if (
        (menu_id != 'copy_url_md_format_mdformat') &&
        (menu_id != 'copy_url_md_format_title') &&
        (menu_id != 'copy_url_md_format_htmlformat')
    ) {
        console.log('Unknown menu id:'+menu_id);
        return;
    }

    // メニューによってコピーする文字列を変える
    let text_to_be_copied = '';
    if (menu_id == 'copy_url_md_format_mdformat') {
        text_to_be_copied = '['+tab.title+']('+tab.url+')';
    } else if (menu_id == 'copy_url_md_format_title') {
        text_to_be_copied = tab.title;
    } else if (menu_id == 'copy_url_md_format_htmlformat') {
        text_to_be_copied = '<a href="'+tab.url+'">'+tab.title+'</a>';
    }
    console.log('Copied:'+text_to_be_copied);
    
    try {
        // コピー
        const tabId = tab.id;
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: copyText,
            args: [{text: text_to_be_copied}],
        });
    } catch (err) {
        console.error('Fail to copy: ', err);
    }
});
