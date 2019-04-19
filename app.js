const TYPES = {
    EXPENSE: 'expense',
    INCOME: 'income'
};

const budgetController = (() => {

    const Expense = function ({ id,  description, value }) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function ({ id,  description, value }) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        }
    };

    return {
        addItem: ({ type, description, value }) => {
            let newItem, newId;

            if (data.allItems.length > 1) {
                newId = data.allItems[type][data.allItems.length - 1].id + 1;
            } else {
                newId = 1
            }

            // create new item based on the type
            if (type === TYPES.EXPENSE) {
                 newItem = new Expense({ id: newId, description, value});
            } else if (type === TYPES.INCOME) {
                 newItem = new Income({ id: newId, description, value });
            }

            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: () => {
            console.log(data);
        }
    };

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
        },
        INCOME_LIST_CONTAINER: {
            className: '.income-list'
        },
        EXPENSES_LIST_CONTAINER: {
            className: '.expenses-list'
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
        addListItem: ({ item, type}) => {

            let placeholderHtml, listItemHtml, listContainerSelector;
            // Create HTML string with some placeholder text

            if (type === TYPES.INCOME) {
                listContainerSelector = HTML_ELEMENTS.INCOME_LIST_CONTAINER.className;
                placeholderHtml = `<div class="item clearfix" id="income-%id%">
                            <div class="item-description">%description%</div>
                            <div class="right clearfix">
                                <div class="item-value">%value%</div>
                                <div class="item-delete">
                                    <button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            } else if (type === TYPES.EXPENSE) {
                listContainerSelector = HTML_ELEMENTS.EXPENSES_LIST_CONTAINER.className;
                placeholderHtml = `<div class="item clearfix" id="expense-%id%">
                            <div class="item-description">%description%</div>
                            <div class="right clearfix">
                                <div class="item-value">%value%</div>
                                <div class="item-percentage">21%</div>
                                <div class="item-delete">
                                    <button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            }

            // Replace placeholder text

            listItemHtml = placeholderHtml.replace('%id%', item.id);
            listItemHtml = listItemHtml.replace('%description%', item.description);
            listItemHtml = listItemHtml.replace('%value%', item.value);

            // Insert HTML into the DOM

            document.querySelector(listContainerSelector).insertAdjacentHTML('beforeend', listItemHtml);

        },
        getHtmlElements: () => HTML_ELEMENTS
    };
})();

const appController = ((budgetCtrl, uiCtrl) => {

    const setupEventListeners = () => {
        const htmlELements = uiController.getHtmlElements();

        document.querySelector(htmlELements.ADD_BUTTON.className).addEventListener('click', addItem);

        document.addEventListener('keypress', (event) => {
            // event.which is needed for legacy browsers
            if (event.keyCode === 13 || event.which === 13) {
                addItem();
            }
        });
    };

    const addItem = () => {

        // 1. get field input data
        const userInput = uiCtrl.getInput();

        // 2. add item to budget controller
        const newItem = budgetCtrl.addItem({
            type: userInput.type,
            description: userInput.description,
            value: userInput.value
        });

        // 3. add new item to ui

        uiCtrl.addListItem({ item: newItem, type: userInput.type });

        // 4. calculate budget

        // 5. display budget on ui
    };

    return {
        init: () => setupEventListeners()
    };

})(budgetController, uiController);

appController.init();

