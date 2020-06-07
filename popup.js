
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
    var elem = document.getElementById('onoffswitch');
    if (state.shouldAutoSend === undefined){
        elem.checked = true
    } else {
        elem.checked = state.shouldAutoSend;
    }
    
}
browserApi.storage.local.get(['shouldAutoSend'], setCheckedState)

// Setup the checkbox
var elem = document.getElementById('onoffswitch');
elem.addEventListener('change', (event) => {
    // Checkbox value changed!!!
    console.log("settigns")
    browserApi.storage.local.set({ shouldAutoSend: event.target.checked })
})

var button = document.getElementById("websiteButton");
button.addEventListener("click", function(){
    browserApi.tabs.create({url:"https://whatsend.defcon007.com/"});
});
