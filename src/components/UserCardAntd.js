import React from 'react';
import { Card, Avatar, Typography, Space, Tooltip } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  ShopOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

// ✅ Fixed avatar URL (DiceBear v5 API)
function avatarUrl(username) {
  return `https://api.dicebear.com/5.x/avataaars/svg?seed=${encodeURIComponent(username)}`;
}

export default function UserCardAntd({ user, onEdit, onDelete, onToggleLike }) {
  const actions = [
    <Tooltip key="like" title={user.liked ? 'Unlike' : 'Like'}>
      {user.liked ? (
        <HeartFilled style={{ color: '#eb2f96' }} onClick={onToggleLike} />
      ) : (
        <HeartOutlined onClick={onToggleLike} />
      )}
    </Tooltip>,
    <Tooltip key="edit" title="Edit">
      <EditOutlined onClick={onEdit} />
    </Tooltip>,
    <Tooltip key="delete" title="Delete">
      <DeleteOutlined onClick={onDelete} />
    </Tooltip>,
  ];

  return (
    <Card hoverable actions={actions} style={{ borderRadius: 8 }}>
      <Card.Meta
        avatar={<Avatar size={72} src={avatarUrl(user.username)} />}
        title={<div style={{ fontSize: 18, fontWeight: 600 }}>{user.name}</div>}
        description={
          <div style={{ marginTop: 12 }}>
            <Space direction="vertical" size={6}>
              <Text>
                <MailOutlined style={{ marginRight: 8 }} />
                {user.email}
              </Text>
              <Text>
                <PhoneOutlined style={{ marginRight: 8 }} />
                {user.phone}
              </Text>
              <Text>
                <GlobalOutlined style={{ marginRight: 8 }} />
                {user.website}
              </Text>
              <Text>
                <ShopOutlined style={{ marginRight: 8 }} />
                {user.company?.name || '-'}
              </Text>
            </Space>
          </div>
        }
      />
    </Card>
  );
}
