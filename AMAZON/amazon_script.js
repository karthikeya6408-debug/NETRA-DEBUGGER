/* =========================================================
   ShopEasy: homepage behaviour
   Features: hero carousel, product shelves from data,
   add-to-cart counter, live search filter, toast messages,
   sticky-navbar shadow, back-to-top.
   ========================================================= */

"use strict";

/* ---------- 1. Product data ----------
   In a real site this would come from a server (API).
   Keeping it in an array lets us generate the cards with a loop
   instead of copy-pasting HTML. */
const products = [
  { id: 1,  category: "electronics", emoji: "🎧", name: "Wireless Bluetooth Headphones with Mic",   price: 1499, old: 2999, rating: 4, reviews: 12840 },
  { id: 2,  category: "electronics", emoji: "⌚", name: "Smart Watch with Heart Rate Monitor",       price: 2199, old: 4999, rating: 4, reviews: 8920 },
  { id: 3,  category: "electronics", emoji: "📱", name: "5G Smartphone 8GB RAM, 128GB Storage",      price: 17999, old: 22999, rating: 4, reviews: 5310 },
  { id: 4,  category: "electronics", emoji: "💻", name: "Thin & Light Laptop 15.6 inch, 16GB RAM",   price: 42990, old: 54990, rating: 5, reviews: 2104 },
  { id: 5,  category: "electronics", emoji: "🔊", name: "Portable Waterproof Bluetooth Speaker",     price: 1799, old: 3499, rating: 4, reviews: 9760 },
  { id: 6,  category: "electronics", emoji: "🖱️", name: "Ergonomic Wireless Mouse",                  price: 599,  old: 1199, rating: 4, reviews: 15230 },

  { id: 7,  category: "fashion",     emoji: "👟", name: "Men's Lightweight Running Shoes",           price: 1299, old: 2499, rating: 4, reviews: 7430 },
  { id: 8,  category: "fashion",     emoji: "👗", name: "Women's Cotton Printed Kurta Set",          price: 899,  old: 1799, rating: 4, reviews: 4120 },
  { id: 9,  category: "fashion",     emoji: "🎒", name: "Water-Resistant Laptop Backpack 30L",       price: 749,  old: 1599, rating: 5, reviews: 21050 },
  { id: 10, category: "fashion",     emoji: "👕", name: "Men's Regular Fit Cotton T-Shirt",          price: 399,  old: 799,  rating: 4, reviews: 18900 },
  { id: 11, category: "fashion",     emoji: "🕶️", name: "UV Protected Polarised Sunglasses",         price: 499,  old: 1299, rating: 4, reviews: 6320 },
  { id: 12, category: "fashion",     emoji: "👜", name: "Women's Faux Leather Handbag",              price: 1099, old: 2199, rating: 4, reviews: 3870 }
];

/* ---------- 2. Small helper functions ---------- */
const $  = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");

function stars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

/* ---------- 3. Toast message ---------- */
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- 4. Render product shelves ---------- */
function productCard(p) {
  return `
    <article class="product" data-category="${p.category}" data-name="${p.name.toLowerCase()}">
      <div class="thumb" aria-hidden="true">${p.emoji}</div>
      <a href="#" class="name">${p.name}</a>
      <div class="stars" aria-label="${p.rating} out of 5 stars">
        ${stars(p.rating)}<small>${p.reviews.toLocaleString("en-IN")}</small>
      </div>
      <div class="price">${formatPrice(p.price)} <span class="old">${formatPrice(p.old)}</span></div>
      <button class="add" data-id="${p.id}">Add to Cart</button>
    </article>`;
}

function renderShelf(containerId, category) {
  const container = $(containerId);
  container.innerHTML = products
    .filter((p) => p.category === category)
    .map(productCard)
    .join("");
}

renderShelf("#shelfElectronics", "electronics");
renderShelf("#shelfFashion", "fashion");

/* ---------- 5. Cart counter ---------- */
const cartCountEl = $("#cartCount");
let cartCount = 0;

// Event delegation: ONE listener handles every "Add to Cart" button
document.addEventListener("click", (event) => {
  const button = event.target.closest(".add");
  if (!button) return;

  const product = products.find((p) => p.id === Number(button.dataset.id));
  cartCount += 1;
  cartCountEl.textContent = cartCount;

  // restart the little "bump" animation
  cartCountEl.classList.remove("bump");
  void cartCountEl.offsetWidth;
  cartCountEl.classList.add("bump");

  showToast(`Added to cart: ${product.name}`);
});

/* ---------- 6. Hero carousel ---------- */
const slidesEl = $("#slides");
const slideCount = $$(".slide").length;
const dotsEl = $("#dots");
let current = 0;
let autoplay;

// create one dot per slide
for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
  dot.addEventListener("click", () => { goTo(i); restartAutoplay(); });
  dotsEl.appendChild(dot);
}

function goTo(index) {
  current = (index + slideCount) % slideCount; // wraps around both ways
  slidesEl.style.transform = `translateX(-${current * 100}%)`;
  $$(".dot").forEach((d, i) => d.classList.toggle("active", i === current));
}

function startAutoplay()   { autoplay = setInterval(() => goTo(current + 1), 5000); }
function restartAutoplay() { clearInterval(autoplay); startAutoplay(); }

$("#nextBtn").addEventListener("click", () => { goTo(current + 1); restartAutoplay(); });
$("#prevBtn").addEventListener("click", () => { goTo(current - 1); restartAutoplay(); });

// pause while the mouse is over the hero
$(".hero").addEventListener("mouseenter", () => clearInterval(autoplay));
$(".hero").addEventListener("mouseleave", startAutoplay);

goTo(0);
startAutoplay();

/* ---------- 7. Live search filter ---------- */
const searchForm = $("#searchForm");
const searchInput = $("#searchInput");
const searchCategory = $("#searchCategory");

function runSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const category = searchCategory.value;
  let matches = 0;

  $$(".product").forEach((card) => {
    const okCategory = category === "all" || card.dataset.category === category;
    const okText = card.dataset.name.includes(query);
    const show = okCategory && okText;
    card.classList.toggle("hidden", !show);
    if (show) matches++;
  });

  return matches;
}

searchInput.addEventListener("input", runSearch);
searchCategory.addEventListener("change", runSearch);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const matches = runSearch();
  showToast(matches ? `${matches} product(s) found` : "No products match your search");
  $("#shelfElectronics").scrollIntoView({ behavior: "smooth", block: "center" });
});

/* ---------- 8. Sticky navbar shadow + back to top ---------- */
const navbar = $("#navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

$("#toTop").addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- 9. Keep demo links from jumping to the top ---------- */
$$('a[href="#"]').forEach((link) => {
  if (link.id === "toTop") return;
  link.addEventListener("click", (event) => event.preventDefault());
});
