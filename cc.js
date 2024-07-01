
const BasicUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
// const countryli=document.querySelectorAll(countryList);
const dropdowns=document.querySelectorAll(".dropdown select");
const butn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

const updateExchangeRate=async ()=>{
    let amount =document.querySelector("form input");
    let amntVal=amount.value;
    if(amntVal==="" || amntVal<1){
        amntVal=1;
        amount.value="1";
    }
    
     let url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let dat1=data[fromCurr.value.toLowerCase()];
    let dat2=dat1[toCurr.value.toLowerCase()];
    
    let finalAmount=amntVal*dat2;
    msg.innerText=`${amntVal}${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name=="from" && currcode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
    
}
const updateFlag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
} 

butn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
});
