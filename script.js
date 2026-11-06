const products = [
  { id: 1, name: "Arctic White", type: "pvc", img: "w1.jpg", price: 1450000, size: "120×140", badge: "Hit" },
  { id: 2, name: "Loft Black", type: "alu", img: "w2.jpg", price: 3200000, size: "200×240", badge: "Yangi" },
  { id: 3, name: "Royal Oak", type: "wood", img: "w3.jpg", price: 4100000, size: "110×180", badge: "Premium" },
  { id: 4, name: "Night Skyline", type: "pano", img: "w4.jpg", price: 6900000, size: "300×250", badge: "Top" },
  { id: 5, name: "Snow Classic", type: "pvc", img: "w1.jpg", price: 1250000, size: "100×120", badge: "" },
  { id: 6, name: "Urban Grid", type: "alu", img: "w2.jpg", price: 2850000, size: "180×220", badge: "" },
  { id: 7, name: "Walnut Arch", type: "wood", img: "w3.jpg", price: 4650000, size: "120×200", badge: "-10%" },
  { id: 8, name: "Glass Wall", type: "pano", img: "w4.jpg", price: 7800000, size: "350×260", badge: "" },
  { id: 9, name: "Comfort Plus", type: "pvc", img: "w1.jpg", price: 1690000, size: "130×150", badge: "Yangi" },
  { id: 10, name: "Steel Frame", type: "alu", img: "w2.jpg", price: 3550000, size: "220×240", badge: "" },
  { id: 11, name: "Pine Cottage", type: "wood", img: "w3.jpg", price: 3700000, size: "100×160", badge: "" },
  { id: 12, name: "Horizon Max", type: "pano", img: "w4.jpg", price: 8900000, size: "400×280", badge: "Premium" },
  { id: 13, name: "Eco Thermo", type: "pvc", img: "w1.jpg", price: 1850000, size: "140×150", badge: "Eko" },
  { id: 14, name: "Graphite Slim", type: "alu", img: "w2.jpg", price: 3950000, size: "200×260", badge: "" },
  { id: 15, name: "Cherry Vintage", type: "wood", img: "w3.jpg", price: 5200000, size: "130×210", badge: "Hit" },
  { id: 16, name: "Slide Pro", type: "pano", img: "w4.jpg", price: 7300000, size: "320×250", badge: "" },
  { id: 17, name: "Silent Home", type: "pvc", img: "w1.jpg", price: 2100000, size: "150×160", badge: "-15%" },
  { id: 18, name: "Atelier", type: "alu", img: "w2.jpg", price: 4300000, size: "240×260", badge: "Top" },
  { id: 19, name: "Golden Ash", type: "wood", img: "w3.jpg", price: 4900000, size: "120×190", badge: "" },
  { id: 20, name: "Sky Lounge", type: "pano", img: "w4.jpg", price: 9900000, size: "450×300", badge: "Lux" }
];

const typeNames = {
  pvc: "Plastik",
  alu: "Alyuminiy",
  wood: "Yog'och",
  pano: "Panorama"
};

let cart = JSON.parse(localStorage.getItem("lumina-cart") || "[]");

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const money = (n) => n.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";

window.addEventListener("load", () => {
  setTimeout(() => {
    $("#loader").classList.add("hide");
    document.body.classList.add("loaded");
  }, 1300);
});

const cursor = $("#cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

function bindCursor() {
  $$("a, button, .product, .g-item").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("big"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("big"));
  });
}

window.addEventListener("scroll", () => {
  $("#nav").classList.toggle("scrolled", window.scrollY > 50);
  const bg = $(".hero-bg");
  if (bg) {
    bg.style.translate = `0 ${window.scrollY * 0.3}px`;
  }
});

$("#burger").addEventListener("click", () => {
  $("#menu").classList.toggle("open");
});

$$("#menu a").forEach((a) => {
  a.addEventListener("click", () => $("#menu").classList.remove("open"));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

$$(".reveal").forEach((el) => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 2000, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString("ru-RU") + (p === 1 ? "+" : "");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
});

$$(".counter").forEach((el) => counterObserver.observe(el));

function bindTilt() {
  $$(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

$$(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

function renderProducts(filter = "all") {
  const list = filter === "all" ? products : products.filter((p) => p.type === filter);
  $("#products").innerHTML = list
    .map(
      (p, i) => `
      <div class="product" style="animation-delay:${i * 0.05}s">
        <div class="p-img">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
          <button class="like" data-like="${p.id}"><i class="fa-regular fa-heart"></i></button>
          <img src="img/${p.img}" alt="${p.name}" loading="lazy">
          <div class="p-overlay"><h3>${p.name}</h3></div>
        </div>
        <div class="p-body">
          <div class="p-meta">
            <span><i class="fa-solid fa-layer-group"></i>${typeNames[p.type]}</span>
            <span><i class="fa-solid fa-ruler-combined"></i>${p.size} sm</span>
          </div>
          <div class="p-foot">
            <span class="price">${money(p.price)}</span>
            <button class="add" data-add="${p.id}"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      </div>`
    )
    .join("");
  bindCursor();
}

$("#filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  $$(".filter").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(btn.dataset.filter);
});

$("#products").addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const like = e.target.closest("[data-like]");
  if (add) {
    addToCart(+add.dataset.add, add);
  }
  if (like) {
    like.classList.toggle("on");
    like.innerHTML = like.classList.contains("on")
      ? '<i class="fa-solid fa-heart"></i>'
      : '<i class="fa-regular fa-heart"></i>';
  }
});

function flyToCart(btn, src) {
  const img = document.createElement("img");
  const from = btn.getBoundingClientRect();
  const to = $("#cartOpen").getBoundingClientRect();
  img.src = src;
  img.className = "fly";
  img.style.left = from.left + "px";
  img.style.top = from.top + "px";
  document.body.appendChild(img);
  requestAnimationFrame(() => {
    img.style.left = to.left + "px";
    img.style.top = to.top + "px";
    img.style.width = "20px";
    img.style.height = "20px";
    img.style.opacity = "0.3";
  });
  setTimeout(() => img.remove(), 800);
}

function addToCart(id, btn) {
  const product = products.find((p) => p.id === id);
  const item = cart.find((c) => c.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  flyToCart(btn, "img/" + product.img);
  saveCart();
  showToast(product.name + " savatga qo'shildi");
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((c) => c.id !== id);
  }
  saveCart();
}

function removeItem(id) {
  cart = cart.filter((c) => c.id !== id);
  saveCart();
}

function cartTotal() {
  return cart.reduce((sum, c) => sum + products.find((p) => p.id === c.id).price * c.qty, 0);
}

function saveCart() {
  localStorage.setItem("lumina-cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const badge = $("#cartCount");
  badge.textContent = count;
  badge.classList.remove("bump");
  void badge.offsetWidth;
  badge.classList.add("bump");

  if (!cart.length) {
    $("#cartItems").innerHTML = `
      <div class="empty">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Savatingiz hozircha bo'sh</p>
      </div>`;
  } else {
    $("#cartItems").innerHTML = cart
      .map((c) => {
        const p = products.find((x) => x.id === c.id);
        return `
        <div class="c-item">
          <img src="img/${p.img}" alt="${p.name}">
          <div class="c-info">
            <h4>${p.name}</h4>
            <span>${money(p.price * c.qty)}</span>
            <div class="qty">
              <button data-dec="${p.id}"><i class="fa-solid fa-minus"></i></button>
              <b>${c.qty}</b>
              <button data-inc="${p.id}"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
          <button class="remove" data-rm="${p.id}"><i class="fa-solid fa-trash-can"></i></button>
        </div>`;
      })
      .join("");
  }
  $("#cartTotal").textContent = money(cartTotal());
  $("#modalTotal").textContent = money(cartTotal());
}

$("#cartItems").addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const rm = e.target.closest("[data-rm]");
  if (inc) changeQty(+inc.dataset.inc, 1);
  if (dec) changeQty(+dec.dataset.dec, -1);
  if (rm) removeItem(+rm.dataset.rm);
});

function openCart() {
  $("#cart").classList.add("open");
  $("#overlay").classList.add("show");
  document.body.classList.add("lock");
}

function closeCart() {
  $("#cart").classList.remove("open");
  $("#overlay").classList.remove("show");
  document.body.classList.remove("lock");
}

$("#cartOpen").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);

$("#checkoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Avval savatga mahsulot qo'shing");
    return;
  }
  closeCart();
  $("#modal").classList.add("show");
});

$("#modalClose").addEventListener("click", () => $("#modal").classList.remove("show"));

$("#modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") $("#modal").classList.remove("show");
});

$("#orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#modal").classList.remove("show");
  cart = [];
  saveCart();
  e.target.reset();
  showToast("Buyurtmangiz qabul qilindi! Tez orada bog'lanamiz");
});

$("#ctaForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  showToast("Rahmat! 15 daqiqada qo'ng'iroq qilamiz");
});

let toastTimer;

function showToast(text) {
  $("#toastText").textContent = text;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2600);
}

$("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
    $("#modal").classList.remove("show");
  }
});

renderProducts();
renderCart();
bindTilt();
bindCursor();
