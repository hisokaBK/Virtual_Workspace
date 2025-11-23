// localStorage.setItem('listWrks','[]');
// localStorage.setItem('zonelises',JSON.stringify({reception:[],conference:[],personnel:[],serveurs:[],securite:[],archives:[]}))
// localStorage.setItem('id',0);


const list_wrks=document.querySelector('#list_wrks');
let listWrks =JSON.parse(localStorage.getItem('listWrks'));

const workerDetails=document.querySelector('#workerDetails');
// console.log(listWrks);
listWrks.forEach(Worker=>{
     //add new workwt list side bar--------------------
                  const newWorker=document.createElement('div');
                  newWorker.innerHTML=`<div data-zone='' data-check='${Worker.id}'  class="dtails rounded-2xl p-1  pr-5 flex items-center justify-between  bg-[#48474750] hover:shadow-[0px_0px_10px_#73737350] hover:scale-105 transition duration-300 cursor-pointer" title="${Worker.role}">
                               <img src="${Worker.img}" class="h-9 rounded-full" alt="">
                               <p class="text-white font-thin tracking-[1px] ml-[-50px] ">${Worker.nom}</p>
                               <button data-id="${Worker.id}" class="remove_worker text-white font-[200] text-2xl self-start hover:text-red-500">x</button>
                          </div>`
                  
                  list_wrks.append(newWorker);
               
        })


        

//add experiences user-------------------------------
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
                    <input type="text" required placeholder="company" class="exp_title bg-[#38363610] hover:border-white focus:border-white border-gray-500 border outline-none rounded w-[80%] h-10 pl-4 ml-10">
                    <div class="experience-item">
                       <div class="justify-self-center my-3 flex flex-col items-center gap-4">
                         <div>
                              <label for="exp_start">start :</label> 
                              <input id="exp_start" required type="date" class="exp_start text-black rounded px-2" >
                         </div>
                          <div>
                              <label for="exp-end">end : </label>
                              <input type="date" onchange='check(this)' required class="exp_end text-black rounded px-2" >
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
     location:'',
     role:'',
     email:'',
     phone:'',
     experiences:expworkers
};

function removeExp(e){
                   e.parentNode.parentNode.remove();
                   nomberExp--;
            }


//add worker form-----------------------------
const btnAddWrk =document.querySelector('#btnAddWrk');
const formWrk=document.querySelector('#addEmployeeModal');

btnAddWrk.addEventListener('click',()=>{
            formWrk.classList.remove('hidden');
            formWrk.classList.add('flex');
})

const close_form =document.querySelector('#close_form');
close_form.addEventListener('click',()=>{
            formWrk.classList.remove('flex');
            formWrk.classList.add('hidden');
})


let id=localStorage.getItem('id');
document.querySelector('#employeeForm').addEventListener('submit',(e)=>{
              e.preventDefault(); 
              if(listWrks.length>0){
                      valeusForm.id=++id;
                      localStorage.setItem('id',id);
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

            
            valeusForm.location=document.querySelector('#location').value.trim();
             if (valeusForm.location.length < 3) {
                 document.querySelector('#text_pop').textContent="La localisation doit contenir au moins 3 lettres";
                  showPop()
                 return;
             }

            valeusForm.nom=document.querySelector('#name').value.trim();
             if (valeusForm.nom.length < 3) {
                
                document.querySelector('#text_pop').textContent="Le nom doit contenir au moins 3 caractères";
                showPop()
                return;
            } 
            let checkNameExst=listWrks.find((elm)=>elm.nom==valeusForm.nom)
            if(checkNameExst){
                    document.querySelector('#text_pop').textContent="worker already exists";
                    showPop()
                    return ;
            }

            valeusForm.role=document.querySelector('#role').value;
            valeusForm.email=document.querySelector('#email').value.trim();
            let emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(valeusForm.email)) {
                document.querySelector('#text_pop').textContent="Email invalide (ex: name@gmail.com)";
                showPop()
                return;
            }

            valeusForm.phone=document.querySelector('#phone').value.trim();
            let phoneRegex = /^0[5-7]\d{8}$/;
            if (!phoneRegex.test(valeusForm.phone)) {
                document.querySelector('#text_pop').textContent="Numéro de téléphone invalide. Il doit commencer par 06/07/05 et contenir 10 chiffres.";
                       showPop()
                return;
            }

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
            document.querySelector('#location').value ='';
            document.querySelector('#role').value ='';
            document.querySelector('#email').value='';
            document.querySelector('#phone').value='';
            document.querySelector('#photo').value='';
            Array.from(form_experiences.children).forEach(elm=>{elm.remove()});
            window.location.reload();

})

//remove worker------------------------------
const btnRmWorker =document.querySelectorAll('.remove_worker');
btnRmWorker.forEach(btn=>{
          btn.addEventListener('click',(e)=>{
                e.stopPropagation();
                listWrks=listWrks.filter((elm)=>elm.id!=e.target.dataset.id);
                localStorage.setItem('listWrks',JSON.stringify(listWrks))
                window.location.reload();
         })
})

//add worker to zone work--------------------------
const listZone =document.querySelector('#listZone');
const zone_wrks=document.querySelector('#zone_wrks');
const spaces =document.querySelectorAll('.space');
let workersZone ;

let zonelises=JSON.parse(localStorage.getItem('zonelises'));

spaces.forEach(space=>{
         space.addEventListener('click',(e)=>{
               listZone.classList.remove('hidden');
               listZone.classList.add('flex');
               
               let titleZone=e.target.parentElement.parentElement.title;
  
               switch(titleZone){
                    case 'personnel':
                        listZoneWorkrs(listWrks,'personnel');

                      break ;
                    
                    case 'serveurs':
                         workersZone=listWrks.filter(elm=>elm.role=='it'||elm.role=='Nettoyage');
                         listZoneWorkrs(workersZone,'serveurs');

                      break ;

                      case 'securite':
                         workersZone=listWrks.filter(elm=>elm.role=='securite'||elm.role=='Nettoyage');
                         listZoneWorkrs(workersZone,'securite');
                         break ;

                      case 'conference':
                             listZoneWorkrs(listWrks,'conference');    
                         break ;

                      case 'archives':
                         workersZone=listWrks.filter(elm=>elm.role!='Nettoyage');
                         listZoneWorkrs(workersZone,'archives');
                         break ;
                         
                      case 'reception':
                         workersZone=listWrks.filter(elm=>elm.role=='reception'||elm.role=='Nettoyage');
                         listZoneWorkrs(workersZone,'reception');
                         break ;
 
                    default :
                        return ;
                    }
         })
})

document.querySelector('#rmListZone').addEventListener('click',()=>{
            listZone.classList.remove('flex');
            listZone.classList.add('hidden');
})

//list zone workeer -----------------------------------------
function listZoneWorkrs(listWorkr,zone){

      if(Array.from(zone_wrks.children).length>0){
                   Array.from(zone_wrks.children).forEach(elm=>elm.remove());
               }

     listWorkr.forEach(wrk=>{
         const zone_wr =document.createElement('div');
         
         zone_wr.innerHTML=`<div  class="rounded-2xl p-1  pr-5 flex items-center bg-[#48474750] hover:shadow-[0px_0px_10px_#73737350] gap-4 hover:scale-105 transition duration-300 cursor-pointer" title="${wrk.role}">
               <img src="${wrk.img}" class="h-9 rounded-full" alt="">
               <p class="text-white font-thin tracking-[1px]">${wrk.nom}</p>
         
          </div>` ;
          zone_wrks.append(zone_wr);
         
           
           zone_wr.addEventListener('click',()=>{
               switch(zone){
                    case 'personnel':
                        zonelises={...zonelises,personnel:[...zonelises.personnel,{ id:wrk.id,img:wrk.img,nom:wrk.nom,location:wrk.location,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.experiences}]};
                      break ;
                    
                    case 'serveurs':
                         zonelises={...zonelises,serveurs:[...zonelises.serveurs,{ id:wrk.id,img:wrk.img,nom:wrk.nom,location:wrk.location,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.experiences}]};
                         
                       break ;

                    case 'securite':
                         zonelises={...zonelises,securite:[...zonelises.securite,{ id:wrk.id,img:wrk.img,nom:wrk.nom,location:wrk.location,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.experiences}]};
                        
                        break ;

                    case 'conference':
                         zonelises={...zonelises,conference:[...zonelises.conference,{ id:wrk.id,img:wrk.img,nom:wrk.nom,location:wrk.location,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.experiences}]};
                       break ;

                    case 'archives':
                         zonelises={...zonelises,archives:[...zonelises.archives,{ id:wrk.id,img:wrk.img,nom:wrk.nom,location:wrk.location,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.experiences}]};
                         
                       break ;
                         
                    case 'reception':
                         
                         zonelises={...zonelises,reception:[...zonelises.reception,{ id:wrk.id,img:wrk.img,nom:wrk.nom,location:wrk.location,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.expworkers}]};
                        
                      break ;
   
                    default :
                        return ;
            }
                localStorage.setItem('zonelises',JSON.stringify(zonelises));
               listWrks=listWrks.filter(worker=>worker.id!=wrk.id);
               localStorage.setItem('listWrks',JSON.stringify(listWrks));
               window.location.reload();
                 
           })
     })
 }

//place workers to zone work------------------------------------
function changeElementsZone(zone) {
    const elmZone = document.querySelectorAll(`[data-space="${zone}"]`);

    const workers = zonelises[zone];

    if(workers.length<=0 && zone!='personnel'&&zone!='conference'){
        document.querySelector(`#${zone}`).classList.add('bg-[#c5303036]');
        return;
    }

     if(zone!='personnel'||zone!='conference'){
          document.querySelector(`#${zone}`).classList.remove('bg-[#c5303036]'); 
     }
                
     for (let i = 0; i < workers.length; i++) {
        const elmn = document.createElement('div');
        elmn.innerHTML = `
            <div data-zone="${zone}" data-check='${workers[i].id}' class="dtails hover:scale-105 cursor-pointer w-[48px] overflow-hidden md:hover:w-[150px] transition duration-300">
                <img src="./images/pin.png" class="h-[20px] relative top-5 left-[0px] rounded-full p-0 " alt="">
                <div class="p-1 pr-3 flex items-center justify-between md:hover:bg-[#000000d4] hover:shadow-[0px_0px_10px_#73737350] w-[150px] rounded hover:rounded-2xl "  >
                    <img src="./${workers[i].img}" class="h-9 rounded-full shadow-[0px_0px_7px_black]" alt="">
                    <p class="text-white pl-3 hid min-h-11 font-thin tracking-[1px]">${workers[i].nom}</p>
                    <button data-zonx="${zone}" class="RmFZone text-white font-[200] text-lg mt-[-4px] self-start hover:text-red-500 relative ">x</button>
                </div>
            </div>
        `;
     elmZone[i].replaceWith(elmn);

     const RmFZone=document.querySelectorAll('.RmFZone');
    
     RmFZone.forEach(elm=>{
           elm.addEventListener('click',()=>{
              
              if(zone==elm.dataset.zonx){
                    
                    listWrks=[...listWrks,zonelises[zone].find(e=>e.id==workers[i].id)];
                    localStorage.setItem('listWrks',JSON.stringify(listWrks));
                    zonelises[zone]=zonelises[zone].filter(e=>e.id!=workers[i].id);
                    
                     localStorage.setItem('zonelises',JSON.stringify(zonelises))
                     zone='';
                     window.location.reload();
              }

           })
     })
      
}

}

changeElementsZone('securite');
changeElementsZone('serveurs');
changeElementsZone('personnel');
changeElementsZone('conference');
changeElementsZone('reception');
changeElementsZone('archives');


//dtails part--------------------------------------------------

    const dtails=document.querySelectorAll('.dtails');
       function getDatals(zone,idWorker){
          let Worker ;
            switch(zone){
              case 'personnel':
                  Worker=zonelises['personnel'].find(worker=>worker.id==idWorker);
               break ;

              case 'serveurs':
                   Worker=zonelises['serveurs'].find(worker=>worker.id==idWorker);
               break ;

              case 'securite':
                    Worker=zonelises['securite'].find(worker=>worker.id==idWorker);
               break ;

              case 'conference':
                    Worker=zonelises['conference'].find(worker=>worker.id==idWorker);
               break ;

              case 'archives':
                    Worker=zonelises['archives'].find(worker=>worker.id==idWorker);
               break ;
              case 'reception':
                   Worker=zonelises['reception'].find(worker=>worker.id==idWorker);
                break ;
   
                default :
                    Worker=listWrks.find(worker=>worker.id==idWorker);
            }
  console.log(Worker);
  workerDetails.classList.add('flex');
  workerDetails.classList.remove('hidden');
  if(workerDetails.firstElementChild){
      workerDetails.firstElementChild.remove();
  }
                                     
  const newDatails=document.createElement('div');
  newDatails.innerHTML=`
       <div class="bg-black text-white min-w-[350px] max-w-[100%] md:w-[550px] rounded-xl shadow-xl p-6 relative">

                 <button id='closeDetailsBtn' class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl">
                                    x
                  </button>
                                          
                  <div class="flex justify-center mb-4">
                      <img  src="./${Worker.img}" class="w-32 h-32 rounded-full object-cover border-4 border-gray-500 shadow-md" alt="Employee Photo">
                  </div>
                                          
                  <h2  class="text-2xl font-bold text-center mb-1">${Worker.nom}</h2>
                  <p  class="text-center text-blue-600 font-medium mb-4">
                     ${Worker.role}
                  </p>
                                          
                  <div class="space-y-2 mb-6">
                    <p class="flex items-center gap-2">
                      <span class="font-bold text-gray-600">Email:</span>
                      <span id="detailsEmail" class="text-gray-300">${Worker.email}</span>
                    </p>
                                          
                  <p class="flex items-center gap-2">
                    <span class="font-bold text-gray-600">Phone:</span>
                    <span id="detailsPhone" class="text-gray-300">${Worker.phone}</span>
                  </p>
                                          
                  <p class="flex items-center gap-2">
                    <span class="font-bold text-gray-600">Location:</span>
                    <span id="detailsLocation" class="text-gray-300">${Worker.location}</span>
                  </p>
                </div>
                                          
                <h3 class="text-xl text-center font-semibold text-gray-300 mb-2">Work Experiences</h3>
                <div  class="space-y-3 max-h-40 overflow-y-auto pr-2">
                ${Worker.experiences?Worker.experiences.length>0?Worker.experiences.map(exp=>`
                 <div class="bg-[#ffffffb9] p-3 rounded-lg shadow-sm border ">
                     <p class="font-bold text-lg text-gray-900">${exp.exp_title}</p>
                     
                     <p class="text-sm text-gray-600 mt-1">${exp.exp_start} | ${exp.exp_end}</p>
                     <p class="text-sm text-gray-600">${exp.description}</p>
                 </div>
             `):`<p>no experiences !?</p>`:'<p>no experiences !?</p>'}
        </div>
  </div> `
       workerDetails.appendChild(newDatails);

   const btnRmDtails=document.querySelector('#closeDetailsBtn');
   btnRmDtails.addEventListener('click',()=>{
             workerDetails.classList.add('hidden');
             workerDetails.classList.remove('flex');
   })
                }

  dtails.forEach(elm=>{
            elm.addEventListener('click',()=>{
            getDatals(elm.dataset.zone,elm.dataset.check);
                  })
     })


//rspon mbl--------------

const div_aside =document.querySelector('.div_aside');
const rm_mobil_list=document.querySelector('.rm_mobil_list');
rm_mobil_list.addEventListener('click',()=>{
       div_aside.classList.add('hidden')
       div_aside.classList.remove('flex')
})

const show_mobil_list =document.querySelector('.show_mobil_list');
show_mobil_list.addEventListener('click',()=>{
      div_aside.classList.add('flex')
       div_aside.classList.remove('hidden')

})


//chech date ----------------------------------------
function check(e){
             const date_start =new Date(e.parentElement.previousElementSibling.lastElementChild.value);
             const date_end =new Date(e.value)
             if(date_end - date_start < 0){
                       e.value='';
                       e.classList.add('text-red-700');
                       e.parentElement.previousElementSibling.lastElementChild.classList.add('text-red-700');

                       document.querySelector('#text_pop').textContent="date experience , check it";
                       showPop()
             }else{
                       e.classList.remove('text-red-700');
                       e.parentElement.previousElementSibling.lastElementChild.classList.remove('text-red-700');
             }
    }

//erooors popap----------------

function showPop(){
         document.querySelector('#pop').classList.remove('hidden');
         document.querySelector('#pop').classList.remove('translate-x-96');
         
        

}

document.querySelector('#remPop').addEventListener('click',()=>{
         document.querySelector('#pop').classList.add('hidden');
})