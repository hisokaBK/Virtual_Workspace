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

//  localStorage.setItem('zonelises',JSON.stringify({reception:[],conference:[],personnel:[],serveurs:[],securite:[],archives:[]}))
let zonelises=JSON.parse(localStorage.getItem('zonelises'));
function listZoneWorkrs(listWorkr,zone){
     listWorkr.forEach(wrk=>{
         const zone_wr =document.createElement('div');
         
          
         zone_wr.innerHTML=`<div  class="rounded-2xl p-1  pr-5 flex items-center   bg-[#48474750] hover:shadow-[0px_0px_10px_#73737350] gap-4 hover:scale-105 transition duration-300 cursor-pointer" title="${wrk.role}">
               <img src="${wrk.img}" class="h-10 " alt="">
               <p class="text-white font-thin tracking-[1px]  ">${wrk.nom}</p>
         
          </div>` ;
          zone_wrks.append(zone_wr);
         
           
           zone_wr.addEventListener('click',(elm)=>{
               switch(zone){
                    case 'personnel':
                        zonelises={...zonelises,personnel:[...zonelises.personnel,{ id:wrk.id,img:wrk.img,nom:wrk.nom,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.expworkers}]};
                        

                             
                      break ;
                    
                    case 'serveurs':
                         zonelises={...zonelises,serveurs:[...zonelises.serveurs,{ id:wrk.id,img:wrk.img,nom:wrk.nom,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.expworkers}]};
                         
                       break ;

                    case 'securite':
                         zonelises={...zonelises,securite:[...zonelises.securite,{ id:wrk.id,img:wrk.img,nom:wrk.nom,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.expworkers}]};
                         if(zonelises.securite>0){
                                document.querySelector('#securite').classList.remove('bg-[#c5303036]')
                          }else{
                                document.querySelector('#securite').classList.remove('bg-[#c5303036]')
                               
                          }
                        break ;

                    case 'conference':
                         zonelises={...zonelises,conference:[...zonelises.conference,{ id:wrk.id,img:wrk.img,nom:wrk.nom,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.expworkers}]};
                       break ;

                    case 'archives':
                         zonelises={...zonelises,archives:[...zonelises.archives,{ id:wrk.id,img:wrk.img,nom:wrk.nom,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.expworkers}]};
                          if(zonelises.archives>0){
                                document.querySelector('#archives').classList.remove('bg-[#c5303036]')
                          }else{
                                document.querySelector('#archives').classList.remove('bg-[#c5303036]')
                               
                          }
                       break ;
                         
                    case 'reception':
                         if(zonelises.reception.length>=3){
                               alert('reception zone Plein');
                               return;
                         }
                         zonelises={...zonelises,reception:[...zonelises.reception,{ id:wrk.id,img:wrk.img,nom:wrk.nom,role:wrk.role,email:wrk.email,phone:wrk.phone,experiences:wrk.expworkers}]};
                         if(zonelises.reception>0){
                                document.querySelector('#reception').classList.remove('bg-[#c5303036]')
                          }else{
                                document.querySelector('#reception').classList.remove('bg-[#c5303036]')
                          }
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


spaces.forEach(space=>{
         space.addEventListener('click',(e)=>{
               listZone.classList.remove('hidden');
               listZone.classList.add('flex');

               if(Array.from(zone_wrks.children).length>0){
                   Array.from(zone_wrks.children).forEach(elm=>elm.remove());
               }
               
               let roleZone=e.target.parentElement.parentElement.title;
  
               switch(roleZone){
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


function changeElementsZone(zone) {
    const elmZone = document.querySelectorAll(`[data-space="${zone}"]`);

    const workers = zonelises[zone];

    if(workers<=0 && zone!='personnel'&&zone!='conference'){
        document.querySelector(`#${zone}`).classList.add('bg-[#c5303036]');
        return;
    }

     if(zone!='personnel'||zone!='conference'){
          document.querySelector(`#${zone}`).classList.remove('bg-[#c5303036]'); 
     }
                
     for (let i = 0; i < workers.length; i++) {
        const elmn = document.createElement('div');
        elmn.innerHTML = `
            <div class="hover:scale-105 cursor-pointer w-[30px] overflow-hidden hover:w-[200px] transition duration-300">
                <img src="./images/pin.png" class="h-[20px] relative top-5 left-[-2px]" alt="">
                <div class="p-1 pr-3 flex items-center justify-between hover:bg-[#000000d4] hover:shadow-[0px_0px_10px_#73737350] w-[150px] rounded hover:rounded-2xl">
                    <img src="./${workers[i].img}" class="h-7" alt="">
                    <p class="text-white font-thin tracking-[1px]">${workers[i].nom}</p>
                    <button class="text-white font-[200] text-lg mt-[-4px] self-start hover:text-red-500">x</button>
                </div>
            </div>
        `;
     elmZone[i].replaceWith(elmn);
    
}
}


changeElementsZone('securite');
changeElementsZone('serveurs');
changeElementsZone('personnel');
changeElementsZone('conference');
changeElementsZone('reception');
changeElementsZone('archives');



