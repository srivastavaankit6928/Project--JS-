'use strict'

//?--------------------------------------------------------------------FIELDS------------------------------------------------------------------>
const listItem = document.getElementById("list");
const inputData = document.getElementById("input-text");
const addBtn = document.querySelector('.click-btn');
const reqDiv = document.querySelector('.show-task');
const listContainer = document.querySelector('.dynamicUL');

//!Edit-Modal
const editModal = document.querySelector('.edit-modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.edit-btn');
const editInputModal = document.getElementById('edit-text');
const saveBtnModal =document.querySelector('.save-btn');

//!Alert-Modal
const alertModal = document.querySelector('.alert-modal');
const closeAlertModal = document.querySelector('.close-Alertmodal');


//?--------------------------------------------------------------------FUNCTIONS------------------------------------------------------------------>
//!Creating Elements Dynamically
function createElement(value){
    //Div 
    const newDiv = document.createElement('div');
    newDiv.className = 'dynamicDiv';
    const listDiv = document.createElement('div');
    listDiv.className = 'list-div';
    const btnDiv = document.createElement('div');
    btnDiv.className = 'btn-div';
    const newList = document.createElement('ul');
    newList.className = 'dynamicUL';
    const listItem = document.createElement('li');
    listItem.className = 'dynamicList';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'dlt-btn';
    deleteBtn.innerText = 'Delete';
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerText = 'Edit';
    listItem.textContent = value;

    //appending
    newList.appendChild(listItem);
    listDiv.appendChild(newList);
    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);
    newDiv.appendChild(listDiv);
    newDiv.appendChild(btnDiv);
    reqDiv.appendChild(newDiv);
}

//!Adding List items
function addListFunc(){
    if(inputData.value === ''){
        openAlertModal();
        disableFunc();
    }else{
        createElement(inputData.value);
    }
    inputData.value = '';
    // enableScroll();
    saveData();
}

//!Modal Functions
const openModal = function(){
    overlay.classList.remove('hidden');
    editModal.classList.remove('hidden');
} 

function closeModal (){
    editModal.classList.add('hidden');
    overlay.classList.add('hidden');
    enableScroll();
} 

const openAlertModal = function(){
    overlay.classList.remove('hidden');
    alertModal.classList.remove('hidden');

}

const closeAlertFunc = function(){
    overlay.classList.add('hidden');
    alertModal.classList.add('hidden');
}

//!Scrolling Functions
function scroolToTop(){
    window.scrollTo({top:0, behaviour:'smooth'});
}

function disableScroll() {
    document.body.style.overflow = "hidden";
}

function enableScroll() {
    document.body.style.overflow= "auto";
}

function disableFunc(){
    scroolToTop();
    disableScroll();
}

//!Functions For Localstorage
function saveData() {
    const listItems = [];
    document.querySelectorAll('.dynamicList').forEach(item => {
        listItems.push(item.textContent);
    });
    localStorage.setItem('listItems', JSON.stringify(listItems));
}

function loadData() {
    const savedItems = localStorage.getItem('listItems');
    if (savedItems) {
        const listItems = JSON.parse(savedItems);
        listItems.forEach(item => {
            createElement(item);
        });
    }
}


//?--------------------------------------------------------------------Events------------------------------------------------------------------>

//!Handling Addition of list 
addBtn.addEventListener('click',addListFunc);
document.addEventListener('keydown',function(events){
    if(events.key === 'Enter' && editModal.classList.contains('hidden')){
        addListFunc(); 
    }
});

//!Handling list Events
document.addEventListener('click',function(e){
    if(e.target.classList.contains('dynamicList')){
        e.target.classList.toggle('checked');
        saveData();
    }
    
    else if(e.target.classList.contains('dlt-btn')){
        e.target.parentElement.parentElement.remove();
        inputData.value = '';
        saveData();
    }

    else if (e.target.classList.contains('edit-btn')) {
        let siteTarget = e.target.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild;
        openModal();
        scroolToTop();
        disableScroll();
        editInputModal.value = siteTarget.innerText;
        
        function saveChanges() {
            if (editInputModal.value === '') {
            closeModal();
            alert('Put Item First!🤦‍♂️');
            } else {
            siteTarget.textContent = editInputModal.value;
            editInputModal.value = '';
            inputData.value = '';
            closeModal();
            saveData();
            }
            saveBtnModal.removeEventListener('click', saveChanges);
            enableScroll();
        } 
        saveBtnModal.addEventListener('click', saveChanges);
    }
});


closeAlertModal.addEventListener('click',closeAlertFunc);

btnCloseModal.addEventListener('click',closeModal);

overlay.addEventListener('click',function(){
    closeAlertFunc();
    closeModal();
});

loadData();







