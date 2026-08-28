export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-rose-900 shadow-sm focus:ring-rose-900 ' +
                className
            }
        />
    );
}
