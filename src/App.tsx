import React, { useEffect, useMemo, useState } from 'react';
import './Style/App.css';
import { BrowserRouter } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';
import Products from './components/Products';
import WebglCanvas from './components/WebglCanvas';
import Footer from './components/Footer';
import GsapAnimations from './utils/gsapAnimations'
import ProductDetail from './components/ProductDetail';
import ProductCompactments from './components/ProductCompactments';
import LoadingOverlay from './components/LoadingOverlay';
import AuthPanel from './components/AuthPanel';
import CartPanel from './components/CartPanel';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { useCart } from './hooks/useCart';
import productsData from './dummyData';

function App() {
  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState<boolean>(false);
  const [isCartPanelOpen, setIsCartPanelOpen] = useState<boolean>(false);

  const handleBuyNow = () => {
    addToCart(activeProduct);
    setIsCartPanelOpen(true);
  };

  const {
    user,
    isLoading,
    isConfigured,
    configMessage,
    authError,
    logout,
    resetError,
    handleSubmit,
  } = useFirebaseAuth();

  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const activeProduct = useMemo(
    () => productsData[activeProductIndex] ?? productsData[0],
    [activeProductIndex]
  );

  useEffect(() => {
    const animation = new GsapAnimations();

    const getIndex = () => {
      const indexDetails = animation.products.getActiveProductIndex();
      if (indexDetails.animateDirection === 'Forward') setActiveProductIndex(indexDetails.index + 1);
      if (indexDetails.animateDirection === 'Backward') setActiveProductIndex(indexDetails.index - 1);
      if (indexDetails.animateDirection === 'None') setActiveProductIndex(indexDetails.index);

    }

    window.addEventListener('click', getIndex);

    return () => {
      window.removeEventListener('click', getIndex);
      animation?.dispose();
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="app_wrapper">
        <div className="app_outer">
          <div className="app">
            <HeaderNav
              userEmail={user?.email ?? ''}
              isUserLoggedIn={Boolean(user)}
              cartCount={cartCount}
              onLoginClick={() => {
                resetError();
                setIsAuthPanelOpen(true);
              }}
              onLogoutClick={logout}
              onCartClick={() => setIsCartPanelOpen(true)}
            />
            <main>
              <Products activeProductIndex={activeProductIndex} />
              <ProductDetail
                activeProductIndex={activeProductIndex}
                activeProduct={activeProduct}
                onAddToCart={addToCart}
                onOpenCart={() => setIsCartPanelOpen(true)}
                onBuyNow={handleBuyNow}
              />
              <ProductCompactments activeProductIndex={activeProductIndex} />
            </main>
            <Footer />
          </div>
          <div className="gradient_background_innerWrapper">
            <div role={'presentation'} className="gradient_background_inner" />
            <div role={'presentation'} className="gradient_background_inner sec" />
          </div>

          <WebglCanvas />
          <AuthPanel
            isOpen={isAuthPanelOpen}
            isConfigured={isConfigured}
            isLoading={isLoading}
            configMessage={configMessage}
            authError={authError}
            onSubmit={handleSubmit}
            onClose={() => setIsAuthPanelOpen(false)}
            onClearError={resetError}
          />
          <CartPanel
            isOpen={isCartPanelOpen}
            cartItems={cartItems}
            cartCount={cartCount}
            cartTotal={cartTotal}
            onClose={() => setIsCartPanelOpen(false)}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
          />
        </div>
        <div role={'presentation'} className="gradient_background_outer" />
        <div className='credits'>
          <span className='designer'>
            <small>
              Designed by
            </small>
            <a href="#https://www.linkedin.com/in/harshvardhansb/">
              MonkHarshu
            </a>
          </span>
          <span className='dev'>
            <span>
              Built with &#10084;&#65039; by
            </span>
            <a href="https://www.linkedin.com/in/harshvardhansb//">
              Harshvardhan Bhosale
            </a>
          </span>
        </div>
        <LoadingOverlay />
      </div>

    </BrowserRouter>
  );
}

export default App;
