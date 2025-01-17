import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.title} height="50" />
              <h4>{item.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>${item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
