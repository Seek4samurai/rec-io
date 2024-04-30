// Logs active tab title
// chrome.tabs.onActivated.addListener((activeInfo) => {
//   chrome.tabs.get(activeInfo.tabId, (tab) => {
//     console.log(tab.title);
//   });
// });

function logTabTitle(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    let title = tab.title;
    let url = tab.url;

    if (title !== "New Tab") {
      console.log(url);
      // chrome.runtime.sendMessage({ type: "tabUpdate", title: title, url: url });
    } else {
      console.log(title);
      // chrome.runtime.sendMessage({ type: "tabUpdate", title: title });
    }
  });
}

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  logTabTitle(activeInfo.tabId);
});

// Listen for tab update (e.g., URL change)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    logTabTitle(tabId);
  }
});

// Listen for window focus change
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    // Get the active tab in the focused window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        logTabTitle(tabs[0].id);
      }
    });
  }
});
