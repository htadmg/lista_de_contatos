 let lista = localStorage.getItem("minhaLista");
 if(lista){
    lista = JSON.parse(lista)
 } else {
    lista = []
 }
 

const formulario = document.getElementById("formulario")


CriarListaDeContatos()

formulario.addEventListener("submit", function (e){
    e.preventDefault();
    let novoContato = new Object();
    novoContato.nome = this.nome.value;
    novoContato.telefone = this.telefone.value;

    if(this.id.value !== "" && this.id.value >= 0){
        lista[this.id.value] = novoContato; 
    } else {
        lista.push(novoContato);
    }
    
    Salvar();
    CriarListaDeContatos();
    this.id.value = null;
    this.reset();
})

function CriarListaDeContatos(filtro=""){
    const tbody = document.querySelector('#contatos tbody');
    tbody.innerHTML = "";

    lista.forEach((item, key) => {
        if(item.nome.toUpperCase().indexOf(filtro.toUpperCase()) >= 0 || filtro == "") {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td class="nome">${item.nome}</td>
                <td class="telefone">${item.telefone}</td>
                <td class="acoes">
                    <button class="excluir" onClick="Excluir(${key})"><i class="bi bi-trash3"></i></button> 
                    <button class="editar" onClick="Editar(${key})"><i class="bi bi-pencil-square"></i></button>
                </td>
            `;
            tbody.appendChild(linha);
        }
    });
}

function Excluir(id){
    formulario.reset();
    lista.splice(id, 1)
    Salvar()
    CriarListaDeContatos()
}

function Editar(id){
    formulario.id.value = id;
    formulario.nome.value = lista[id].nome;
    formulario.telefone.value = lista[id].telefone;
    CriarListaDeContatos()
}

function Salvar(){
    localStorage.setItem("minhaLista", JSON.stringify(lista))
}