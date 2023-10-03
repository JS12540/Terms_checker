// Function to extract text content from the terms and conditions page
function extractTextFromPage() {
    let textContent = '';
  
    // Select the elements containing the terms and conditions text
    const termsAndConditionsElements = document.querySelectorAll('p, span, div'); // You may need to adjust the selector based on the structure of the terms and conditions page.
  
    // Loop through the selected elements and concatenate their text content
    for (const element of termsAndConditionsElements) {
      const elementText = element.textContent.trim();
      if (elementText) {
        textContent += elementText + '\n\n'; // Separate paragraphs with newlines
      }
    }
  
    return textContent;
  }
  
  
  // Function to check if the extracted content is standard or not
  function isStandardContent(content) {
    // Define a list of standard clauses to compare against
    const standardClauses = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'In hac habitasse platea dictumst.',
      'Nunc id leo sed mi consequat vehicula a et velit.',
      // Add more standard clauses here...
    ];
  
    // Split the content into individual lines for comparison
    const contentLines = content.split('\n');
  
    // Check each line of the content against the standard clauses list
    for (const line of contentLines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !standardClauses.includes(trimmedLine)) {
        return false; // Return false if a non-standard line is found
      }
    }
  
    return true; // Return true if all lines are standard
  }
  
  // Function to send the flagged content to the extension's UI
  function sendFlaggedContentToUI(flaggedContent) {
    // Send the flagged content to the UI script using chrome.runtime.sendMessage()
    chrome.runtime.sendMessage({ action: 'showFlaggedContent', content: flaggedContent });
  }
  
  // Main function to process the terms and conditions page
  function processTermsAndConditions() {
    const textContent = extractTextFromPage();
  
    if (textContent) {
      if (!isStandardContent(textContent)) {
        sendFlaggedContentToUI(textContent);
      }
    }
  }
  
  // Run the content script when the page is loaded
  document.addEventListener('DOMContentLoaded', processTermsAndConditions);
  