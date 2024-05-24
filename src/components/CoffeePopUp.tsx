import React, { useState } from "react";
import { Product } from "./CoffeeProducts"; // Correctly importing the Product type
import axios from "axios";
import { toast } from "sonner";

interface CoffeePopupProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onRemove: (productId: string) => void;
}

const CoffeePopup: React.FC<CoffeePopupProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState<File | null>(null);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    if (image) {
      formData.append("file", image);
    }
    console.log(formData.get("name"));
    try {
      const response = await axios.put(
        `http://localhost:3333/update-coffee/${product.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update response:", response.data);
    } catch (error) {
      console.error("Error updating coffee:", error);
    }

    toast.success("Coffee updated successfully!");
    onClose();
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  async function deleteCoffee() {
    try {
      const response = await axios.delete(
        `http://localhost:3333/delete-coffee/${product.id}`
      );
      console.log("Delete response:", response.data);
      toast.success("Coffee was deleted successfully!");
    } catch (error) {
      console.error("Error deleting coffee:", error);
      toast.error("Failed to delete coffee. Coffee cannot be on the cart!");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 custom-scrollbar">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/4">
        <div className="flex items-center mb-4">
          <img
            src={product.img_url}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-full mr-3"
          />
          <h2 className="text-2xl font-bold text-gray-800">Update Coffee</h2>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block custom-scrollbar">
            <span className="block text-sm font-medium text-gray-700">
              Description
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm custom-scrollbar"
            ></textarea>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Price
            </span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
          <label className="block relative">
            <span className="block text-sm font-medium text-gray-700">
              Image
            </span>
            <div className="relative mt-1">
              <input
                type="file"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {image && (
                <button
                  onClick={handleRemoveImage}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    className="fill-red-500"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z"></path>
                  </svg>
                </button>
              )}
            </div>
          </label>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={deleteCoffee}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Remove
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </div>
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

export default CoffeePopup;
