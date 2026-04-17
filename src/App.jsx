import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodList from "./components/FoodList";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`
      );

      const data = await res.json();

      // Filter valid products
      const filtered = data.products.filter(
        (item) =>
          item.product_name && item.product_name.trim() !== ""
      );

      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
      setProducts([]);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🍎 Food Nutrition Search</h1>

      <SearchBar onSearch={handleSearch} />

      {/* UI STATES */}

      {!searched && <p>Start searching for a food item...</p>}

      {loading && <p>Loading...</p>}

      {!loading && searched && products.length === 0 && (
        <p>No results found ❌</p>
      )}

      {!loading && products.length > 0 && (
        <FoodList products={products} />
      )}
    </div>
  );
}

export default App;