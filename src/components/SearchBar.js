import React, { useEffect, useState } from 'react'

export default function SearchBar({ onSearch, value = '' }) {
  const [text, setText] = useState(value)
  useEffect(() => setText(value || ''), [value])

  const submit = (e) => {
    e.preventDefault()
    const trimmed = (text || '').trim()
    onSearch(trimmed)
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
      <input
        className="search-input"
        placeholder="Search products by name..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="category-select" type="submit">Search</button>
    </form>
  )
}
