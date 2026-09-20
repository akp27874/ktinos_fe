import innerPageImage from "../assets/images/inner-page_3.jpg";
import { theme } from "../theme";
import { PawPrint, ShieldIcon as CareShieldIcon, MessageSquare as SupportMessageIcon } from "lucide-react";
import { PawIcon } from "./PawIcon";

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

const HeartPulseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const LocationPinIcon = ({ className = "w-7 h-7", style }: { className?: string; style?: Record<string, string | number> }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5", style }: { className?: string; style?: Record<string, string | number> }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} style={style}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const DogIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8">
    <path d="M4 14c0 3.31 3.13 6 7 6s7-2.69 7-6" />
    <path d="M4 14V9a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v5" />
    <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
    <path d="M9 15s1 1 3 1 3-1 3-1" />
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-8 h-8">
    <path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 3 3v9h6V12a3 3 0 0 0 3-3 3 3 0 0 0-3-3 3 3 0 0 0-3-3z" />
    <path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 3 3 3 3 0 0 1-3 3v9h-6" />
  </svg>
);

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const MapSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const BellSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const HistorySmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4" />
  </svg>
);

const UserSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const GridSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const HeartSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

function WhatItIs() {
  return (
    <div className="font-sans text-gray-800 bg-white">

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <img
          src={innerPageImage}
          alt="Happy dog and cat wearing Ktinoskare trackers"
          className="relative z-0 block h-auto w-full"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
        <div className="absolute inset-0 z-10 flex items-center w-full">
          <div className="w-full max-w-7xl mx-auto px-6 py-8 md:px-16 lg:px-24">
            <div className="max-w-xl text-white text-center md:text-left">
              <h1
                className="mb-5 text-5xl font-extrabold leading-tight md:text-6xl"
                style={{ fontFamily: theme.fonts.heading }}
              >
                What is <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${theme.colors.primary.deepPurple} 0%, ${theme.colors.primary.softLavender} 45%, ${theme.colors.primary.tealWellness} 100%)` }}>Ktinoskare</span>?
              </h1>
              <p
                className="text-base leading-relaxed text-white/90 md:text-lg"
                style={{ fontFamily: theme.fonts.handwritten }}
              >
                Ktinoskare is a smart pet health and activity monitoring solution that helps
                you track your pet's daily activity, health vitals, location and predict
                potential health issues so you can take action early and keep them happy,
                healthy and safe always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ALL-IN-ONE FEATURES
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 px-6 md:px-16 lg:px-24" style={{ background: `linear-gradient(180deg, ${theme.colors.neutral.white} 0%, rgba(155,89,182,0.04) 100%)` }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: theme.colors.primary.deepPurple }}>
            All-in-One Pet Health &amp; Safety Solution
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              {
                icon: <DogIcon />,
                title: "Activity Tracking",
                desc: "Track daily activity, playtime, steps, rest and calories burned.",
              },
              {
                icon: <HeartPulseIcon />,
                title: "Health Vitals",
                desc: "Monitor heart rate, respiratory rate, body temperature and more.",
              },
              {
                icon: <BrainIcon />,
                title: "Predictive Health",
                desc: "AI-powered insights help detect potential health issues before they become serious.",
              },
              {
                icon: <LocationPinIcon />,
                title: "Live Location Tracking",
                desc: "Know where your pet is in real-time. Get peace of mind always.",
              },
              {
                icon: <BellIcon />,
                title: "Smart Alerts",
                desc: "Instant alerts for any anomalies or unusual behavior in your pet's health.",
              },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(135deg, rgba(155,89,182,0.12), rgba(26,188,156,0.08))`,
                    color: theme.colors.primary.deepPurple,
                    borderColor: 'rgba(106,27,154,0.15)',
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base">{f.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REAL-TIME LOCATION SECTION
      ══════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-16 lg:px-24" style={{ background: `linear-gradient(135deg, rgba(155,89,182,0.06), rgba(26,188,156,0.08), rgba(255,255,255,1))` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4" style={{ color: theme.colors.primary.deepPurple }}>
              Real-time Location,<br />Total Peace of Mind
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-sm">
              Track your pet's live location on the map in real-time. Set safe zones and get
              alerted if they wander out of the area.
            </p>
            <ul className="space-y-3">
              {["Live Tracking", "Safe Zone Alerts"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                  <LocationPinIcon style={{ color: theme.colors.primary.tealWellness }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: map card + golden retriever photo */}
          <div className="relative flex items-center justify-center h-[340px]">

            {/* Golden retriever background photo */}
            <div className="absolute right-0 top-0 bottom-0 w-[65%] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80"
                alt="Golden retriever with GPS tracker collar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Map card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden w-[230px] border border-gray-100 mr-auto">
              {/* Map area */}
              <div className="h-[160px] bg-[#eef4ec] relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 230 160">
                  <rect width="230" height="160" fill="#eef4ec" />
                  {/* road grid */}
                  <rect x="0" y="45" width="230" height="18" fill="#dde8db" />
                  <rect x="0" y="97" width="230" height="18" fill="#dde8db" />
                  <rect x="65" y="0" width="18" height="160" fill="#dde8db" />
                  <rect x="147" y="0" width="18" height="160" fill="#dde8db" />
                  {/* centre road marks */}
                  <line x1="0" y1="54" x2="230" y2="54" stroke="white" strokeWidth="1" strokeDasharray="6 4" />
                  <line x1="0" y1="106" x2="230" y2="106" stroke="white" strokeWidth="1" strokeDasharray="6 4" />
                  <line x1="74" y1="0" x2="74" y2="160" stroke="white" strokeWidth="1" strokeDasharray="6 4" />
                  <line x1="156" y1="0" x2="156" y2="160" stroke="white" strokeWidth="1" strokeDasharray="6 4" />
                  {/* pulse rings */}
                  <circle cx="115" cy="80" r="35" fill="none" stroke="#6A1B9A" strokeWidth="1" opacity="0.25" />
                  <circle cx="115" cy="80" r="22" fill="none" stroke="#1ABC9C" strokeWidth="1.5" opacity="0.5" />
                  <circle cx="115" cy="80" r="11" fill="#F5F6F7" stroke="#6A1B9A" strokeWidth="2" />
                </svg>
                {/* Pin marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6A1B9A, #1ABC9C)', color: '#fff' }}>
                    <PawIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-3 h-3 rotate-45 rounded-sm -mt-1.5" style={{ background: theme.colors.primary.deepPurple }} />
                </div>
              </div>

              {/* Info bar */}
              <div className="flex items-center gap-2.5 px-3 py-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-200 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=80&q=70"
                    alt="Buddy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900 leading-none">Buddy</p>
                  <p className="text-[11px] text-green-500 font-semibold mt-0.5">Live – Near Park Street</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">2 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HEALTH DASHBOARD SECTION
      ══════════════════════════════════════ */}
      <section className="bg-white py-16 px-6 md:px-16 lg:px-24" style={{ background: `linear-gradient(180deg, rgba(155,89,182,0.03), rgba(26,188,156,0.04), rgba(255,255,255,1))` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4" style={{ color: theme.colors.primary.deepPurple }}>
              Your Pet's Health<br />Dashboard
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-sm">
              Get a complete overview of your pet's health and activity in one beautiful dashboard.
            </p>
            <ul className="space-y-3">
              {[
                "Live Activity & Energy Score",
                "Health Vitals Monitoring",
                "Sleep & Rest Quality",
                "Wellness Score",
                "History & Trends",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                  <CheckCircleIcon className="w-5 h-5 flex-shrink-0" style={{ color: theme.colors.primary.tealWellness }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Dashboard Mockup */}
          <div className="bg-gray-50 rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            {/* Top bar */}
            <div className="flex items-center justify-between bg-white px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <PawIcon className="w-5 h-5" style={{ color: theme.colors.primary.tealWellness }} />
                <span className="text-xs font-extrabold tracking-widest uppercase" style={{ color: theme.colors.primary.deepPurple }}>Ktinoskare</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="w-[110px] bg-white border-r border-gray-100 py-3 flex-shrink-0 hidden md:block">
                {[
                  { label: "Dashboard", icon: <GridSmIcon />, active: true },
                  { label: "Activity", icon: <ActivityIcon />, active: false },
                  { label: "Health Vitals", icon: <HeartSmIcon />, active: false },
                  { label: "Location", icon: <MapSmIcon />, active: false },
                  { label: "Alerts", icon: <BellSmIcon />, active: false },
                  { label: "History", icon: <HistorySmIcon />, active: false },
                  { label: "Profile", icon: <UserSmIcon />, active: false },
                  { label: "Settings", icon: <SettingsSmIcon />, active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 px-3 py-2 text-[11px] font-medium cursor-pointer"
                    style={item.active ? {
                      background: 'rgba(155,89,182,0.08)',
                      color: theme.colors.primary.deepPurple,
                      borderRight: `2px solid ${theme.colors.primary.deepPurple}`,
                    } : { color: theme.colors.neutral.gray[500] }}
                  >
                    <span style={item.active ? { color: theme.colors.primary.deepPurple } : { color: theme.colors.neutral.gray[400] }}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-4">
                {/* Pet info + wellness */}
                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-200 flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&q=70"
                        alt="Buddy the golden retriever"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Buddy</p>
                      <p className="text-xs text-gray-500">Golden Retriever | 4 Years</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        All Good
                      </span>
                    </div>
                  </div>

                  {/* Wellness ring */}
                  <div className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2 border border-gray-100 shadow-sm">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="19" fill="none" stroke="#F3F4F6" strokeWidth="5" />
                        <circle
                          cx="24" cy="24" r="19" fill="none"
                          stroke="#22C55E" strokeWidth="5"
                          strokeDasharray={`${(92 / 100) * 119.4} 119.4`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[13px] font-extrabold text-green-600">92</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-gray-800">Wellness Score</p>
                      <p className="text-[9px] text-gray-500 font-medium leading-tight">Excellent</p>
                      <p className="text-[9px] text-gray-400 leading-tight">Great job! Buddy is<br />in great health today.</p>
                    </div>
                  </div>
                </div>

                {/* Activity row */}
                <div className="bg-white rounded-2xl p-3 mb-2.5 border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2">Activity</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Activity", val: "8,245", unit: "Steps", progress: 72, color: "#22C55E", goal: "Goal: 10k steps" },
                      { label: "Active Time", val: "78", unit: "mins", progress: 60, color: "#22C55E", goal: "Goal: 1 hr" },
                      { label: "Calories Burned", val: "620", unit: "kcal", progress: 80, color: "#22C55E", goal: "Goal: 800 kcal" },
                      { label: "Rest Time", val: "10.2", unit: "hrs", progress: 50, color: "#9CA3AF", goal: "Goal: 12 hrs" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="text-[9px] text-gray-500 mb-0.5">{stat.label}</p>
                        <p className="text-[14px] font-extrabold text-gray-900 leading-none">{stat.val}</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">{stat.unit}</p>
                        <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${stat.progress}%`, backgroundColor: stat.color }} />
                        </div>
                        <p className="text-[8px] text-gray-400 mt-0.5">{stat.goal}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Vitals row */}
                <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2">Health Vitals</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Heart Rate", val: "82", unit: "bpm", status: "Normal" },
                      { label: "Respiratory Rate", val: "24", unit: "rpm", status: "Normal" },
                      { label: "Body Temperature", val: "38.2", unit: "°C", status: "Normal" },
                    ].map((v) => (
                      <div key={v.label}>
                        <p className="text-[9px] text-gray-500 mb-0.5">{v.label}</p>
                        <p className="text-[16px] font-extrabold text-gray-900 leading-none">{v.val}</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">{v.unit}</p>
                        <p className="text-[9px] text-green-500 font-bold mt-0.5">● {v.status}</p>
                      </div>
                    ))}
                    {/* Sparkline */}
                    <div>
                      <p className="text-[9px] text-gray-500 mb-1">Trends (7 Days)</p>
                      <svg viewBox="0 0 60 36" className="w-full h-8">
                        <polyline fill="none" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                          points="0,24 10,18 20,26 30,12 40,20 50,10 60,16" />
                        <polyline fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                          points="0,28 10,22 20,18 30,24 40,14 50,20 60,12" />
                        <polyline fill="none" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                          points="0,20 10,24 20,16 30,20 40,10 50,18 60,22" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SMART ALERTS SECTION
      ══════════════════════════════════════ */}
      <section className="py-14 px-6 md:px-16 lg:px-24" style={{ background: `linear-gradient(135deg, rgba(155,89,182,0.06), rgba(26,188,156,0.07), rgba(255,255,255,1))` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="relative w-[200px]">
              <div className="bg-gray-950 rounded-[2.8rem] p-[6px] shadow-2xl">
                <div className="bg-white rounded-[2.3rem] overflow-hidden">
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-1">
                    <div className="w-20 h-5 bg-gray-950 rounded-full" />
                  </div>
                  {/* Header */}
                  <div className="px-4 pt-1 pb-2 flex justify-between">
                    <span className="text-[12px] font-bold text-gray-900">Alerts</span>
                    <span className="text-[12px] font-bold text-gray-900">Alerts</span>
                  </div>
                  <div className="px-3 space-y-2.5 pb-4">
                    {/* Alert 1 */}
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-2.5">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(106,27,154,0.08)', borderColor: 'rgba(106,27,154,0.2)', color: theme.colors.primary.deepPurple }}>
                          <HeartPulseIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-extrabold text-red-700 leading-tight">High Heart Rate Detected</p>
                          <p className="text-[9px] text-gray-500 font-medium">Brookie</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">Today, 11:28 Am</p>
                          <p className="text-[9px] text-gray-600 mt-1 leading-tight">
                            Buddy's heart rate is higher than normal.
                          </p>
                          <button className="mt-1.5 text-[9px] bg-white border border-red-300 text-red-600 rounded-lg px-2.5 py-1 font-bold">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Alert 2 */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-2.5">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,188,156,0.08)', borderColor: 'rgba(26,188,156,0.2)', color: theme.colors.primary.tealWellness }}>
                          <DogIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-extrabold text-yellow-700 leading-tight">Low Activity Alert</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">Yesterday 4:15 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Home indicator */}
                  <div className="flex justify-center pb-3">
                    <div className="w-20 h-1 bg-gray-900 rounded-full opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-4">
              Smart Alerts,<br />Early Action
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-sm">
              Get notified instantly if we detect any unusual behavior or potential health issues in your pet.
            </p>
            <ul className="space-y-3">
              {["Health Anomalies", "Activity Changes", "Behavior Alerts", "Medication Reminders"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                  <CheckCircleIcon className="w-5 h-5 flex-shrink-0" style={{ color: theme.colors.primary.tealWellness }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Woman with dog + testimonial */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden h-[280px] w-full">
              <img
                src="https://www.akc.org/wp-content/uploads/2017/12/Yellow-Lab-High-Five.jpg"
                alt="Woman with golden retriever"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Testimonial overlapping */}
            <div className="mx-4 mt-[-55px] relative z-10 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <div className="text-4xl font-serif leading-none mb-1 opacity-80" style={{ color: theme.colors.primary.deepPurple }}>"</div>
              <p className="text-gray-800 text-[13px] leading-relaxed font-medium">
                "Ktinoskare gives me peace of mind every day. I know Buddy is happy, healthy and safe.
              </p>
              <p className="mt-3 text-[12px] font-bold text-gray-900">– Subit, Pet Parent</p>
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
}
export default WhatItIs;