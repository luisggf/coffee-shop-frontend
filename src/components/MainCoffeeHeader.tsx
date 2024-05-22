// maincoffeeheader.tsx
import * as Dialog from "@radix-ui/react-dialog";
import ShoppingCartContainer from "./ShoppingCartParent";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Dialog.Root>
      <header
        className="bg-cover bg-center py-4 drop-shadow-[0px_5px_5px_rgba(0,0,0,0.1)]"
        style={{ backgroundImage: "url(/public/style_images/background.png)" }}
      >
        <div className="w-full flex items-center justify-between px-4">
          <nav className="space-x-4">
            <Link
              to="/add-coffee"
              className="text-gray-100 drop-shadow-md hover:text-gray-400 transition duration-300 ml-10"
            >
              Add Coffee
            </Link>
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
    </Dialog.Root>
  );
}
