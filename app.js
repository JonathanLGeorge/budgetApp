//modual pattern 
var budgetController = (function() {
    // var x = 23;
    // var add = function(a) {
    //     return x + a;
    // }

    // return{
    //     publicTest: function(b){
    //         return (add(b));
    //     }
    // }

})();

var UIController = (function() {
    //update pending


})()


var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = function(){
         //1. get the feild input data
        //2. Add the item to the budget controller 
        //3. Add the item to the UI
        //4. Calculate the budget
        //5. Display the budget on the UI

        console.log("enter key or mouse click on check mark worked")
    }

    //this controler knows about UI and budget

    // var z = budgetCtrl.publicTest(5);

    // return{
    //     anotherPublic: function(){
    //         console.log(z);
    //     }
    // }
    //getting ID name of the button //classanem  "add__btn" dont forget the "." like in css
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    //which is for older browsers
    document.addEventListener('keypressed', function(event){
        if(event.keycode === 13 || event.which === 13){
            console.log("Enter key was pressed");
            ctrlAddItem();
        }
    });

})(budgetController, UIController)