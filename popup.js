
let browserApi;
try {
    browserApi = browser;
} catch (e) {
    if (e instanceof ReferenceError) {
        console.log('switch to chrome api');
        browserApi = chrome;
    } else {
        throw (e);
    }
}

function setCheckedState(state) {
    console.log("setting teh state");
    console.log(state)
    var elem = document.getElementById('myonoffswitch');
    elem.checked = state['shouldAutoSend'];
}


chrome.storage.local.get(['shouldAutoSend'], setCheckedState)


var elem = document.getElementById('myonoffswitch');


elem.addEventListener('change', (event) => {
    console.log("settigns")
    chrome.storage.local.set({ shouldAutoSend: event.target.checked })
    if (event.target.checked) {
        alert('checked');
    } else {
        alert('not checked');
    }
})


// console.log *
// browserApi.tabs.create({
//     url: "https://web.whatsapp.com/send?phone=918768668885&text=Hi This is fucking test",
//     active: true
//   });

// chrome.tabs.getCurrent(function (tab) {
//     //Your code below...
//     var tabUrl = encodeURIComponent(tab.url);
//     var tabTitle = encodeURIComponent(tab.title);
//     var myNewUrl = "https://web.whatsapp.com/send?phone=918768668885&text=Hi This is fucking test"

//     //Update the url here.
//     chrome.tabs.update(tab.id, {url: myNewUrl});
//   });

// var msgList = [
//     "odjnv",
//     "ojfsnv",
//     "pojisnfvof",
//     "ojwfbnv",
//     "owjf"
// ]


// for (var i = 0; i < msgList.length; i++) {
// chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
//     // chrome.tabs.update(tab.id, {url: `https://web.whatsapp.com/send?phone=918768668885&text=$msgList[i]`});
//     chrome.tabs.update(tab.id, {url: `https://web.whatsapp.com/send?phone=919098854207&text=$msgList[i]`});
// });


// adding listener to your button in popup window
// document.getElementById('press').addEventListener('click', injectTheScript);
console.log("nosio nsiniwnr noiiwn ownr orwun oern oeunr uoern ro")
function injectTheScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.executeScript(tabs[0].id, { file: "content_script.js" });
    });
}
injectTheScript();


//   }

