import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import ArtisanDashboard from './pages/ArtisanDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AddProduct from './pages/AddProduct'
import Catalog from './pages/Catalog'
import ProductDetails from './pages/ProductDetails'
import MarketLinkage from './pages/MarketLinkage'
import ArtisanProfile from './pages/ArtisanProfile'
import Schemes from './pages/Schemes'
import Notifications from './pages/Notifications'
import { loadAppState, saveAppState, getCurrentUser, setCurrentUser, clearCurrentUser } from './utils/storage'
import { createNotification } from './utils/mockAPI'

function AppLayout({ currentUser, onLogout, children }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <div className="app-body">
        <Sidebar />
        <main className="main-panel">{children}</main>
      </div>
      <nav className="mobile-tabbar">
        <a href="/artisan">🏠</a>
        <a href="/catalog">🛍️</a>
        <a href="/add-product">➕</a>
        <a href="/market-linkage">📈</a>
        <a href="/notifications">💬</a>
      </nav>
    </div>
  )
}

function App() {
  const [appState, setAppState] = useState(loadAppState)
  const [currentUser, setCurrentUserState] = useState(getCurrentUser)

  useEffect(() => {
    saveAppState(appState)
  }, [appState])

  useEffect(() => {
    if (currentUser) {
      setCurrentUser(currentUser)
    } else {
      clearCurrentUser()
    }
  }, [currentUser])

  const setState = (updater) => {
    setAppState((previous) => {
      const next = typeof updater === 'function' ? updater(previous) : updater
      return next
    })
  }

  const handleRegister = (formData) => {
    const nextUser = {
      ...formData,
      userType: formData.userType || 'Artisan',
      id: formData.id || `user-${Date.now()}`
    }

    setState((previous) => ({
      ...previous,
      users: [...previous.users, nextUser]
    }))

    setCurrentUserState(nextUser)
  }

  const handleLogin = (loggedInUser) => {
    setCurrentUserState(loggedInUser)
  }

  const handleLogout = () => {
    setCurrentUserState(null)
  }

  const handleAddProduct = (product) => {
    setState((previous) => ({
      ...previous,
      products: [product, ...previous.products],
      notifications: [
        createNotification(`New product ${product.name} is live in the catalog.`),
        ...previous.notifications
      ]
    }))
  }

  const handleToggleFavorite = (productId) => {
    setState((previous) => {
      const nextFavorites = previous.favorites.includes(productId)
        ? previous.favorites.filter((id) => id !== productId)
        : [...previous.favorites, productId]

      return {
        ...previous,
        favorites: nextFavorites
      }
    })
  }

  const requireAuth = (element) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />
    }

    return element
  }

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login users={appState.users} onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onRegister={handleRegister} />} />
      <Route path="/admin" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <AdminDashboard artisans={appState.artisans} buyers={appState.buyers} products={appState.products} inquiries={appState.inquiries} />
        </AppLayout>,
      )} />
      <Route path="/artisan" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <ArtisanDashboard currentUser={currentUser} products={appState.products} notifications={appState.notifications} />
        </AppLayout>,
      )} />
      <Route path="/buyer" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <BuyerDashboard products={appState.products} buyers={appState.buyers} favorites={appState.favorites} onToggleFavorite={handleToggleFavorite} />
        </AppLayout>,
      )} />
      <Route path="/add-product" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <AddProduct currentUser={currentUser} onAddProduct={handleAddProduct} />
        </AppLayout>,
      )} />
      <Route path="/catalog" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <Catalog products={appState.products} favorites={appState.favorites} onToggleFavorite={handleToggleFavorite} />
        </AppLayout>,
      )} />
      <Route path="/product/:id" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <ProductDetails products={appState.products} />
        </AppLayout>,
      )} />
      <Route path="/market-linkage" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <MarketLinkage products={appState.products} buyers={appState.buyers} />
        </AppLayout>,
      )} />
      <Route path="/artisan-profile/:artisanId?" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <ArtisanProfile artisans={appState.artisans} products={appState.products} />
        </AppLayout>,
      )} />
      <Route path="/schemes" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <Schemes schemes={appState.schemes} />
        </AppLayout>,
      )} />
      <Route path="/notifications" element={requireAuth(
        <AppLayout currentUser={currentUser} onLogout={handleLogout}>
          <Notifications notifications={appState.notifications} />
        </AppLayout>,
      )} />
    </Routes>
  )
}

export default App
