import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Header from "./MainCoffeeHeader";
import { toast } from "sonner";
import CoffeePopup from "./CoffeePopUp";

export interface Product {
  cartId: string;
  img_url: string | undefined;
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image?: string;
}

const CoffeeProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [cartId, setCartId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<string>("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3333/coffees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const products = data.map((product: Product) => ({
          ...product,
        }));
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch coffee products:", error);
      }
    };

    fetchProducts();

    const fetchCartId = async () => {
      try {
        const response = await fetch("http://localhost:3333/get-cartID");
        if (!response.ok) {
          throw new Error("Failed to fetch cart ID");
        }
        const data = await response.json();
        setCartId(data.cartId);
      } catch (error) {
        console.error("Failed to fetch cart ID:", error);
      }
    };

    fetchCartId();
  }, []);

  const handleAddToCart = async (
    product: Product | null,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // Stop event propagation to prevent the card click handler

    if (!product) {
      toast.error("Failed to get Product");
      console.log("Failed connection");
      return;
    }

    product.quantity = quantity;

    try {
      const response = await fetch("http://localhost:3333/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: cartId,
          coffee_name: product.name,
          coffee_desc: product.description,
          coffeeId: product.id,
          quantity: product.quantity,
          coffee_price: product.price,
          img_url: product.img_url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await response.json();
      console.log("Item added to cart", data);
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart");
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3333/remove-coffee/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product");
      }

      const data = await response.json();
      console.log("Product removed", data);
      toast.success("Product removed");

      // Update the state to remove the product from the list
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Error removing product");
    }
  };

  const handleSortByName = () => {
    setSortCriteria("name");
  };

  const handleSortByPrice = () => {
    setSortCriteria("price");
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div className="mx-auto">
      <Header />
      <div className="container mx-auto px-4 mt-15">
        <header className="flex justify-between items-center py-4">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4">
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
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer"
              onClick={() => {
                setSelectedProduct(product);
                setIsPopupOpen(true);
              }}
            >
              <img
                src={product.img_url}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 overflow-y-auto max-h-40 custom-scrollbar mb-5">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="mt-2 text-gray-600">
                  ${product.price.toFixed(2)}
                </p>
                <p className="mt-2 text-gray-600 pb-8">{product.description}</p>
              </div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    className="absolute bottom-0 w-full bg-gray-100 flex justify-center items-end hover:bg-green-500 hover:text-white"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <div className="relative py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mt-4 h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </div>
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="z-50 min-w-[150px] bg-white border border-gray-200 rounded-md shadow-md p-4">
                  <div className="flex flex-col space-y-4">
                    <label className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700">Quantity:</span>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-16 p-1 border border-gray-300 rounded-md"
                        min={1}
                      />
                    </label>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <CoffeePopup
            product={selectedProduct}
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onRemove={handleRemoveProduct}
          />
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

export default CoffeeProducts;
