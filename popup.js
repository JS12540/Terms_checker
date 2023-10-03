// popup.js
document.addEventListener('DOMContentLoaded', function () {
    // Function to receive messages from the content script
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      if (message.action === 'showFlaggedContent') {
        const flaggedContent = message.content;
        displayFlaggedContent(flaggedContent);
      }
    });
  
    // Function to display flagged non-standard content in the popup
    function displayFlaggedContent(flaggedContent) {
      const contentDiv = document.getElementById('content');
      contentDiv.textContent = flaggedContent;
    }
  
    // Send a request to the content script to start processing the terms and conditions page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: processTermsAndConditions,
      });
    });
  });
  