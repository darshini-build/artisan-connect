export const createDemoInquiry = (buyer, product) => ({
  id: `inq-${Date.now()}`,
  buyerName: buyer.name,
  productName: product.name,
  message: `Buyer from ${buyer.location} sent an inquiry for ${product.name}.`,
  status: 'New'
})

export const createNotification = (text, type = 'info') => ({
  id: `note-${Date.now()}`,
  text,
  type
})

export const calculateProductViews = (products = []) =>
  products.reduce((total, product) => total + (product.views || 0), 0)

export const calculateBuyerInquiries = (inquiries = []) => inquiries.length
