  function detailId(id) {
      fetch('https://fakestoreapi.com/products/' + id)
        .then((data) => {
          return data.json();
        })
        .then((product) => {
          let data1 = `<div id="flexproduct">
          <img src="${product.image}" alt="" class="imagemdestaqueprod">
          <div class="proddetails">
            <h1 class="titleprod"><i>${product.title}</i></h1>  
            <h3 class="precoprod">$${product.price}</h3>
            <h3 class="descprod">${product.description}</h3>
          
          </div>`;
    
          document.getElementById('catalogo').innerHTML = data1;
        });
    }
    
    window.onload = () => {
      let idParameter = new URLSearchParams(window.location.search);
      let identificador = idParameter.get("id");
      detailId(identificador);
    };
    