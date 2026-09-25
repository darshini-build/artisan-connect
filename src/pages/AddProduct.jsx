import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzeProduct } from '../utils/mockAI'

const initialForm = {
  name: '',
  category: 'Bamboo Craft',
  material: 'Bamboo',
  craftType: 'Basketry',
  description: '',
  price: '450',
  quantity: '20',
  location: 'Chennai',
  image: '',
  tags: '',
  availableForWholesale: 'Yes',
  customOrders: 'Yes'
}

const makePlaceholder = (label) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250">
    <rect width="400" height="250" fill="#edf6ed"/>
    <rect x="60" y="60" width="280" height="130" rx="18" fill="#d7efdb"/>
    <text x="200" y="135" text-anchor="middle" font-size="26" fill="#1f4028" font-family="Arial">${label}</text>
  </svg>
`)}`

export default function AddProduct({ currentUser, onAddProduct }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [aiResult, setAiResult] = useState(null)

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  }

  const handleAnalyze = () => {
    const suggestion = analyzeProduct({
      name: form.name,
      category: form.category,
      material: form.material,
      craftType: form.craftType,
      description: form.description,
      price: Number(form.price) || 450
    })

    setAiResult(suggestion)
    setForm((previous) => ({
      ...previous,
      category: suggestion.category,
      description: suggestion.description,
      tags: suggestion.tags.join(', '),
      price: String(suggestion.suggestedPrice),
      name: suggestion.title
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const cleanedTags = form.tags
      ? form.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : ['Handmade', 'Traditional Craft']

    const product = {
      id: `product-${Date.now()}`,
      name: form.name || 'New Artisan Product',
      artisanId: currentUser?.id || 'artisan-1',
      artisan: currentUser?.name || 'Artisan User',
      category: form.category,
      material: form.material,
      price: Number(form.price) || 450,
      quantity: Number(form.quantity) || 20,
      location: form.location,
      description: form.description || 'Handcrafted product created for the market.',
      craftType: form.craftType,
      image: form.image || makePlaceholder(form.name || 'New Product'),
      tags: cleanedTags,
      targetCustomers: aiResult?.targetCustomers || ['Home Decor', 'Retailers'],
      approved: true,
      views: 0,
      inquiries: 0,
      wholesale: form.availableForWholesale === 'Yes',
      customOrders: form.customOrders === 'Yes'
    }

    onAddProduct(product)
    navigate('/artisan')
  }

  return (
    <div className="page-shell">
      <div className="header-row">
        <div>
          <p className="eyebrow">Smart Product Cataloging</p>
          <h2>Add product</h2>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-grid two-col">
          <label>
            Product image URL
            <input name="image" value={form.image} onChange={handleChange} placeholder="Paste image URL or leave blank" />
          </label>
          <label>
            Product name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange} />
          </label>
          <label>
            Material
            <input name="material" value={form.material} onChange={handleChange} />
          </label>
          <label>
            Craft type
            <input name="craftType" value={form.craftType} onChange={handleChange} />
          </label>
          <label>
            Price (₹)
            <input name="price" type="number" value={form.price} onChange={handleChange} />
          </label>
          <label>
            Quantity
            <input name="quantity" type="number" value={form.quantity} onChange={handleChange} />
          </label>
          <label>
            Location
            <input name="location" value={form.location} onChange={handleChange} />
          </label>
          <label>
            Available for wholesale
            <select name="availableForWholesale" value={form.availableForWholesale} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            Custom orders
            <select name="customOrders" value={form.customOrders} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>

        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
        </label>

        <label>
          AI generated tags
          <input name="tags" value={form.tags} onChange={handleChange} />
        </label>

        <div className="ai-panel">
          <button type="button" className="primary-btn" onClick={handleAnalyze}>AI Analyze Product</button>
          {aiResult && (
            <div className="ai-result">
              <h3>AI Prototype / Demo</h3>
              <p><strong>Suggested category:</strong> {aiResult.category}</p>
              <p><strong>Suggested title:</strong> {aiResult.title}</p>
              <p><strong>Suggested product description:</strong> {aiResult.description}</p>
              <p><strong>Relevant keywords:</strong> {aiResult.tags.join(', ')}</p>
              <p><strong>Suggested price range:</strong> {aiResult.priceRange}</p>
              <p><strong>Target customer category:</strong> {aiResult.targetCustomers.join(', ')}</p>
              <p><strong>Recommended marketplace category:</strong> {aiResult.marketplaceCategory}</p>
            </div>
          )}
        </div>

        <button type="submit" className="primary-btn full">Confirm Product</button>
      </form>
    </div>
  )
}
