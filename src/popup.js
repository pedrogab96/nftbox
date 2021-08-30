import $ from 'jquery';
import groups from './groups';
import moment from 'moment';

let le = 70;
let pvu = 1;
let brl = 0;
let usd = 0;

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=plant-vs-undead-token')
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data[0]);
        $('#pvu-input').val(pvu);
        $('#le-input').val(le);
        $('#brl-input').val(data[0].current_price);
        brl = data[0].current_price; 
    });

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=plant-vs-undead-token')
    .then((resp) => resp.json())
    .then(function(data) {
        $('#usd-input').val(data[0].current_price);
        usd = data[0].current_price;
    });

(function() {
    let translations = {
        group1: "Grupo 1",
        group2: "Grupo 2",
        group3: "Grupo 3",
        group4: "Grupo 4",
        group5: "Grupo 5",
        group6: "Grupo 6",
    }

    function startSelect() {
        let options = '';

        Object.keys(groups).forEach(function (item, key) {
            options += `<option value=${item}>${translations[item]}</option>`;
        })

        $('#group-plants').html(options);
    }

    function setTimeGroup(group) {
        let options = "";
        groups[group].forEach(function (time) {
            let now = moment();
            let selected = '';
            let next = '';
            let currentHour = moment(time, 'h:mm');
            let newHour = moment(time, 'h:mm').add(30, 'm');

            console.log(currentHour.diff(now, 'h', true));
            if(currentHour.diff(now, 'h', true) > 0 && currentHour.diff(now, 'h', true) < 3){
                next = ' - próximo';
            }
            
            if (now.isBetween(currentHour, newHour)) {
                selected = 'selected';
                next = '';
            }

            options += `<option ${selected} value=${time}>${time}${next}</option>`;
        });

        $('select[name=times]').html(options);
    }

    $(document).on('change', '#group-plants', function () {
        let value = $(this).val();
        chrome.storage.sync.set({ group: value });
        setTimeGroup(value);
    });

    $(document).on('change', '#pvu-input', function(){
        console.log($(this).val() * brl);
        $('#brl-input').val($(this).val() * brl);
        $('#usd-input').val($(this).val() * usd);
        $('#le-input').val($(this).val() * le);
    });

    $(document).on('change', '#usd-input', function(){
        let rounded = ($(this).val() / usd).toFixed(2);
        $('#pvu-input').val(rounded);
        $('#brl-input').val((rounded * brl).toFixed(2));
    });

    $(document).on('change', '#brl-input', function(){
        let rounded = ($(this).val() / brl).toFixed(2);
        $('#pvu-input').val(rounded);
        $('#usd-input').val((rounded * usd).toFixed(2));
    });

    $(document).on('change', '#le-input', function(){
        let rounded = ($(this).val() / le).toFixed(2);
        $('#pvu-input').val(rounded);
        $('#usd-input').val(rounded * usd);
        $('#brl-input').val(rounded * brl);
    });

    chrome.storage.sync.get("group", ({ group }) =>{
        setTimeGroup(group || $('#group-plants').val());
        $('#group-plants').val(group);
    });

    startSelect();
})();
