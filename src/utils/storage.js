import { artisans } from '../data/artisans'
import { products } from '../data/products'
import { buyers } from '../data/buyers'
import { schemes } from '../data/schemes'

export const STORAGE_KEY = 'artisanlink-ai-state-v1'
export const CURRENT_USER_KEY = 'artisanlink-current-user'

export const getDefaultState = () => ({
  artisans,
  products,
  buyers,
  schemes,
  users: [],
  inquiries: [
    {
      id: 'inq-1',
      buyerName: 'Eco Home Store',
      productName: 'Handmade Bamboo Basket',
      message: 'Interested in a wholesale order of 80 units.',
      status: 'New'
    },
    {
      id: 'inq-2',
      buyerName: 'Craft Retailer',
      productName: 'Handloom Cotton Table Runner',
      message: 'Looking for 30 pieces for the upcoming season.',
      status: 'Responded'
    }
  ],
  notifications: [
    { id: 'note-1', type: 'info', text: 'Buyer from Chennai sent an inquiry for your Bamboo Basket.' },
    { id: 'note-2', type: 'success', text: 'Your product was matched with 3 potential buyers.' },
    { id: 'note-3', type: 'warning', text: 'Your catalog profile is 90% complete.' }
  ],
  favorites: []
})

export const loadAppState = () => {
  const fallback = getDefaultState()

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback

    const parsed = JSON.parse(raw)
    return {
      ...fallback,
      ...parsed,
      artisans: parsed.artisans?.length ? parsed.artisans : fallback.artisans,
      products: parsed.products?.length ? parsed.products : fallback.products,
      buyers: parsed.buyers?.length ? parsed.buyers : fallback.buyers,
      schemes: parsed.schemes?.length ? parsed.schemes : fallback.schemes,
      users: parsed.users || [],
      inquiries: parsed.inquiries || fallback.inquiries,
      notifications: parsed.notifications || fallback.notifications,
      favorites: parsed.favorites || []
    }
  } catch (error) {
    console.warn('Could not parse localStorage state:', error)
    return fallback
  }
}

export const saveAppState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const getCurrentUser = () => {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.warn('Could not read current user:', error)
    return null
  }
}

export const setCurrentUser = (user) => {
  if (!user) return
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}
