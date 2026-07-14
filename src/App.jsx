import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';

// Global Contexts
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CustomCursor from './components/common/CustomCursor';
import LoadingScreen from './components/common/LoadingScreen';
import ScrollToTop from './components/common/ScrollToTop';
import CartDrawer from './components/cart/CartDrawer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Simulate preloader timer
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => {
      lenis.destroy();
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            
            {/* Global Animated Preloader */}
            <LoadingScreen isFinished={isLoaded} />

            {/* Custom Desktop Cursor */}
            <CustomCursor />

            {/* Application Router */}
            <Router>
              {/* Reset Scroll position on navigation changes */}
              <ScrollToTop />
              
              <div className="flex flex-col min-h-screen">
                {/* Header Navigation */}
                <Navbar />

                {/* Sliding Checkout Drawer */}
                <CartDrawer />

                {/* Main Content Router */}
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>

                {/* Editorial Footer */}
                <Footer />
              </div>
            </Router>

            {/* Toast Notifications Provider */}
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#121212',
                  color: '#FFFFFF',
                  border: '1px solid #1C1C1C',
                }
              }}
            />

          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
