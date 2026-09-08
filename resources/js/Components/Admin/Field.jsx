import { Input, Select, Checkbox, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function Field({
    label,
    type = 'text',
    name,
    value,
    onChange,
    error,
    options,
    required = false,
    rows = 4,
    readOnly = false,
    disabled = false,
    accept = 'image/*',
    hideLabel = false,
}) {
    return (
        <div className={type === 'checkbox' ? 'flex items-center gap-2' : 'space-y-1.5'}>
            {type !== 'checkbox' && !hideLabel && (
                <label htmlFor={name} className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                    {label} {required && <span className="text-rose-600">*</span>}
                </label>
            )}

            {type === 'textarea' && (
                <Input.TextArea
                    id={name}
                    name={name}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    readOnly={readOnly}
                    disabled={disabled}
                    required={required}
                    status={error ? 'error' : undefined}
                />
            )}

            {type === 'select' && (
                <Select
                    id={name}
                    className="w-full"
                    value={value ?? undefined}
                    onChange={(v) => onChange(v)}
                    disabled={disabled}
                    status={error ? 'error' : undefined}
                    options={options}
                />
            )}

            {type === 'checkbox' && (
                <Checkbox
                    id={name}
                    name={name}
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                    required={required}
                >
                    {label}
                </Checkbox>
            )}

            {['text', 'number', 'date', 'datetime-local', 'email'].includes(type) && (
                <Input
                    id={name}
                    name={name}
                    type={type}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    readOnly={readOnly}
                    disabled={disabled}
                    required={required}
                    status={error ? 'error' : undefined}
                />
            )}

            {type === 'password' && (
                <Input.Password
                    id={name}
                    name={name}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    readOnly={readOnly}
                    disabled={disabled}
                    required={required}
                    status={error ? 'error' : undefined}
                />
            )}

            {type === 'file' && (
                <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    accept={accept}
                    onChange={({ fileList }) => onChange(fileList[0]?.originFileObj ?? null)}
                >
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
            )}

            {type === 'file-multi' && (
                <Upload
                    beforeUpload={() => false}
                    multiple
                    accept={accept}
                    onChange={({ fileList }) => onChange(fileList.map((f) => f.originFileObj).filter(Boolean))}
                >
                    <Button icon={<UploadOutlined />}>Choose Files</Button>
                </Upload>
            )}

            {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
        </div>
    );
}
