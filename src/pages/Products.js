import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/connection';
import styles from '../styles/Products.module.css';

const Products = () => {
  const [productName, setProductName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const productCollection = collection(db, 'products');
  const brandCollection = collection(db, 'brands');

  // Carregar marcas
  useEffect(() => {
    const unsubscribe = onSnapshot(brandCollection, (snapshot) => {
      const brandList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBrands(brandList);
    });
    return () => unsubscribe();
  }, []);

  // Carregar produtos
  useEffect(() => {
    const q = query(productCollection, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(list);
    });
    return () => unsubscribe();
  }, []);

  // Mensagem temporária
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !brandId || !price || !unit) {
      setMessage('Preencha todos os campos!');
      return;
    }

    setLoading(true);

    const brand = brands.find((b) => b.id === brandId);
    const productData = {
      name: productName,
      brand: { id: brandId, name: brand.name },
      price: parseFloat(price),
      unit: parseInt(unit),
      createdAt: Timestamp.now(),
    };

    try {
      if (editId) {
        const ref = doc(db, 'products', editId);
        await updateDoc(ref, productData);
        setMessage('Produto atualizado com sucesso!');
        setEditId(null);
      } else {
        await addDoc(productCollection, productData);
        setMessage('Produto cadastrado com sucesso!');
      }

      setProductName('');
      setBrandId('');
      setPrice('');
      setUnit('');
    } catch (error) {
      console.error(error);
      setMessage('Erro ao salvar o produto.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setProductName(product.name);
    setBrandId(product.brand.id);
    setPrice(product.price);
    setUnit(product.unit);
    setEditId(product.id);
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja excluir este produto?')) {
      try {
        const ref = doc(db, 'products', id);
        await deleteDoc(ref);
        setMessage('Produto excluído com sucesso!');
      } catch (error) {
        console.error(error);
        setMessage('Erro ao excluir o produto.');
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.formWrapper}>
      <h2><center>{editId ? 'Editar Produto' : 'Cadastrar Produto'}</center></h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome do Produto:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Nome do produto"
          />
        </label>

        <label>
          Marca:
          <select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
            <option value="">Selecione</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Preço:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ex: 10.00"
            step="0.01"
          />
        </label>

        <label>
          Quantidade (unit):
          <input
            type="number"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Ex: 50"
          />
        </label>

        <button type="submit" className={styles.btn} disabled={loading}>
          {editId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {message && <p>{message}</p>}

      <h3>Produtos Cadastrados:</h3>
      <ul className={styles.list}>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <span>
              <strong>{product.name}</strong> - {product.brand?.name} - R${product.price.toFixed(2)} - {product.unit} unidades
              {product.createdAt && (
                <small style={{ marginLeft: '10px', color: '#666' }}>
                  ({product.createdAt.toDate().toLocaleDateString()})
                </small>
              )}
            </span>
            <div>
              <button onClick={() => handleEdit(product)} className={styles.btnEdit}>Editar</button>
              <button onClick={() => handleDelete(product.id)} className={styles.btnDelete}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
