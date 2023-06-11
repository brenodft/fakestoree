fetch('https://fakestoreapi.com/products?limit=9')
  .then((data) => {
    return data.json();
  })
  .then((completedata) => {
    let data1 = "";
    completedata.forEach((values) => {
      data1 +=`<div class="col-4">
        <img src=${values.image} class="w-50 imggrid" alt="" />
        <div class="text-black">
          <h5>${values.title}</h5>
          <h6>${values.description}</h6>
          <h3>$ ${values.price}</h3>
          <p class="card-details"><a href="details/detalhes.html?id=${values.id}">See details</a></p>
        </div>
      </div>`;
    });
    document.getElementById('catalogo').innerHTML = data1;
    
    if (data1 === "") {
      alert("Nenhum produto encontrado para essa categoria.");
    }    

    // Filtrar produtos por nome
    const searchInput = document.querySelector('input[type="search"]');
    const form = document.querySelector('form[role="search"]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = completedata.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);


      let filteredDataHTML = "";
      filteredData.forEach((values) => {
        filteredDataHTML +=`<div class="col-4">
        <img src=${values.image} class="w-50 imggrid" alt="" />
        <div class="text-black">
          <h5>${values.title}</h5>
          <h6>${values.description}</h6>
          <h3>$ ${values.price}</h3>
        </div>
      </div>`;
      });

      document.getElementById('catalogo').innerHTML = filteredDataHTML;
    });
  })
  .catch((err) => {
    console.log(err);
    alert("Error to find your product, please reload the page")
  });


// Obtém uma referência ao formulário pelo seu seletor de classe
var form = document.querySelector('.categoriasfiltro');

// Obtém uma referência a todos os checkboxes dentro do formulário
var checkboxes = form.querySelectorAll('input[type="checkbox"]');

// Faz a chamada à API para obter os dados completos dos produtos
fetch('https://fakestoreapi.com/products?limit=9')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var completedata = data;

    // Adiciona um evento de escuta para cada checkbox
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        // Obtém as categorias selecionadas
        var selectedCategories = Array.from(checkboxes)
          .filter(function(checkbox) {
            return checkbox.checked;
          })
          .map(function(checkbox) {
            return checkbox.value;
          });

        // Filtra os produtos com base nas categorias selecionadas
        var filteredData = completedata.filter(function(product) {
          return selectedCategories.includes(product.category);
        });

        // Constrói a representação HTML dos produtos filtrados
        var filteredDataHTML = "";
        filteredData.forEach(function(product) {
          filteredDataHTML += `<div class="col-4">
            <img src=${product.image} class="w-50 imggrid" alt="" />
            <div class="text-black">
              <h5>${product.title}</h5>
              <h6>${product.description}</h6>
              <h3>$ ${product.price}</h3>
            </div>
          </div>`;
        });

        // Exibe os produtos filtrados na página
        document.getElementById('catalogo').innerHTML = filteredDataHTML;
      });
    });

    // Adiciona um evento de escuta para o formulário
    form.addEventListener('change', function() {
      // Verifica se todos os checkboxes estão desmarcados
      var allUnchecked = Array.from(checkboxes).every(function(checkbox) {
        return !checkbox.checked;
      });

      // Se todos os checkboxes estiverem desmarcados, exibe todos os produtos
      if (allUnchecked) {
        var allDataHTML = "";
        completedata.forEach(function(product) {
          allDataHTML += `<div class="col-4">
            <img src=${product.image} class="w-50 imggrid" alt="" />
            <div class="text-black">
              <h5>${product.title}</h5>
              <h6>${product.description}</h6>
              <h3>$ ${product.price}</h3>
            </div>
          </div>`;
        });

        document.getElementById('catalogo').innerHTML = allDataHTML;
      }
    });
  })
  .catch(function(err) {
    console.log(err);
    alert("Error to find your product, please reload the page");
  });
