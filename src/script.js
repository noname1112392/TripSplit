// Global Variables
const addBtnDialog = document.getElementById('add-btn-dialog');
const dialog = document.getElementById('dialog');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementById('close-btn');
const nameInput = document.getElementById('name-input');
const moneyInput = document.getElementById('money-input');
const outputContainer = document.getElementById('output-container');
const totalDisplay = document.getElementsByName('total-display');

//An array to store entity's objects
const entityStorage = [];

//An array to store the money who need to pay or need to receive
const newEntityStorage = [];

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
    e.preventDefault();
    let nameValue = nameInput.value;
    let moneyValue = moneyInput.value;
    createEntity(nameValue, moneyValue);
    dialog.close();
})

//Function to create individual entity
function createEntity(name, money) {
    const newEntity = new Entity(name, money);
    entityStorage.push(newEntity);
    displayOutput();
    getTotal(entityStorage);
}

//Function to display the output layout
function displayOutput() {
    outputContainer.innerHTML = '';
    entityStorage.forEach((entity) => {
        outputLayout(entity.name, entity.money);
    });
}

//Function to close dialog
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
})

//Output the layout structure
function outputLayout(name, money) {
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
    //two p tags inside the money container
    //this p tag of pay or owe will change later
    //will create an if else statement to determine
    const pPayOwe = document.createElement('p');
    pPayOwe.innerHTML = 'Paid:'
    const moneyDisplay = document.createElement('p');
    moneyDisplay.innerHTML = `$${money}`;
    //money container append 2 p tags
    moneyContainer.appendChild(pPayOwe);
    moneyContainer.appendChild(moneyDisplay);

    //outputContainer will append box to make it show up on the website
    box.appendChild(nameContainer);
    box.appendChild(divider);
    box.appendChild(moneyContainer);
    outputContainer.appendChild(box);
}

//Calculate function
function getTotal(arr) {
    let total = 0;
    let totalNumPpl = entityStorage.length;
    arr.forEach((entity) => {
        total += parseFloat(entity.money);
    })
    let totalPerIndividual = total / totalNumPpl;
    console.log(totalPerIndividual);
}

// function totalPerIndividual(total, totalNumPpl) {
//     let totalPerPerson = total / totalNumPpl;
//     return totalPerPerson;
// }

// function 
// 2220 / 3
// 749 ea
// entityStorage.forEach((entity) => {
//     name = entity.name;
// })
// const newEntity = new Entity(name, totalPerPerson);
// newEntityStorage.push(newEntity);
// console.log(newEntityStorage);