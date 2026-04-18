import { Link } from "react-router-dom";
import { Plus, Info, Star } from "lucide-react";

export default function ProductCard({ product, dispatch }) {
  const { product_name, image_url, code, brands, nutrition_grades } = product;

  return (
    <div className="glass-card animate-fade-in" style={{
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img 
          src={image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'} 
          alt={product_name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {nutrition_grades && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'var(--primary)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '0.8rem'
          }}>
            Grade {nutrition_grades.toUpperCase()}
          </div>
        )}
      </div>

      <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', color: 'white' }}>{product_name || 'Unknown Product'}</h3>
        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>{brands || 'General Brand'}</p>
        
        <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
          <Link 
            to={`/product/${code}`} 
            className="btn-primary" 
            style={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}
          >
            <Info size={16} /> Details
          </Link>
          <button 
            onClick={() => dispatch({ type: "SAVE_ITEM", payload: product })}
            style={{
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)',
              color: 'white',
              padding: '10px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: '0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--glass)'}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
