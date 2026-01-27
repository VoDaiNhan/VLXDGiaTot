import { useState, useEffect } from 'react';
import { getProducts, getProductById, getProductsByCategory, getProductsByBrand, searchProducts, getCategories } from './api';
import { products as staticProducts } from '../data/products';

// Flag to use database or static data
// Set to true when deploying with proper backend
const USE_DATABASE = import.meta.env.VITE_USE_DATABASE === 'true';

// Transform static product to match DB format
function transformProduct(p) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
    category_name: p.category,
    brand: p.brand,
    price: p.originalPrice,
    sale_price: p.salePrice,
    description: p.description,
    unit: p.unit,
    stock: p.stock || 100,
    rating: p.rating,
    reviews: p.reviews,
    images: p.images,
    is_new: p.isNew,
    is_sale: p.isSale,
    is_best_seller: p.isBestSeller,
  };
}

// ==================== PRODUCTS HOOKS ====================

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        if (USE_DATABASE) {
          const data = await getProducts();
          setProducts(data);
        } else {
          setProducts(staticProducts.map(transformProduct));
        }
      } catch (err) {
        setError(err.message);
        // Fallback to static data on error
        setProducts(staticProducts.map(transformProduct));
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        if (USE_DATABASE) {
          const data = await getProductById(id);
          setProduct(data);
        } else {
          const p = staticProducts.find(p => p.id === parseInt(id));
          setProduct(p ? transformProduct(p) : null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  return { product, loading, error };
}

export function useProductsByCategory(categoryName) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        if (USE_DATABASE) {
          const data = await getProductsByCategory(categoryName);
          setProducts(data);
        } else {
          const filtered = staticProducts.filter(p => 
            p.category.toLowerCase().includes(categoryName.toLowerCase())
          );
          setProducts(filtered.map(transformProduct));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [categoryName]);

  return { products, loading, error };
}

export function useProductsByBrand(brand) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        if (USE_DATABASE) {
          const data = await getProductsByBrand(brand);
          setProducts(data);
        } else {
          const filtered = staticProducts.filter(p => 
            p.brand?.toLowerCase() === brand.toLowerCase()
          );
          setProducts(filtered.map(transformProduct));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [brand]);

  return { products, loading, error };
}

export function useSearchProducts(query) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        if (USE_DATABASE) {
          const data = await searchProducts(query);
          setProducts(data);
        } else {
          const q = query.toLowerCase();
          const filtered = staticProducts.filter(p => 
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q)
          );
          setProducts(filtered.map(transformProduct));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [query]);

  return { products, loading, error };
}

// ==================== CATEGORIES HOOKS ====================

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        if (USE_DATABASE) {
          const data = await getCategories();
          setCategories(data);
        } else {
          // Static categories
          const cats = [...new Set(staticProducts.map(p => p.category))];
          setCategories(cats.map((name, i) => ({
            id: i + 1,
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
          })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return { categories, loading };
}
