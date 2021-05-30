// first lets select elements
const dateElement = document.getElementById("date");
const input= document.getElementById("input");
const list= document.getElementById("list");
const clear= document.querySelector(".clear");

// set the date
const options = { weekday: 'long', month: 'long', day: 'numeric' };
//const options = {weekday: "long", month: "short", day: "numeric"};
const today= new Date();
dateElement.innerHTML= today.toLocaleDateString("en-US", options);
// create class variables
const CHECK= "fa-check-circle";
const UNCHECK= "fa-circle-thin";
const linethrough= "lineThrough";
// create LIST id to store values
let LIST , id;
// create local storage
//localStorage.setItem("TODO", JSON.stringify(LIST));
let data= localStorage.getItem("TODO");

if(data){
    LIST= JSON.parse(data); 
    id=LIST.length;
    loadList(LIST);  // load the list to the user interface
}
else{
    LIST=[]; id=0;
}
// load item to user interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
function addToDo(toDo, id, done, trash){
    if(trash){
        return;
    }
    const DONE= done ? CHECK: UNCHECK;
    const LINE= done ? linethrough: "";
    const item= `<li class="item">
       <i class="fa ${DONE} co" job="complete" id=${id}></i>
       <p class="text ${LINE}">${toDo}</p>
       <i class="fa fa-trash-o de" job="delete" id=${id}></i>
       </li>
    `;
    let position="beforeend";
    list.insertAdjacentHTML(position, item);
}
document.addEventListener("keyup", function(event){
    if(event.keyCode==13){
        let toDo= input.value;
        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id:id,
                done:false,
                trash:false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value="";
    }
});

// when task will be completed

function completeToDo(element){     // element is checkbox here
     element.classList.toggle(CHECK);
     element.classList.toggle(UNCHECK);
     element.parentNode.querySelector(".text").classList.toggle(linethrough);
     // change value of done key in js list
     LIST[element.id].done= LIST[element.id].done ? false: true;
}

function removeToDo(element){       // element is trash button here
     element.parentNode.parentNode.removeChild(element.parentNode);
     LIST[element.id].trash=true;
}
// add event listener to checkbox & trash button

list.addEventListener("click", function(event){
    let element= event.target; //return the clicked element of list
    let elementJob= element.attributes.job.value;

    if(elementJob=="complete"){
        completeToDo(element);
    }
    else if(elementJob=="delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
// clear the local storage on refresh button
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});