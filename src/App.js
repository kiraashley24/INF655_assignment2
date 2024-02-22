import './App.css';
import React, { useState, useEffect } from 'react';
import Items from './components/Items';
import ItemDescript from './components/ItemDescript';
import AddItem from './components/AddItem';

const App = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : ItemDescript;
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleCheck = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleAddItem = ({ title, description }) => {
    const newItem = {
      id: items.length + 1,
      title,
      description,
      checked: false,
    };
    setItems([...items, newItem]);
  };

  const handleEdit = (id, title, description) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, title, description } : item
    );
    setItems(updatedItems);
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'completed') {
      return item.checked;
    } else if (filter === 'incomplete') {
      return !item.checked;
    } else {
      return true;
    }
  });

  return (
    <div>
      <h1>Today's Chore List</h1>
      <div className="card">
        <div className="card-body">
          <h2>Add New Chore</h2>
          <AddItem onAddItem={handleAddItem} />
        </div>
      </div>
      <div>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Chores</option>
            <option value="completed">Completed Chores</option>
            <option value="incomplete">Incomplete Chores</option>
          </select>
        </label>
      </div>
      <Items items={filteredItems} onCheck={handleCheck} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;
