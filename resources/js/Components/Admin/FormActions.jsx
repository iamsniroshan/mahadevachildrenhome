import { Space, Button } from 'antd';

export default function FormActions({ onCancel, processing, submitLabel, showSubmit = true }) {
    return (
        <div className="border-t border-slate-100 pt-4">
            <Space className="flex justify-end">
                <Button onClick={onCancel}>Cancel</Button>
                {showSubmit && (
                    <Button type="primary" htmlType="submit" loading={processing}>
                        {submitLabel}
                    </Button>
                )}
            </Space>
        </div>
    );
}
