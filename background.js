chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === "MESSAGE_SENT") {
            // A message was successfully sent
            console.log("Received the message")
            console.log(request)
            if (request.number) {
                chrome.tabs.query({ currentWindow: true }, function (tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        var tab = tabs[i];
                        try {
                            if ((tab.url.toLowerCase().includes("whatsend.defcon007.com")) || (tab.url.toLowerCase().includes("whats-sender-website"))) {
                                console.log(`Sending the message with number ${request.number}`)
                                chrome.tabs.sendMessage(tab.id, { type: "UPDATE_STATE", number: request.number }, function (response) {
                                });
                            }
                        }
                        catch (err) {
                            console.log("error occured")
                            console.log(err.message)
                        }
                    }
                });
            }
            sendResponse({ success: true });
        }
    });