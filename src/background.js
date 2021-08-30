'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

let i = 0;

(function updateCounter() {
  i++;
  console.log(i);
  setTimeout(updateCounter, 1000);
})();