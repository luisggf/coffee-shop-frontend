import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Header from "./MainCoffeeHeader";

interface Product {
  id: number;
  name: string;
  image: string;
  priceRange: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Colombia Dark Roast",
    image: "./public/coffee-breed-1.jpg",
    priceRange: "$19.00 – $27.00",
  },
  {
    id: 2,
    name: "Swiss Water Decaf",
    image: "./public/coffee-breed-2.jpg",
    priceRange: "$19.00 – $27.00",
  },
  {
    id: 3,
    name: "French Roast",
    image: "./public/coffee-breed-3.jpg",
    priceRange: "$19.00 – $27.00",
  },
  {
    id: 4,
    name: "Breakfast Blend",
    image: "./public/coffee-breed-4.jpg",
    priceRange: "$19.00 – $27.00",
  },
];

const CoffeeProducts: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <Header></Header>

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
          <DropdownMenu.Content className="min-w-[150px] bg-white border border-gray-200 rounded-md shadow-md">
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
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="mt-2 text-gray-600">{product.priceRange}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeProducts;
