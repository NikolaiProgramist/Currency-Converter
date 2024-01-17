let currencies_node = document.querySelector('.menu');
let select_1_node = document.querySelector('#exampleInputEmail2');

reload_currency_from();
reload();
reload_page();

function reload_page () {
    setInterval(function () {
        reload();
    }, 10000);
}

function reload () {
    let objXMLHttpRequest = new XMLHttpRequest();
    objXMLHttpRequest.onreadystatechange = function() {
        if(objXMLHttpRequest.readyState === 4) {
            if(objXMLHttpRequest.status === 200) {
                let data = JSON.parse(objXMLHttpRequest.responseText);
                let html_node = '';

                for (let i = 0; i < data.length; i++) {

                    html_node += '<div>\n' +
                        '                <h2>\n' +
                        '                    <span>\n' +
                        '                        ' + data[i][1] + '\n' +
                        '                    </span>\n' +
                        '                    <span class="badge badge-secondary bg-primary">\n' +
                        '                        ' + data[i][2] + '\n' +
                        '                    </span>\n' +
                        '                </h2>\n' +
                        '            </div>';
                }

                currencies_node.innerHTML = html_node;
            } else {
                alert('Error Code: ' +  objXMLHttpRequest.status);
                alert('Error Message: ' + objXMLHttpRequest.statusText);
            }
        }
    }
    objXMLHttpRequest.open('GET', 'backend/get_balance.php');
    objXMLHttpRequest.send();
}

function reload_currency_from () {
    let objXMLHttpRequest = new XMLHttpRequest();
    objXMLHttpRequest.onreadystatechange = function() {
        if(objXMLHttpRequest.readyState === 4) {
            if(objXMLHttpRequest.status === 200) {
                let data = JSON.parse(objXMLHttpRequest.responseText);
                let html_node = '';

                for (let i = 0; i < data.length; i++) {

                    html_node += '<option>' + data[i][1] + '</option>';
                }

                select_1_node.innerHTML = html_node;
            }
        }
    }
    objXMLHttpRequest.open('GET', 'backend/get_balance.php');
    objXMLHttpRequest.send();
}