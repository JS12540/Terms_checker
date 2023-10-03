// background.js

// Function to handle messages sent from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'showFlaggedContent') {
      const flaggedContent = message.content;
      // Perform any additional actions you need with the flagged content here
      // For example, you could log the flagged content or store it in local storage.
  
      // Respond to the content script (optional)
      sendResponse({ status: 'success', message: 'Flagged content received and processed.' });
    }
  });
  
  // Additional background script logic (if needed)
  // This script runs continuously in the background and can perform other tasks as required by your extension.
  