// Global Variables
const addBtnDialog = document.getElementById('add-btn-dialog');
const dialog = document.getElementById('dialog');
const nameInput = document.getElementById('name-input');
const moneyInput = document.getElementsByName('money-input');
const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');
const outputContainer = document.getElementById('output-container');

//An array to store entity's objects
const entityStorage = [];

//Constructor of the entity
function Entity(name, money) {
    this.name = name;
    this.money = money;
}

//Function to show dialog
addBtnDialog.addEventListener('click', () => {
    dialog.showModal();
})

//Function to close dialog
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
})

//Output the layout structure
function outputLayout() {
    //Box container the output
    const box = document.createElement('div');
    box.className = 'flex justify-between items-center px-5 rounded-lg shadow-md p-2';

    //Name container
    const nameContainer = document.createElement('div');
    //p tag inside name container
    const pName = document.createElement('p');
    pName.innerHTML = 'Ton';
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
    pPayOwe.innerHTML = 'Pay/Owe:'
    const moneyDisplay = document.createElement('p');
    moneyDisplay.innerHTML = '$69.69'
    //money container append 2 p tags
    moneyContainer.appendChild(pPayOwe);
    moneyContainer.appendChild(moneyDisplay);

    //outputContainer will append box to make it show up on the website
    box.appendChild(nameContainer);
    box.appendChild(divider);
    box.appendChild(moneyContainer);
    outputContainer.appendChild(box);
}
outputLayout();
outputLayout();