/*The solution to draggable elements was inspired by w3schools solution on creating a [Draggable HTML Element](https://www.w3schools.com/howto/howto_js_draggable.asp).*/

dragElement(document.getElementById('plant1'));
dragElement(document.getElementById('plant2'));
dragElement(document.getElementById('plant3'));
dragElement(document.getElementById('plant4'));
dragElement(document.getElementById('plant5'));
dragElement(document.getElementById('plant6'));
dragElement(document.getElementById('plant7'));
dragElement(document.getElementById('plant8'));
dragElement(document.getElementById('plant9'));
dragElement(document.getElementById('plant10'));
dragElement(document.getElementById('plant11'));
dragElement(document.getElementById('plant12'));
dragElement(document.getElementById('plant13'));
dragElement(document.getElementById('plant14'));

const originalPositions = {};
let highestZ = 10;

window.onload = function(){

    document.querySelectorAll(".plant").forEach(plant=>{

        originalPositions[plant.id]={
            left: plant.offsetLeft,
            top: plant.offsetTop
        };

        // load saved position
        let saved = localStorage.getItem(plant.id);

        if(saved){

            saved = JSON.parse(saved);

            plant.style.left=saved.left;
            plant.style.top=saved.top;
        }
    });
};


// Reset 

document.getElementById("resetBtn")
.addEventListener("click",()=>{

document.querySelectorAll(".plant")
.forEach(plant=>{

plant.style.left=
originalPositions[plant.id].left+"px";

plant.style.top=
originalPositions[plant.id].top+"px";

});

});



function dragElement(terrariumElement) {

let pos1=0,
    pos2=0,
    pos3=0,
    pos4=0;

terrariumElement.onpointerdown=pointerDrag;


// Double click

terrariumElement.ondblclick=()=>{

highestZ++;
terrariumElement.style.zIndex=highestZ;

};



function pointerDrag(e){

e.preventDefault();

pos3=e.clientX;
pos4=e.clientY;


document
.getElementById("pickupSound")
.play();

document.onpointermove=elementDrag;

document.onpointerup=stopElementDrag;

}



function elementDrag(e){

pos1=pos3-e.clientX;

pos2=pos4-e.clientY;

pos3=e.clientX;

pos4=e.clientY;


let newTop=
terrariumElement.offsetTop-pos2;

let newLeft=
terrariumElement.offsetLeft-pos1;


/* Boundary */

const maxX=
window.innerWidth-
terrariumElement.offsetWidth;

const maxY=
window.innerHeight-
terrariumElement.offsetHeight;


newLeft=Math.max(
0,
Math.min(newLeft,maxX)
);

newTop=Math.max(
0,
Math.min(newTop,maxY)
);


terrariumElement.style.top=
newTop+"px";

terrariumElement.style.left=
newLeft+"px";

}



function stopElementDrag(){


document
.getElementById("dropSound")
.play();


/* Save positions */

localStorage.setItem(

terrariumElement.id,

JSON.stringify({

left:terrariumElement.style.left,
top:terrariumElement.style.top

})

);


document.onpointerup=null;
document.onpointermove=null;

}

}
