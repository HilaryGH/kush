import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Hope from './Hope'
import Footer from './Footer'
import Registration from './Registration'
import SignIn from './SignIn'
import WomenInitiatives from './WomenInitiatives'
import DiasporaCommunity from './DiasporaCommunity'
import ProfessionalCommunity from './ProfessionalCommunity'
import PremiumCommunity from './PremiumCommunity'
import InvestPartner from './InvestPartner'
import { ToastProvider } from './components/ui'
import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './context/SocketContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'
// Dashboard Pages
import UserDashboard from './pages/dashboard/UserDashboard'
import VendorDashboard from './pages/dashboard/VendorDashboard'
import RiderDashboard from './pages/dashboard/RiderDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import Restaurants from './pages/Restaurants'
import RestaurantDetail from './pages/RestaurantDetail'
import Cart from './pages/Cart'
import VendorRegistration from './pages/VendorRegistration'
import MenuManagement from './pages/dashboard/MenuManagement'
import UsersManagement from './pages/dashboard/UsersManagement'

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <ToastProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-slate-900 flex flex-col">
                  <Navbar />
                  <Hope />
                  <Footer />
                </div>
              } />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/women-initiatives" element={
                <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-slate-900 flex flex-col">
                  <Navbar />
                  <WomenInitiatives />
                  <Footer />
                </div>
              } />
              <Route path="/diaspora-community" element={
                <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-slate-900 flex flex-col">
                  <Navbar />
                  <DiasporaCommunity />
                  <Footer />
                </div>
              } />
              <Route path="/professional-community" element={
                <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-slate-900 flex flex-col">
                  <Navbar />
                  <ProfessionalCommunity />
                  <Footer />
                </div>
              } />
              <Route path="/premium-community" element={
                <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-slate-900 flex flex-col">
                  <Navbar />
                  <PremiumCommunity />
                  <Footer />
                </div>
              } />
              <Route path="/invest-partner" element={
                <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-slate-900 flex flex-col">
                  <Navbar />
                  <InvestPartner />
                  <Footer />
                </div>
              } />
              <Route path="/vendor-registration" element={<VendorRegistration />} />
              
              {/* Public Restaurants Route */}
              <Route path="/restaurants" element={
                <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-slate-900">
                  <Navbar />
                  <Restaurants />
                  <Footer />
                </div>
              } />

              {/* User Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <DashboardLayout role="user">
                    <UserDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/restaurants" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <DashboardLayout role="user">
                    <Restaurants />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/restaurant/:id" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <DashboardLayout role="user">
                    <RestaurantDetail />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/cart" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <DashboardLayout role="user">
                    <Cart />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard/orders" element={
                <ProtectedRoute allowedRoles={['user']}>
                  <DashboardLayout role="user">
                    <UserDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />

              {/* Vendor Dashboard Routes */}
              <Route path="/vendor/dashboard" element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <DashboardLayout role="vendor">
                    <VendorDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/vendor/menu" element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <DashboardLayout role="vendor">
                    <MenuManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              } />

              {/* Rider Dashboard Routes */}
              <Route path="/rider/dashboard" element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <DashboardLayout role="rider">
                    <RiderDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />

              {/* Admin Dashboard Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin', 'support', 'marketing']}>
                  <DashboardLayout role="admin">
                    <AdminDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin', 'support', 'marketing']}>
                  <DashboardLayout role="admin">
                    <UsersManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </ToastProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
