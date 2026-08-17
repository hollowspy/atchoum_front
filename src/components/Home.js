import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products] = useState([
        {
            id: 1,
            name: 'Modern Desk Lamp',
            price: '59.99',
            description: 'Sleek LED desk lamp with adjustable brightness',
            image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400'
        },
        {
            id: 2,
            name: 'Wireless Headphones',
            price: '129.99',
            description: 'Premium noise-canceling wireless headphones',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
        },
        {
            id: 3,
            name: 'Smart Watch',
            price: '199.99',
            description: 'Fitness tracking smartwatch with heart rate monitor',
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400'
        },
        {
            id: 4,
            name: 'Coffee Maker',
            price: '89.99',
            description: 'Programmable coffee maker with thermal carafe',
            image: 'https://images.unsplash.com/photo-1522012188892-24beb302783d?w=400'
        },
        {
            id: 5,
            name: 'Portable Speaker',
            price: '79.99',
            description: 'Waterproof bluetooth speaker with 20hr battery life',
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'
        }
    ]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [email, setEmail] = useState('');

    const handleLog = () => {
        window.location.href = `https://auth.abtasty.com/login_sso?source=vwo&email=${encodeURIComponent(email)}`;
    };

    useEffect(() => {
        window.mixpanel?.track('Page Viewed', { page: window.location.pathname });

        const params = new URLSearchParams(window.location.search);
        if (params.get('is_log_with_sso') === 'true') {
            alert('Connection successful');
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % products.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [products.length]);

    return (
        <div style={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8f9fa'
        }}>
            {/* Header */}
            <header style={{
                backgroundColor: '#fff',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{ margin: 0, color: '#007bff' }}>Test Store</h1>
                    <nav>
                        <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Home</Link>
                        <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>Products</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ 
                maxWidth: '1200px',
                margin: '40px auto',
                padding: '0 20px',
                flex: 1
            }}>
                {/* Login */}
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    marginBottom: '40px'
                }}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        style={{
                            padding: '10px 15px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            fontSize: '16px',
                            minWidth: '280px'
                        }}
                    />
                    <button
                        onClick={handleLog}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px 25px',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Log
                    </button>
                </div>

                {/* Carousel */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '400px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    marginBottom: '40px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                    {products.map((product, index) => (
                        <div key={product.id} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentSlide ? 1 : 0,
                            transition: 'opacity 0.6s ease-in-out'
                        }}>
                            <img src={product.image} alt={product.name} style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }} />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                padding: '20px',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                color: '#fff',
                                boxSizing: 'border-box'
                            }}>
                                <h3 style={{ margin: 0, fontSize: '24px' }}>{product.name}</h3>
                            </div>
                        </div>
                    ))}

                    {/* Dots */}
                    <div style={{
                        position: 'absolute',
                        bottom: '15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '10px',
                        zIndex: 2
                    }}>
                        {products.map((product, index) => (
                            <button
                                key={product.id}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    backgroundColor: index === currentSlide ? '#fff' : 'rgba(255,255,255,0.5)'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Featured Products</h2>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '30px'
                }}>
                    {products.map(product => (
                        <div key={product.id} style={{
                            backgroundColor: '#fff',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            padding: '15px',
                            textAlign: 'center',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer',
                            ':hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                            }
                        }}>
                            <img src={product.image} alt={product.name} style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                marginBottom: '15px'
                            }} />
                            <h3 style={{ margin: '10px 0', color: '#333' }}>{product.name}</h3>
                            <p style={{ color: '#007bff', fontSize: '18px', fontWeight: 'bold' }}>${product.price}</p>
                            <p style={{ color: '#666', fontSize: '14px', margin: '10px 0' }}>{product.description}</p>
                            <Link 
                                to={`/product/${product.id}`}
                                style={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    textDecoration: 'none',
                                    display: 'inline-block'
                                }}
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                backgroundColor: '#333',
                color: '#fff',
                padding: '40px 20px',
                marginTop: 'auto'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <p>© 2025 Test Store. All rights reserved.</p>
                    <p style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
                        This is a testing environment for e-commerce functionality
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;