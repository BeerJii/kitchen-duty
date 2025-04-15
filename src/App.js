import React, { useState, useEffect } from 'react';
import './App.css';
import { db, ref, set, onValue, remove } from './firebase';
import { v4 as uuidv4 } from 'uuid';

function ItemBox({ id, name, image, count, total, setCount, onUpdate, onDelete }) {
  return (
    <div className="item-card">
      <button className="delete-icon" onClick={() => onDelete(id)}>×</button>
      {image && <img src={image} alt={name} className="item-image" />}
      <div className="item-name">{name}</div>
      <div className="item-controls">
        <button onClick={() => setCount(id, count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(id, count + 1)}>+</button>
      </div>
      <button className="update-btn" onClick={() => onUpdate(id)}>Update</button>
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
  const [items, setItems] = useState({});

  useEffect(() => {
    const itemsRef = ref(db, 'items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setItems(data || {});
    });
  }, []);

  const updateCount = (id, newCount) => {
    set(ref(db, 'items/' + id + '/count'), newCount);
  };

  const handleUpdate = (id) => {
    const item = items[id];
    const newTotal = Math.max(0, item.total + item.count);
    set(ref(db, 'items/' + id), {
      ...item,
      total: newTotal,
      count: 0
    });
  };

  const handleDelete = (id) => {
    remove(ref(db, 'items/' + id));
  };

  const addItem = (name, image) => {
    const id = uuidv4();
    set(ref(db, 'items/' + id), {
      name,
      image,
      count: 0,
      total: 0
    });
  };

  return (
    <>
      <h1 className="title">Kitchen Duty</h1>
      <div className="app-container">
        {Object.entries(items).map(([id, item]) => (
          <div className="item-wrapper" key={id}>
            <ItemBox
              id={id}
              name={item.name}
              image={item.image}
              count={item.count}
              total={item.total}
              setCount={updateCount}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
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