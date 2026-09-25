const categoryHints = {
  bamboo: 'Bamboo Craft',
  basket: 'Basketry',
  wood: 'Wood Craft',
  pottery: 'Pottery',
  clay: 'Pottery',
  handloom: 'Handloom',
  cotton: 'Handloom',
  embroidery: 'Embroidery',
  textile: 'Embroidery',
  jewelry: 'Jewelry',
  silver: 'Jewelry',
  painting: 'Traditional Painting',
  art: 'Traditional Painting'
}

export const generateKeywords = (name, category, material, description) => {
  const values = [name, category, material, description]
  const words = values
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3)

  const unique = [...new Set(words)]
  return unique.slice(0, 8).map((word) => word.charAt(0).toUpperCase() + word.slice(1))
}

export const analyzeProduct = (productInput = {}) => {
  const productName = productInput.name || 'Handcrafted Artisan Product'
  const material = productInput.material || 'Natural fiber'
  const category = productInput.category || categoryHints[productInput.craftType?.toLowerCase()] || 'Bamboo Craft'
  const title = productName
  const baseDescription = productInput.description || `${productName} is a handcrafted product made with ${material} by skilled artisans.`

  const tags = generateKeywords(productName, category, material, baseDescription)
  const priceBase = Number(productInput.price) || 450
  const low = Math.max(250, Math.round(priceBase * 0.7))
  const high = Math.round(priceBase * 1.45)

  return {
    category,
    title,
    description: `${baseDescription} It blends traditional craftsmanship with modern utility and appeal.`,
    tags: tags.length ? tags : ['Handmade', 'Traditional Craft', 'Eco-friendly'],
    priceRange: `₹${low}–₹${high}`,
    targetCustomers: ['Home Decor', 'Retailers', 'Gift Buyers'],
    marketplaceCategory: `${category} / Handmade Goods`,
    suggestedPrice: Math.round((low + high) / 2)
  }
}

export const generateMarketMatches = (product, buyers = []) => {
  const matches = buyers.map((buyer) => {
    let score = 55

    if (buyer.preferredCategories?.includes(product.category)) {
      score += 20
    }

    if (buyer.location === product.location) {
      score += 15
    }

    if (product.price <= 1000) {
      score += 10
    }

    if (product.quantity >= buyer.requiredQuantity) {
      score += 10
    }

    const requirementText = buyer.requirement || buyer.interest
    const density = requirementText.toLowerCase().includes(product.category.toLowerCase()) ? 10 : 0
    const matchScore = Math.min(98, Math.max(65, score + density))

    return {
      id: buyer.id,
      name: buyer.name,
      matchScore: Math.round(matchScore),
      requirement: requirementText,
      requiredQuantity: buyer.requiredQuantity,
      location: buyer.location,
      quantity: product.quantity,
      buyerType: buyer.type,
      budgetRange: buyer.budgetRange
    }
  })

  return matches.sort((a, b) => b.matchScore - a.matchScore)
}
