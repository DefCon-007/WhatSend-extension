var numberPattern = /\d+/g;
var storedNum = "";
var functionRunning = false;

function getElementByXpath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

async function waitForElementToHide(selector, mainDivElem) {
    while (true) {
        var messageWaitingElement = document.querySelector(selector)
        if (messageWaitingElement == null) {
            // The waiting clock icon disappeared, message is sent
            await new Promise(r => setTimeout(r, 2000));
            var number = "UNKNOWN_NUMBER";
            if (mainDivElem) {
                var numElem = mainDivElem.querySelector("span[dir='auto']");
                var numElemText = numElem.innerText
                var numberMatch = numElemText.match(numberPattern);
                if (numberMatch) {
                    var number = numberMatch.join('');
                }
            }
            updateNumberState(number);
            return;
        }
        else {
            // The waiting clock icon is still visible, wait for it to hide
            await new Promise(r => setTimeout(r, 1000));
        }
    }
}

async function clickAndClose(element) {
    await new Promise(r => setTimeout(r, 1000));
    var mainDivElem = element.closest("div#main")
    // Click the send button
    element.click();
    //Wait for clock icon(which indicaties the message is processing) to hide 
    waitForElementToHide("span[data-icon='msg-time']", mainDivElem)
    return;
}

function updateNumberState(number) {
    // Send message to background script indicating message is sent
    chrome.runtime.sendMessage({ type: "MESSAGE_SENT", number: number }, function (response) {
        window.close();
    });
}

async function waitForElementToDisplay(selector, func) {
    var xpath_invalid_phone_num = "//div[contains(text(),'Phone number shared via url is invalid')]"
    while (true) {
        var element = document.querySelector(selector)
        var phoneElem = getElementByXpath(xpath_invalid_phone_num)
        if (element != null) {
            func(element);
            return;
        }
        else if (phoneElem) {
            //The phone number shared is invalid, close the current tab and continue
            window.close();
            return;
        }
        else {
            await new Promise(r => setTimeout(r, 1000));
        }
    }
}

chrome.storage.local.get(["shouldAutoSend"], function (result) {
    console.log("Getting value from local storage");
    if (result.shouldAutoSend) {
        // Auto send is enabled, call the wait function!
        console.log("Autosending the message!");
        waitForElementToDisplay("span[data-icon='send']", clickAndClose)
    } else[
        console.log("Autosending is disabled")
    ]
});

