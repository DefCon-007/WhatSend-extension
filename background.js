chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === "MESSAGE_SENT") {
            // A message was successfully sent
            if (request.number) {
                chrome.tabs.query({ currentWindow: true }, function (tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        var tab = tabs[i];
                        console.log(tab.url)
                        if ((tab.url.toLowerCase().includes("whatsend.defcon007.com")) || (tab.url.toLowerCase().includes("whats-sender-website"))) {
                            console.log(`Sending the message with number ${request.number}`)
                            chrome.tabs.sendMessage(tab.id, { greeting: "Message from backgrond", type: "MESSAGE_SENT", number: request.number }, function (response) {
                            });
                        }
                    }
                });
            }
            sendResponse({ success: true });
        }
    });