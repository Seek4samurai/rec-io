import React, { useState, useEffect } from "react";

const Tracker = () => {
  interface Tab {
    title: string;
    url: string;
  }
  const [activeTabs, setActiveTabs] = useState<Tab[]>([]);

  useEffect(() => {
    console.log("Inside the useEffect()");
    // Listener function for messages from background script
    // const messageListener = (message: any) => {
    //   console.log("Message: ", message);
    //   if (message.type === "tabUpdate") {
    //     const { title, url } = message;
    //     setActiveTabs((prevTabs) => [...prevTabs, { title, url }]);
    //   }
    // };

    chrome.runtime.onMessage.addListener((message) => {
      console.log(message);
    });

    // Cleanup function to remove the listener when component unmounts
    return () => {
      // chrome.runtime.onMessage.removeListener(messageListener);
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
