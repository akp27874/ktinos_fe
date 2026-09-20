import React from "react";
import innerPageImage from "../assets/images/inner-page_1.jpg";
import { theme } from "../theme";
import { PawPrint, ShieldIcon as CareShieldIcon, MessageSquare as SupportMessageIcon } from "lucide-react";
import { PawIcon } from "./PawIcon";

// Icons as inline SVGs to avoid extra dependencies
const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: theme.colors.primary.tealWellness }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.deepPurple }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: theme.colors.primary.deepPurple }}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.tealWellness }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.deepPurple }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9v4a2 2 0 01-2 2h-1a2 2 0 01-2-2v-2a2 2 0 012-2h1v-2c0-3.87-3.13-7-7-7s-7 3.13-7 7v2h1a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z" />
  </svg>
);

const CollaborateIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.softLavender }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const LocationPinIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.tealWellness }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.deepPurple }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.softLavender }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.tealWellness }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SupportIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.deepPurple }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const features = [
  "24×7 Live Tracking",
  "Health Alerts",
  "Activity Monitoring",
  "AI Wellness Insights",
  "Dashboard Access",
];

const plans = [
  {
    name: "MONTHLY PLAN",
    price: "₹399/-",
    period: "per month",
    tagline: "",
    badge: null,
    highlight: false,
  },
  {
    name: "QUARTERLY PLAN",
    price: "₹999/-",
    period: "for 3 months",
    tagline: "Save more with quarterly billing!",
    badge: "MOST POPULAR",
    highlight: true,
  },
  {
    name: "6 MONTHS PLAN",
    price: "₹1,999/-",
    period: "for 6 months",
    tagline: "More savings. More peace of mind.",
    badge: null,
    highlight: false,
  },
  {
    name: "ANNUAL PLAN",
    price: "₹3,999/-",
    period: "per year",
    tagline: "Maximum savings for a full year of care!",
    badge: "BEST VALUE",
    highlight: false,
    badgeGreen: true,
  },
];

;

const PlansAndPrices: React.FC = () => {
  return (
    <div className="bg-[#faf8f5] font-sans text-gray-800 min-h-screen">

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative aspect-[1920/1130] overflow-hidden">
        <img
          src={innerPageImage}
          alt="German Shepherd using Ktinoskare in a protected park"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/45 via-black/30 to-transparent" />
        <div className="absolute inset-0 z-20 mx-auto flex max-w-7xl items-center px-6 md:px-16 lg:px-24">
          <div className="w-full md:w-1/2">
            <h1
              className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Smart Care Plans for{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${theme.colors.primary.deepPurple} 0%, ${theme.colors.primary.softLavender} 45%, ${theme.colors.primary.tealWellness} 100%)` }}>a Healthier, Safer Pet</span>
            </h1>
            <p
              className="mb-6 max-w-md text-base leading-relaxed text-gray-100 md:text-lg"
              style={{ fontFamily: theme.fonts.handwritten }}
            >
              Ktinoskare is a smart pet health and activity monitoring solution
              that tracks vitals, activity, location and predicts potential health
              issues in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Smart Collar Device */}
      <section className="px-4 py-10 max-w-5xl mx-auto">
        <h2 className="text-lg font-bold mb-6" style={{ color: theme.colors.primary.deepPurple }}>
          <span style={{ color: theme.colors.primary.tealWellness }}>1.</span> SMART COLLAR DEVICE
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col md:flex-row gap-6 items-start" style={{ borderColor: 'rgba(106,27,154,0.12)', boxShadow: '0 12px 30px rgba(106,27,154,0.08)' }}>
          {/* Device image */}
          <div className="flex-shrink-0 flex items-center justify-center w-40 h-40 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-5xl select-none">⌚</span>
          </div>
          {/* Info */}
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">One-Time Purchase</div>
            <div className="text-4xl font-extrabold text-gray-900 mb-4">₹3,999/-</div>
            <ul className="space-y-2 mb-5">
              {[
                "Advanced health & activity tracking",
                "Real-time location monitoring",
                "Built-in SIM card",
                "Rechargeable & water resistant",
                "Works with Web & Mobile App",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckIcon /> {f}
                </li>
              ))}
            </ul>
            <button className="transition-colors text-white font-semibold px-7 py-2.5 rounded-full text-sm shadow" style={{ background: `linear-gradient(135deg, ${theme.colors.primary.deepPurple}, ${theme.colors.primary.softLavender})` }}>
              Buy Device Now
            </button>
          </div>
          {/* Important Note */}
          <div className="flex-shrink-0 max-w-xs">
            <div className="rounded-xl p-4 flex gap-3" style={{ background: 'rgba(155,89,182,0.08)', border: `1px solid rgba(106,27,154,0.12)` }}>
              <ShieldIcon />
              <div>
                <div className="font-bold text-sm text-gray-800 mb-1">Important Note</div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The device is a one-time purchase. A Premium Subscription is required to access all advanced features and services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Premium Subscription Plans */}
      <section className="px-4 py-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span style={{ color: theme.colors.primary.tealWellness }}>👑</span>
          <h2 className="text-lg font-bold text-gray-800">PREMIUM SUBSCRIPTION PLANS</h2>
        </div>
        <p className="text-sm text-gray-500 mb-8">Choose the subscription plan that works best for you.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl border-2 p-5 flex flex-col transition-all"
              style={plan.highlight ? {
                borderColor: theme.colors.primary.deepPurple,
                background: 'linear-gradient(180deg, rgba(155,89,182,0.04), rgba(255,255,255,1))',
                boxShadow: '0 20px 45px rgba(106,27,154,0.12)',
                transform: 'scale(1.02)',
              } : {
                borderColor: 'rgba(106,27,154,0.12)',
                background: '#fff',
                boxShadow: '0 8px 24px rgba(106,27,154,0.04)',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold text-white"
                  style={{ background: plan.badgeGreen ? theme.colors.primary.tealWellness : theme.colors.primary.deepPurple }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold mb-3">
                <CalendarIcon />
                {plan.name}
              </div>
              <div className="text-3xl font-extrabold text-gray-900 mb-0.5">{plan.price}</div>
              <div className="text-xs text-gray-500 mb-2">{plan.period}</div>
              {plan.tagline && (
                <div className="text-xs font-medium mb-3" style={{ color: theme.colors.primary.tealWellness }}>{plan.tagline}</div>
              )}

              <ul className="space-y-2 mb-5 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-2.5 rounded-full text-sm font-semibold transition-colors"
                style={plan.highlight ? {
                  background: `linear-gradient(135deg, ${theme.colors.primary.deepPurple}, ${theme.colors.primary.softLavender})`,
                  color: '#fff',
                  boxShadow: '0 12px 25px rgba(106,27,154,0.18)',
                } : {
                  border: `2px solid ${theme.colors.primary.deepPurple}`,
                  color: theme.colors.primary.deepPurple,
                  background: 'rgba(155,89,182,0.04)',
                }}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Why Pet Parents Love Ktinoskare */}
      <section className="px-4 py-10 max-w-5xl mx-auto">
        <h2 className="text-lg font-bold mb-8" style={{ color: theme.colors.primary.deepPurple }}>
          <span style={{ color: theme.colors.primary.tealWellness }}>3.</span> WHY PET PARENTS LOVE KTINOSKARE
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              icon: <StarIcon />,
              title: "30-Day Money Back Guarantee",
              desc: "Not happy? Get a full refund within 30 days.",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: theme.colors.primary.tealWellness }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138..." />
                </svg>
              ),
              title: "1-Year Warranty",
              desc: "We stand by the quality of our smart collar.",
            },
            {
              icon: <TruckIcon />,
              title: "Free Shipping",
              desc: "Fast & free delivery across India.",
            },
            {
              icon: <CollaborateIcon />,
              title: "Customized Collar Belt with Pet Name",
              desc: "Make it special with your pet's name on the collar belt.",
            },
            {
              icon: <HeadphonesIcon />,
              title: "24×7 Customer Support",
              desc: "We're always here to help you and your pet.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-start gap-2 shadow-sm" style={{ borderColor: 'rgba(106,27,154,0.12)', boxShadow: '0 10px 25px rgba(106,27,154,0.05)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(155,89,182,0.08)', color: theme.colors.primary.deepPurple }}>
                {item.icon}
              </div>
              <div className="font-semibold text-sm text-gray-800 leading-snug">{item.title}</div>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: What's Included */}
      <section className="px-4 py-10 max-w-5xl mx-auto">
        <h2 className="text-lg font-bold mb-8" style={{ color: theme.colors.primary.deepPurple }}>
          <span style={{ color: theme.colors.primary.tealWellness }}>4.</span> WHAT'S INCLUDED
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* In the Box */}
            <div className="p-6">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">
                In the Box (Device Package)
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { emoji: "📿", label: "1 Neck Collar Band" },
                  { emoji: "🔌", label: "1 Magnetic Charger" },
                  { emoji: "📶", label: "1 Built-in SIM Card" },
                  { emoji: "📄", label: "1 Quick Start Guide" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl border border-gray-100">
                      {item.emoji}
                    </div>
                    <span className="text-[11px] text-gray-600 leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* With Your Subscription */}
            <div className="p-6">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">
                With Your Subscription
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { icon: <StarIcon />, label: "Advanced Features Access" },
                  { icon: <HeartIcon />, label: "Health Monitoring Dashboard" },
                  { icon: <LocationPinIcon />, label: "Live GPS Tracking" },
                  { icon: <ChartIcon />, label: "AI Health Reports" },
                  { icon: <BellIcon />, label: "Smart Alerts" },
                  { icon: <SupportIcon />, label: "All-Round Support" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(155,89,182,0.08)', color: theme.colors.primary.deepPurple }}>
                      {item.icon}
                    </div>
                    <span className="text-[11px] text-gray-600 leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 py-6 max-w-5xl mx-auto mb-12">
        <div className="relative rounded-2xl overflow-hidden border" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.08), rgba(26,188,156,0.08))', borderColor: 'rgba(106,27,154,0.12)' }}>
          <div className="flex flex-col md:flex-row items-center gap-4 p-8">
            {/* Dog emoji */}
            <div className="hidden md:flex w-24 h-24 items-center justify-center text-6xl select-none flex-shrink-0">
              🐶
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-gray-600 text-base mb-1">Give Your Pet the Gift of</p>
              <h3 className="text-2xl md:text-3xl font-extrabold" style={{ color: theme.colors.primary.deepPurple }}>
                Better Health & Safety
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Ktinoskare. Because they deserve the best care.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <button className="transition-colors text-white font-semibold px-7 py-2.5 rounded-full text-sm shadow flex items-center gap-2" style={{ background: `linear-gradient(135deg, ${theme.colors.primary.deepPurple}, ${theme.colors.primary.softLavender})` }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buy Device Now
              </button>
              <button className="transition-colors font-semibold px-7 py-2.5 rounded-full text-sm" style={{ border: `2px solid ${theme.colors.primary.deepPurple}`, color: theme.colors.primary.deepPurple, background: 'rgba(155,89,182,0.04)' }}>
                View Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-7 items-center">
            {[
              { icon: <PawPrint className="w-6 h-6 text-white" />, title: "Trusted by", sub: "Pet Parents" },
              { icon: <CareShieldIcon className="w-6 h-6 text-white" />, title: "Veterinarian", sub: "Recommended" },
              { icon: <CareShieldIcon className="w-6 h-6 text-white" />, title: "Safe & Secure", sub: "Technology" },
              { icon: <SupportMessageIcon className="w-6 h-6 text-white" />, title: "Dedicated Customer", sub: "Support" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <div className="opacity-80 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs font-bold leading-tight">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <PawIcon className="w-5 h-5" style={{ color: theme.colors.primary.tealWellness }} />
              <span className="text-white font-extrabold text-sm tracking-widest uppercase">Ktinoskare</span>
            </div>
            <p className="font-extrabold text-sm text-center" style={{ color: theme.colors.primary.softLavender }}>
              Because They Deserve the Best Care{" "}
              <span style={{ color: theme.colors.primary.deepPurple }}>❤</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PlansAndPrices;