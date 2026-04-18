import { useState } from "react";
import { Search, AlertCircle } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query || query.length < 2) {
      setError("Please enter at least 2 characters to search.");
      return;
    }

    setError("");
    onSearch(query);
  };

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px' }}>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <Search 
            size={20} 
            color="#666" 
            style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.length >= 2) setError("");
            }}
            placeholder="Search for snacks, meals, or ingredients..."
            style={{ width: '100%', paddingLeft: '45px', fontSize: '1rem' }}
          />
        </div>
        <button type="submit" className="btn-primary" style={{ padding: '0 30px' }}>
          Search
        </button>
      </form>

      {error && (
        <div style={{ 
          marginTop: '15px', 
          color: '#ff6b6b', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontSize: '0.9rem',
          padding: '10px 15px',
          background: 'rgba(255, 107, 107, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 107, 107, 0.2)'
        }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}
    </div>
  );
}