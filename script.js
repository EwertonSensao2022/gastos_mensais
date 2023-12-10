let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2');
let btn = document.querySelector('button');
let reset = document.querySelector('#reset');

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const API_URL = "https://sheetdb.io/api/v1/3hru2jkfz5rpi";

let total = 0;

const format_date = (date) => {
    if (!date) return "";
    const formatted = new Date(date).toLocaleDateString("pt-br", {day:"numeric", month:"numeric", year:"numeric"});
    return formatted;
}

const editar = (id, value) => {
    fetch(API_URL + `/id/${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: {
            valor: value
        }})
    }).then(() => location.reload())
}

const deletar = (id) => {
    // console.log(id)
    fetch(API_URL + `/id/${id}`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
  .then(() => location.reload())
}

fetch(API_URL)
    .then(response => response.json())
    .then(dados => {
        dados.forEach(linhaDoExcel => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');

            const button = document.createElement('button');
            button.innerHTML = '<i class="bi bi-trash"></i>';
            button.addEventListener('click', () => deletar(linhaDoExcel.id))

            td1.innerText = linhaDoExcel.oque;
            td2.innerText = linhaDoExcel.valor;
            td3.innerText = format_date(linhaDoExcel?.quando);
            td4.appendChild(button)

            td2.setAttribute("contentEditable", "true");
            td2.addEventListener("blur", event => editar(linhaDoExcel.id, event.target.innerText))

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

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
        body: JSON.stringify({oque: valor1, valor: valor2, quando: new Date(), id: uid() })
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

