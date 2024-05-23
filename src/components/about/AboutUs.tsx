import React from "react";
import Header from "../MainCoffeeHeader";

const AboutUs: React.FC = () => {
  return (
    <div className="mx-auto">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 flex flex-col justify-center">
          <h2 className="text-sm font-semibold text-orange-500 mb-2">
            ABOUT US
          </h2>
          <h1 className="text-4xl font-bold mb-4">Dedication to Quality</h1>
          <p className="text-lg mb-8">
            Our mission is to provide sustainably sourced, hand-picked,
            micro-roasted quality coffee. Great coffee is our passion and we
            want to share it with you.
          </p>
          <p className="text-lg mb-8">
            We strive to form profound partnerships with farmers from all over
            the world to create perspective together and form healthy working
            relationships built on trust and respect.
          </p>
        </div>
        <div className="md:w-1/2 h-full">
          <div className="relative h-full">
            <video
              src="./src/assets/amaya-video-1-xs.mp4"
              className="w-full h-full object-cover rounded-lg shadow-lg"
              autoPlay
              loop
              muted
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-xl font-semibold p-4">
                Everything we do is a matter of heart, body and soul.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 h-full">
          <img
            src="./src/assets/coffeebean-beans-2.jpg"
            alt="Coffee Beans Bag"
            className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 flex flex-col justify-center">
          <h2 className="text-sm font-semibold text-orange-500 mb-2">
            OUR MISSION
          </h2>
          <h1 className="text-4xl font-bold mb-4">
            We source coffee from <i>all over the world</i> from farmers we know
            and trust
          </h1>
          <p className="text-lg mb-8">
            Fair trade siphon crema extra, viennese qui, foam viennese siphon
            est so caramelization. Carajillo sit ut extra chicory aged instant
            crema chicory. Et, dark a cup, cortado, siphon at arabica flavour
            macchiato. Cream, at, acerbic redeye iced americano coffee white. To
            go et, steamed a café au lait.
          </p>
        </div>
      </div>

      {/* Last Section */}
      <div className="text-center py-8">
        <section className="mb-8">
          <h2 className="text-lg text-[#b89a73] mb-2">OUR PHILOSOPHY</h2>
          <h1 className="text-3xl mb-4">
            Coffee is our <span className="italic font-bold">craft</span>, our{" "}
            <span className="italic font-bold">ritual</span>, our{" "}
            <span className="italic font-bold">passion</span>.
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Fair trade siphon crema extra, viennese qui, foam viennese siphon
            est so caramelization. Carajillo sit ut extra chicory aged instant
            crema chicory. Et, dark a cup, cortado, siphon at arabica flavour
            macchiato. Cream, at, acerbic redeye iced americano coffee white. To
            go et, steamed a café au lait, single origin aftertaste frappuccino
            blue mountain whipped.
          </p>
        </section>
        <section className="flex justify-between space-x-4 px-0">
          <div className="flex-2">
            <img
              src="./src/assets/coffeebean-01-1600x1600.jpg"
              alt="Coffee Farm"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="flex">
            <img
              src="/src/assets/coffeebean-beans-7-1600x1539.jpg"
              alt="Coffee Beans"
              className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="flex">
            <img
              src="/src/assets/coffeebean-beans-square.jpg"
              alt="Coffee Process"
              className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
