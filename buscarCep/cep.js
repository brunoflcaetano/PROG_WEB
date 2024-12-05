function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
    document.getElementById('ibge').value=(conteudo.ibge);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";
        document.getElementById('ibge').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};


// Função para limpar os campos do formulário de pesquisa
function limpa_formulário_cep() {
    document.getElementById('ruaSearch').value = "";
    document.getElementById('bairroSearch').value = "";
    document.getElementById('cidadeSearch').value = "";
    document.getElementById('ufSearch').value = "";
    document.getElementById('ibgeSearch').value = "";
  }
  
  // Callback para processar a resposta da API
  function meu_callback_pesquisa(conteudo) {
    if (!("erro" in conteudo)) {
      // Verifica se a cidade é do Paraná e se o nome da rua não está vazio
      if (conteudo.uf === "PR" && conteudo.logradouro.trim() !== "") {
        document.getElementById('ruaSearch').value = conteudo.logradouro;
        document.getElementById('bairroSearch').value = conteudo.bairro;
        document.getElementById('cidadeSearch').value = conteudo.localidade;
        document.getElementById('ufSearch').value = conteudo.uf;
        document.getElementById('ibgeSearch').value = conteudo.ibge;
      } else {
        alert("A pesquisa é válida apenas para cidades do Paraná (PR) com nome de rua especificado.");
        limpa_formulário_cep();
      }
    } else {
      limpa_formulário_cep();
      alert("CEP não encontrado.");
    }
  }
  
function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, ''); // Remove caracteres não numéricos
  
    if (cep !== "") {
      var validacep = /^[0-9]{8}$/; // Valida o formato do CEP
      if (validacep.test(cep)) {
        // Preenche os campos com "..." enquanto consulta a API
        document.getElementById('ruaSearch').value = "...";
        document.getElementById('bairroSearch').value = "...";
        document.getElementById('cidadeSearch').value = "...";
        document.getElementById('ufSearch').value = "...";
        document.getElementById('ibgeSearch').value = "...";
  
        // Cria um elemento script para carregar a API do ViaCEP com a callback
        var script = document.createElement('script');
        script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback_pesquisa`;
        document.body.appendChild(script);
      } else {
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } else {
      limpa_formulário_cep();
    }
  }
  
  // Função para formatar o CEP na entrada do usuário
  function formatarCep(input) {
    input.value = input.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
  }
  
  // Adiciona um evento de formatação ao input de CEP
  window.onload = function() {
    document.getElementById('cepSearchInput').addEventListener('input', function() {
      formatarCep(this);
    });
  };