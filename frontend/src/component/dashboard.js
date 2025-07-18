import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app/dashboard.css';

export default function Dashboard() {
    const [module, setModule] = useState(false);
    const [name, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [displayProducts, setDisplayProducts] = useState(false);
    const [productLists, setProductList] = useState([]);

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Add new product
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, price }),
        }).then(response => {
            if (response.ok) {
                console.log('Product added successfully');
                setModule(false);
                setProductName('');
                setDescription('');
                setPrice('');
            } else {
                console.error('Failed to add product');
                alert('Failed to add product. Please try again.');
            }
        });
    };

    // Logout
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login/');
    };

    // Fetch and toggle display of products
    const showProducts = () => {
        if (!displayProducts) {
            fetch('/api/products/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch products');
                }
            })
            .then(data => {
                setProductList(data);
                setDisplayProducts(true); // ✅ Show products
            })
            .catch(error => {
                console.error(error);
                alert('Failed to fetch products. Please try again.');
            });
        } else {
            setDisplayProducts(false); // ✅ Hide if already showing
        }
    };

    return (
        <div className="dash-container">
            <h1>Dashboard</h1>
            <p>Welcome, <b>{username || ''}</b>! You are logged in. Here you can manage your products.</p>

            <div className="actions">
                <a href="/dashboard">Home</a>
                <a href="#" onClick={showProducts}>
                    {displayProducts ? "Hide Products" : "View Products"}
                </a>
                <a href="#" onClick={() => setModule(true)}>Add Product</a>
                <a href="#" onClick={handleLogout}>Logout</a>
            </div>

            {module && (
                <div className="module-form">
                    <h2>Add Product</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Product Name"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        />
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            required
                        />
                        <button type="submit">Add Product</button>
                    </form>
                    <button className="module-btn" onClick={() => setModule(false)}>Close</button>
                </div>
            )}

            {displayProducts && (
                <div className="product-list">
                    <h2>Product List</h2>
                    {productLists.length > 0 ? (
                        <ul>
                            {productLists.map((product, index) => (
                                <li key={index}>
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>Price: ${product.price}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            )}
        </div>
    );
}
