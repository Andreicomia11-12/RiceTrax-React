// pages/SalesScreen.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DateTimeDisplay from "../components/DateTimeDisplay";
import "../styles/salesScreen.css";

const SalesScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Jasmine Rice 5kg", price: 350, quantity: 1 },
    { id: 2, name: "Dinorado Rice 10kg", price: 720, quantity: 2 },
  ]);
  const [cash, setCash] = useState("");

  const handleQuantityChange = (id, delta) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
  };

  const handleRemove = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;
  const change = cash ? cash - total : 0;

  return (
    <div className="sales-page">
      <Sidebar />
      <div className="sales-container">
        <DateTimeDisplay />
        

        <div className="left-section">
          <h2>Cart</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart">No items in cart</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <span>{item.name}</span>
                  <span>₱{item.price}</span>
                </div>
                <div className="item-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>x</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="right-section">
          <h2>Summary</h2>
          <div className="summary-box">
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Tax (12%):</span>
              <span>₱{tax.toFixed(2)}</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <label>Cash:</label>
              <input
                type="number"
                value={cash}
                onChange={e => setCash(parseFloat(e.target.value) || "")}
                placeholder="Enter cash amount"
              />
            </div>
            <div className="summary-line change">
              <span>Change:</span>
              <span>{change < 0 ? "₱0.00" : `₱${change.toFixed(2)}`}</span>
            </div>
            <button className="checkout-btn" disabled={total === 0 || change < 0}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesScreen;
