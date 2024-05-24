import * as Dialog from "@radix-ui/react-dialog";
import ShoppingCartContainer from "./ShoppingCartParent";
import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";

interface CoffeeData {
  name: string;
  description: string;
  price: number;
  imgFile: File | null;
}

export default function Header() {
  const [coffeeData, setCoffeeData] = useState<CoffeeData>({
    name: "",
    description: "",
    price: 0,
    imgFile: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setCoffeeData((prevData) => ({
      ...prevData,
      [id]: id === "price" ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    } else {
      setCoffeeData((prevData) => ({
        ...prevData,
        imgFile: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", coffeeData.name);
    formData.append("description", coffeeData.description);
    formData.append("price", coffeeData.price.toString());
    if (coffeeData.imgFile) {
      formData.append("img_file", coffeeData.imgFile);
    }

    try {
      await axios.post("http://localhost:3333/ins-coffee", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCoffeeData({
        name: "",
        description: "",
        price: 0,
        imgFile: null,
      });
      toast.success("Coffee was added sucessfully!");
    } catch (error) {
      console.error("Error adding coffee:", error);
      toast.error("Failed to add coffee. Please try again.");
    }
  };

  return (
    <Dialog.Root>
      <header
        className="bg-cover bg-center py-4 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.1)]"
        style={{ backgroundImage: "url(/public/style_images/background.png)" }}
      >
        <div className="w-full flex items-center justify-between px-4">
          <nav className="space-x-4">
            <Dialog.Trigger asChild>
              <button className="text-gray-100 drop-shadow-md hover:text-gray-400 transition duration-300 ml-10">
                Add Coffee
              </button>
            </Dialog.Trigger>
            <Link
              to="/about"
              className="text-gray-100 hover:text-gray-400 transition duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-100 hover:text-gray-400 transition duration-300"
            >
              Contact
            </Link>
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
                    <ShoppingCartContainer />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <Link
                to="/shop"
                className="text-gray-100 hover:text-gray-400 transition duration-300 mr-10"
              >
                Shop
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 w-[400px] rounded-md shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold">Add New Coffee</h2>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={coffeeData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={coffeeData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                step="0.01"
                id="price"
                value={coffeeData.price}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="img_file"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="img_file"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Insert
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
