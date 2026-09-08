import { Modal as AntModal } from 'antd';

export default function Modal({ open, onClose, title, eyebrow, children }) {
    return (
        <AntModal
            open={open}
            onCancel={onClose}
            footer={null}
            destroyOnHidden
            width={720}
            title={
                <div className="min-w-0">
                    {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">{eyebrow}</p>}
                    <span className="text-lg sm:text-xl font-bold text-slate-900">{title}</span>
                </div>
            }
        >
            {children}
        </AntModal>
    );
}
