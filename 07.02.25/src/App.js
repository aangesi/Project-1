import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Можно менять количество элементов на странице

  // Загружаем данные с API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://dummyjson.com/products?limit=10000');
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  // Мемоизация для улучшения производительности
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, itemsPerPage, products]);

  // Пагинация
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // сбросить страницу на первую при изменении количества элементов на странице
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Таблица продуктов</h1>

      {/* Настройка количества элементов на странице */}
      <div>
        <label>Элементов на странице: </label>
        <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Таблица с продуктами */}
      <table border="1" style={{ margin: '20px auto', width: '80%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагинация */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            style={{ margin: '0 5px', padding: '5px 10px' }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
