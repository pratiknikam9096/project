import { Routes, Route } from 'react-router-dom'
import Feedbackreceive from './components/Feedbackreceive'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Feedbacks from './pages/Feedbacks'
import ColorPicker from './pages/ColorPicker'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage';
import { CartProvider } from './components/CartContext';


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Feedback" element={<Feedbacks />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/Feedbackreceive" element={<Feedbackreceive/>}/>
          <Route path="/ProductPage" element={<ProductPage />} /> 
           <Route path="/cart" element={<CartPage />} />
           </Routes>
        </CartProvider>
      </main>
      <Footer />
    </div>
  )
}

export default App