import React, { useEffect, useState, useRef } from 'react'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import ProductList from './components/ProductList'

const API_BASE = 'https://dummyjson.com/products'

export default function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const abortRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    abortRef.current = controller

    async function fetchProducts() {
      setLoading(true)
      setError('')
      try {
        let url = API_BASE
        if (selectedCategory) url = `${API_BASE}/category/${encodeURIComponent(selectedCategory)}`
        else if (query) url = `${API_BASE}/search?q=${encodeURIComponent(query)}`

        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(String(res.status))
        const data = await res.json()
        if (Array.isArray(data)) setProducts(data)
        else if (data && Array.isArray(data.products)) setProducts(data.products)
        else if (data && data.id) setProducts([data])
        else setProducts([])
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error(err)
        setError('Failed to fetch products. Please try again.')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [query, selectedCategory])

  useEffect(() => {
    let mounted = true
    fetch(`${API_BASE}/categories`)
      .then((r) => {
        if (!r.ok) throw new Error('categories fetch failed')
        return r.json()
      })
      .then((data) => {
        if (!mounted) return
        if (Array.isArray(data)) setCategories(data)
        else if (data && data.categories) setCategories(data.categories)
        else setCategories([])
      })
      .catch((err) => console.error(err))
    return () => (mounted = false)
  }, [])

  const handleSearch = (text) => {
    setSelectedCategory('')
    setQuery(text || '')
  }

  const handleSelectCategory = (cat) => {
    setQuery('')
    setSelectedCategory(cat || '')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Product Explorer</h1>
        <p className="subtitle">Browse products from DummyJSON</p>
      </header>

      <section className="controls">
        <SearchBar onSearch={handleSearch} value={query} />
        <CategoryFilter categories={categories} onSelect={handleSelectCategory} selected={selectedCategory} />
      </section>

      <main>
        {loading && <div className="loading">Loading products…</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && <ProductList products={products} />}
        {!loading && !error && products.length === 0 && <div className="empty">No products found.</div>}
      </main>

      <footer className="footer">
        <small>Data from DummyJSON · <a href="https://dummyjson.com">dummyjson.com</a></small>
      </footer>
    </div>
  )
}
