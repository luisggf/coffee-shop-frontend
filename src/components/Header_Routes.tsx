import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AboutUs from "./about/AboutUs";
import CoffeeProducts from "./CoffeeProducts";

function Router_APP() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<CoffeeProducts />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default Router_APP;
