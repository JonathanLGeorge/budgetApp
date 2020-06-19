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

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

//our data structure
   var data = {
        allItems: {
            exp: [],
            inc: []
       },
       totals: {
           exp: 0,
           inc: 0
       }
   }

   //public method
   return {
       //type, description, value
       //type == inc or exp
       addItem: function(type, des, val){
            var newItem, ID;
            ID = 0;
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }   

            data.allItems[type].push(newItem);
            return newItem;
       }
   }

})();

//UI
var UIController = (function() {
    //getting data from user
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: 'add__description',
        inputValue: 'add__value',
        inputBtn: 'add__btn'
    }

    return {
        getInput: function(){
            return{
                //add__type is the selector class in out html
                //'inc' is income and 'exp' is expensies 
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        }
        
    };
})()


var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        //getting ID name of the button //classanem  "add__btn" dont forget the "." like in css
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        //which is for older browsers
        document.addEventListener('keypressed', function(event){
            if(event.keycode === 13 || event.which === 13){
                console.log("Enter key was pressed");
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function(){
         //1. get the feild input data
         var input = UICtrl.getInput();
         console.log(input)
        //2. Add the item to the budget controller 
        //3. Add the item to the UI
        //4. Calculate the budget
        //5. Display the budget on the UI

        //console.log("enter key or mouse click on check mark worked")
    }

    return{
        init: function(){
            console.log("app has started");
            setupEventListeners();
        }
    }
})(budgetController, UIController)


//triggers the event lisiteners 
controller.init();