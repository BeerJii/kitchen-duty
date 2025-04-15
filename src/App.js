import React, { useState } from 'react';
import './App.css';

function ItemBox({ name, image, count, total, setCount, onUpdate, onDelete }) {
  return (
    <div className="item-card">
      <button className="delete-icon" onClick={onDelete}>×</button>
      {image && <img src={image} alt={name} className="item-image" />}
      <div className="item-name">{name}</div>
      <div className="item-controls">
        <button onClick={() => setCount(Math.max(0, count - 1))}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <button className="update-btn" onClick={onUpdate}>Update</button>
    </div>
  );
}

function AddItemBox({ onAdd }) {
  const [newName, setNewName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = () => {
    if (!newName) return;
    const reader = new FileReader();
    reader.onload = () => {
      onAdd(newName, reader.result);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      onAdd(newName, null);
    }
    setNewName('');
    setImageFile(null);
  };

  return (
    <div className="item-card add-card">
      <div className="add-symbol">+</div>
      <div className="item-name">Add New Item</div>
      <input
        type="text"
        placeholder="Item name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

function App() {
  const [items, setItems] = useState([
    {
      name: 'Soap',
      count: 0,
      total: 0,
      image: process.env.PUBLIC_URL + '/soap.png'
    },
    {
      name: 'Sponge',
      count: 0,
      total: 0,
      image: process.env.PUBLIC_URL + '/sponge.png'
    },
  ]);

  const updateCount = (index, newCount) => {
    const updated = [...items];
    updated[index].count = newCount;
    setItems(updated);
  };

  const handleUpdate = (index) => {
    const updated = [...items];
    updated[index].total += updated[index].count;
    updated[index].count = 0;
    setItems(updated);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const addItem = (name, image) => {
    setItems([...items, { name, count: 0, total: 0, image }]);
  };

  return (
    <>
      <h1 className="title">Kitchen Duty</h1>
      <div className="app-container">
        {items.map((item, index) => (
          <div className="item-wrapper" key={index}>
            <ItemBox
              name={item.name}
              image={item.image}
              count={item.count}
              total={item.total}
              setCount={(newCount) => updateCount(index, newCount)}
              onUpdate={() => handleUpdate(index)}
              onDelete={() => handleDelete(index)}
            />
            <div className="total-display">Total: {item.total}</div>
          </div>
        ))}
        <AddItemBox onAdd={addItem} />
      </div>
    </>
  );
}

export default App;