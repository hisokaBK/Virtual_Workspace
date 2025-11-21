//localStorage for all list worker
// localStorage.setItem('listWrks','[]');

const list_wrks=document.querySelector('#list_wrks');

let listWrks =JSON.parse(localStorage.getItem('listWrks'));
listWrks.forEach(Worker=>{
                  const newWorker=document.createElement('div');
                  newWorker.innerHTML=`<div class="rounded-2xl p-1  pr-5 flex items-center justify-between  bg-[#48474750] hover:shadow-[0px_0px_10px_#73737350] hover:scale-105 transition duration-300 cursor-pointer" title="${Worker.role}">
                               <img src="${Worker.img}" class="h-10 " alt="">
                               <p class="text-white font-thin tracking-[1px] ml-[-60px] ">${Worker.nom}</p>
                               <button data-id="${Worker.id}" class="remove_worker text-white font-[200] text-2xl self-start hover:text-red-500">x</button>
                          </div>`
                  
                  list_wrks.append(newWorker);
            })

  let expworkers=[];
  const form_experiences=document.querySelector(".exprX");

let nomberExp=0;

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

let valeusForm={
     id:0,
     img:'',
     nom:'',
     role:'',
     email:'',
     phone:'',
     experiences:expworkers
};

function removeExp(e){
                   e.parentNode.parentNode.remove();
                   nomberExp--;
            }

const btnAddWrk =document.querySelector('#btnAddWrk');
const formWrk=document.querySelector('#addEmployeeModal');

btnAddWrk.addEventListener('click',()=>{
            formWrk.classList.remove('hidden');
            formWrk.classList.add('flex');
          //   valeusForm={
          //         id:0,
          //         img:'',
          //         nom:'',
          //         role:'',
          //         email:'',
          //         phone:'',
          //         experiences:[]
          //    };

})

const close_form =document.querySelector('#close_form');
close_form.addEventListener('click',()=>{
            formWrk.classList.remove('flex');
            formWrk.classList.add('hidden');
})

//add worker form
document.querySelector('#employeeForm').addEventListener('submit',(e)=>{
              e.preventDefault(); 
              if(listWrks.length>0){
                      valeusForm.id=listWrks[listWrks.length-1].id+1;
              }else{
                   valeusForm.id=0;
              }
              

              const title=document.querySelectorAll('.exp_title');
              const exp_start=document.querySelectorAll('.exp_start');
              const exp_end=document.querySelectorAll('.exp_end');
              const description=document.querySelectorAll('.description');
              
              if(nomberExp!=0){
                   for(let i=0;i<nomberExp;i++){
                   expworkers=[...expworkers,{exp_title:title[i].value,exp_start:exp_start[i].value,exp_end:exp_end[i].value,description:description[i].value}];
                
                 }
              }
             
             if(document.querySelector('#photo').value==''){
                  valeusForm.img='./images/def.png';
             }else{
                  valeusForm.img=document.querySelector('#photo').value;
             }

            valeusForm.nom=document.querySelector('#name').value.trim();
             
            let checkNameExst=listWrks.find((elm)=>elm.nom==valeusForm.nom) 
            if(checkNameExst){
                    alert ('worker already exists');
                    return ;
            }

            valeusForm.role=document.querySelector('#role').value;
            valeusForm.email=document.querySelector('#email').value;
            valeusForm.phone=document.querySelector('#phone').value;
            valeusForm.experiences=expworkers;

            let dataSorage=JSON.parse(localStorage.getItem('listWrks'));
            dataSorage=[...dataSorage,valeusForm]
            localStorage.setItem('listWrks',JSON.stringify(dataSorage));

            if (Array.from(list_wrks.children).length != 0) {
                     Array.from(list_wrks.children).forEach(worker => {
                      worker.remove();
                  });
                }
                
             
            formWrk.classList.remove('flex');
            formWrk.classList.add('hidden');  
            nomberExp=0;  
             
            document.querySelector('#name').value ='';
            document.querySelector('#role').value ='';
            document.querySelector('#email').value='';
            document.querySelector('#phone').value='';
            document.querySelector('#photo').value='';
            Array.from(form_experiences.children).forEach(elm=>{elm.remove()});
            window.location.reload();

})

//remove worker 
const btnRmWorker =document.querySelectorAll('.remove_worker');
console.log(btnRmWorker)
btnRmWorker.forEach(btn=>{
          btn.addEventListener('click',(e)=>{
                listWrks=listWrks.filter((elm)=>elm.id!=e.target.dataset.id);
                localStorage.setItem('listWrks',JSON.stringify(listWrks))
                window.location.reload();
         })
})

//add worker to zone work 
const listZone =document.querySelector('#listZone');
const zone_wrks=document.querySelector('#zone_wrks');
const spaces =document.querySelectorAll('.space');
let workersZone ;
spaces.forEach(space=>{
         space.addEventListener('click',(e)=>{
               listZone.classList.remove('hidden');
               listZone.classList.add('flex');
               
               
               let roleZone=e.target.parentNode.parentNode.title;
               switch(roleZone){
                     case 'personnel':
                         listWrks.forEach(wrk=>{const zone_wr =document.createElement('div');
                         zone_wr.innerHTML=`<div class="rounded-2xl p-1  pr-5 flex items-center justify-between  bg-[#48474750] hover:shadow-[0px_0px_10px_#73737350] hover:scale-105 transition duration-300 cursor-pointer" title="${wrk.role}">
                               <img src="${wrk.img}" class="h-10 " alt="">
                               <p class="text-white font-thin tracking-[1px] ml-[-60px] ">${wrk.nom}</p>
                               <button data-id="${wrk.id}" class="remove_worker text-white font-[200] text-2xl self-start hover:text-red-500">x</button>
                          </div>` ;

                          zone_wrks.append(workersZone);

                         })
                         break;
                             
                     case '':
                          workersZone=listWrks.filter(wrk=>wrk.role==roleZone)
                         workersZone.forEach(wrk=>{const zone_wr =document.createElement('div');
                         zone_wr.innerHTML=`<div class="rounded-2xl p-1  pr-5 flex items-center justify-between  bg-[#48474750] hover:shadow-[0px_0px_10px_#73737350] hover:scale-105 transition duration-300 cursor-pointer" title="${wrk.role}">
                               <img src="${wrk.img}" class="h-10 " alt="">
                               <p class="text-white font-thin tracking-[1px] ml-[-60px] ">${wrk.nom}</p>
                               <button data-id="${wrk.id}" class="remove_worker text-white font-[200] text-2xl self-start hover:text-red-500">x</button>
                          </div>` ;

                          zone_wrks.append(workersZone);

                         })
                         break;

               }
         })
})
// const newWorker=document.createElement('div');
//                   newWorker.innerHTML=`<div class="rounded-2xl p-1  pr-5 flex items-center justify-between  bg-[#48474750] hover:shadow-[0px_0px_10px_#73737350] hover:scale-105 transition duration-300 cursor-pointer" title="${Worker.role}">
//                                <img src="${Worker.img}" class="h-10 " alt="">
//                                <p class="text-white font-thin tracking-[1px] ml-[-60px] ">${Worker.nom}</p>
//                                <button data-id="${Worker.id}" class="remove_worker text-white font-[200] text-2xl self-start hover:text-red-500">x</button>
//                           </div>`
                  
//                   


document.querySelector('#rmListZone').addEventListener('click',()=>{
            listZone.classList.remove('flex');
            listZone.classList.add('hidden');
})

