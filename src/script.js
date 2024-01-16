// Global Variables
const addBtnDialog = document.getElementById('add-btn-dialog');
const dialog = document.getElementById('dialog');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementById('close-btn');
const nameInput = document.getElementById('name-input');
const moneyInput = document.getElementById('money-input');
const outputContainer = document.getElementById('output-container');
const totalDisplay = document.getElementById('total-display');
const submitBtn = document.getElementById('submit-btn');
let totalPerIndividual = 0;

//An array to store entity's objects
const entityStorage = [];

//An array to store the money who need to pay or need to receive
// const newEntityStorage = [];

//An array to store the update version when the entitystorage.money - the newEntityStorage.money
//this array will then display the money onto the website
const updateEntityStorage = [];

//Constructor of the entity
function Entity(name, money) {
    this.name = name;
    this.money = money;
}

//Function to show dialog
addBtnDialog.addEventListener('click', () => {
    dialog.showModal();
})

//Add btn function
addBtn.addEventListener('click', (e) => {
    //Prevent the page to refresh since there is no server to submit to either get or post
    e.preventDefault();
    //Get the name and the money value from the input fields
    let nameValue = nameInput.value;
    let moneyValue = moneyInput.value;
    //check if money input is a valid number
    if (!isNaN(moneyValue) && moneyValue.trim() !== '') {
        createEntity(nameValue, moneyValue);
        dialog.close();
        //Clear the input in the input field
        //So the next user dont have to manually clear the input field
        nameInput.value = '';
        moneyInput.value = '';
    } else {
        //alert for now but will create a div under the money input
        alert('please enter a valid amount for money.')
    }
})

//Function to create individual entity
//This function will be called in the addBtn function each time they click the add button
function createEntity(name, money) {
    //Will get the input name and money from the dialog 
    //Then create a new entity/person along with the money
    const newEntity = new Entity(name, money);
    //Push this new entity/person to the entity array
    entityStorage.push(newEntity);
    //call out the displayOutput function.
    displayOutput(entityStorage);
    //Call out the getTotal function
    getTotal(entityStorage);
}

//Function to display the output layout
//This function will display the arr out on the screen
//Will take array
function displayOutput(arr) {
    //Refresh the page everytime this function is called
    outputContainer.innerHTML = '';
    //A for loops. get name and money from the array
    //Place them in the outputLayout function to display the entity name and money
    arr.forEach((entity) => {
        outputLayout(entity.name, entity.money);
    });
}

//Function to close dialog
closeBtn.addEventListener('click', (e) => {
    //Prevent the page to refresh since there is no server to submit to either get or post
    e.preventDefault();
    dialog.close();
})

//Output the layout structure
function outputLayout(name, money) {
    //Round money to 2 decimals 
    let roundMoney = Math.round(money * 100) / 100;

    //Box container the output
    const box = document.createElement('div');
    box.className = 'flex justify-between items-center px-5 rounded-lg shadow-md p-2';

    //Name container
    const nameContainer = document.createElement('div');
    //p tag inside name container
    const pName = document.createElement('p');
    pName.innerHTML = name;
    //name container append p tag
    nameContainer.appendChild(pName);

    //create a divider between name and the money they spend/owe
    const divider = document.createElement('div');
    divider.innerHTML = '|';
    divider.className = 'font-bold text-2xl';

    //Money container
    const moneyContainer = document.createElement('div');
    moneyContainer.className = 'flex space-x-2';
    const pPay = document.createElement('p');
    // pPay.innerHTML = 'Paid:'
    const payDisplay = document.createElement('p');
    //if else statement
    //Update the paid/owe word on the web depends on the user's total money
    if (money > 0) {
        pPay.innerHTML = 'Paid:'
        payDisplay.innerHTML = `$${roundMoney}`;
    } else {
        pPay.className = 'border border-red-500 text-red-400';
        pPay.innerHTML = 'Owed:'
        payDisplay.className = 'font-bold text-red-500';
        payDisplay.innerHTML = `$${roundMoney}`;
    }
    
    //money container append 2 p tags
    moneyContainer.appendChild(pPay);
    moneyContainer.appendChild(payDisplay);

    //outputContainer will append box to make it show up on the website
    box.appendChild(nameContainer);
    box.appendChild(divider);
    box.appendChild(moneyContainer);
    outputContainer.appendChild(box);
}

//Calculate function
//Get called from createEntity function
function getTotal(arr) {
    let total = 0;
    let totalNumPpl = entityStorage.length;
    let name = '';
    //A for loop for the array. 
    //Get a total for all the entity money
    arr.forEach((entity) => {
        total += parseFloat(entity.money);
        name = entity.name;
    });
    //Call the showTotal function 
    showTotal(total);
    //Call the createNewEntity function
    //createNewEntity(name);
    //This variable right here is to get the total for each person/couple/group. 
    //An avg for each entity
    totalPerIndividual = total / totalNumPpl;
}

// //New entity function that will create a new entity and put it inside another array
// //We want to create a new array to store the name and the avg money per person
// function createNewEntity(name) {
//     // New entity being created here
//     const newEntity = new Entity(name);
//     //Store into another array
//     newEntityStorage.push(newEntity);
// }

//This function will be called from getTotal to display the total money on the web
function showTotal(total) {
    //To get 2 decimals place
    let roundTotal = Math.round(total * 100) / 100;
    totalDisplay.innerHTML = `$${roundTotal}`;
}

// //This function is to push the avg money to each person in the new array
// function newEntity(moneyPerIndividual) {
//     newEntityStorage.forEach((entity) => {
//         entity.money = moneyPerIndividual;
//     })
// }

//This is a submit button
//Whenever this button is clicked, it will update the current/new/update arrays.
submitBtn.addEventListener('click', () => {
    //newEntity(totalPerIndividual);
    calculate();
    displayOutput(updateEntityStorage);
})

//this is a calculate function
//it will calculate the original money and substract the avg money per person/group/couple
//it then push into a new array and get displayOutPUt function to do the job.
function calculate() {
    updateEntityStorage.length = 0;
    entityStorage.forEach((entity) => {
        const newTotal = parseFloat(entity.money) - parseFloat(totalPerIndividual);
        const newEntity = new Entity(entity.name, newTotal);
        updateEntityStorage.push(newEntity);
    })
}