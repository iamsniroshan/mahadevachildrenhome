import { Link } from '@inertiajs/react';

const quickLinks = [
    { label: 'Home', routeName: 'home' },
    { label: 'About Us', routeName: 'about' },
    { label: 'Our Team', routeName: 'team.index' },
    { label: 'News', routeName: 'news.index' },
    { label: 'Videos', routeName: 'videos.index' },
    { label: 'Contact', routeName: 'contact' },
];

const socialLinks = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com',
        colorClass: 'bg-[#1877F2]',
        path: 'M13.5 9H15V6.5h-1.5C11.6 6.5 10 8.1 10 10.2V12H8v2.5h2V21h2.5v-6.5H15l.5-2.5h-3v-1.5c0-.6.4-1 1-1z',
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com',
        colorClass: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
        path: 'M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12 10a2 2 0 110 4 2 2 0 010-4zM17.25 6a1 1 0 100 2 1 1 0 000-2zM7 3.5h10A3.5 3.5 0 0120.5 7v10A3.5 3.5 0 0117 20.5H7A3.5 3.5 0 013.5 17V7A3.5 3.5 0 017 3.5zm0 1.5A2 2 0 005 7v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7z',
    },
    {
        label: 'YouTube',
        href: 'https://www.youtube.com',
        colorClass: 'bg-[#FF0000]',
        path: 'M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.7.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.7v1.4C2.2 13.9 2.4 15.6 2.4 15.6s.2 1.5.8 2.1c.8.8 1.9.8 2.3.9 1.7.2 7.5.2 7.5.2s3.9 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.4c0-1.7-.2-3.5-.2-3.5zM9.9 14.6V8.9l5.4 2.9-5.4 2.8z',
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/+94778277450',
        colorClass: 'bg-[#25D366]',
        path: 'M12 2a9.9 9.9 0 00-8.6 14.8L2 22l5.4-1.4A9.9 9.9 0 1012 2zm0 1.7a8.2 8.2 0 016.9 12.6l-.2.3.8 2.9-3-.8-.3.2A8.2 8.2 0 1112 3.7zm-2.1 3.7c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.1-1.3-.1-.1-.3-.2-.7-.4-.3-.2-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.1-.5-.1-.2-.6-1.5-.8-2-.2-.4-.4-.4-.6-.4h-.6z',
    },
];

const placeMapUrl = 'https://www.google.com/maps?cid=13750761810875853920';
const locationMapUrl = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3936.2999848148097!2d80.3788103!3d9.3950485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe94bceea30b55%3A0xbed4850328432c60!2sMahadeva%20Swamikal%20Children%20Home!5e0!3m2!1sen!2slk!4v1787902169662!5m2!1sen!2slk';

export default function SiteFooter() {
    return (
        <footer id="contact" className="bg-blue-950 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
                    {/* Brand */}
                    <div className="space-y-4 lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-amber-500/60 flex-shrink-0">
                                <img src="/storage/users/logo.jpg" alt="Mahadeva Home logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-serif font-bold text-white leading-tight">
                                Mahadeva Swamigal
                                <br />
                                Children Home
                            </span>
                        </div>
                        <p className="text-xs text-rose-100/70 leading-relaxed">
                            Providing shelter, education, healthcare, and self-sustaining vocational development for over 200 orphaned and vulnerable children in Northern Sri Lanka.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={`w-8 h-8 rounded-full ${social.colorClass} hover:brightness-110 flex items-center justify-center transition`}
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-rose-100/80">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={route(link.routeName)} className="hover:text-white transition">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-rose-100/80">
                            <li>
                                <span className="block text-[11px] font-bold uppercase text-rose-200/60 tracking-wide">Address</span>
                                Jayanthi Nagar, Kilinochchi, Sri Lanka
                            </li>
                            <li>
                                <span className="block text-[11px] font-bold uppercase text-rose-200/60 tracking-wide">Phone</span>
                                +94 21 492 3118
                            </li>
                            <li>
                                <span className="block text-[11px] font-bold uppercase text-rose-200/60 tracking-wide">Email</span>
                                rasa46@yahoo.com
                            </li>
                        </ul>
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">Location</h3>
                        <div className="overflow-hidden rounded-xl border border-rose-300/20 shadow-lg">
                            <iframe
                                title="Mahadeva Children Home location"
                                src={locationMapUrl}
                                className="h-40 w-full border-0"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        </div>
                        <a
                            href={placeMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs font-bold text-amber-500 hover:text-amber-400"
                        >
                            View on Google Maps →
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-rose-900/30 text-xs text-rose-200/50">
                    <span>© 2004 - 2026 Mahadeva Swamigal Children Home - All Rights Reserved</span>
                    <span>Probation Reg: NP/24/2/1/CH/13</span>
                    <span className="text-white">
                        Designed &amp; developed by{' '}
                        <a
                            href="https://9xnova.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-amber-500 transition"
                        >
                            9xnova.com
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
