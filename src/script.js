// Global Variables
const addBtnDialog = document.getElementById('add-btn-dialog');
const dialog = document.getElementById('dialog');
const nameInput = document.getElementById('name-input');
const moneyInput = document.getElementsByName('money-input');
const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');
const outputContainer = document.getElementById('output-container');

//Function to show dialog
addBtnDialog.addEventListener('click', () => {
    dialog.showModal();
})

//Function to close dialog
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
})