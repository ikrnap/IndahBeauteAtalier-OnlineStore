const API_BASE_URL = (window.API_BASE && String(window.API_BASE).replace(/\/$/, '')) || (window.__API_BASE__ && String(window.__API_BASE__).replace(/\/$/, '')) || (window.location.origin + '/api');
const STORAGE_AUTH_TOKEN = 'IndahBeauteAuthToken';
const STORAGE_ADMIN_TOKEN = 'IndahBeauteAdminToken';

function safeSetItem(k, v) { try { localStorage.setItem(k, v); } catch(e) { } }
function safeGetItem(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
function safeRemoveItem(k) { try { localStorage.removeItem(k); } catch(e) { } }

function getAuthToken() {
  return (typeof safeGetItem === 'function' ? safeGetItem(STORAGE_AUTH_TOKEN) : localStorage.getItem(STORAGE_AUTH_TOKEN)) || null;
}

function setAuthToken(token) {
  if (!token) return safeRemoveItem(STORAGE_AUTH_TOKEN);
  try { (typeof safeSetItem === 'function' ? safeSetItem(STORAGE_AUTH_TOKEN, token) : localStorage.setItem(STORAGE_AUTH_TOKEN, token)); } catch(e) {}
}

function clearAuthToken() {
  try { (typeof safeRemoveItem === 'function' ? safeRemoveItem(STORAGE_AUTH_TOKEN) : localStorage.removeItem(STORAGE_AUTH_TOKEN)); } catch(e) {}
}

function getAdminToken() {
  return (typeof safeGetItem === 'function' ? safeGetItem(STORAGE_ADMIN_TOKEN) : localStorage.getItem(STORAGE_ADMIN_TOKEN)) || null;
}

function setAdminToken(token) {
  if (!token) return safeRemoveItem(STORAGE_ADMIN_TOKEN);
  try { (typeof safeSetItem === 'function' ? safeSetItem(STORAGE_ADMIN_TOKEN, token) : localStorage.setItem(STORAGE_ADMIN_TOKEN, token)); } catch(e) {}
}

function clearAdminToken() {
  try { (typeof safeRemoveItem === 'function' ? safeRemoveItem(STORAGE_ADMIN_TOKEN) : localStorage.removeItem(STORAGE_ADMIN_TOKEN)); } catch(e) {}
}

async function apiRequest(path, method = 'GET', body = null, useAdmin = false) {
  const url = `${API_BASE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json' };
  const token = useAdmin ? getAdminToken() : getAuthToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const opts = { method, headers };
  if (body != null) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.error || 'API request failed');
    err.status = res.status;
    throw err;
  }
  return data;
}

async function fetchProducts() {
  return apiRequest('/products');
}

async function fetchProduct(id) {
  return apiRequest(`/products/${id}`);
}

async function fetchProductReviews(id) {
  return apiRequest(`/products/${id}/reviews`);
}

async function postProductReview(id, review) {
  return apiRequest(`/products/${id}/reviews`, 'POST', review);
}

async function loginCustomer(email, password) {
  return apiRequest('/auth/login', 'POST', { email, password });
}

async function registerCustomer(nama, email, password) {
  return apiRequest('/auth/register', 'POST', { nama, email, password });
}

async function loginAdmin(password) {
  return apiRequest('/auth/admin/login', 'POST', { password });
}

async function fetchCurrentUser() {
  return apiRequest('/auth/me');
}

async function fetchAdminInfo() {
  return apiRequest('/auth/admin/me', 'GET', null, true);
}

async function fetchCart() {
  return apiRequest('/cart');
}

async function saveCart(items) {
  return apiRequest('/cart', 'PUT', { items });
}

async function clearCartServer() {
  return apiRequest('/cart', 'DELETE');
}

async function fetchOrders() {
  return apiRequest('/orders');
}

async function createOrder(payload) {
  return apiRequest('/orders', 'POST', payload);
}

async function updateOrderStatus(orderNum, status) {
  return apiRequest(`/orders/${orderNum}`, 'PATCH', { status }, true);
}

async function createProduct(product) {
  return apiRequest('/products', 'POST', product, true);
}

async function updateProduct(id, product) {
  return apiRequest(`/products/${id}`, 'PUT', product, true);
}

async function deleteProduct(id) {
  return apiRequest(`/products/${id}`, 'DELETE', null, true);
}

function mapDbProduct(product) {
  if (!product) return product;
  return {
    ...product,
    id: Number(product.id),
    name: product.nama_produk,
    price: Number(product.harga),
    category: product.kategori,
    foto: product.foto_produk,
    image: product.foto_produk,
    desc: product.deskripsi,
    review: Array.isArray(product.review) ? product.review : []
  };
}

function mapProducts(productList) {
  return Array.isArray(productList) ? productList.map(mapDbProduct) : [];
}
