export default function Header() {
  return (
    <header className="bg-white py-4 drop-shadow-[0px_5px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto flex items-center justify-between">
        <nav className="space-x-4">
          <a
            href="#"
            className="text-grey-700 hover:text-gray-400 transition duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="text-grey-700 hover:text-gray-400 transition duration-300"
          >
            Menu
          </a>
          <a
            href="#"
            className="text-grey-700 hover:text-gray-400 transition duration-300"
          >
            About
          </a>
          <a
            href="#"
            className="text-grey-700 hover:text-gray-400 transition duration-300"
          >
            Contact
          </a>
        </nav>
        <div className="flex items-center">
          <img
            src="/public/fauget-coffee.png"
            alt="Coffee Shop Logo"
            className="h-20 w-auto"
          />
        </div>
        <div>
          <nav className="space-x-4">
            <a
              href="#"
              className="text-grey-700 hover:text-gray-400 transition duration-300"
            >
              Cart
            </a>
            <a
              href="#"
              className="text-grey-700 hover:text-gray-400 transition duration-300"
            >
              Shop
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
