import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const antdTheme = {
    token: {
        colorPrimary: '#881337',
        colorLink: '#881337',
        borderRadius: 8,
        fontFamily: 'Figtree, ui-sans-serif, system-ui, sans-serif',
    },
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ConfigProvider theme={antdTheme}>
                <App {...props} />
            </ConfigProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
