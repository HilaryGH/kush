import './App.css'
import Navbar from './Navbar'
import Hope from './Hope'
import Footer from './Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-slate-900 flex flex-col">
      <Navbar />
      <Hope />
      <Footer />
    </div>
  )
}

export default App
