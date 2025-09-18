import React, { useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Button } from 'antd';

export default function EditUserModal({ visible, user, onCancel, onSave }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && user) {
      // set form values when modal opens
      form.setFieldsValue({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        company: user.company?.name,
      });
    } else {
      form.resetFields();
    }
  }, [visible, user, form]);

  const handleFinish = (values) => {
    // Build updated user object. Keep nested company structure.
    const updated = {
      id: values.id,
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      website: values.website,
      company: { ...user?.company, name: values.company },
      address: user?.address || {},
      liked: user?.liked || false,
    };
    onSave(updated);
  };

  return (
    <Modal
      title={user ? `Edit: ${user.name}` : 'Edit User'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Full name"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter username' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="website" label="Website">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="company" label="Company">
          <Input />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button style={{ marginRight: 8 }} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
