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

async function pesquisaRua(rua) {
  try {
      if (!rua) {
          alert("Por favor, insira o nome da rua.");
          return;
      }

      const response = await fetch(`https://viacep.com.br/ws/PR/${rua}/json/`);
      const data = await response.json();

      if (data && data.length > 0) {
          const endereco = data[0]; // Pegamos o primeiro resultado
          document.getElementById('ruaSearch').value = endereco.logradouro || "";
          document.getElementById('bairroSearch').value = endereco.bairro || "";
          document.getElementById('cidadeSearch').value = endereco.localidade || "";
          document.getElementById('ufSearch').value = endereco.uf || "";
          document.getElementById('ibgeSearch').value = endereco.ibge || "";
      } else {
          alert("Rua não encontrada ou não pertence ao Paraná.");
      }
  } catch (error) {
      alert("Erro ao buscar o endereço. Verifique sua conexão ou tente novamente.");
      console.error(error);
  }
}
