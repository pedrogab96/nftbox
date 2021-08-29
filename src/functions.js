export function getQuoteCoins(){
    console.log('teste');
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var html = xmlhttp.responseText;
            console.log(html);
            processPage(html);
        }else{
            console.log('erro');
        }
    }

    xmlhttp.open("GET", "https://www.melhorcambio.com/dolar-hoje/", true);
    xmlhttp.send();
}
