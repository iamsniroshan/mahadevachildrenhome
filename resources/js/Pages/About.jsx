import { Head } from '@inertiajs/react';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

export default function About() {
    return (
        <>
            <Head title="About Us" />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                <SiteNav />

                <section className="bg-rose-950 text-white pt-16 pb-16 rounded-b-[3rem]">
                    <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
                        <span className="bg-rose-900/60 text-rose-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                            About Us
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight">Mahadeva Swamigal Children Home</h1>
                        <p className="text-rose-100/80 max-w-2xl mx-auto">
                            A story of compassion, resilience, and unwavering commitment to the children of Kilinochchi.
                        </p>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
                            <span className="text-rose-900 font-bold text-sm uppercase tracking-wider">Our Vision & Mission</span>
                            <h2 className="text-3xl font-bold text-slate-900">
                                எமது இலக்கு மற்றும் பணிக்கூற்று
                            </h2>
                            <p className="text-slate-600">
                                Guiding principles that shape our commitment to nurturing children and building a better future
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="/images/about/mission.jpg"
                                    alt="Our vision and mission"
                                    className="w-full h-80 object-cover"
                                />
                            </div>

                            <div className="space-y-6">
                                <div className="bg-rose-50 rounded-2xl p-8 space-y-3 border border-rose-100">
                                    <span className="bg-rose-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full inline-block">
                                        Vision / இலக்கு
                                    </span>
                                    <p className="text-slate-700 leading-relaxed">
                                        வருங்கால உலகின் சவால்களை வெற்றி கொள்ளும் உயரிய சிந்தனை கொண்ட உத்தமர்களை சமூகத்திற்கு பெற்றுக் கொடுத்தல்
                                    </p>
                                </div>

                                <div className="bg-emerald-50 rounded-2xl p-8 space-y-3 border border-emerald-100">
                                    <span className="bg-emerald-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full inline-block">
                                        Mission / பணிக்கூற்று
                                    </span>
                                    <p className="text-slate-700 leading-relaxed">
                                        நன்நெறி நின்று பல்வேறு நடைமுறைக்கு சாத்தியமான பயிற்சிகள், தேர்ச்சிகளூடாக நவீன தொழில்நுட்பத்துடன்
                                        கூடிய புதிய ஆக்கங்களை அறிமுகப்படுத்தி எமது தாய் மொழியையும் தாய்த்தேசத்தையும் தெளிந்த அன்புடன்
                                        நேசிக்கும் ஒழுக்கமும் பண்பாடு மிளிரும் இளைய தலைமுறையை உருவாக்குதல்.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* History & Foundation */}
                <section id="about" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-rose-900 font-bold text-sm uppercase tracking-wider">Our Story</span>
                            <h2 className="text-3xl font-bold mt-2 text-slate-900">History & Foundation</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-10">
                                <div className="flex gap-5">
                                    <div className="w-11 h-11 rounded-full bg-rose-900 text-white font-bold flex items-center justify-center flex-shrink-0">1</div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-900">Our Beginning</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            Founded in Jayanthi Nagar, Kilinochchi, the Mahadeva Swamikal Children Home was established with the vision of providing a safe haven for children who have lost their families or come from disadvantaged backgrounds.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-11 h-11 rounded-full bg-amber-500 text-slate-900 font-bold flex items-center justify-center flex-shrink-0">2</div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-900">Honoring Mahadeva Swamikal</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            Named after the revered spiritual leader Mahadeva Swamikal, our home continues his legacy of selfless service and dedication to the welfare of children. We honor his teachings and commitment to uplifting the underprivileged through education and compassionate care.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-11 h-11 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0">3</div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-900">Growth & Impact</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            Over the years, we have grown from a small shelter to a comprehensive care facility that provides education, healthcare, and emotional support. Today, we stand as a beacon of hope in the community, having successfully helped numerous children complete their education and go on to lead productive, fulfilling lives.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="/images/about/history.jpg"
                                    alt="Our history"
                                    className="w-full h-full min-h-[420px] object-cover"
                                />
                            </div>
                        </div>

                        <div className="mt-14 bg-teal-950 text-white rounded-2xl p-8 text-center max-w-4xl mx-auto">
                            <p className="text-lg leading-relaxed">
                                Our dedicated committee and staff work tirelessly to ensure every child receives the love, care, and opportunities they deserve to build a brighter future.
                            </p>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}
