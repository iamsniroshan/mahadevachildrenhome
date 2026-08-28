import { useState } from 'react';
import Seo from '@/Components/Seo';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

const groups = [
    {
        key: 'committee',
        title: 'Our Committee Members',
        subtitle: 'Dedicated leaders guiding our mission with wisdom and commitment',
        badgeClass: 'bg-rose-600 text-white',
        sectionClass: 'bg-gradient-to-b from-rose-100 via-rose-50 to-transparent',
        accentClass: 'text-rose-900',
        ringClass: 'ring-rose-200 hover:ring-rose-400',
    },
    {
        key: 'executive',
        title: 'Executive Committee Members',
        subtitle: 'Experienced professionals supporting our operational excellence',
        badgeClass: 'bg-amber-500 text-slate-900',
        sectionClass: 'bg-gradient-to-b from-amber-100 via-amber-50 to-transparent',
        accentClass: 'text-amber-700',
        ringClass: 'ring-amber-200 hover:ring-amber-400',
    },
    {
        key: 'staff',
        title: 'Our Staff Team',
        subtitle: 'Passionate professionals dedicated to child care and development',
        badgeClass: 'bg-emerald-600 text-white',
        sectionClass: 'bg-gradient-to-b from-emerald-100 via-emerald-50 to-transparent',
        accentClass: 'text-emerald-800',
        ringClass: 'ring-emerald-200 hover:ring-emerald-400',
    },
];

const fallbackImage = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400';

function MemberCard({ member, group, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(member, group)}
            className={`text-left bg-white rounded-2xl shadow-sm ring-1 ${group.ringClass} overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all`}
        >
            <img src={member.image || fallbackImage} alt={member.name} className="h-56 w-full object-cover bg-slate-100" />
            <div className="p-5 space-y-1.5">
                <span className={`${group.badgeClass} text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full inline-block`}>
                    {member.position}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                {member.qualifications && (
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{member.qualifications}</p>
                )}
            </div>
        </button>
    );
}

function MemberModal({ member, group, onClose }) {
    if (!member) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    <img
                        src={member.image || fallbackImage}
                        alt={member.name}
                        className="max-h-[60vh] w-full object-contain bg-slate-100"
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold shadow"
                    >
                        ×
                    </button>
                </div>
                <div className="p-6 space-y-3">
                    <span className={`${group?.badgeClass ?? 'bg-slate-100 text-slate-700'} text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full inline-block`}>
                        {member.position}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>

                    {member.qualifications && (
                        <p className="text-sm text-slate-600 leading-relaxed">{member.qualifications}</p>
                    )}

                    <div className="pt-3 border-t border-slate-100 space-y-2 text-sm">
                        {member.phone && (
                            <div className="flex items-center gap-2 text-slate-600">
                                <span className={`font-bold ${group?.accentClass ?? 'text-slate-700'}`}>Phone:</span> {member.phone}
                            </div>
                        )}
                        {member.email && (
                            <div className="flex items-center gap-2 text-slate-600">
                                <span className={`font-bold ${group?.accentClass ?? 'text-slate-700'}`}>Email:</span> {member.email}
                            </div>
                        )}
                        {!member.phone && !member.email && (
                            <p className="text-slate-400">No additional contact details available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Index({ committee = [], executive = [], staff = [] }) {
    const dataByKey = { committee, executive, staff };
    const [selected, setSelected] = useState(null);

    const openMember = (member, group) => setSelected({ member, group });
    const closeModal = () => setSelected(null);

    return (
        <>
            <Seo
                title="Our Team"
                description="Meet the committee, executives, and staff caring for the children of Mahadeva Swamigal Children Home."
            />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                <SiteNav />

                <section className="bg-rose-950 text-white pt-16 pb-16 rounded-b-[3rem]">
                    <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
                        <span className="bg-rose-900/60 text-rose-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                            Our People
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight">Meet Our Team</h1>
                        <p className="text-rose-100/80 max-w-xl mx-auto">
                            The committee, executives, and staff working every day to care for the children of Mahadeva Home.
                        </p>
                    </div>
                </section>

                {groups.map((group) => {
                    const members = dataByKey[group.key];

                    return (
                        <section key={group.key} className={`py-20 ${group.sectionClass}`}>
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="text-center max-w-2xl mx-auto mb-16">
                                    <h2 className={`text-3xl font-bold ${group.accentClass}`}>{group.title}</h2>
                                    <p className="text-slate-600 mt-2">{group.subtitle}</p>
                                </div>

                                {members.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        {members.map((member) => (
                                            <MemberCard key={member.id} member={member} group={group} onSelect={openMember} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-slate-400">No members listed yet.</p>
                                )}
                            </div>
                        </section>
                    );
                })}

                <SiteFooter />
            </div>

            <MemberModal member={selected?.member} group={selected?.group} onClose={closeModal} />
        </>
    );
}
