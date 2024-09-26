import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/ProductList/ProductList';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart/Cart';
import Likes from './pages/Likes/Likes';
import ScrollToTop from './components/Nav/ScrollToTop';
import AdminPage from './pages/AdminPage/adminPage';
import UserPayment from './pages/Payment/UserPayment';
import Complete from './pages/Payment/Complete';
import Payment from './pages/Payment/Payment';
import NonCart from './pages/Cart/NonCart';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product_detail/:itemId" element={<ProductDetail />} />
        <Route path="/product_list/:id/:id2" element={<ProductList />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/users/admin" element={<AdminPage />} />
        <Route path="/payment/user" element={<UserPayment />}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path="/payment/complete" element={<Complete />}/>
        <Route path="/nonCarts" element={<NonCart />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
