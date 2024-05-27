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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddCoffeeDialogOpen, setIsAddCoffeeDialogOpen] = useState(false);

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
        imgFile: e.target.files![0],
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
      toast.success("Coffee was added successfully!");
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
          <button onClick={() => setIsMenuOpen(true)}>
            <svg
              className="fill-white rounded-sm p-2"
              version="1.1"
              id="Capa_1"
              width="30px"
              height="30px"
              viewBox="0 0 24.75 24.75"
            >
              <g>
                <path
                  d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
        c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
        c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"
                />
              </g>
            </svg>
          </button>
          <div className="flex items-center">
            <img
              src="/public/style_images/logo.png"
              alt="Coffee Shop Logo"
              className="h-20 w-auto"
            />
          </div>
          <nav className="space-x-4 relative">
            <Dialog.Root>
              <Dialog.Trigger className="text-gray-100 hover:text-gray-400 transition duration-300 relative">
                <a href="#">Cart</a>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="absolute overflow-auto right-5 top-20 bg-white p-5 rounded-md shadow-lg">
                  <ShoppingCartContainer />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="bg-black/50 w-full h-full"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="bg-white w-80 p-5 fixed top-0 left-0 h-full shadow-lg">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center">
                <img
                  src="../../public/coffee-bean.png"
                  alt="Icon"
                  className="mr-2 size-12"
                />
                Coffee Menu
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 hover:text-gray-600 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <hr className="mb-4 border-gray-200" />
            <nav className="space-y-4">
              <Link
                to="/"
                className="flex items-center text-gray-800 hover:bg-green-500 hover:text-white rounded-md p-3 transition duration-300 hover:fill-white"
              >
                <svg
                  className="mr-2"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                Home
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAddCoffeeDialogOpen(true);
                }}
                className="flex w-full items-center text-gray-800 hover:bg-green-500 hover:text-white rounded-md p-3 transition duration-300 hover:fill-white"
              >
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 309.059 309.059"
                  className="mr-3"
                >
                  <g>
                    <g>
                      <path
                        d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338
          v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843
          c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822
          c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z"
                      />
                    </g>
                  </g>
                </svg>
                Add Coffee
              </button>
              <Link
                to="/about"
                className="flex items-center text-gray-800 hover:bg-green-500 hover:text-white rounded-md p-2 ml-1 transition duration-300 hover:fill-white"
              >
                <svg
                  className="mr-2"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 21.5c-5.25 0-9.5-4.25-9.5-9.5S6.75 2.5 12 2.5 21.5 6.75 21.5 12 17.25 21.5 12 21.5zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                About
              </Link>
              <Link
                to="/contact"
                className="flex items-center text-gray-800 hover:bg-green-500 hover:text-white rounded-md p-2 ml-1 transition duration-300 hover:fill-white"
              >
                <svg
                  className="mr-2"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-9 1.67-9 5v3h18v-3c0-3.33-5.67-5-9-5z" />
                </svg>
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      {isAddCoffeeDialogOpen && (
        <Dialog.Root
          open={isAddCoffeeDialogOpen}
          onOpenChange={setIsAddCoffeeDialogOpen}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 w-[400px] rounded-md shadow-lg">
              <form className="space-y-4" onSubmit={handleSubmit}>
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                    min={0.01}
                    value={coffeeData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Insert
                  </button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </Dialog.Root>
  );
}
