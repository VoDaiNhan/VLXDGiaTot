import sql from './db';

// ==================== PRODUCTS ====================

export async function getProducts() {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    ORDER BY p.created_at DESC
  `;
  return products;
}

export async function getProductById(id) {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.id = ${id}
  `;
  return products[0] || null;
}

export async function getProductBySlug(slug) {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.slug = ${slug}
  `;
  return products[0] || null;
}

export async function getProductsByCategory(categorySlug) {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE c.slug = ${categorySlug}
    ORDER BY p.created_at DESC
  `;
  return products;
}

export async function getProductsByBrand(brand) {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.brand = ${brand}
    ORDER BY p.created_at DESC
  `;
  return products;
}

export async function searchProducts(query) {
  const searchTerm = `%${query}%`;
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.name ILIKE ${searchTerm} 
       OR p.brand ILIKE ${searchTerm}
       OR c.name ILIKE ${searchTerm}
    ORDER BY p.created_at DESC
  `;
  return products;
}

// ==================== CATEGORIES ====================

export async function getCategories() {
  const categories = await sql`SELECT * FROM categories ORDER BY name`;
  return categories;
}

export async function getCategoryBySlug(slug) {
  const categories = await sql`SELECT * FROM categories WHERE slug = ${slug}`;
  return categories[0] || null;
}

// ==================== USERS & AUTH ====================

export async function createUser(email, passwordHash, name, phone) {
  const users = await sql`
    INSERT INTO users (email, password_hash, name, phone)
    VALUES (${email}, ${passwordHash}, ${name}, ${phone})
    RETURNING id, email, name, phone, created_at
  `;
  return users[0];
}

export async function getUserByEmail(email) {
  const users = await sql`SELECT * FROM users WHERE email = ${email}`;
  return users[0] || null;
}

export async function getUserById(id) {
  const users = await sql`
    SELECT id, email, name, phone, address, created_at 
    FROM users WHERE id = ${id}
  `;
  return users[0] || null;
}

export async function updateUser(id, data) {
  const { name, phone, address } = data;
  const users = await sql`
    UPDATE users 
    SET name = ${name}, phone = ${phone}, address = ${address}
    WHERE id = ${id}
    RETURNING id, email, name, phone, address
  `;
  return users[0];
}

// ==================== ORDERS ====================

export async function createOrder(userId, orderData, items) {
  const { total, shippingName, shippingPhone, shippingAddress, paymentMethod, notes } = orderData;
  
  // Create order
  const orders = await sql`
    INSERT INTO orders (user_id, total, shipping_name, shipping_phone, shipping_address, payment_method, notes)
    VALUES (${userId}, ${total}, ${shippingName}, ${shippingPhone}, ${shippingAddress}, ${paymentMethod}, ${notes})
    RETURNING *
  `;
  const order = orders[0];
  
  // Create order items
  for (const item of items) {
    await sql`
      INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
      VALUES (${order.id}, ${item.productId}, ${item.productName}, ${item.quantity}, ${item.price})
    `;
  }
  
  return order;
}

export async function getOrdersByUser(userId) {
  const orders = await sql`
    SELECT * FROM orders 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  `;
  return orders;
}

export async function getOrderById(id) {
  const orders = await sql`SELECT * FROM orders WHERE id = ${id}`;
  if (!orders[0]) return null;
  
  const items = await sql`
    SELECT oi.*, p.images 
    FROM order_items oi 
    LEFT JOIN products p ON oi.product_id = p.id 
    WHERE oi.order_id = ${id}
  `;
  
  return { ...orders[0], items };
}

export async function updateOrderStatus(id, status) {
  const orders = await sql`
    UPDATE orders SET status = ${status} WHERE id = ${id} RETURNING *
  `;
  return orders[0];
}
