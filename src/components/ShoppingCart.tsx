import React from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
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
  const subtotal = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover"
              />
              <div className="flex flex-col ml-4">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500">{item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onDecrementItem(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onIncrementItem(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-4 border-t pt-4">
            <span className="font-semibold">Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
