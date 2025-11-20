localStorage.setItem('listWrks','[]');
let listWrks =JSON.parse(localStorage.getItem('listWrks'));


//affecher form
const btnAddWrk =document.querySelector('#btnAddWrk');
const formWrk=document.querySelector('#addEmployeeModal');

btnAddWrk.addEventListener('click',()=>{
            formWrk.classList.remove('hidden');
            formWrk.classList.add('flex');
})

//hidden form
const close_form =document.querySelector('#close_form');
close_form.addEventListener('click',()=>{
            formWrk.classList.remove('flex');
            formWrk.classList.add('hidden');
})

//get valeus form 
let imgURL;

//add new Worker 
document.querySelector('#employeeForm').addEventListener((e)=>{
            e.preventDefault(); 
            
})

