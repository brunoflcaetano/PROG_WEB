function limpa_formulário_cep() {
  // Limpa valores do formulário de CEP.
  document.getElementById('rua').value = "";
  document.getElementById('bairro').value = "";
  document.getElementById('cidade').value = "";
  document.getElementById('uf').value = "";
  document.getElementById('ibge').value = "";
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
      // Atualiza os campos com os valores.
      document.getElementById('rua').value = conteudo.logradouro;
      document.getElementById('bairro').value = conteudo.bairro;
      document.getElementById('cidade').value = conteudo.localidade;
      document.getElementById('uf').value = conteudo.uf;
      document.getElementById('ibge').value = conteudo.ibge;
  } else {
      limpa_formulário_cep();
      alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  var cep = valor.replace(/\D/g, '');

  if (cep !== "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
          document.getElementById('rua').value = "...";
          document.getElementById('bairro').value = "...";
          document.getElementById('cidade').value = "...";
          document.getElementById('uf').value = "...";
          document.getElementById('ibge').value = "...";

          var script = document.createElement('script');
          script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
          document.body.appendChild(script);
      } else {
          limpa_formulário_cep();
          alert("Formato de CEP inválido.");
      }
  } else {
      limpa_formulário_cep();
  }
}

function pesquisaRua(rua) {
   
    if (!rua) {
        alert("Por favor, insira o nome da rua."); 
        return; 
    }

    // monta a url do viacep para pesquisar pelo nome da rua estando no pr
    const url = `https://viacep.com.br/ws/PR/${rua}/json/`;

    // fetch pra fazer a requisição da api
    fetch(url)
        .then(response => response.json()) // converte p json
        .then(dado => {
            // verifica se o viacep trouxe algum dado
            if (dado && dado.length > 0) {
                const endereco = dado[0]; // pega o primeiro resultado

                // preenche os campos no html com as informações retornadas
                document.getElementById('ruaSearch').value = endereco.logradouro || "Não disponível";
                document.getElementById('bairroSearch').value = endereco.bairro || "Não disponível";
                document.getElementById('cidadeSearch').value = endereco.localidade || "Não disponível";
                document.getElementById('ufSearch').value = endereco.uf || "Não disponível";
                document.getElementById('cepSearch').value = endereco.cep || "Não disponível";
            } else {
                alert("Nenhum endereço encontrado para essa rua no Paraná."); 
            }
        })
        .catch(() => {
            alert("Erro ao buscar os dados. Tente novamente."); 
        });
}
