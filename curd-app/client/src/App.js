import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUserId) {
      await axios.put(`http://localhost:5000/api/users/${editingUserId}`, form);
      setEditingUserId(null);
    } else {
      await axios.post('http://localhost:5000/api/users', form);
    }
    setForm({ name: '', email: '' });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditingUserId(user._id);
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    header: {
      textAlign: 'center',
      color: '#2c3e50',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      backgroundColor: '#fff',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #ddd',
    },
    userInfo: {
      flex: 1,
    },
    actionButtons: {
      display: 'flex',
      gap: '10px',
    },
    editBtn: {
      backgroundColor: '#f39c12',
      color: '#fff',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    deleteBtn: {
      backgroundColor: '#e74c3c',
      color: '#fff',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CRUD User Management</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.button}>
          {editingUserId ? 'Update User' : 'Add User'}
        </button>
      </form>

      <h2>User List</h2>
      <ul style={styles.list}>
        {users.map((user) => (
          <li key={user._id} style={styles.listItem}>
            <div style={styles.userInfo}>
              <strong>{user.name}</strong> - {user.email}
            </div>
            <div style={styles.actionButtons}>
              <button onClick={() => handleEdit(user)} style={styles.editBtn}>
                Edit
              </button>
              <button onClick={() => handleDelete(user._id)} style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
