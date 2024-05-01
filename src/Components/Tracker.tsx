import React, { useState, useEffect } from "react";

const Tracker = () => {
  interface Tab {
    status: string | undefined;
    title: string | undefined;
    url: string | undefined;
  }

  const [activeTabs, setActiveTabs] = useState<Tab[]>([]);

  useEffect(() => {
    console.log("Running...");
    // Function to update active tabs when a tab is activated, updated, or window focus changes
    function logTabTitle(tabId: any) {
      chrome.tabs.get(tabId, (tab) => {
        let title = tab.title;
        let url = tab.url;

        console.log(url);

        setActiveTabs((prevTabs) => [
          ...prevTabs,
          { status: "tabUpdate", title: title, url: url },
        ]);
      });
    }

    // Call logTabTitle function initially
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        logTabTitle(tabs[0].id);
      }
    });

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

    // Cleanup function to remove listeners when component unmounts
    return () => {
      chrome.tabs.onActivated.removeListener(logTabTitle);
      chrome.tabs.onUpdated.removeListener(logTabTitle);
      chrome.windows.onFocusChanged.removeListener(logTabTitle);
    };
  }, []);

  return (
    <>
      <div className="">
        <div>Active Tabs</div>
        <ul>
          {activeTabs.map((tab: any, index: any) => (
            <li key={index}>
              {tab.title} - {tab.url}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tracker;
