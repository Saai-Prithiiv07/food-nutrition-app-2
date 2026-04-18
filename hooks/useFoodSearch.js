import { useState } from "react";
import axios from "axios";

export default function useFoodSearch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchFood = async (query) => {
    if (query.length < 2) {
      setError("Enter at least 2 characters");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&json=true`
      );

      setData(res.data.products);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, searchFood };
}