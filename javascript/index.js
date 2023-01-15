let inputEl=document.getElementById("input-el")
let inputBtn=document.getElementById("input-btn")
let ulEl=document.getElementById("ul-el")
let saveTabEl=document.getElementById("save-tab")
let arr=[]
const arrlocal=JSON.parse(localStorage.getItem("arr"))
const deleteBtn=document.getElementById("delete-btn")
console.log(arrlocal)
if (arrlocal) {
    arr=arrlocal
    renderItems()
    localStorage.setItem("arr",JSON.stringify(arr))
}
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    arr=[]
    renderItems()
})
inputBtn.addEventListener("click", function() 
{
    arr.push(inputEl.value)
    inputEl.value =""  
    renderItems()
    localStorage.setItem("arr",JSON.stringify(arr)) 
})
saveTabEl.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function (tabs) {
        arr.push(tabs[0].url)
        localStorage.setItem("arr",JSON.stringify(arr))
        renderItems()
        
    })
})
function renderItems(){
    let innertext=""
    for(let i=0;i<arr.length;i++){
        innertext+=`<li>
        <a target='_blank' href='${arr[i]}'>  
        ${arr[i]} 
        </a>
        </li> `
    }
    ulEl.innerHTML=innertext
}
