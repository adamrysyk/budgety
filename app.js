const budgetController = (() => {

    const x = 23;

    const add = (a) => x + a;

    return {
        publicTest: (b) => add(b)
    }

})();

const uiController = (() => {

})();

const appController = ((budgetCtrl, uiCtrl) => {

    const z = budgetCtrl.publicTest(5)

    return {
        anotherPublic: () => console.log(z)
    }

})(budgetController, uiController );