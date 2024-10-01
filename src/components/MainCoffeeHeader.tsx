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
              <h2 className="text-xl font-semibold  flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 300"
                  width="50"
                  height="50"
                  className="mr-2"
                >
                  <path
                    fill="#AA6148"
                    d="M79.16 257.416c-14.429 14.427-34.401 17.855-44.605 7.653-10.194-10.202-6.774-30.171 7.662-44.598 14.43-14.433 34.395-17.858 44.598-7.659 10.203 10.205 6.781 30.171-7.655 44.604z"
                  />
                  <path
                    fill="#BC715C"
                    d="M47.697 225.952c13.11-13.113 30.765-17.102 41.541-10.081-.707-1.087-1.488-2.126-2.423-3.059-10.203-10.198-30.168-6.773-44.598 7.659-14.436 14.427-17.856 34.396-7.662 44.598.935.936 1.976 1.716 3.062 2.424-7.019-10.777-3.036-28.434 10.08-41.541z"
                  />
                  <path
                    fill="#BC715C"
                    d="M39.159 266.395c-.597 0-1.19-.006-1.785-.018a4.457 4.457 0 0 1-4.369-4.544c.044-2.439 2.03-4.385 4.446-4.385.028 0 .056 0 .084.003 10.06.171 17.986.325 20.183-19.954 2.41-22.217 18.472-26.521 26.65-25.704 2.442.248 4.224 2.436 3.98 4.893-.247 2.442-2.432 4.24-4.844 3.995-1.549-.115-14.935-.694-16.94 17.781-2.71 25.019-14.814 27.933-27.405 27.933z"
                  />
                  <path
                    fill="#F4F4F4"
                    d="M231.946 97.044h-5.87v16.302h5.87c21.337 0 22.993 22.591 22.993 29.513v43.851c0 14.262-13.32 27.318-28.863 29.241v15.862c0 .174-.022.343-.024.517 24.483-1.993 45.19-22.432 45.19-45.62v-43.851c0-27.407-15.792-45.815-39.296-45.815z"
                  />
                  <path
                    fill="#F4F4F4"
                    d="M85.093 77.754v133.567c.595.467 1.18.948 1.721 1.491 7.691 7.692 7.633 20.926.961 33.159 5.678 14.604 19.834 24.971 36.444 24.971h62.729c21.61 0 39.127-17.519 39.127-39.13V77.754H85.093z"
                  />
                  <path
                    fill="#F9F9F9"
                    d="M104.406 245.971c6.672-12.233 6.729-25.467-.961-33.159a18.62 18.62 0 0 0-1.721-1.491V77.754h-16.63v133.567c.595.467 1.18.948 1.721 1.491 7.691 7.692 7.633 20.926.961 33.159 5.678 14.604 19.834 24.971 36.444 24.971h16.63c-16.611 0-30.766-10.367-36.444-24.971z"
                  />
                  <path
                    fill="#F4F4F4"
                    d="M152.323 58.889a4.533 4.533 0 0 1-4.535-4.535V29.055a4.535 4.535 0 0 1 9.07 0v25.299a4.533 4.533 0 0 1-4.535 4.535z"
                  />
                  <path
                    fill="#F9F9F9"
                    d="M152.323 54.354V29.055c0-1.674.917-3.121 2.268-3.906a4.483 4.483 0 0 0-2.268-.629 4.535 4.535 0 0 0-4.535 4.535v25.299a4.533 4.533 0 0 0 4.535 4.535 4.48 4.48 0 0 0 2.268-.626c-1.352-.785-2.268-2.232-2.268-3.909z"
                  />
                  <path
                    fill="#F4F4F4"
                    d="M177.326 61.045a4.536 4.536 0 0 1-4.535-4.535V36.59a4.535 4.535 0 0 1 9.07 0v19.919a4.535 4.535 0 0 1-4.535 4.536z"
                  />
                  <path
                    fill="#F9F9F9"
                    d="M177.326 56.509V36.59c0-1.674.918-3.121 2.268-3.906a4.486 4.486 0 0 0-2.268-.629 4.535 4.535 0 0 0-4.535 4.535v19.919a4.535 4.535 0 0 0 4.535 4.535c.83 0 1.599-.239 2.268-.629-1.35-.785-2.268-2.231-2.268-3.906z"
                  />
                  <path
                    fill="#F4F4F4"
                    d="M126.789 63.064a4.535 4.535 0 0 1-4.535-4.535V45.877a4.533 4.533 0 0 1 4.535-4.535 4.533 4.533 0 0 1 4.535 4.535v12.652a4.535 4.535 0 0 1-4.535 4.535z"
                  />
                  <path
                    fill="#F9F9F9"
                    d="M126.789 58.529V45.877c0-1.674.918-3.121 2.268-3.907a4.486 4.486 0 0 0-2.268-.629 4.533 4.533 0 0 0-4.535 4.535v12.652a4.535 4.535 0 0 0 4.535 4.535c.83 0 1.599-.242 2.268-.632-1.35-.784-2.268-2.228-2.268-3.902z"
                  />
                  <path
                    fill="#AA6148"
                    d="M190.365 161.984c0-9.605-7.785-17.389-17.387-17.389-9.334 0-16.925 7.352-17.352 16.576l-.061-.021-.022.006c-.436-9.215-8.024-16.562-17.35-16.562-9.607 0-17.389 7.783-17.389 17.389 0 4.272 1.547 8.179 4.102 11.208h-.005l30.688 30.903 30.685-30.903h-.009a17.328 17.328 0 0 0 4.1-11.207z"
                  />
                  <path
                    fill="#BC715C"
                    d="M139.28 173.192h.004a17.33 17.33 0 0 1-4.101-11.208c0-7.036 4.184-13.081 10.193-15.818a17.267 17.267 0 0 0-7.183-1.571c-9.607 0-17.389 7.783-17.389 17.389 0 4.272 1.547 8.179 4.102 11.208h-.005l30.688 30.903 7.189-7.24-23.498-23.663z"
                  />
                  <g>
                    <path
                      fill="#161616"
                      d="M226.052 236.865a4.54 4.54 0 0 1-3.089-1.214 4.54 4.54 0 0 1-1.447-3.36c.001-.089.016-.425.022-.514l.001-15.827a4.536 4.536 0 0 1 3.979-4.5c13.488-1.668 24.884-12.998 24.884-24.741v-43.851c0-7.509-1.798-24.977-18.458-24.977h-5.87a4.536 4.536 0 0 1-4.535-4.535V97.044a4.535 4.535 0 0 1 4.535-4.535h5.87c26.217 0 43.832 20.235 43.832 50.35v43.851c0 25.432-22.141 47.926-49.358 50.14a4.93 4.93 0 0 1-.366.015zm4.559-17.123v7.382c20.015-3.951 36.096-21.478 36.096-40.414v-43.851c0-25.078-13.645-41.279-34.761-41.279h-1.335v7.231h1.335c20.297 0 27.528 17.589 27.528 34.048v43.851c0 15.15-12.623 29.244-28.863 33.032zM152.323 58.889a4.535 4.535 0 0 1-4.535-4.535V29.055a4.535 4.535 0 1 1 9.07 0v25.299a4.535 4.535 0 0 1-4.535 4.535zM177.326 61.045a4.535 4.535 0 0 1-4.535-4.535V36.59a4.535 4.535 0 1 1 9.07 0v19.919a4.533 4.533 0 0 1-4.535 4.536zM126.789 63.064a4.535 4.535 0 0 1-4.535-4.535V45.877a4.535 4.535 0 1 1 9.07 0v12.652a4.535 4.535 0 0 1-4.535 4.535zM155.59 208.631a4.53 4.53 0 0 1-3.219-1.341l-30.688-30.903a5.016 5.016 0 0 1-.251-.275 21.981 21.981 0 0 1-5.163-14.129c0-12.088 9.836-21.924 21.924-21.924a21.857 21.857 0 0 1 17.39 8.572 21.866 21.866 0 0 1 17.395-8.572c12.088 0 21.923 9.836 21.923 21.924a21.95 21.95 0 0 1-4.984 13.91c-.128.174-.269.34-.424.493l-30.685 30.903a4.522 4.522 0 0 1-3.218 1.342zm-27.325-38.495 27.325 27.522 27.274-27.469a12.875 12.875 0 0 0 2.966-8.206c0-7.087-5.765-12.853-12.852-12.853a12.82 12.82 0 0 0-12.821 12.251 4.537 4.537 0 0 1-1.978 3.54 4.57 4.57 0 0 1-3.802.611 4.546 4.546 0 0 1-3.365-4.16c-.323-6.865-5.956-12.242-12.819-12.242-7.088 0-12.853 5.767-12.853 12.853 0 2.965 1.038 5.856 2.925 8.153zM49.907 275.481c-7.299 0-13.795-2.442-18.559-7.205-11.953-11.961-8.514-34.845 7.662-51.011 16.174-16.175 39.054-19.618 51.011-7.659 11.666 11.666 8.815 33.528-6.489 49.768a4.535 4.535 0 1 1-6.602-6.218c11.721-12.437 14.715-29.096 6.678-37.136-8.414-8.406-25.546-4.978-38.185 7.659-12.426 12.419-15.934 29.905-7.661 38.185 5.126 5.126 13.835 5.97 23.298 2.256a4.541 4.541 0 0 1 5.879 2.566 4.537 4.537 0 0 1-2.566 5.879c-4.983 1.953-9.885 2.916-14.466 2.916z"
                    />
                    <path
                      fill="#161616"
                      d="M186.949 275.478H124.22c-18.125 0-34.091-10.937-40.671-27.862a4.54 4.54 0 0 1 .245-3.815c5.916-10.848 5.842-21.753-.186-27.782a13.629 13.629 0 0 0-1.314-1.128 4.539 4.539 0 0 1-1.736-3.57v-88.91a4.535 4.535 0 0 1 9.07 0v86.813c.134.127.267.254.397.384 8.533 8.536 9.542 22.71 2.753 36.561 5.619 12.36 17.753 20.238 31.441 20.238h62.729c19.073 0 34.591-15.52 34.591-34.594V82.29H89.629v19.199a4.535 4.535 0 0 1-9.07 0V77.754a4.535 4.535 0 0 1 4.535-4.535h140.982a4.535 4.535 0 0 1 4.535 4.535v154.059c0 24.076-19.587 43.665-43.662 43.665z"
                    />
                    <path
                      fill="#161616"
                      d="M37.36 266.575a4.536 4.536 0 0 1-.137-9.068l.847-.027c10.884-.322 17.454-.52 19.633-20.067 2.489-22.331 18.819-26.639 27.081-25.783a4.534 4.534 0 0 1 4.051 4.972 4.537 4.537 0 0 1-4.946 4.054c-1.563-.139-15.109-.735-17.172 17.761-3.05 27.378-17.095 27.794-28.379 28.131l-.836.024c-.046.003-.095.003-.142.003z"
                    />
                  </g>
                </svg>
                Borcelle Coffee
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
            <nav className="space-y-2">
              <Link
                to="/"
                className="flex items-center text-gray-800 hover:bg-green-500 hover:text-white rounded-md p-3 transition duration-300 hover:fill-white"
              >
                <svg
                  width="24"
                  height="24"
                  className="mr-2"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
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
                  width="24"
                  height="24"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M2 3.5C2 3.22386 2.22386 3 2.5 3H12.5C12.7761 3 13 3.22386 13 3.5V9.5C13 9.77614 12.7761 10 12.5 10H2.5C2.22386 10 2 9.77614 2 9.5V3.5ZM2 10.9146C1.4174 10.7087 1 10.1531 1 9.5V3.5C1 2.67157 1.67157 2 2.5 2H12.5C13.3284 2 14 2.67157 14 3.5V9.5C14 10.1531 13.5826 10.7087 13 10.9146V11.5C13 12.3284 12.3284 13 11.5 13H3.5C2.67157 13 2 12.3284 2 11.5V10.9146ZM12 11V11.5C12 11.7761 11.7761 12 11.5 12H3.5C3.22386 12 3 11.7761 3 11.5V11H12ZM5 6.5C5 6.22386 5.22386 6 5.5 6H7V4.5C7 4.22386 7.22386 4 7.5 4C7.77614 4 8 4.22386 8 4.5V6H9.5C9.77614 6 10 6.22386 10 6.5C10 6.77614 9.77614 7 9.5 7H8V8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5V7H5.5C5.22386 7 5 6.77614 5 6.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                New Brew
              </button>
              <Link
                to="/about"
                className="flex items-center text-gray-800 hover:bg-green-500 hover:text-white rounded-md p-3 transition duration-300 hover:fill-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  className="mr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M 4.0097656 3 C 2.9179106 3 2.0097656 3.9049841 2.0097656 4.9980469 L 2 23 L 6 19 L 20 19 C 21.093063 19 22 18.093063 22 17 L 22 5 C 22 3.9069372 21.093063 3 20 3 L 4.0097656 3 z M 4.0097656 5 L 20 5 L 20 17 L 5.171875 17 L 4.0039062 18.167969 L 4.0097656 5 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 15 L 13 15 L 13 11 L 11 11 z"></path>
                </svg>
                About
              </Link>
              <Link
                to="/contact"
                className="flex items-center text-gray-800 hover:bg-green-500 hover:text-white rounded-md p-3 transition duration-300 hover:fill-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120 120"
                  className="mr-2 ml-0.5"
                  width="21"
                  height="21"
                >
                  <switch>
                    <g>
                      <path d="M120 100.8H0V19.2h120v81.6zM5 95.9h110V24.1H5v71.8z" />
                      <path d="M60 74.2.9 23.6l3.2-3.8L60 67.7l55.9-47.9 3.2 3.8z" />
                      <path d="M.565 96.726 38.86 52.9l3.765 3.29L4.33 100.016zM77.248 56.18l3.763-3.293 38.324 43.801-3.763 3.293z" />
                    </g>
                  </switch>
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
