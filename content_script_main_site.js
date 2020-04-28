console.log("Script injected")

async function updateNumbeStatus(number) {
    // Update status in table for numbers which have no status 
    var elems = document.querySelectorAll("td[data-type='status']")
    for (var i = 0; i < elems.length; i++) {
        elem = elems[i];
        if (!(elem.innerHTML.toString().trim())) {
            // No status added right now add one
            numberInElem = elem.getAttribute("data").toString().trim()
            if (numberInElem === number) {
                elem.innerHTML = "<img src='https://raw.githubusercontent.com/DefCon-007/WhatSend/master/images/Check.svg?sanitize=true' />"
                elem.setAttribute("data-sort", "success");
            } else {
                elem.innerHTML = "<img src='https://raw.githubusercontent.com/DefCon-007/WhatSend/master/images/Warning.svg?sanitize=true' />"
            }
        }
    }

}

// Listen for messages from background script to update number status
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("Message received");
        if (request.type === "UPDATE_STATE") {
            // Message was successfully sent 
            console.log("Updating number status")
            updateNumbeStatus(request.number);
        }
    });