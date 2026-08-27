import { Head, useForm, usePage } from '@inertiajs/react';
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
        is_anonymous: false,
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
            <Head title="Donate" />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                <SiteNav />

                <section className="bg-rose-950 text-white pt-16 pb-16 rounded-b-[3rem]">
                    <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
                        <span className="bg-rose-900/60 text-rose-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                            Make a Donation
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight">Support Our Children</h1>
                        <p className="text-rose-100/80 max-w-2xl mx-auto">
                            Your generous contribution helps us provide better care, education, and support for children in need. Every donation makes a meaningful difference.
                        </p>
                    </div>
                </section>

                {/* Bank Transfer Details */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <span className="text-rose-900 font-bold text-sm uppercase tracking-wider">Bank Transfer Details</span>
                            <h2 className="text-3xl font-bold mt-2 text-slate-900">You can make your donation directly to our Bank of Ceylon account</h2>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-teal-950 text-white px-8 py-5">
                                <h3 className="text-lg font-bold">Bank of Ceylon</h3>
                                <p className="text-teal-200 text-sm">Official Donation Account</p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-6 p-8">
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-rose-900 tracking-wide">Account Name</span>
                                    <span className="text-slate-800 font-semibold">Mahadeva Swamigal Children Home</span>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-rose-900 tracking-wide">Account Number</span>
                                    <span className="text-slate-800 font-semibold">9991351</span>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-rose-900 tracking-wide">Branch</span>
                                    <span className="text-slate-800 font-semibold">Kilinochchi Branch</span>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-rose-900 tracking-wide">Branch Code</span>
                                    <span className="text-slate-800 font-semibold">093</span>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-rose-900 tracking-wide">Bank Code</span>
                                    <span className="text-slate-800 font-semibold">7010</span>
                                </div>
                                <div>
                                    <span className="block text-[11px] font-bold uppercase text-rose-900 tracking-wide">Swift Code</span>
                                    <span className="text-slate-800 font-semibold">BCEYLKLX</span>
                                </div>
                            </div>
                            <div className="bg-amber-50 border-t border-amber-100 px-8 py-4 text-sm text-amber-800">
                                <strong>Important:</strong> Please use your name as the reference when making the transfer for easy identification.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Donation Details Form */}
                <section className="py-16 bg-white border-t border-slate-100">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <span className="text-rose-900 font-bold text-sm uppercase tracking-wider">After Your Transfer</span>
                            <h2 className="text-3xl font-bold mt-2 text-slate-900">Submit Your Donation Details</h2>
                            <p className="text-slate-600 mt-2">
                                After making your bank transfer, please fill out this form and upload your transaction receipt.
                            </p>
                        </div>

                        {flash?.success && (
                            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-xl px-4 py-3">
                                {flash.success}
                            </div>
                        )}

                        <form onSubmit={submit} className="bg-amber-50/40 rounded-2xl border border-slate-100 p-8 space-y-6">
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
                                <label className="flex items-center gap-2 mt-4 text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={data.is_anonymous}
                                        onChange={(e) => setData('is_anonymous', e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-300 text-rose-900 focus:ring-rose-900"
                                    />
                                    Make this donation anonymous
                                </label>
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

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition disabled:opacity-50"
                            >
                                {processing ? 'Submitting…' : 'Submit Donation Details'}
                            </button>
                        </form>

                        <div className="text-center mt-8 text-sm text-slate-600">
                            <p className="font-semibold">Need Help?</p>
                            <p>If you have any questions about making a donation or need assistance with the process, please contact us:</p>
                            <p className="mt-2">📧 rasa46@yahoo.com &nbsp;·&nbsp; 📞 +94 21 228 5678 &nbsp;·&nbsp; 💬 WhatsApp +94 77 827 7450</p>
                        </div>
                    </div>
                </section>

                {/* Safe & Secure */}
                <section className="py-16 bg-teal-950 text-white text-center">
                    <div className="max-w-4xl mx-auto px-6 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">Your Donation is Safe & Secure</h2>
                            <p className="text-teal-100/80">
                                We take the security of your donations seriously. All transactions are processed securely and 100% of your donation goes directly to supporting our children.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-6">
                            <div className="bg-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-1">100% Secure</h3>
                                <p className="text-sm text-teal-100/70">All donations are processed through secure banking channels</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-1">Transparent</h3>
                                <p className="text-sm text-teal-100/70">We provide regular updates on how your donations are used</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-6">
                                <h3 className="font-bold mb-1">Direct Impact</h3>
                                <p className="text-sm text-teal-100/70">Your donation directly supports the children in our care</p>
                            </div>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}
