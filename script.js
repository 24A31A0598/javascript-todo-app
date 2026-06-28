const input =
document.getElementById("taskInput");

const addBtn =
document.getElementById("addBtn");

const taskList =
document.getElementById("taskList");

let tasks =
JSON.parse(
localStorage.getItem("tasks")
)||[];

function save(){
localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);
}

function render(filter="all"){

taskList.innerHTML="";

tasks
.filter(task=>{

if(filter==="active")
return !task.done;

if(filter==="completed")
return task.done;

return true;

})

.forEach((task,index)=>{

const li=
document.createElement("li");

li.innerHTML=`

<span>
${task.text}
</span>

<div>

<button onclick=
"toggle(${index})">

✓

</button>

<button onclick=
"removeTask(${index})">

Delete

</button>

</div>
`;

if(task.done)
li.classList.add(
"completed"
);

taskList.appendChild(li);

});

}

addBtn.onclick=()=>{

if(!input.value)
return;

tasks.push({

text:input.value,
done:false

});

save();

render();

input.value="";

};

function toggle(i){

tasks[i].done=
!tasks[i].done;

save();

render();

}

function removeTask(i){

tasks.splice(i,1);

save();

render();

}

document
.querySelectorAll(
"[data-filter]"
)

.forEach(btn=>{

btn.onclick=()=>{

render(
btn.dataset.filter
);

};

});

render();
