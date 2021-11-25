import $ from 'jquery';
import groups from './groups';
import moment from 'moment';

let pvu = 1;
let ccar = 1;
let ovl  = 1;
let lord = 1;
let pvu_to_brl = 0;
let ccar_to_brl = 0;
let ovl_to_brl = 0;
let lord_to_brl = 0;


fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=plant-vs-undead-token')
    .then((resp) => resp.json())
    .then(function(data) {
        $('#pvu-input').val(pvu);
        $('#pvu-brl-input').val(data[0].current_price);
        pvu_to_brl = data[0].current_price; 
    });

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=cryptocars')
    .then((resp) => resp.json())
    .then(function(data) {
        $('#ccar-input').val(ccar);
        $('#ccar-brl-input').val(data[0].current_price);
        ccar_to_brl = data[0].current_price;
    });

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=eternal')
    .then((resp) => resp.json())
    .then(function(data) {
        $('#lord-input').val(lord);
        $('#lord-brl-input').val(data[0].current_price.toFixed(5));
        lord_to_brl = data[0].current_price;
    });


function setSpreadsheetUrl(spreadsheetUrl){
    $("#spreadsheet-link").removeClass("visually-hidden");
    $("#spreadsheet-link").attr("href", spreadsheetUrl);
    chrome.storage.sync.set({ spreadsheetUrl });
}

function getSpreadsheetUrl(){
    chrome.storage.sync.get(({ spreadsheetUrl }) =>{
        console.log(spreadsheetUrl);
        if(spreadsheetUrl){
            setSpreadsheetUrl(spreadsheetUrl);
        }
    });
}

function removeSpreadsheetUrl(){
    chrome.storage.sync.remove("spreadsheetUrl");
    $("#spreadsheet-link").addClass("visually-hidden");
    $("#spreadsheet-link").attr("href", "");
}


(function() {
    $(document).on('change', '#pvu-input', function(){
        let rounded = ($(this).val() * pvu_to_brl).toFixed(2);
        $('#pvu-brl-input').val(rounded);
    });

    $(document).on('change', '#pvu-brl-input', function(){
        let rounded = ($(this).val() / pvu_to_brl).toFixed(2);
        $('#pvu-input').val(rounded);
    });

    //CCAR
    $(document).on('change', '#ccar-input', function(){
        let rounded = ($(this).val() * ccar_to_brl).toFixed(2);
        $('#ccar-brl-input').val(rounded);
    });

    $(document).on('change', '#ccar-brl-input', function(){
        let rounded = ($(this).val() / ccar_to_brl).toFixed(2);
        $('#ccar-input').val(rounded);
    });

    //OVL
    $(document).on('change', '#ovl-input', function(){
        let rounded = ($(this).val() * ovl_to_brl).toFixed(2);
        $('#ovl-brl-input').val(rounded);
    });

    $(document).on('change', '#ovl-brl-input', function(){
        let rounded = ($(this).val() / ovl_to_brl).toFixed(2);
        $('#ovl-input').val(rounded);
    });

    //LORD
    $(document).on('change', '#lord-input', function(){
        let rounded = ($(this).val() * lord_to_brl).toFixed(2);
        $('#lord-brl-input').val(rounded);
    });

    $(document).on('change', '#lord-brl-input', function(){
        let rounded = ($(this).val() / lord_to_brl).toFixed(2);
        $('#lord-input').val(rounded);
    });

    $(document).on('change', '#lord-brl-input', function(){
        let rounded = ($(this).val() / lord_to_brl).toFixed(2);
        $('#lord-input').val(rounded);
    });

    $('#spreadsheet-add').on('click', function(){
        setSpreadsheetUrl($('#spreadsheet-input').val());
    });

    $('#spreadsheet-remove').on('click', function(){
        removeSpreadsheetUrl();
    });

    getSpreadsheetUrl();
})();
