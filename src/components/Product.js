import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const products = {
    1: {
        id: 1,
        name: 'Modern Desk Lamp',
        price: '59.99',
        description: 'Sleek LED desk lamp with adjustable brightness. Features include touch controls, multiple color temperatures, and flexible arm for perfect positioning. Ideal for home office or study space.',
        image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400'
    },
    2: {
        id: 2,
        name: 'Wireless Headphones',
        price: '129.99',
        description: 'Premium noise-canceling wireless headphones with superior sound quality. Includes 30-hour battery life, quick charging, and comfortable over-ear design.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
    },
    3: {
        id: 3,
        name: 'Smart Watch',
        price: '199.99',
        description: 'Fitness tracking smartwatch with heart rate monitor, GPS, and sleep tracking. Water-resistant up to 50m and compatible with iOS and Android.',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400'
    },
    4: {
        id: 4,
        name: 'Coffee Maker',
        price: '89.99',
        description: 'Programmable coffee maker with thermal carafe. Features 24-hour programmability, auto-shutoff, and brew strength control.',
        image: 'https://images.unsplash.com/photo-1522012188892-24beb302783d?w=400'
    },
    5: {
        id: 5,
        name: 'Portable Speaker',
        price: '79.99',
        description: 'Waterproof bluetooth speaker with 20hr battery life. Features include 360° sound, built-in microphone for calls, and dust-proof design.',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'
    }
};

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setProduct(products[id] || null);
        setLoading(false);
    }, [id, products]);

    if (loading) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <h2>Product not found</h2>
                <Link 
                    to="/" 
                    style={{ 
                        textDecoration: 'none', 
                        color: '#007bff',
                        fontSize: '18px'
                    }}
                >
                    ← Return to Home
                </Link>
            </div>
        );
    }

    return (
        <div style={{ 
            backgroundColor: '#f8f9fa', 
            minHeight: '100vh',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <Link 
                    to="/" 
                    style={{ 
                        textDecoration: 'none', 
                        color: '#007bff',
                        display: 'inline-block',
                        marginBottom: '20px'
                    }}
                >
                    ← Back to Products
                </Link>
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px',
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <div>
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            style={{ 
                                width: '100%', 
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                    </div>
                    <div>
                        <h1>{product.name}</h1>
                        <p style={{ 
                            fontSize: '24px', 
                            color: '#007bff',
                            margin: '20px 0'
                        }}>${product.price}</p>
                        <p style={{
                            color: '#666',
                            lineHeight: '1.6'
                        }}>{product.description}</p>
                        <button 
                            onClick={() => alert('Test CTA clicked!')}
                            style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '15px 30px',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
