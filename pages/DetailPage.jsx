import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Droplets, Zap, Shield, Info } from "lucide-react";

export default function DetailPage({ dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );

        if (isMounted) {
          setProduct(res.data.product);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [barcode]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <div className="animate-spin" style={{ 
        width: '50px', height: '50px', border: '5px solid var(--glass)', 
        borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto' 
      }}></div>
    </div>
  );

  if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}><h2>Product not found</h2></div>;

  const nutrients = product.nutriments || {};

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '20px 40px' }}
    >
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--primary)', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '600',
          marginBottom: '30px',
          fontSize: '1rem'
        }}
      >
        <ArrowLeft size={20} /> Back to Results
      </button>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.5fr', 
        gap: '60px',
        alignItems: 'start'
      }}>
        {/* Left Column: Image & Basic Info */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card" 
          style={{ padding: '30px', textAlign: 'center' }}
        >
          <img 
            src={product.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'} 
            alt={product.product_name} 
            style={{ width: '100%', borderRadius: '12px', marginBottom: '25px', maxHeight: '400px', objectFit: 'contain' }}
          />
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{product.product_name}</h1>
          <p style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>{product.brands}</p>
          
          <button 
            className="btn-primary" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            onClick={() => dispatch({ type: "SAVE_ITEM", payload: product })}
          >
            <Plus size={20} /> Save to Favorites
          </button>
        </motion.div>

        {/* Right Column: Nutrition & Details */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <section className="glass-card" style={{ padding: '30px', marginBottom: '30px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', fontSize: '1.5rem' }}>
              <Zap size={24} color="var(--accent)" /> Nutritional Facts (per 100g)
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <NutrientStat label="Energy" value={`${nutrients.energy_value || 0} ${nutrients.energy_unit || 'kcal'}`} />
              <NutrientStat label="Proteins" value={`${nutrients.proteins || 0}g`} />
              <NutrientStat label="Carbohydrates" value={`${nutrients.carbohydrates || 0}g`} />
              <NutrientStat label="Fat" value={`${nutrients.fat || 0}g`} />
              <NutrientStat label="Fiber" value={`${nutrients.fiber || 0}g`} />
              <NutrientStat label="Salt" value={`${nutrients.salt || 0}g`} />
            </div>
          </section>

          <section className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '1.5rem' }}>
              <Shield size={24} color="var(--secondary)" /> Ingredients & Safety
            </h3>
            <p style={{ lineHeight: '1.6', color: '#ccc', marginBottom: '20px' }}>
              {product.ingredients_text || "Ingredient information not available for this product."}
            </p>
            
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {product.allergens && (
                    <div style={{ background: 'rgba(255, 107, 107, 0.2)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', color: '#ff6b6b', border: '1px solid #ff6b6b' }}>
                        Allergens: {product.allergens}
                    </div>
                )}
                {product.labels && product.labels.split(',').slice(0, 3).map(label => (
                    <div key={label} style={{ background: 'rgba(78, 205, 196, 0.2)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', color: '#4ecdc4', border: '1px solid #4ecdc4' }}>
                        {label.trim()}
                    </div>
                ))}
            </div>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}

function NutrientStat({ label, value }) {
  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.05)', 
      padding: '15px', 
      borderRadius: '12px',
      border: '1px solid var(--glass-border)'
    }}>
      <p style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{label}</p>
      <p style={{ fontSize: '1.3rem', fontWeight: '700' }}>{value}</p>
    </div>
  );
}