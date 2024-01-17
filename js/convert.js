let btn = document.querySelector('button');

btn.addEventListener('click', function () {
    let currency_from = document.querySelector('.currency_from').value;
    let currency_to = document.querySelector('.currency_to').value;
    let count = document.querySelector('.count').value;

    if (Math.sign(count) === 1) {
        let objXMLHttpRequest = new XMLHttpRequest();
        objXMLHttpRequest.onreadystatechange = function() {
            if(objXMLHttpRequest.readyState === 4) {
                if(objXMLHttpRequest.status === 200) {
                    btn.removeAttribute('disabled');
                    let data = JSON.parse(objXMLHttpRequest.responseText);
                    show_alert(data);
                } else {
                    alert('Error Code: ' +  objXMLHttpRequest.status);
                    alert('Error Message: ' + objXMLHttpRequest.statusText);
                }
            }
        }
        objXMLHttpRequest.open('POST', 'backend/calculation_currencies.php?currency_from=' + currency_from + '&currency_to=' + currency_to + '&count=' + count);
        objXMLHttpRequest.send();

        btn.setAttribute('disabled', '');
        reload();
        reload_currency_from(currency_from);
    } else {
        let data = 'ERROR';
        show_alert(data);
    }
});

function reload_currency_from (currency_from) {
    let objXMLHttpRequest = new XMLHttpRequest();
    objXMLHttpRequest.onreadystatechange = function() {
        if(objXMLHttpRequest.readyState === 4) {
            if(objXMLHttpRequest.status === 200) {
                let data = JSON.parse(objXMLHttpRequest.responseText);
                let html_node = '';

                for (let i = 0; i < data.length; i++) {

                    if (data[i][1] != currency_from) {
                        html_node += '<option>' + data[i][1] + '</option>';
                    } else {
                        html_node += '<option selected>' + data[i][1] + '</option>';
                    }
                }

                select_1_node.innerHTML = html_node;
            }
        }
    }
    objXMLHttpRequest.open('GET', 'backend/get_balance.php');
    objXMLHttpRequest.send();
}

let footer_div = document.querySelector('.footer div');
let alert_success = document.querySelector('.alert-success');
let alert_danger = document.querySelector('.alert-danger');

function show_alert (data) {
    if (data == 'ERROR') {
        alert_danger.style.display = 'block';
        footer_div.animationPlayState = 'running';

        setTimeout(function () {
            alert_danger.style.display = 'none';
        }, 6000);
    }

    if (data == 'SUCCESS') {
        alert_success.style.display = 'block';
        footer_div.animationPlayState = 'running';

        setTimeout(function () {
            alert_success.style.display = 'none';
        }, 6000);
    }
}