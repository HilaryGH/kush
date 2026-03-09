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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-slate-900 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hope />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/women-initiatives" element={<WomenInitiatives />} />
          <Route path="/diaspora-community" element={<DiasporaCommunity />} />
          <Route path="/professional-community" element={<ProfessionalCommunity />} />
          <Route path="/premium-community" element={<PremiumCommunity />} />
          <Route path="/invest-partner" element={<InvestPartner />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
