import * as Dialog from "@radix-ui/react-dialog";
import ShoppingCart from "./ShoppingCart";
import { useState } from "react";

export default function Header() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Latte Coffee",
      price: 2.99,
      quantity: 2,
      image: "./public/coffee-breed-1.jpg",
    },
    {
      id: 2,
      name: "Mocha Coffee",
      price: 3.19,
      quantity: 1,
      image: "./public/coffee-breed-2.jpg",
    },
  ]);

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleIncrementItem = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementItem = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <Dialog.Root>
      <header
        className="bg-cover bg-center py-4 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.1)]"
        style={{ backgroundImage: "url(/public/style_images/background.png)" }}
      >
        <div className="w-full flex items-center justify-between px-4">
          <nav className="space-x-4">
            <a
              href="#"
              className="text-gray-100 drop-shadow-md hover:text-gray-400 transition duration-300 ml-10"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-100 hover:text-gray-400 transition duration-300"
            >
              Menu
            </a>
            <a
              href="#"
              className="text-gray-100 hover:text-gray-400 transition duration-300"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-100 hover:text-gray-400 transition duration-300"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center">
            <img
              src="/public/style_images/logo.png"
              alt="Coffee Shop Logo"
              className="h-20 w-auto"
            />
          </div>
          <div>
            <nav className="space-x-4 relative">
              <Dialog.Root>
                <Dialog.Trigger className="text-gray-100 hover:text-gray-400 transition duration-300 relative">
                  <a href="#">Cart</a>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                  <Dialog.Content className="absolute right-5 top-20 bg-white p-5 w-[400px] h-[600px] rounded-md shadow-lg">
                    <ShoppingCart
                      items={cartItems}
                      onRemoveItem={handleRemoveItem}
                      onIncrementItem={handleIncrementItem}
                      onDecrementItem={handleDecrementItem}
                    />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <a
                href="#"
                className="text-gray-100 hover:text-gray-400 transition duration-300 mr-10"
              >
                Shop
              </a>
            </nav>
          </div>
        </div>
      </header>
    </Dialog.Root>
  );
}
