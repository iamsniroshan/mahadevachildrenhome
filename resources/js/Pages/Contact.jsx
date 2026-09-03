import { useForm, usePage } from '@inertiajs/react';
import Seo from '@/Components/Seo';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

export default function Contact() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Seo
                title="Contact Us"
                description="Get in touch with Mahadeva Swamigal Children Home to learn about our programs, volunteer opportunities, or how you can support our mission."
            />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                <SiteNav />

                <section className="bg-blue-950 text-white pt-16 pb-16 rounded-b-[3rem]">
                    <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
                        <span className="bg-rose-900/60 text-rose-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                            Get In Touch
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
                        <p className="text-rose-100/80 max-w-xl mx-auto">
                            Get in touch with us to learn more about our programs, volunteer opportunities, or how you can support our mission.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-10">
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex items-start space-x-3">
                                <div className="bg-amber-500 text-slate-900 p-2.5 rounded-full flex-shrink-0">
                                    <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-rose-900 tracking-wide">Address</span>
                                    <span className="text-sm text-slate-600">Mahadeva Swamikal Children Home, Jayanthi Nagar, Kilinochchi, Sri Lanka</span>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-amber-500 text-slate-900 p-2.5 rounded-full flex-shrink-0">
                                    <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.17-5.116-3.462-6.286-6.286l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-rose-900 tracking-wide">Phone</span>
                                    <span className="text-sm text-slate-600 block">+94 21 228 5678</span>
                                    <span className="text-sm text-slate-600 block">+94 77 827 7450</span>
                                    <span className="text-sm text-slate-600 block">+94 76 705 3911</span>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-amber-500 text-slate-900 p-2.5 rounded-full flex-shrink-0">
                                    <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-rose-900 tracking-wide">Email</span>
                                    <span className="text-sm text-slate-600">rasa46@yahoo.com</span>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                                <iframe
                                    title="Mahadeva Children Home location"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3936.2999848148097!2d80.3788103!3d9.3950485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe94bceea30b55%3A0xbed4850328432c60!2sMahadeva%20Swamikal%20Children%20Home!5e0!3m2!1sen!2slk!4v1787902169662!5m2!1sen!2slk"
                                    className="h-56 w-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>

                            {flash?.success && (
                                <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-xl px-4 py-3">
                                    {flash.success}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-5">
                                {/* honeypot: hidden from real users, bots tend to fill every field */}
                                <input
                                    type="text"
                                    name="website"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    className="hidden"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden="true"
                                />

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">First Name</label>
                                        <input
                                            type="text"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.first_name && <p className="text-xs font-semibold text-rose-600">{errors.first_name}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Last Name</label>
                                        <input
                                            type="text"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.last_name && <p className="text-xs font-semibold text-rose-600">{errors.last_name}</p>}
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Email</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.email && <p className="text-xs font-semibold text-rose-600">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Phone (optional)</label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.phone && <p className="text-xs font-semibold text-rose-600">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Subject</label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                    />
                                    {errors.subject && <p className="text-xs font-semibold text-rose-600">{errors.subject}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Message</label>
                                    <textarea
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                    />
                                    {errors.message && <p className="text-xs font-semibold text-rose-600">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-full text-sm transition disabled:opacity-50"
                                >
                                    {processing ? 'Sending…' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Visit Us */}
                <section className="py-16 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-rose-900 font-bold text-sm uppercase tracking-wider">Visit Us</span>
                            <h2 className="text-3xl font-bold mt-2 text-slate-900">Come See Us in Person</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-amber-50 rounded-2xl p-8 space-y-4 border border-amber-100">
                                <h3 className="text-lg font-bold text-slate-900">Office Hours</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Monday - Friday</span>
                                        <span className="font-semibold">8:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Saturday</span>
                                        <span className="font-semibold">9:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Sunday</span>
                                        <span className="font-semibold">Closed</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-50 rounded-2xl p-8 space-y-4 border border-emerald-100">
                                <h3 className="text-lg font-bold text-slate-900">Get Directions</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    We are located in the heart of Jayanthi Nagar, Kilinochchi. Our facility is easily accessible by public transportation and has parking available for visitors.
                                </p>
                                <a
                                    href="https://www.google.com/maps?cid=13750761810875853920"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-full text-sm transition"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Emergency Contact */}
                <section className="py-16 bg-rose-950 text-white text-center">
                    <div className="max-w-2xl mx-auto px-6 space-y-4">
                        <span className="bg-rose-900/60 text-rose-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                            Emergency Contact
                        </span>
                        <h2 className="text-2xl font-bold">
                            For urgent matters or emergencies involving child welfare, please contact us immediately.
                        </h2>
                        <a
                            href="tel:+94778277450"
                            className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-3.5 rounded-full transition shadow-lg"
                        >
                            Emergency Hotline: +94 77 827 7450
                        </a>
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}
