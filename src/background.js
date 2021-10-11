'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

let pvu_to_brl;
let usd;

(function update() {
  getTotalCoins();
  // notificationPVU();
  setTimeout(update, 60000);
})();

function notificationPVU(){
  chrome.notifications.create({
    title: 'PVU',
    message: 'Caiu pra 2 Dolares',
    iconUrl: 'icons/pvu-icon.png',
    type: 'basic',
  });
}

function notificationCCAR() {
  chrome.notifications.create('NOTFICATION_ID', {
    type: 'basic',
    iconUrl: 'icons/ccar-icon.jpeg',
    title: 'notification title',
    message: 'notification message',
  });
}



function getTotalCoins(){
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=cryptocars')
  .then((resp) => resp.json())
  .then(function(data) {
      let brl = data[0].current_price; 
      console.log('CCAR: ' + brl + 'R$')
      if(brl >= 1.5){
        notificationCCAR();
        // audioNotification();
      }
  });

  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=plant-vs-undead-token')
    .then((resp) => resp.json())
    .then(function(data) {
        usd = data[0].current_price;
        console.log('PVU: ' + usd + '$')
        if(usd <= 2){
          // notificationPVU();
        }
    });
}

function audioNotification(){
  var yourSound = new Audio('songs/saint_roses_remix.mp3');
  yourSound.play();
}


