import $ from 'jquery';
import groups from './groups';
import moment from 'moment';

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

            if (now.diff(currentHour, 'h') > -2 && now.diff(currentHour, 'h') <= 0) {
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


    chrome.storage.sync.get("group", ({ group }) =>{
        setTimeGroup(group || $('#group-plants').val());
        console.log($('#group-plants').val(group));
    });

    startSelect();
})();
