import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Settings from './Settings';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Загружаем данные с API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://dummyjson.com/products?limit=10000');
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  // Загружаем настройки из localStorage
  const loadSettings = () => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      id: { visible: true, width: 100, backgroundColor: '#ffffff' },
      title: { visible: true, width: 200, backgroundColor: '#ffffff' },
      price: { visible: true, width: 150, backgroundColor: '#ffffff' },
      description: { visible: true, width: 300, backgroundColor: '#ffffff' }
    };
  };

  const [settings, setSettings] = useState(loadSettings);

  // Мемоизация для улучшения производительности
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, itemsPerPage, products]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const translateDescription = (description) => {
    const translations = {
      "This is a product description": "Это описание продукта",
      "A high-quality item": "Высококачественный товар",
      "This item is durable and reliable": "Этот товар прочный и надежный",
    };

    return translations[description] || description;
  };

  return (
    <Router>
      

        <Route path="/settings" component={<Settings />} />
    
    </Router>
  );
}

export default App;
