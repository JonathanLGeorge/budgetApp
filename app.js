const { UserInfo } = require("git");

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
        this.percentage= -1;
    };

    Expense.prototype.calculatePercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function(){
       return this.percentage;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(current){
            sum = sum + current.value;
        });
        /*
        0
        [200,400,100]
        sum = 0 + 200
        next iteration 
        sum = 200 + 400
        ... 600 + 100
        ...700 + ...
        */
       data.totals[type] = sum;
    }
//our data structure
   var data = {
        allItems: {
            exp: [],
            inc: []
       },
       totals: {
           exp: 0,
           inc: 0
       },
       budget: 0,
       //we use -1 if none existant, which is true at first
       percentage: -1
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
        calculateBudget: function(){
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //calculate the percentage of income that we spent
            //only want to use if we have some income
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
                // say we have expenses = 100 and income 200, we spent 50% = 100/200 = 0.5 *100
            }else{
                // -1 means none existant 
                data.percentage = -1; 
            }
            
        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentages: data.percentage
            }
        },
        deleteItem: function(type, id){
            var ids, index;

            ids - data.allItems[type].map(function(current){
                return current.id;
            })
            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
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
        inputBtn: 'add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: ''

    }

    return {
        getInput: function(){
            return{
                //add__type is the selector class in out html
                //'inc' is income and 'exp' is expensies 
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                //we need to parse float cause we need to have floating point and not a string to do calculations
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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
        clearFields: function(){
           var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)
            //this is a trick, now we have an array of fields
            var fieldsArray = Array.prototype.slice.call(fields);


            //used back in out controller, will clear the input fields so you dont need to constantly delete everything 
            fieldsArray.forEach(function(current, index, array){
                current.value = "";
            })
            //refocuses description so you dont need to click arround as much 
            fieldsArray[0].focus
        },
        displayBudget: function(obj){
            /// more dom manipulation 

            // budget: data.budget,
            // totalInc: data.totals.inc,
            // totalExp: data.totals.exp,
            // percentages: data.percentage
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            //we want to keep in mind the % shown in expenses. what if its our budget is in the negative, 
            if(obj.percentage > 0){

            } else {

            }
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
    //called each time we enter a new item. invoked from ctrlAddItem 
    var updateBudget = function(){
        //1 calculate the budget
      budgetCtrl.calculateBudget();
        //2 return the budget
        var budget = budgetCtrl.getBudget();
        //3 Display the budget in the UI
        console.log(budget);
    };
    //this is like the controll center of our app, it tells the other modules what is should do, and then it gets data back to use
    var ctrlAddItem = function(){
        var input, newItem; 
        
        //1. get the feild input data
         input = UICtrl.getInput();
         console.log(input)
        
        //making sure we get all our fields filled out or it wont excicute. 
         if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            //2. Add the item to the budget controller 
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type)
            //4. Calculate the budget
            //clear feilds
            UICtrl.clearFields();
            //5. Display the budget on the UI
            //this is now a fuction update budget so we keep things DRY
            updateBudget();
            //console.log("enter key or mouse click on check mark worked")
         }
    }

    return{
        init: function(){
            console.log("app has started");
            UICtrl.displayBudget({
                budget: 0,
                totalExp: 0,
                totalInc: 0,
                percentage: -1
            });

            setupEventListeners();
        }
    }
})(budgetController, UIController)


//triggers the event lisiteners 
controller.init();

/**
      {Budget Controller}        {AppController}                   {UI Controller}
|--------[addItem]<------------------[crlAddItem]--------------------|->[getInput]
|   |<--[calculate]<------------|        | (click/key press)       |->[addListItem]
|   |                           |        |                         |
|   |-->[calculateTotal]        |        |                         |->[clearFields]
|                               |        V
|      [get Budget]<------------|----[updateBudget]-------------|->--->[displayBudget]
|                                                               |
|  (Expense/income constructors )                               |
|-->[Expense]                       [setupEventListeners]---------->[getDOMstrings]
|or                                     ^                       |
|or                                     |                       |
|-->[Income]                     -->[init]--------------------->|
 * 
 * 
 */