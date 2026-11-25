/* ==========================================================================
   GIRA DISCOS — CATÁLOGO, FILTROS & CAIXOTE INTERATIVO
   ========================================================================== */

const CATALOG_DATA = [
  {
    id: "milton-01",
    title: "As Músicas de Milton Nascimento",
    artist: "Milton Nascimento",
    condition: "usado",
    grading: "VG+",
    origin: "brasil",
    curator: "brasil",
    year: "1978",
    price: 100.0,
    oldPrice: 120.0,
    promo: true,
    coverBg: "linear-gradient(135deg, #2d4739 0%, #1d2e25 100%)",
    labelColor: "#c88a22"
  },
  {
    id: "nara-02",
    title: "Com Açúcar, Com Afeto",
    artist: "Nara Leão",
    condition: "usado",
    grading: "VG+",
    origin: "brasil",
    curator: "brasil",
    year: "1980",
    price: 80.0,
    oldPrice: 100.0,
    promo: true,
    coverBg: "linear-gradient(135deg, #8c3b2b 0%, #4f1f16 100%)",
    labelColor: "#e6b85c"
  },
  {
    id: "lulu-03",
    title: "Independence",
    artist: "Lulu Santos",
    condition: "usado",
    grading: "VG",
    origin: "brasil",
    curator: "anos-80",
    year: "1987",
    price: 70.0,
    oldPrice: 100.0,
    promo: true,
    coverBg: "linear-gradient(135deg, #284b63 0%, #152938 100%)",
    labelColor: "#d96b43"
  },
  {
    id: "bessie-04",
    title: "The World's Greatest Blues Singer",
    artist: "Bessie Smith",
    condition: "usado",
    grading: "NM",
    origin: "mundo",
    curator: "jazz-blues",
    year: "1970",
    price: 200.0,
    oldPrice: null,
    promo: false,
    coverBg: "linear-gradient(135deg, #4a3525 0%, #261a11 100%)",
    labelColor: "#c88a22"
  },
  {
    id: "brubeck-05",
    title: "Jackpot!",
    artist: "Dave Brubeck Quartet",
    condition: "usado",
    grading: "VG+",
    origin: "mundo",
    curator: "jazz-blues",
    year: "1968",
    price: 300.0,
    oldPrice: null,
    promo: false,
    coverBg: "linear-gradient(135deg, #6b2d2d 0%, #331313 100%)",
    labelColor: "#e3c578"
  },
  {
    id: "siba-06",
    title: "Máquina de Fazer Festa (Lacrado)",
    artist: "Siba",
    condition: "novo",
    grading: "MINT",
    origin: "brasil",
    curator: "novos",
    year: "2023",
    price: 220.0,
    oldPrice: 250.0,
    promo: true,
    coverBg: "linear-gradient(135deg, #a64b2a 0%, #5e2714 100%)",
    labelColor: "#f2c14e"
  },
  {
    id: "anelis-07",
    title: "Sal (Lacrado)",
    artist: "Anelis Assumpção",
    condition: "novo",
    grading: "MINT",
    origin: "brasil",
    curator: "novos",
    year: "2022",
    price: 180.0,
    oldPrice: 220.0,
    promo: true,
    coverBg: "linear-gradient(135deg, #3b5249 0%, #1f2d28 100%)",
    labelColor: "#d9822b"
  },
  {
    id: "dodo-08",
    title: "Incendiou o Brasil",
    artist: "Trio Elétrico Dodô & Osmar",
    condition: "usado",
    grading: "VG+",
    origin: "brasil",
    curator: "brasil",
    year: "1979",
    price: 80.0,
    oldPrice: null,
    promo: false,
    coverBg: "linear-gradient(135deg, #9e6b21 0%, #57380c 100%)",
    labelColor: "#e05a36"
  },
  {
    id: "dylan-09",
    title: "Nashville Skyline",
    artist: "Bob Dylan",
    condition: "usado",
    grading: "VG+",
    origin: "mundo",
    curator: "jazz-blues",
    year: "1969",
    price: 280.0,
    oldPrice: 300.0,
    promo: true,
    coverBg: "linear-gradient(135deg, #5c4738 0%, #2e221a 100%)",
    labelColor: "#d49b35"
  },
  {
    id: "roxette-10",
    title: "Joyride",
    artist: "Roxette",
    condition: "usado",
    grading: "VG+",
    origin: "mundo",
    curator: "anos-80",
    year: "1991",
    price: 150.0,
    oldPrice: 180.0,
    promo: true,
    coverBg: "linear-gradient(135deg, #7a2e4d 0%, #3d1425 100%)",
    labelColor: "#e6b85c"
  },
  {
    id: "kleiton-11",
    title: "Kleiton e Kledir",
    artist: "Kleiton & Kledir",
    condition: "usado",
    grading: "VG+",
    origin: "brasil",
    curator: "brasil",
    year: "1981",
    price: 60.0,
    oldPrice: 80.0,
    promo: true,
    coverBg: "linear-gradient(135deg, #35584c 0%, #1b3029 100%)",
    labelColor: "#c88a22"
  },
  {
    id: "stones-12",
    title: "Dirty Work",
    artist: "The Rolling Stones",
    condition: "usado",
    grading: "VG+",
    origin: "mundo",
    curator: "anos-80",
    year: "1986",
    price: 100.0,
    oldPrice: 120.0,
    promo: true,
    coverBg: "linear-gradient(135deg, #8a2424 0%, #420f0f 100%)",
    labelColor: "#e3b341"
  }
];

const FREE_SHIPPING_GOAL = 350.0;

const state = {
  filterType: "all",
  filterValue: "all",
  curator: "all",
  search: "",
  sort: "featured",
  crate: []
};

/* Elementos do DOM */
const recordsGrid = document.getElementById("recordsGrid");
const resultsCounter = document.getElementById("resultsCounter");
const catalogHeading = document.getElementById("catalogHeading");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const navLinks = document.querySelectorAll(".nav-link");
const curationPills = document.querySelectorAll(".pill");

/* Elementos do Caixote (Carrinho) */
const crateDrawer = document.getElementById("crateDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const openCrateBtn = document.getElementById("openCrateBtn");
const closeCrateBtn = document.getElementById("closeCrateBtn");
const crateCount = document.getElementById("crateCount");
const crateItemsContainer = document.getElementById("crateItemsContainer");
const crateSubtotal = document.getElementById("crateSubtotal");
const crateInstallments = document.getElementById("crateInstallments");
const shippingMessage = document.getElementById("shippingMessage");
const shippingBar = document.getElementById("shippingBar");
const toastNotification = document.getElementById("toastNotification");

/* Formatação Monetária BRL */
function formatBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function getDiscountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/* Filtragem e Ordenação */
function getFilteredRecords() {
  let list = CATALOG_DATA.filter((item) => {
    if (state.filterType === "condition" && item.condition !== state.filterValue) {
      return false;
    }
    if (state.filterType === "origin" && item.origin !== state.filterValue) {
      return false;
    }
    if (state.filterType === "promo" && !item.promo) {
      return false;
    }
    if (state.curator !== "all" && item.curator !== state.curator) {
      return false;
    }
    if (state.search.trim() !== "") {
      const q = state.search.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchArtist = item.artist.toLowerCase().includes(q);
      if (!matchTitle && !matchArtist) return false;
    }
    return true;
  });

  if (state.sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sort === "discount") {
    list.sort(
      (a, b) =>
        getDiscountPercent(b.price, b.oldPrice) -
        getDiscountPercent(a.price, a.oldPrice)
    );
  }

  return list;
}

/* Renderização dos Cards de Vinil */
function renderCatalog() {
  const records = getFilteredRecords();
  recordsGrid.innerHTML = "";

  resultsCounter.textContent = `${records.length} ${
    records.length === 1 ? "título encontrado" : "títulos encontrados"
  }`;

  if (records.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  records.forEach((record) => {
    const discount = getDiscountPercent(record.price, record.oldPrice);
    const installmentValue = formatBRL(record.price / 3);
    const isUsed = record.condition === "usado";

    const card = document.createElement("article");
    card.className = "record-card";

    card.innerHTML = `
      <div>
        <div class="card-badges">
          <span class="badge ${isUsed ? "badge-used" : "badge-new"}">
            ${isUsed ? `USADO • ${record.grading}` : "NOVO • LACRADO"}
          </span>
          ${discount > 0 ? `<span class="badge badge-promo">-${discount}%</span>` : ""}
        </div>

        <div class="record-visual">
          <div class="record-cover ${isUsed ? "is-used" : ""}" style="background: ${record.coverBg};">
            <span class="cover-genre">${record.origin === "brasil" ? "BRASIL" : "MUNDO"} • LP</span>
            <span class="cover-title">${record.title}</span>
            <span class="cover-year">EDIÇÃO ${record.year}</span>
          </div>
          <div class="record-vinyl" aria-hidden="true">
            <div class="vinyl-center-label" style="background-color: ${record.labelColor};">
              33⅓
            </div>
          </div>
        </div>

        <div class="record-meta">
          <span class="record-origin">${record.artist}</span>
          <h3 class="record-title">${record.title}</h3>
          <p class="record-artist">Prensagem ${record.year} • Frete protegido</p>
        </div>
      </div>

      <div class="record-pricing">
        <div>
          ${record.oldPrice ? `<span class="price-old">${formatBRL(record.oldPrice)}</span>` : ""}
          <span class="price-current">${formatBRL(record.price)}</span>
          <span class="price-installment">3x de ${installmentValue} sem juros</span>
        </div>
        <button type="button" class="add-to-crate-btn" data-id="${record.id}">
          + Caixote
        </button>
      </div>
    `;

    recordsGrid.appendChild(card);
  });
}

/* Gerenciamento do Caixote (Carrinho) */
function addToCrate(recordId) {
  const item = CATALOG_DATA.find((r) => r.id === recordId);
  if (!item) return;

  state.crate.push(item);
  updateCrateUI();
  showToast(`"${item.title}" adicionado ao caixote.`);
}

function removeFromCrate(index) {
  state.crate.splice(index, 1);
  updateCrateUI();
}

function updateCrateUI() {
  crateCount.textContent = state.crate.length;

  const subtotal = state.crate.reduce((acc, item) => acc + item.price, 0);
  crateSubtotal.textContent = formatBRL(subtotal);
  crateInstallments.textContent =
    subtotal > 0
      ? `Ou 3x de ${formatBRL(subtotal / 3)} sem juros`
      : "Parcele em até 3x sem juros";

  /* Barra de Frete Grátis */
  const progress = Math.min((subtotal / FREE_SHIPPING_GOAL) * 100, 100);
  shippingBar.style.width = `${progress}%`;

  if (subtotal >= FREE_SHIPPING_GOAL) {
    shippingMessage.innerHTML = `<strong>Sucesso!</strong> Você garantiu Frete Grátis neste pedido.`;
  } else {
    const remaining = FREE_SHIPPING_GOAL - subtotal;
    shippingMessage.innerHTML = `Faltam <strong>${formatBRL(remaining)}</strong> para ganhar Frete Grátis.`;
  }

  if (state.crate.length === 0) {
    crateItemsContainer.innerHTML = `<p class="empty-crate-msg">Seu caixote ainda está vazio. Escolha um disco no catálogo para começar.</p>`;
    return;
  }

  crateItemsContainer.innerHTML = "";
  state.crate.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "crate-item";
    row.innerHTML = `
      <div class="crate-item-info">
        <h4>${item.title}</h4>
        <span>${item.artist} • ${formatBRL(item.price)}</span>
      </div>
      <button type="button" class="remove-item-btn" data-index="${index}">Remover</button>
    `;
    crateItemsContainer.appendChild(row);
  });
}

function openCrateDrawer() {
  crateDrawer.classList.add("open");
  crateDrawer.setAttribute("aria-hidden", "false");
  drawerBackdrop.classList.remove("hidden");
}

function closeCrateDrawer() {
  crateDrawer.classList.remove("open");
  crateDrawer.setAttribute("aria-hidden", "true");
  drawerBackdrop.classList.add("hidden");
}

let toastTimer;
function showToast(message) {
  toastNotification.textContent = message;
  toastNotification.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastNotification.classList.remove("show");
  }, 2600);
}

/* Event Listeners */
navLinks.forEach((btn) => {
  btn.addEventListener("click", () => {
    navLinks.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    state.filterType = btn.dataset.filterType;
    state.filterValue = btn.dataset.filterValue;
    state.curator = "all";
    curationPills.forEach((p) => p.classList.toggle("active", p.dataset.curator === "all"));

    catalogHeading.textContent =
      btn.textContent === "Início" ? "Todos os Discos em Estoque" : btn.textContent;

    renderCatalog();
  });
});

curationPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    curationPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");

    state.curator = pill.dataset.curator;
    state.filterType = "all";
    state.filterValue = "all";
    navLinks.forEach((b) => b.classList.toggle("active", b.dataset.filterType === "all"));

    catalogHeading.textContent =
      pill.dataset.curator === "all" ? "Todos os Discos em Estoque" : pill.textContent;

    renderCatalog();
  });
});

searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderCatalog();
});

sortSelect.addEventListener("change", (e) => {
  state.sort = e.target.value;
  renderCatalog();
});

document.getElementById("btnFilterUsedHero").addEventListener("click", () => {
  state.filterType = "condition";
  state.filterValue = "usado";
  state.curator = "all";
  catalogHeading.textContent = "Garimpos Usados";
  navLinks.forEach((b) => b.classList.toggle("active", b.dataset.filterValue === "usado"));
  renderCatalog();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
});

function resetAllFilters() {
  state.filterType = "all";
  state.filterValue = "all";
  state.curator = "all";
  state.search = "";
  searchInput.value = "";
  catalogHeading.textContent = "Todos os Discos em Estoque";
  navLinks.forEach((b) => b.classList.toggle("active", b.dataset.filterType === "all"));
  curationPills.forEach((p) => p.classList.toggle("active", p.dataset.curator === "all"));
  renderCatalog();
}

document.getElementById("clearAllFiltersBtn").addEventListener("click", resetAllFilters);
document.getElementById("resetFiltersBrand").addEventListener("click", (e) => {
  e.preventDefault();
  resetAllFilters();
});

/* Delegação de eventos para adicionar/remover discos */
document.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-to-crate-btn, .btn-add-featured");
  if (addBtn) {
    addToCrate(addBtn.dataset.id);
  }

  const removeBtn = e.target.closest(".remove-item-btn");
  if (removeBtn) {
    removeFromCrate(Number(removeBtn.dataset.index));
  }
});

openCrateBtn.addEventListener("click", openCrateDrawer);
closeCrateBtn.addEventListener("click", closeCrateDrawer);
drawerBackdrop.addEventListener("click", closeCrateDrawer);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (state.crate.length === 0) {
    showToast("Adicione pelo menos um disco antes de finalizar.");
    return;
  }
  closeCrateDrawer();
  showToast("Redirecionando para o checkout seguro Gira Discos...");
});

document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const feedback = document.getElementById("newsletterFeedback");
  feedback.textContent = "Inscrição confirmada! Você receberá os próximos lotes por e-mail.";
  e.target.reset();
});

/* Inicialização */
renderCatalog();
updateCrateUI(); 


/* =================================
   FUNCIONALIDADES DE ACESSIBILIDADE
================================= */

const accessibilityBtn = document.getElementById("accessibilityBtn");
const accessibilityPanel = document.getElementById("accessibilityPanel");

const increaseFont = document.getElementById("increaseFont");
const decreaseFont = document.getElementById("decreaseFont");
const contrastBtn = document.getElementById("contrastBtn");
const underlineBtn = document.getElementById("underlineBtn");
const resetAccessibility = document.getElementById("resetAccessibility");

let fontSize = 90;

// Abrir e fechar painel
accessibilityBtn.addEventListener("click", () => {

    const isOpen = !accessibilityPanel.hidden;

    accessibilityPanel.hidden = isOpen;

    accessibilityBtn.setAttribute(
        "aria-expanded",
        String(!isOpen)
    );

});

// Aumentar fonte
increaseFont.addEventListener("click", () => {

    if (fontSize < 140) {
        fontSize += 10;

        document.documentElement.style.fontSize =
            fontSize + "%";
    }

});

// Diminuir fonte
decreaseFont.addEventListener("click", () => {

    if (fontSize > 80) {
        fontSize -= 10;

        document.documentElement.style.fontSize =
            fontSize + "%";
    }

});

// Ativar alto contraste
contrastBtn.addEventListener("click", () => {

    document.body.classList.toggle("alto-contraste");

});

// Sublinhar links
underlineBtn.addEventListener("click", () => {

    document.body.classList.toggle("links-sublinhados");

});

// Restaurar configurações
resetAccessibility.addEventListener("click", () => {

    fontSize = 90;

    document.documentElement.style.fontSize = "";

    document.body.classList.remove("alto-contraste");

    document.body.classList.remove("links-sublinhados");

});
