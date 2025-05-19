const products = [{name: "Aceite", price: 10}, {name: "Filtro", price: 5}];
const container = document.getElementById("products");
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `<h3>${p.name}</h3><p>$${p.price}</p><button>Agregar al carrito</button>`;
  container.appendChild(div);
});