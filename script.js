let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2');
let btn = document.querySelector('button');
let reset = document.querySelector('#reset');


const API_URL = "https://sheet.best/api/sheets/1488905e-6790-46b4-aead-7298d87e6a8c";

let total = 0;

fetch(API_URL)
    .then(response => response.json())
    .then(dados => {
        console.log(dados)
        const lista = document.querySelector('ul');
        dados.forEach(linhaDoExcel => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');

            td1.innerText = linhaDoExcel.oque;
            td2.innerText = linhaDoExcel.valor;

            tr.appendChild(td1);
            tr.appendChild(td2);

            const tbody = document.querySelector('tbody');
            tbody.appendChild(tr);

            console.log(Number(linhaDoExcel.valor));

            total = total + Number(linhaDoExcel.valor.replace(',','.'));
            const span = document.querySelector('span');
            span.innerText = total;
        })
    })

btn.addEventListener('click', ()=>{
    let valor1 = input1.value;
    let valor2 = Number(input2.value);

    fetch(API_URL, {
        method: "POST",
        mode: "cors",
        headers: {
    "Content-Type": "application/json",
  },
        body: JSON.stringify({oque: valor1, valor: valor2})
    }).then(() => {
        input1.value = '';
    input2.value = '';
     location.reload();
    })
})

reset.addEventListener('click', () => {
    fetch(API_URL+'/oque/**', {
        method: 'delete'
    })
    .then(()=>{
        location.reload();
    })
});

