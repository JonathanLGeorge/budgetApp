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

            //create new id 
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0
            }
       
       

            //create a new item based on inc or exp type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }   
            //pushees into our data structure 
            data.allItems[type].push(newItem);
            //returns new element 
            return newItem;
       },
       //testing/bedugeing. in console type budgetContoller.testing
       testing: function(){
           console.log(data)
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
        //same as using function concruture and them pass to app controller?? 
        addListItem: function(obj, type) {
            var html;
            //create HTML string with placeholder text
            if(type === 'inc'){
                //%id%, %description%.... is the place holder tags, and is easy to find %%
                html ='<div class="item clearfix" id="income-%id%"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else {
                html ='<div class="item clearfix" id="expense-0"><div class="item__description">Apartment rent</div><div class="right clearfix"><div class="item__value">- 900.00</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            //Replace the placeholder text woth some  actual data
            //replace method....html is a string so we can manipulat that string
            newHtml = html.replace('%id%', onj.id) //from budgetController (id, description, value) 
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            //Insert the HTML innto the DOM
            //element.insertAdjacentHTML(position, text);
            //look up mozilla Adjacent HTML docs  we are using (before)


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

    //this is like the controll center of our app, it tells the other modules what is should do, and then it gets data back to use
    var ctrlAddItem = function(){
        var input, newItem; 
        
        //1. get the feild input data
         input = UICtrl.getInput();
         console.log(input)
        
         //2. Add the item to the budget controller 
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
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