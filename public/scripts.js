/* MODAL
const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards){
  card.addEventListener("click", function(){
    const videoId = card.getAttribute("id");
    modalOverlay.classList.add('active');
    
    modalOverlay.querySelector("iframe").src = `https://www.youtube.com/embed/${videoId}`;
  })
}

document.querySelector('.close-modal').addEventListener("click",function(){
  modalOverlay.classList.remove('active');
  
  modalOverlay.querySelector("iframe").src = "";
});


const modal = document.querySelector('.modal');
modal.addEventListener("dblclick", function(){
  if(modal.classList.contains('maximize')){
    modal.classList.remove('maximize');
  } else{
    modal.classList.add('maximize');
  } 
});
*/

/* Video Page*/
const cards = document.querySelectorAll('.card');

for (let card of cards){
  card.addEventListener("click", function(){
    const videoId = card.getAttribute("id");
    
    window.location.href = `/video?id=${videoId}`
  })
} 