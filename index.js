//localStorage for all list worker
localStorage.setItem('listWrks','[]');
let listWrks =JSON.parse(localStorage.getItem('listWrks'));

//get experiences worker
  let expworkers=[];
  const form_experiences=document.querySelector(".exprX");

let nomberExp=0;
//add new experience
const addExperienceBtn =document.querySelector('#addExperienceBtn');
addExperienceBtn.addEventListener('click',()=>{
          nomberExp++;
           
          const newExp =document.createElement('div');
          newExp.innerHTML=`<div id="new_exprs" class="border border-gray-500 rounded-2xl pb-4">
               <div class="text-end px-4 pb-2 ">
                   <span onclick="removeExp(this)" class="close-btn text-gray-300 font-[200] text-[25px] self-start hover:text-white cursor-pointer  px-1 " id="close_form">x</span>
               </div>
                 <div class="exprX flex flex-col gap-3 pb-2">
                    <input type="text" class="exp_title bg-[#38363610] hover:border-white focus:border-white border-gray-500 border outline-none rounded w-[80%] h-10 pl-4 ml-10">
                    <div class="experience-item">
                       <div class="justify-self-center my-3 flex flex-col items-center gap-4">
                         <div>
                              <label for="exp_start">start :</label> 
                              <input id="exp_start" type="date" class="exp_start text-black rounded px-2" >
                         </div>
                          <div>
                              <label for="exp-end">end : </label>
                              <input type="date" class="exp_end text-black rounded px-2" >
                          </div>
                       </div>
                    </div>

                    <textarea id="description"  placeholder="description" class="description bg-[#38363610] hover:border-white focus:border-white border-gray-500 border outline-none rounded w-[80%] min-h-[60px] max-h-[60px] pl-4 ml-10 "></textarea>
                </div>
            </div>`;

            form_experiences.appendChild(newExp);
})

//get valeus form form inputs
let valeusForm={
     img:'',
     nom:'',
     role:'',
     email:'',
     phone:'',
     experiences:expworkers
};

//remove experience x
function removeExp(e){
                   e.parentNode.parentNode.remove();
            }


//affecher form
const btnAddWrk =document.querySelector('#btnAddWrk');
const formWrk=document.querySelector('#addEmployeeModal');

btnAddWrk.addEventListener('click',()=>{
            formWrk.classList.remove('hidden');
            formWrk.classList.add('flex');
            valeusForm={
                  img:'',
                  nom:'',
                  role:'',
                  email:'',
                  phone:'',
                  experiences:[]
             };
            Array.from(form_experiences.children).forEach(elm=>{elm.remove()});

})

//hidden form
const close_form =document.querySelector('#close_form');
close_form.addEventListener('click',()=>{
            formWrk.classList.remove('flex');
            formWrk.classList.add('hidden');
})


//add new Worker 
document.querySelector('#employeeForm').addEventListener('submit',(e)=>{
            e.preventDefault(); 

            //expers
              const title=document.querySelectorAll('.exp_title');
              const exp_start=document.querySelectorAll('.exp_start');
              const exp_end=document.querySelectorAll('.exp_end');
              const description=document.querySelectorAll('.description');

             for(let i=0;i<nomberExp;i++){
                expworkers=[...expworkers,{exp_title:title[i].value,exp_start:exp_start[i].value,exp_end:exp_end[i].value,description:description[i].value}];
                
             }
          
            valeusForm.img=document.querySelector('#photo').value;
            valeusForm.nom=document.querySelector('#name').value;
            valeusForm.role=document.querySelector('#role').value;
            valeusForm.email=document.querySelector('#email').value;
            valeusForm.phone=document.querySelector('#phone').value;
            valeusForm.experiences=expworkers;
            
            console.log(valeusForm);
            formWrk.classList.remove('flex');
            formWrk.classList.add('hidden');
            
})

