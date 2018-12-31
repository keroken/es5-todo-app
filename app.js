// Todo Controller
var todoController = (function() {
    var Todo = function(id, content) {
        this.id = id;
        this.content = content;
    };

    var allItems = [];

    return {
        addItem: function(item) {
            var newItem, ID;

            // Create new ID: lastID + 1
            if (allItems.length > 0) {
                ID = allItems[allItems.length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Create new item
            newItem = new Todo(ID, item);
            // Push it into allItems
            allItems.push(newItem);

            return newItem;
        },

        deleteItem: function(id) {
            var ids, index;
            ids = allItems.map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);
            allItems.splice(index, 1);
        },

        testing: function() {
            console.log(allItems);
        }
    };

})();

// UI Controller
var UIController = (function() {
    var DOMstrings = {
        inputItem: '.input__item',
        inputBtn: '.input__btn',
        listContainer: '.list__container',
        deleteBtn: '.item__delete--btn'
    };

    return {
        getInput: function() {
            return {
                item: document.querySelector(DOMstrings.inputItem).value

            };
        },

        addListItem: function(obj) {
            console.log(obj);
            var item, element;
            //item = document.createElement('li');
            item = '<li id="%id%" class="list__item">' + obj.content + '<button class="btn item__delete--btn"><i class="ion-ios-close-outline"></i></button></li>';
            item = item.replace('%id%', obj.id);
            // item.innerHTML = obj.content;
            element = DOMstrings.listContainer;
            document.querySelector(element).insertAdjacentHTML('beforeend', item);

        },

        deleteListItem: function(id) {
            var element = document.getElementById(id);
            element.parentNode.removeChild(element);
        },

        clearField: function() {
            var field;
            field = document.querySelector(DOMstrings.inputItem);
            field.value = "";
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

// Global App Controller
var controller = (function(todoCtrl, UICtrl) {
    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.listContainer).addEventListener('click', ctrlDeleteItem);
    };

    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get input data from the field
        input = UICtrl.getInput();

        if (input.item !== "") {
            // 2. Add the item to Todo Controller
            newItem = todoCtrl.addItem(input.item);
            // 3. Add item to the UI
            UICtrl.addListItem(newItem);
            // 4. Clear the field
            UICtrl.clearField();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, ID;
        itemID = event.target.parentNode.parentNode.id;
        if (itemID) {
            ID = parseInt(itemID);

            todoCtrl.deleteItem(ID);

            UICtrl.deleteListItem(itemID);
        }
    };

    return {
        init: function() {
            console.log('App has started!');
            setupEventListeners();
        }
    };

})(todoController, UIController);

controller.init();

