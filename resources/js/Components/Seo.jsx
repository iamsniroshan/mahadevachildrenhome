import { Head, usePage } from '@inertiajs/react';

const DEFAULT_DESCRIPTION =
    'Mahadeva Swamigal Children Home provides shelter, education, healthcare, and vocational support to orphaned and vulnerable children in Kilinochchi, Sri Lanka.';
const DEFAULT_IMAGE = '/images/home/emotional-support.jpg';
const SITE_NAME = import.meta.env.VITE_APP_NAME || 'Mahadeva Swamigal Children Home';

/**
 * Shared SEO head tags for public pages: title, description, canonical,
 * Open Graph / Twitter cards, and optional JSON-LD structured data.
 *
 * @param {Object} props
 * @param {string} [props.title] - Page title (site name is appended globally in app.jsx).
 * @param {string} [props.description] - Meta description, defaults to the org-wide summary.
 * @param {string} [props.image] - Absolute or root-relative image URL for social sharing.
 * @param {'website'|'article'} [props.type] - Open Graph type.
 * @param {string} [props.canonical] - Absolute canonical URL, defaults to the current page URL.
 * @param {boolean} [props.noindex] - Set true to prevent indexing (e.g. thank-you pages).
 * @param {Object|Object[]} [props.jsonLd] - JSON-LD schema object(s) to embed.
 */
export default function Seo({
    title,
    description = DEFAULT_DESCRIPTION,
    image,
    type = 'website',
    canonical,
    noindex = false,
    jsonLd,
}) {
    const { url: currentPath } = usePage();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = canonical || `${origin}${currentPath}`;
    const ogImage = image
        ? (image.startsWith('http') ? image : `${origin}${image}`)
        : `${origin}${DEFAULT_IMAGE}`;
    const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;
    const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

    return (
        <Head title={title}>
            <meta name="description" content={description} />
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {schemas.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Head>
    );
}
