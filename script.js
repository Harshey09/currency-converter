
const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

window.addEventListener("load",()=>{
    updateExchangeRate ();
})
let msg = document.querySelector(".msg");

for(let select of dropdowns)
{
    for(currCodes in countryList)
    {
        let newOption =document.createElement("option");
        newOption.innerText=currCodes;
        newOption.value=currCodes;

        if(select.name==="from" && currCodes === "USD")
        {
            newOption.selected="selected";
        }
        else  if(select.name==="to" && currCodes === "INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);

        select.addEventListener("change",(evt) => {
            updateFlag(evt.target);
        })
    }

}

const updateFlag= (element) => {

    let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1)
    {
        amtVal=1;
        amount.value=1;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`

    let response = await fetch(URL);
   // console.log(response);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
   // console.log(rate);
    let finalAmount = rate*amtVal;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${toCurr.value} ${finalAmount}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    
    updateExchangeRate ();
}) 