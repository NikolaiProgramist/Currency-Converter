let select_2_node = document.querySelector('#exampleInputEmail3');

let objXMLHttpRequest = new XMLHttpRequest();
objXMLHttpRequest.onreadystatechange = function() {
    if(objXMLHttpRequest.readyState === 4) {
        if(objXMLHttpRequest.status === 200) {
            let data = JSON.parse(objXMLHttpRequest.responseText);
            let html_node = '';

            for (let i = 0; i < data.length; i++) {

                html_node += '<option>' + data[i][0] + '</option>';
            }

            select_2_node.innerHTML = html_node;
        } else {
            alert('Error Code: ' +  objXMLHttpRequest.status);
            alert('Error Message: ' + objXMLHttpRequest.statusText);
        }
    }
}
objXMLHttpRequest.open('GET', 'backend/get_all_currencies.php');
objXMLHttpRequest.send();