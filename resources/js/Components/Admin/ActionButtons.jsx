import { Space, Button, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function ActionButtons({ onView, onEdit, onDelete, viewLabel = 'View', editLabel = 'Edit', deleteLabel = 'Delete' }) {
    return (
        <Space size="small">
            {onView && (
                <Tooltip title={viewLabel}>
                    <Button type="text" size="small" icon={<EyeOutlined />} onClick={onView} />
                </Tooltip>
            )}
            {onEdit && (
                <Button type="link" size="small" icon={<EditOutlined />} onClick={onEdit}>
                    {editLabel}
                </Button>
            )}
            {onDelete && (
                <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={onDelete}>
                    {deleteLabel}
                </Button>
            )}
        </Space>
    );
}
