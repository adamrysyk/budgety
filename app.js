const budgetController = (() => {


})();

const uiController = (() => {

    const HTML_ELEMENTS = {
        INPUT_TYPE: {
            className: '.add-type'
        },
        INPUT_DESCRIPTION: {
            className: '.add-description'
        },
        INPUT_VALUE: {
            className: '.add-value'
        },
        ADD_BUTTON: {
            className: '.add-btn'
        }
    };

    return {
        getInput: () => {
            return {
                type: document.querySelector(HTML_ELEMENTS.INPUT_TYPE.className).value,
                description: document.querySelector(HTML_ELEMENTS.INPUT_DESCRIPTION.className).value,
                value: document.querySelector(HTML_ELEMENTS.INPUT_VALUE.className).value,
            }
        },
        getHtmlElements: () => HTML_ELEMENTS
    };
})();

const appController = ((budgetCtrl, uiCtrl) => {

    const htmlELements = uiController.getHtmlElements();

    const addItem = () => {
        // 1. get field input data

        const userInput = uiController.getInput();
        console.log(userInput);

        // 2. add item to budget controller

        // 3. add new item to ui

        // 4. calculate budget

        // 5. display budget on ui
    }

    document.querySelector(htmlELements.ADD_BUTTON.className).addEventListener('click', addItem);

    document.addEventListener('keypress', (event) => {
        // event.which is needed for legacy browsers
        if (event.keyCode === 13 || event.which === 13) {
            addItem();
        }
    });
})(budgetController, uiController );