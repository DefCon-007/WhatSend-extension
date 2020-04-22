/**
 * Gets the desired element on the client page and clicks on it
 */
async function waitForElementToHide(selector, func) {
    console.log("Hide function called");
    while (true) {
        var element = document.querySelector(selector)
        console.log(element)
        if (element == null) {
            await new Promise(r => setTimeout(r, 3000));
            window.close();
            return;
        }
        else {
            await new Promise(r => setTimeout(r, 1000));
            console.log("Waiting in hide")
        }
    }
}

async function clickAndClose(element) {
    console.log("in theb callback function ")
    await new Promise(r => setTimeout(r, 1000));
    element.click();
    waitForElementToHide("span[data-icon='msg-time']", null)
    return;
}

async function waitForElementToDisplay(selector, func) {
    while (true) {
        var element = document.querySelector(selector)
        console.log(element)
        if (element != null) {
            func(element);
            return;
        }
        else {
            await new Promise(r => setTimeout(r, 1000));
            console.log("Waiting")
        }
    }
}



waitForElementToDisplay("span[data-icon='send']", clickAndClose)

