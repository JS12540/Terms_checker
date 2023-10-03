// ui.js

// Function to update the UI with flagged non-standard content
function updateUI(flaggedContent) {
    const contentDiv = document.getElementById('content');
    contentDiv.textContent = flaggedContent;
  }
  
  // Function to handle messages received from the content script
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'showFlaggedContent') {
      const flaggedContent = message.content;
      updateUI(flaggedContent);
    }
  });
  
  // Function to request flagged content from the content script
  function requestFlaggedContent() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: processTermsAndConditions,
      });
    });
  }
  
  // Call the function to request flagged content when the popup is loaded
  requestFlaggedContent();
  