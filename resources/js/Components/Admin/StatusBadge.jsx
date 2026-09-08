import { Tag } from 'antd';

// Maps legacy tailwind text color classes to the closest antd Tag color.
const colorFromClassName = (className = '') => {
    const match = className.match(/text-([a-z]+)-\d+/);
    const palette = {
        emerald: 'success',
        teal: 'cyan',
        amber: 'gold',
        rose: 'error',
        purple: 'purple',
        sky: 'blue',
        slate: 'default',
        fuchsia: 'magenta',
    };
    return (match && palette[match[1]]) || 'default';
};

export default function StatusBadge({ value, map }) {
    const config = map[value] ?? { label: value, className: 'bg-slate-100 text-slate-700' };

    return <Tag color={colorFromClassName(config.className)}>{config.label}</Tag>;
}
