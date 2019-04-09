const budgetController = (() => {


})();

const uiController = (() => {

})();

const appController = ((budgetCtrl, uiCtrl) => {

    const addItem = () => {
        // 1. get field input data

        // 2. add item to budget controller

        // 3. add new item to ui

        // 4. calculate budget

        // display budget on ui

        console.log('add an item')
    }

    document.querySelector('.add-btn ').addEventListener('click', addItem);

    document.addEventListener('keypress', (event) => {
        // event.which is needed for legacy browsers
        if (event.keyCode === 13 || event.which === 13) {
            addItem();
        }
    });
})(budgetController, uiController );