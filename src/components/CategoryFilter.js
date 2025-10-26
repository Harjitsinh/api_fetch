import React from 'react'

export default function CategoryFilter({ categories = [], onSelect, selected = '' }) {
  // Handle both string and object category formats
  const normalized = categories.map((c) => {
    if (typeof c === 'string') return { slug: c, name: c }
    return { slug: c.slug || c.name || c.url || '', name: c.name || c.slug || 'Unknown' }
  })

  return (
    <select className="category-select" value={selected} onChange={(e) => onSelect(e.target.value)}>
      <option value="">All categories</option>
      {normalized.map((c) => (
        <option key={c.slug} value={c.slug}>
          {c.name}
        </option>
      ))}
    </select>
  )
}
