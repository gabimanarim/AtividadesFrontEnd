let contador = 1;

//FUNÇÃO: mostrar carregamento...
function mostrarLoading(){document.getElementById("loading").style.display = "block";}

//FUNÇÃO: esconder carregamento...
function esconderLoading(){document.getElementById("loading").style.display = "none";}

//FUNÇÃO: mensagem erro
function mostrarErro(msg){
    const erro = document.getElementById("erro");
    erro.innerText = msg;
    erro.style.display = "block";
}

//FUNÇÃO: esconder mensagem erro
function esconderErro(){document.getElementById("erro").style.display = "none";}

//FUNÇÃO: buscar cor HEX
function buscarCor(){
    esconderErro();

    const hex = document.getElementById("hexInput").value; //valor digitado pelo usuário
    if(hex == ""){
        mostrarErro("Digite um HEX");
        return;
    }

    if(hex.length != 6) {
        mostrarErro("HEX inválido! Use apenas 6 caracteres.");
        return;
    }
    

    mostrarLoading();

    //*API
    const url = "https://www.thecolorapi.com/id?hex=" + hex;
    fetch(url) 
    .then(response => response.json()) //converte p/json
    .then(data =>{ //recebe dados da API
        adicionarNaTabela(data);
        //mostrarDetalhe(data);
        esconderLoading();
    })

    //*ERRO
    .catch(error => {
        esconderLoading();
        mostrarErro("Erro ao localizar API");
        console.log(error);
    });  
}

//FUNÇÃO: vincular dados na tabela
function adicionarNaTabela(data){
    const tabela = document.getElementById("tabelaCores");
    const linha = `<tr style="background-color: ${data.hex.value};"
                       onclick='mostrarDetalhe(${JSON.stringify(data)})'> 
                    <td>${contador}</td>
                    <td>${data.hex.value}</td>
                  </tr>`;

    tabela.innerHTML = tabela.innerHTML + linha;
    contador++;
}

//FUNÇÃO: mostrar detalhe
function mostrarDetalhe(data){
    document.getElementById("nomeCor").innerText = "Nome: " + data.name.value;
    document.getElementById("hexCor").innerText = "HEX: " + data.hex.value;
    document.getElementById("rgbCor").innerText = "RGB: " + data.rgb.value;
}

//FUNÇÃO: limpar dados
function limparTabela(){
    document.getElementById("tabelaCores").innerHTML = "";
    document.getElementById("nomeCor").innerHTML = "";
    document.getElementById("hexCor").innerHTML = "";
    document.getElementById("rgbCor").innerHTML = "";
    contador = 1;
}
