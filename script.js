let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2');
let btn = document.querySelector('button');
let reset = document.querySelector('#reset');

const API_URL = "https://sheetdb.io/api/v1/3hru2jkfz5rpi";

let total = 0;

const format_date = (date) => {
    if (!date) return "";
    const formatted = new Date(date).toLocaleDateString("pt-br", {day:"numeric", month:"numeric", year:"numeric"});
    return formatted;
}

fetch(API_URL)
    .then(response => response.json())
    .then(dados => {
        const lista = document.querySelector('ul');
        dados.forEach(linhaDoExcel => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');

            td1.innerText = linhaDoExcel.oque;
            td2.innerText = linhaDoExcel.valor;
            td3.innerText = format_date(linhaDoExcel?.quando)

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            const tbody = document.querySelector('tbody');
            tbody.appendChild(tr);

            total = total + Number(linhaDoExcel.valor.replace(',','.'));
            const span = document.querySelector('span');
            span.innerText = total.toFixed(2);
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
        body: JSON.stringify({oque: valor1, valor: valor2, quando: new Date() })
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

