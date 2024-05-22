import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import logo from "./../../public/trash-solid.svg";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  cartId: string;
};

type ShoppingCartProps = {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onIncrementItem: (id: number) => void;
  onDecrementItem: (id: number) => void;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
}) => {
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Credit Card");

  const subtotal = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleSortByName = () => {
    setSortCriteria("name");
  };

  const handleSortByPrice = () => {
    setSortCriteria("price");
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "price") {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    try {
      const response = await fetch("http://localhost:3333/update-cart-item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId: id,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }

      const updatedCartItem = await response.json();
      console.log("Cart item updated", updatedCartItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      toast.error("Failed to update cart item");
    }
  };

  const handleRemoveItem = async (cartitem: CartItem) => {
    console.log(cartitem);
    try {
      const response = await fetch(
        `http://localhost:3333/delete-cart-item/${cartitem.id}/${cartitem.cartId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: cartitem.id,
            cartId: cartitem.cartId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete cart item");
      }

      const result = await response.json();
      console.log("Cart item deleted", result);
      toast.success("Cart item deleted successfully");

      onRemoveItem(cartitem.id);
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to delete cart item");
    }
  };

  const handleIncrementItem = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const updatedQuantity = item.quantity + 1;
      onIncrementItem(id);
      handleUpdateQuantity(id, updatedQuantity);
    }
  };

  const handleDecrementItem = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const updatedQuantity = Math.max(1, item.quantity - 1);
      onDecrementItem(id);
      handleUpdateQuantity(id, updatedQuantity);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="mb-5 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Default sorting
                <ChevronDownIcon className="ml-2 h-5 w-5" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-50 min-w-[150px] bg-white border border-gray-200 rounded-md shadow-md">
              <DropdownMenu.Item
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleSortByName}
              >
                Sort by Name
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleSortByPrice}
              >
                Sort by Price
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <div className="cart-container custom-scrollbar">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover"
                />
                <div className="flex-1 ml-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrementItem(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrementItem(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 size-3 ml-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      className="fill-grey-500 hover:fill-red-500 size-5"
                      d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 border-t pt-4">
            <span className="font-semibold">Subtotal</span>
            <span>${subtotal}</span>
          </div>
        </>
      )}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Payment</h2>
        <div className="flex mb-4">
          <button
            className={`mr-2 px-3 py-2 border rounded-md shadow-sm text-sm font-medium ${
              selectedPaymentMethod === "Credit Card"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedPaymentMethod("Credit Card")}
          >
            Credit Card
          </button>
          <button
            className={`px-3 py-2 border rounded-md shadow-sm text-sm font-medium ${
              selectedPaymentMethod === "PIX"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedPaymentMethod("PIX")}
          >
            PIX
          </button>
        </div>
        {selectedPaymentMethod === "Credit Card" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="4114 5784 2105 2145"
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="02/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="885"
                />
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
              Pay Now ${subtotal}
            </button>
          </div>
        )}
        {selectedPaymentMethod === "PIX" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">PIX payment instructions...</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
              Pay Now ${subtotal}
            </button>
          </div>
        )}
      </div>
      <style>
        {`
              .cart-container {
                max-height: 300px; /* Adjust as needed */
                overflow-y: auto;
              }
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #cbd5e0; /* Tailwind's gray-300 */
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background-color: #f7fafc; /* Tailwind's gray-100 */
              }
              `}
      </style>
    </div>
  );
};

export default ShoppingCart;
