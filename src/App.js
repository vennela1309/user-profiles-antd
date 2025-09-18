import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin, Alert } from 'antd';
import UserCard from './components/UserCardAntd';
import EditUserModal from './components/EditUserModal';
import './App.css';

const { Title } = Typography;
const USERS_API = 'https://jsonplaceholder.typicode.com/users';
const LOCAL_KEY = 'user-profiles-antd:v1';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load from localStorage or fetch from API
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        setUsers(JSON.parse(saved));
        setLoading(false);
        return;
      } catch {}
    }

    (async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(USERS_API);
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
      } catch (err) {
        setError(err.message || 'Error fetching users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Persist to localStorage whenever users change
  useEffect(() => {
    if (!loading) localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
  }, [users, loading]);

  const openEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const closeEdit = () => {
    setEditingUser(null);
    setModalOpen(false);
  };

  const handleSave = (updated) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
    closeEdit();
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleToggleLike = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, liked: !u.liked } : u)));
  };

  return (
    <div className="app-root">
      <div className="app-container">
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          User Profiles
        </Title>

        {loading && (
          <div className="center-box">
            <Spin size="large" />
          </div>
        )}

        {error && (
          <div className="center-box">
            <Alert type="error" message="Error" description={error} />
          </div>
        )}

        {!loading && !error && (
          <Row gutter={[24, 24]}>
            {users.map((user) => (
              <Col key={user.id} xs={24} sm={12} md={8}>
                <UserCard
                  user={user}
                  onEdit={() => openEdit(user)}
                  onDelete={() => handleDelete(user.id)}
                  onToggleLike={() => handleToggleLike(user.id)}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <EditUserModal
        visible={modalOpen}
        user={editingUser}
        onCancel={closeEdit}
        onSave={handleSave}
      />
    </div>
  );
}
