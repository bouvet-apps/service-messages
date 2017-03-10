displayServiceMessages = function (serviceurl) {
    if (typeof JSON !== "object") {
      JSON = {};
      JSON.parse = json_parse;  // Included in json_parse.js
    }
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      // Older IE support
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', serviceurl);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.blockid) {
                var blockid = response.blockid;
                if (document.getElementById(blockid)) {
                    for (var i = 0; i < response.servicemessages.length; i++) {
                        var msg = response.servicemessages[i];
                        var div = document.createElement("DIV");
                        div.className = "alert alert-"+msg.type;
                        div.setAttribute("role", "alert");
                        if (msg.link !== undefined && msg.link.length > 0) {
                            var link = document.createElement("A");
                            link.href = msg.link;
                            link.innerHTML = msg.text;
                            div.appendChild(link);
                        } else {
                            div.innerHTML = msg.text;
                        }
                        document.getElementById(blockid).appendChild(div);
                    }
                } else {
                    console.error("Service message container not found!")
                }
            }
        }
        else if (xhr.readyState !== 4) {
            console.log(xhr.readyState);
        } else {
            console.error(xhr.status);
        }
    };
    xhr.send();
};
