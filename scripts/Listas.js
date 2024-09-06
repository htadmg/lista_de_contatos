 let lista = localStorage.getItem("minhaLista");
 if(lista){
    lista = JSON.parse(lista)
 } else {
    lista = []
 }
 

const formulario = document.getElementById("formulario")

const ulPessoas = document.getElementById("contatos")

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
    ulPessoas.innerHTML = "";

    lista.forEach((item, key) => {
        if(item.nome.toUpperCase().indexOf(filtro.toUpperCase()) >= 0 || filtro == "" ){
            linha = document.createElement('li');
            linha.innerHTML = `
            <span class="nome">${item.nome}</span>
            <span class="telefone">${item.telefone}</span>
            <button class="excluir" onClick="Excluir(${key})">Excluir</button> 
            <button class="editar" onClick="Editar(${key})">Editar</button>
            `
            ulPessoas.appendChild(linha)
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