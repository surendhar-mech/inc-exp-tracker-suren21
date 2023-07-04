const balance=document.querySelector("#bal");
const incamt=document.querySelector("#inc-amt");
const expamt=document.querySelector("#exp-amt");
const des=document.querySelector("#des");
const amount=document.querySelector("#amount");
const trans=document.querySelector("#trans");
const form=document.querySelector("#form");

//     const dummyData= [
//     { id:1, des:"flower", amount:-120},
//     { id:2, des:"pocket-money", amount:8000},
 
// ];

// let transactions= dummyData;
 const localstroagetrans=JSON.parse(localStorage.getItem("trans"));

let transactions=localStorage.getItem("trans") != null?localstroagetrans:[];

function loadtransactionsdetails(transaction){
 const sign=transaction.amount < 0 ?"-" : "+";
const item =document.createElement("li");
item.classList.add(transaction.amount < 0 ? "exp": "inc");
item.innerHTML =`
${transaction.des}
<span>${sign}${Math.abs(transaction.amount)}</span>
<BUtton class="btn-del" onclick="remtrans(${transaction.id
})">x</BUtton>

`;
trans.appendChild(item);
}
function remtrans(id){
    if(confirm("Are you want to delate the transaction")){
        transactions=transactions.filter((transaction)=>transaction.id != id);
        config();
        updatelocalstorage();
    }else{
        return;
    }
}
   function updateamount(){
    const amounts =transactions.map((transaction)=>
    transaction.amount);
    const total=amounts.reduce((acc,item)=> (acc+=item),0).toFixed(2);
    balance.innerHTML=`₹ ${total}`;

    
   const income=amounts.filter((item)=>  item> 0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
   incamt.innerHTML=`₹ ${income}`;

   const expens=amounts.filter((item)=>  item < 0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
   expamt.innerHTML=`₹ ${ Math.abs (expens)}`;
   }
   
  

   function config(){
    trans.innerHTML="";
    transactions.forEach(loadtransactionsdetails);
    updateamount();


}

function addTransaction(e){
    e.preventDefault();

    if (des.value.trim()=="" ||  amount.value.trim()==""){
        alert("please enter the description and amount");
    }else{
        const transaction = {
            id: unqid(),
            des:des.value,
            amount:+amount.value,
        };
        transactions.push(transaction);
        loadtransactionsdetails(transaction);
        des.value="";
        amount.value="";
        updateamount();
        updatelocalstorage();
    }
}
 function unqid(){
     return Math.floor(Math.random*450);
};
 form.addEventListener("submit",addTransaction);
window.addEventListener("load", function() {
    config();
});

function updatelocalstorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}