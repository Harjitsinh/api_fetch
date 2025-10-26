import React from 'react'
import ProductItem from './ProductItem'

export default function ProductList({ products = [] }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductItem key={p.id ?? p.title} product={p} />
      ))}
    </div>
  )
}
