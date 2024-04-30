function updateTabInfo() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    const title = tab.title;
    const url = tab.url;
    document.getElementById("tabInfo").innerHTML = `
          <p>Title: ${title}</p>
          <p>URL: ${url}</p>
        `;
  });
}

// Initial update
updateTabInfo();

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url || changeInfo.title) {
    updateTabInfo();
  }
});

// Listen for tab activation
chrome.tabs.onActivated.addListener(function (activeInfo) {
  updateTabInfo();
});
