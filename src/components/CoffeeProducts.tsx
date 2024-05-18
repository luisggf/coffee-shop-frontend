import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Header from "./MainCoffeeHeader";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
}

const CoffeeProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const images = [
    "./public/coffee-breed-1.jpg",
    "./public/coffee-breed-2.jpg",
    "./public/coffee-breed-3.jpg",
    "./public/coffee-breed-4.jpg",
    "./public/coffee-breed-5.jpg",
    "./public/coffee-breed-6.jpg",
    "./public/coffee-breed-7.jpg",
  ];

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3333/coffees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const productsWithImages = data.map((product: Product) => ({
          ...product,
          image: getRandomImage(),
        }));
        setProducts(productsWithImages);
      } catch (error) {
        console.error("Failed to fetch coffee products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto">
      <Header />
      <div className="container mx-auto px-4 mt-15">
        <header className="flex justify-between items-center py-4">
          <nav className="flex space-x-4">
            <a href="#" className="hover:underline">
              Shop All
            </a>
            <a href="#" className="hover:underline">
              Coffee
            </a>
            <a href="#" className="hover:underline">
              Cold Brew
            </a>
            <a href="#" className="hover:underline">
              Decaf
            </a>
            <a href="#" className="hover:underline">
              Merchandise
            </a>
          </nav>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Default sorting
                <ChevronDownIcon className="ml-2 h-5 w-5" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-50 min-w-[150px] bg-white border border-gray-200 rounded-md shadow-md">
              <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sort by Name
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sort by Price
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 overflow-y-scroll max-h-40">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="mt-2 text-gray-600">${product.price}</p>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>
              <div className="absolute bottom-0 w-full bg-gray-100 flex justify-center items-end">
                <div className="relative py-2">
                  {/* <div className="absolute top-0 left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-sm text-white">
                      3
                    </p>
                  </div> */}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoffeeProducts;
