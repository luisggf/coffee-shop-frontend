import React, { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  cartId: string;
};

const ShoppingCartContainer: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3333/get-cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();

        console.log(data);

        // Assuming the response structure is { id: string, cartItems: Array }
        const formattedCartItems = data[0].cartItems.map((item: any) => ({
          id: item.id,
          name: item.coffee_name,
          price: item.coffee_price,
          desc: item.coffee_desc,
          quantity: item.quantity,
          image: item.img_url, // Update based on your actual data structure
          cartId: item.cartId,
        }));

        setCartItems(formattedCartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleIncrementItem = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementItem = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  return (
    <ShoppingCart
      items={cartItems}
      onRemoveItem={handleRemoveItem}
      onIncrementItem={handleIncrementItem}
      onDecrementItem={handleDecrementItem}
    />
  );
};

export default ShoppingCartContainer;
