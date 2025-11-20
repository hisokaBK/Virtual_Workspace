//localStorage for all list worker
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
let valeusForm={
     img:'',
     nom:'',
     role:'',
     email:'',
     phone:'',
     experiences:''

};
//image
const photoWorker=document.querySelector('#photo');
photoWorker.addEventListener('change',(e)=>{
          valeusForm.img=e.target.value;
})

//name
const nameWorker=document.querySelector('#name');
nameWorker.addEventListener('change',(e)=>{
          valeusForm.nom=e.target.value;
})

//role
const roleWorker=document.querySelector('#role');
roleWorker.addEventListener('change',(e)=>{
          valeusForm.role=e.target.value;
})

//email
const emailWorker=document.querySelector('#email');
emailWorker.addEventListener('change',(e)=>{
          valeusForm.email=e.target.value;
})

//phone
const phoneWorker=document.querySelector('#phone');
phoneWorker.addEventListener('change',(e)=>{
          valeusForm.phone=e.target.value;
})

//expers===================><++++++++++
const experiencesWorker=document.querySelector('#experiences');
experiencesWorker.addEventListener('change',(e)=>{
          valeusForm.experiences=e.target.value;
})



//add new Worker 
document.querySelector('#employeeForm').addEventListener('submit',(e)=>{
            e.preventDefault(); 
             
            formWrk.classList.remove('flex');
            formWrk.classList.add('hidden');
            
})

