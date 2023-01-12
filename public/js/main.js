window.addEventListener("load", function () {
    console.log(document.querySelector("#showMenu"));
    document
      .querySelector("#showMenu")
      .addEventListener("click", function (event) {
        document.querySelector("#mobileNav").classList.remove("hidden");
      });
  
    document
      .querySelector("#hideMenu")
      .addEventListener("click", function (event) {
        document.querySelector("#mobileNav").classList.add("hidden");
      });
  
    document.querySelectorAll("[toggleElement]").forEach((toggle) => {
      toggle.addEventListener("click", function (event) {
        console.log(toggle);
        const answerElement = toggle.querySelector("[answer]");
        const caretElement = toggle.querySelector("img");
        console.log(answerElement);
        if (answerElement.classList.contains("hidden")) {
          answerElement.classList.remove("hidden");
          caretElement.classList.add("rotate-90");
        } else {
          answerElement.classList.add("hidden");
          caretElement.classList.remove("rotate-90");
        }
      });
    });
  });

const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
// const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

// Array.from(todoItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

// Array.from(todoComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// async function markComplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markComplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markIncomplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }