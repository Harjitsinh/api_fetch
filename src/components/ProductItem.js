import React, { useState } from 'react'

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-size="20">No Image</text></svg>'

export default function ProductItem({ product }) {
  const [src, setSrc] = useState(product?.thumbnail || (product?.images && product.images[0]) || PLACEHOLDER)
  const title = product?.title || 'Untitled'
  const price = typeof product?.price === 'number' ? product.price : ''
  const rating = product?.rating ?? ''

  return (
    <article className="product-card">
      <img src={src} alt={title} loading="lazy" onError={() => setSrc(PLACEHOLDER)} />
      <div className="product-title">{title}</div>
      <div className="product-meta">
        <div className="price">{price !== '' ? `₹${price}` : '—'}</div>
        <div className="rating">{rating !== '' ? `⭐ ${rating}` : 'N/A'}</div>
      </div>
    </article>
  )
}
