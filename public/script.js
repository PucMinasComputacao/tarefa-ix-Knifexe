//B.1. BASE DE DADOS (JSON)

const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 15 Pro Max",
      preco: 5999.90,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=200&fit=crop",
      descricao: "Apple iPhone 15 Pro Max (256 GB) - Titânio Preto",
      emEstoque: true
    },
    {
      id: 2,
      nome: "iPhone 16 Pro Max",
      preco: 8399.90,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=300&h=200&fit=crop",
      descricao: "Apple iPhone 16 Pro Max (512 GB) - Titânio Preto",
      emEstoque: true
    },
    {
      id: 3,
      nome: "iPhone 17 Pro Max",
      preco: 10349.90,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&h=200&fit=crop",
      descricao: "Apple iPhone 17 Pro Max (512 GB) - Titânio Preto",
      emEstoque: false
    },
    {
      id: 4,
      nome: "MacBook Air M3",
      preco: 12999.90,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop",
      descricao: "Notebook Apple ultrafino com chip M3, 8GB de RAM, SSD de 256GB e bateria de até 18h.",
      emEstoque: true
    },
    {
      id: 5,
      nome: "AirPods Pro 2",
      preco: 2108.05,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=200&fit=crop",
      descricao: "Fone de ouvido sem fio com cancelamento ativo de ruído, modo Transparência e áudio espacial.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Mouse Logitech GPRO 2",
      preco: 635.00,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=200&fit=crop",
      descricao: "Mouse Gamer Sem Fio Logitech G PRO 2 LIGHTSPEED para Destros ou Canhotos, 4 Botões Programáveis e Removíveis, Sensor Hero 2 44K DPI, Carregamento USB-C, PC/Mac - Magenta",
      emEstoque: true
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 3899.90,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=300&h=200&fit=crop",
      descricao: "Console Sony com SSD ultrarrápido, suporte a 4K 120fps, ray tracing e controle DualSense.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Xbox 360",
      preco: 830.0,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=200&fit=crop",
      descricao: "Console Microsoft com 12 teraflops de GPU, SSD de 1TB e suporte a 4K a 60fps.",
      emEstoque: true
    }
  ]
};

//B.2. SELEÇÃO DE ELEMENTOS (DOM)

const productList    = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput    = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender      = document.querySelector("#btnRender");

//B.3. FUNÇÕES OBRIGATÓRIAS

//formatPrice
function formatPrice(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

//createProductCard
function createProductCard(produto) {
  //Elemento raiz do card
  const card = document.createElement("div");
  card.setAttribute("data-id", produto.id);
  card.setAttribute("data-category", produto.categoria);
  card.classList.add("card");
  card.style.padding = "0";

  //Imagem
  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);

  //Corpo do card
  const body = document.createElement("div");
  body.classList.add("card-body");

  const title = document.createElement("p");
  title.classList.add("card-title");
  title.textContent = produto.nome;

  const category = document.createElement("span");
  category.classList.add("card-category");
  category.textContent = produto.categoria;

  const price = document.createElement("p");
  price.classList.add("card-price");
  price.textContent = formatPrice(produto.preco);

  const stock = document.createElement("p");
  stock.classList.add("card-stock");
  if (produto.emEstoque) {
    stock.textContent = "✅ Em estoque";
    stock.classList.add("in");
  } else {
    stock.textContent = "❌ Fora de estoque";
    stock.classList.add("out");
  }

  body.appendChild(title);
  body.appendChild(category);
  body.appendChild(price);
  body.appendChild(stock);

  //Ações
  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const btnDetails = document.createElement("button");
  btnDetails.classList.add("btn-details");
  btnDetails.textContent = "Ver detalhes";
  btnDetails.addEventListener("click", () => showProductDetails(produto));

  const btnHighlight = document.createElement("button");
  btnHighlight.classList.add("btn-highlight");
  btnHighlight.textContent = "⭐ Destacar";
  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  actions.appendChild(btnDetails);
  actions.appendChild(btnHighlight);

  card.appendChild(img);
  card.appendChild(body);
  card.appendChild(actions);

  return card;
}

//renderProducts
function renderProducts(produtos) {
  productList.innerHTML = "";
  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  //B.5 querySelectorAll: pegar todos os cards e logar data-id
  const allCards = document.querySelectorAll(".card");
  console.log(`%c📋 querySelectorAll — ${allCards.length} cards renderizados:`, "color:#2a9d8f; font-weight:bold");
  allCards.forEach(card => {
    console.log(`  card data-id: ${card.getAttribute("data-id")}`);
  });
}

//renderCategories
function renderCategories() {
  const categorias = ["Todas", ...new Set(data.produtos.map(p => p.categoria))];
  categorySelect.innerHTML = "";
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.setAttribute("value", cat);
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

//showProductDetails
function showProductDetails(produto) {
  productDetails.innerHTML = `
    <p class="details-title">${produto.nome}</p>
    <img class="details-img" src="${produto.imagem}" alt="${produto.nome}" />
    <div class="details-row">
      <span>Preço</span>
      <span>${formatPrice(produto.preco)}</span>
    </div>
    <div class="details-row">
      <span>Categoria</span>
      <span>${produto.categoria}</span>
    </div>
    <div class="details-row">
      <span>Estoque</span>
      <span>${produto.emEstoque ? "✅ Disponível" : "❌ Indisponível"}</span>
    </div>
    <div class="details-row">
      <span>ID</span>
      <span>#${produto.id}</span>
    </div>
    <p class="details-desc">${produto.descricao}</p>
  `;
  console.log(`%c🔍 Detalhes exibidos: ${produto.nome}`, "color:#f4a261; font-weight:bold");
}

//filterProducts
function filterProducts() {
  const texto    = searchInput.value.toLowerCase().trim();
  const categ    = categorySelect.value;

  return data.produtos.filter(produto => {
    const nomeMatch  = produto.nome.toLowerCase().includes(texto);
    const categMatch = categ === "Todas" || produto.categoria === categ;
    return nomeMatch && categMatch;
  });
}

//B.4. EVENTOS

//Digitação no campo de busca
searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

//Mudança de categoria
categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

//Botão Renderizar
btnRender.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "Todas";
  renderProducts(data.produtos);
  console.log("%c🔄 Catálogo re-renderizado!", "color:#e63946; font-weight:bold");
});

//INICIALIZAÇÃO

renderCategories();
renderProducts(data.produtos);