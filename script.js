const form = document.getElementById("form");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const search = document.getElementById("search");
const themeBtn = document.getElementById("themeBtn");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function saveData(){
localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);
}

function updateUI(){

list.innerHTML="";

let total=0;
let incomeTotal=0;
let expenseTotal=0;

transactions.forEach((t,index)=>{

total += Number(t.amount);

if(t.amount > 0){
incomeTotal += Number(t.amount);
}else{
expenseTotal += Math.abs(Number(t.amount));
}

const li=document.createElement("li");

li.innerHTML=`
<div>
<strong>${t.text}</strong><br>
${t.category} | ${t.date}<br>
₹${t.amount}
</div>

<button
class="delete"
onclick="deleteTransaction(${index})">
X
</button>
`;

list.appendChild(li);

});

balance.textContent=`₹${total}`;
income.textContent=`₹${incomeTotal}`;
expense.textContent=`₹${expenseTotal}`;

saveData();
}

form.addEventListener("submit",(e)=>{

e.preventDefault();

const transaction={
text:document.getElementById("text").value,
amount:Number(document.getElementById("amount").value),
date:document.getElementById("date").value,
category:document.getElementById("category").value
};

transactions.push(transaction);

form.reset();

updateUI();

});

function deleteTransaction(index){

transactions.splice(index,1);

updateUI();

}

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll("li").forEach(item=>{

item.style.display=
item.innerText.toLowerCase().includes(value)
? "flex"
: "none";

});

});

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

updateUI();