const galleryPhotos = [
    { src: '/images/home/educational-excellence.jpg', alt: 'Children home activity' },
    { src: '/images/home/life-skills.jpg', alt: 'Education support' },
    { src: '/images/home/health-wellness.jpg', alt: 'Medical care' },
    { src: '/images/about/history.jpg', alt: 'Farm project' },
    { src: '/images/home/Priya.jpg', alt: 'Volunteer work' },
    { src: '/images/home/emotional-support.jpg', alt: 'Daily life at home' },
];

export default function SiteFooter() {
    return (
        <footer id="contact" className="bg-[#3b0a24] text-white pt-16 pb-8 border-t border-rose-900/40">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-rose-900/30">
                    {/* Column 1: About */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-rose-100">About Mahadeva Home</h3>
                        <p className="text-xs text-rose-100/70 leading-relaxed font-light">
                            <span className="text-2xl font-serif font-bold float-left mr-2 leading-none text-amber-500">M</span>
                            ahadeva Swamigal Children Home (Mahadeva Achchirama Children Home) provides shelter, education, healthcare, and self-sustaining vocational development for over 200 orphaned and vulnerable children in Northern Sri Lanka.
                        </p>
                        <div className="pt-2">
                            <span className="block text-sm font-bold text-white">Mahadeva Swamigal Children Home</span>
                            <span className="block text-xs text-rose-300">Kilinochchi, Sri Lanka</span>
                        </div>
                    </div>

                    {/* Column 2: Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-rose-100">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="bg-amber-500 text-slate-900 p-2.5 rounded-full flex-shrink-0">
                                    <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-amber-500 tracking-wide">ADDRESS</span>
                                    <span className="text-xs text-rose-100/80">Jayanthi Nagar, Kilinochchi, Northern Province, Sri Lanka</span>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-amber-500 text-slate-900 p-2.5 rounded-full flex-shrink-0">
                                    <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.17-5.116-3.462-6.286-6.286l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-amber-500 tracking-wide">PHONE NO</span>
                                    <span className="text-xs text-rose-100/80">+94 21 492 3118</span>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-amber-500 text-slate-900 p-2.5 rounded-full flex-shrink-0">
                                    <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-amber-500 tracking-wide">WEBSITE & CONTACT</span>
                                    <span className="text-xs text-rose-100/80">www.mahadevachildrenhome.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Gallery */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-rose-100">Gallery Photos</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {galleryPhotos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-16 object-cover rounded-md hover:opacity-80 transition cursor-pointer"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-6 text-center text-xs text-rose-200/50">
                    © 2004 - 2026 Mahadeva Swamigal Children Home - All Rights Reserved | Probation Reg: NP/24/2/1/CH/13
                </div>
            </div>
        </footer>
    );
}
