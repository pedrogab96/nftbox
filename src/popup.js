'use strict';

import './popup.css';
import {getQuoteCoins} from './functions'

let save = document.getElementById("save");


save.addEventListener("click", async () => {
  let groupPlants = document.getElementById("group-plants").value;
  chrome.storage.sync.set({ "group-plants" : groupPlants });
  console.log(groupPlants);
});

(function() {

})();
