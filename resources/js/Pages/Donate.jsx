import { useForm, usePage } from '@inertiajs/react';
import Seo from '@/Components/Seo';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

export default function Donate() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        donor_name: '',
        email: '',
        phone: '',
        address: '',
        donation_type: 'one_time',
        amount: '',
        currency: 'LKR',
        category: 'general',
        message: '',
        payment_method: 'bank_transfer',
        payment_reference: '',
        document: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('donate.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Seo
                title="Donate"
                description="Support the children of Mahadeva Swamigal Children Home with a one-time or recurring donation towards education, healthcare, and shelter."
            />
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,214,102,0.18),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(251,113,133,0.18),transparent_25%),linear-gradient(180deg,_#fffaf5_0%,_#fff7ed_35%,_#fffdfb_100%)] text-slate-800 font-sans antialiased">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-amber-300/40 blur-3xl" />
                    <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-rose-300/30 blur-3xl" />
                    <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
                </div>

                <SiteNav />

                <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-rose-950 via-rose-900 to-red-950 pt-16 pb-16 text-white shadow-[0_25px_60px_rgba(146,19,53,0.12)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)]" />
                    <div className="relative mx-auto max-w-7xl px-6 text-center space-y-3">
                        <span className="inline-block rounded-full bg-rose-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-200">
                            Make a Donation
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight">Support Our Children</h1>
                        <p className="mx-auto max-w-2xl text-rose-100/80">
                            Your generous contribution helps us provide better care, education, and support for children in need. Every donation makes a meaningful difference.
                        </p>
                    </div>
                </section>

                {/* Bank Transfer Details */}
                <section className="relative py-16">
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="mx-auto mb-10 max-w-2xl text-center">
                            <span className="text-sm font-bold uppercase tracking-wider text-rose-900">Bank Transfer Details</span>
                            <h2 className="mt-2 text-3xl font-bold text-slate-900">You can make your donation directly to our Bank of Ceylon account</h2>
                        </div>

                        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                            <div className="bg-gradient-to-r from-teal-900 to-teal-800 px-8 py-5 text-white">
                                <h3 className="text-lg font-bold">Bank of Ceylon</h3>
                                <p className="text-sm text-teal-100">Official Donation Account</p>
                            </div>
                            <div className="grid gap-6 p-8 sm:grid-cols-2">
                                {[
                                    ['Account Name', 'Mahadeva Swamigal Children Home'],
                                    ['Account Number', '9991351'],
                                    ['Branch', 'Kilinochchi Branch'],
                                    ['Branch Code', '093'],
                                    ['Bank Code', '7010'],
                                    ['Swift Code', 'BCEYLKLX'],
                                ].map(([label, value]) => (
                                    <div key={label} className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm">
                                        <span className="block text-[11px] font-bold uppercase tracking-wide text-rose-900">{label}</span>
                                        <span className="mt-2 block text-slate-800 font-semibold">{value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-amber-100 bg-amber-50/80 px-8 py-4 text-sm text-amber-800">
                                <strong>Important:</strong> Please use your name as the reference when making the transfer for easy identification.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Donation Details Form */}
                <section className="relative py-16">
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="mx-auto mb-10 max-w-2xl text-center">
                            <span className="text-sm font-bold uppercase tracking-wider text-rose-900">After Your Transfer</span>
                            <h2 className="mt-2 text-3xl font-bold text-slate-900">Submit Your Donation Details</h2>
                            <p className="mt-2 text-slate-600">
                                After making your bank transfer, please fill out this form and upload your transaction receipt.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6 rounded-[2rem] border border-white/70 bg-white/60 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide text-rose-900 mb-4">Personal Information</h3>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Full Name</label>
                                        <input
                                            type="text"
                                            value={data.donor_name}
                                            onChange={(e) => setData('donor_name', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.donor_name && <p className="text-xs font-semibold text-rose-600">{errors.donor_name}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Email Address</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.email && <p className="text-xs font-semibold text-rose-600">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Phone Number</label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.phone && <p className="text-xs font-semibold text-rose-600">{errors.phone}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Address</label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.address && <p className="text-xs font-semibold text-rose-600">{errors.address}</p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide text-rose-900 mb-4">Donation Information</h3>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Donation Amount</label>
                                        <input
                                            type="number"
                                            value={data.amount}
                                            onChange={(e) => setData('amount', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.amount && <p className="text-xs font-semibold text-rose-600">{errors.amount}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Currency</label>
                                        <input
                                            type="text"
                                            value={data.currency}
                                            onChange={(e) => setData('currency', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.currency && <p className="text-xs font-semibold text-rose-600">{errors.currency}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Donation Category</label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        >
                                            <option value="general">General</option>
                                            <option value="education">Education</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="shelter">Shelter</option>
                                            <option value="food">Food</option>
                                            <option value="emergency">Emergency</option>
                                        </select>
                                        {errors.category && <p className="text-xs font-semibold text-rose-600">{errors.category}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Donation Type</label>
                                        <select
                                            value={data.donation_type}
                                            onChange={(e) => setData('donation_type', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        >
                                            <option value="one_time">One Time</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                        {errors.donation_type && <p className="text-xs font-semibold text-rose-600">{errors.donation_type}</p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide text-rose-900 mb-4">Payment Information</h3>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Payment Method</label>
                                        <select
                                            value={data.payment_method}
                                            onChange={(e) => setData('payment_method', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        >
                                            <option value="bank_transfer">Bank Transfer</option>
                                            <option value="credit_card">Credit Card</option>
                                            <option value="paypal">PayPal</option>
                                            <option value="cash">Cash</option>
                                            <option value="check">Check</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.payment_method && <p className="text-xs font-semibold text-rose-600">{errors.payment_method}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Payment Reference / Transaction ID</label>
                                        <input
                                            type="text"
                                            value={data.payment_reference}
                                            onChange={(e) => setData('payment_reference', e.target.value)}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                        />
                                        {errors.payment_reference && <p className="text-xs font-semibold text-rose-600">{errors.payment_reference}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Upload Supporting Document (Optional)</label>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={(e) => setData('document', e.target.files?.[0] ?? null)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-rose-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-rose-950"
                                />
                                <p className="text-xs text-slate-400">Supports JPG, PNG, PDF up to 5MB</p>
                                {errors.document && <p className="text-xs font-semibold text-rose-600">{errors.document}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Additional Message (Optional)</label>
                                <textarea
                                    rows={3}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none"
                                />
                                {errors.message && <p className="text-xs font-semibold text-rose-600">{errors.message}</p>}
                            </div>
                            {flash?.success && (
                                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                                    {flash.success}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition disabled:opacity-50"
                            >
                                {processing ? 'Submitting…' : 'Submit Donation Details'}
                            </button>
                        </form>

                        <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/60 p-6 text-center text-sm text-slate-600 shadow-[0_18px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                            <p className="font-semibold">Need Help?</p>
                            <p>If you have any questions about making a donation or need assistance with the process, please contact us:</p>
                            <p className="mt-2">📧 rasa46@yahoo.com &nbsp;·&nbsp; 📞 +94 21 228 5678 &nbsp;·&nbsp; 💬 WhatsApp +94 77 827 7450</p>
                        </div>
                    </div>
                </section>

                {/* Safe & Secure */}
                <section className="relative py-16 text-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-sky-950 to-teal-900" />
                    <div className="relative mx-auto max-w-5xl px-6 text-center">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">Your Donation is Safe & Secure</h2>
                            <p className="mx-auto max-w-3xl text-teal-100/80">
                                We take the security of your donations seriously. All transactions are processed securely and 100% of your donation goes directly to supporting our children.
                            </p>
                        </div>
                        <div className="mt-8 grid gap-6 sm:grid-cols-3">
                            {[
                                ['100% Secure', 'All donations are processed through secure banking channels'],
                                ['Transparent', 'We provide regular updates on how your donations are used'],
                                ['Direct Impact', 'Your donation directly supports the children in our care'],
                            ].map(([title, text]) => (
                                <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-md">
                                    <h3 className="mb-1 font-bold">{title}</h3>
                                    <p className="text-sm text-teal-100/70">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}
