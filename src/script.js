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
const newEntityStorage = [];

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
    e.preventDefault();
    let nameValue = nameInput.value;
    let moneyValue = moneyInput.value;
    //check if money input is a valid number
    if (!isNaN(moneyValue) && moneyValue.trim() !== '') {
        createEntity(nameValue, moneyValue);
        dialog.close();
    } else {
        //alert for now but will create a div under the money input
        alert('please enter a valid amount for money.')
    }
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
    //This container will contain 2 divs
    //first one will contain owe money and the second one will contain paid
    const pOwe = document.createElement('p');
    pOwe.innerHTML = 'Owed:'
    const oweDisplay = document.createElement('p');
    oweDisplay.innerHTML = `$${}`;
    const pPay = document.createElement('p');
    pPay.innerHTML = 'Paid:'
    const payDisplay = document.createElement('p');
    payDisplay.innerHTML = `$${money}`;
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
function getTotal(arr) {
    let total = 0;
    let totalNumPpl = entityStorage.length;
    let name = '';
    arr.forEach((entity) => {
        total += parseFloat(entity.money);
        name = entity.name;
    });

    showTotal(total);
    createNewEntity(name);
    totalPerIndividual = total / totalNumPpl;
}

function createNewEntity(name) {
    const newEntity = new Entity(name);
    newEntityStorage.push(newEntity);
}

function showTotal(total) {
    totalDisplay.innerHTML = `$${total}`;
}

function newEntity(moneyPerIndividual) {
    newEntityStorage.forEach((entity) => {
        entity.money = moneyPerIndividual;
    })
    console.log(newEntityStorage);
}

submitBtn.addEventListener('click', () => {
    newEntity(totalPerIndividual);
    calculate();
    console.log(entityStorage);
})

function calculate() {
    updateEntityStorage.length = 0;
    entityStorage.forEach((entity) => {
        const newTotal = parseFloat(entity.money) - parseFloat(totalPerIndividual);
        const newEntity = new Entity(entity.name, newTotal);
        updateEntityStorage.push(newEntity);
    })
    console.log(updateEntityStorage);
}