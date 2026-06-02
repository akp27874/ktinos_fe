import React from "react";

import {
  FaBell,               // Smart Health Alerts
  FaChartLine,          // 24x7 Live Data
  FaBrain,              // AI-Powered Reports
  FaMapMarkerAlt,       // Live Location
  FaShieldAlt,     
// Secure & Trusted
} from "react-icons/fa"; 
import { PawPrint  , ShieldIcon, MessageSquare} from 'lucide-react';

// ==================== ORIGINAL ICONS (unchanged) ====================

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);


const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const ShoppingCartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
    <circle cx={9} cy={21} r={1} />
    <circle cx={20} cy={21} r={1} />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const UserCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx={8.5} cy={7} r={4} />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);
const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
    <rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
    <line x1={8} y1={21} x2={16} y2={21} />
    <line x1={12} y1={17} x2={12} y2={21} />
  </svg>
);
const CloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-12 h-12">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);
const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-orange-500">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

// Small feature icons for steps
const HeartRateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const StepsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const SleepIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const TempIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);
const LocationPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx={12} cy={10} r={3} />
  </svg>
);
const AIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <rect x={3} y={3} width={18} height={18} rx={2} />
    <path d="M9 9h6M9 12h6M9 15h4" />
  </svg>
);
const AnomalyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1={12} y1={9} x2={12} y2={13} />
    <line x1={12} y1={17} x2="12.01" y2={17} />
  </svg>
);
const SecureCloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const Paw_Print  = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <ellipse cx="20" cy="30" rx="10" ry="14" />
    <ellipse cx="40" cy="18" rx="9" ry="13" />
    <ellipse cx="60" cy="18" rx="9" ry="13" />
    <ellipse cx="80" cy="30" rx="10" ry="14" />
    <path d="M50 40 C28 40 15 55 18 70 C21 82 32 88 50 88 C68 88 79 82 82 70 C85 55 72 40 50 40Z" />
  </svg>
);

function HowItWorks() {
  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden">
      {/* ─── HERO SECTION (unchanged) ─── */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden pt-32 pb-20 px-6 md:px-16 lg:px-24">
        <Paw_Print  className="absolute bottom-4 left-6 w-20 h-20 text-orange-100/60" />
        <Paw_Print  className="absolute top-6 right-8 w-16 h-16 text-orange-100/60 rotate-12" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold mb-4 tracking-wide">
              ✨ Next-Gen Pet Care
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              How{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Ktinoskare
              </span>{" "}
              Works?
            </h1>
            <p className="text-base font-medium text-gray-600 mb-4 tracking-wide">
              Advanced technology. Meaningful insights.
              <br />
              Better health for your pet.
            </p>
            <p className="text-gray-500 max-w-md mx-auto md:mx-0 leading-relaxed">
              Ktinoskare continuously monitors your pet's health and activity,
              analyzes the data using AI, and delivers actionable insights to you
              in real-time.
            </p>
          </div>

          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center overflow-hidden shadow-xl ring-4 ring-white/50">
                <img
                  src="https://wallpapercave.com/wp/wp15140840.webp"
                  alt="Happy golden retriever"
                  className="w-full h-full object-cover rounded-full scale-105"
                />
              </div>
              <div className="absolute -right-8 top-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 w-40 border border-white/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-white">B</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-none text-gray-800">Buddy</p>
                    <p className="text-[10px] text-gray-500">Golden Retriever</p>
                  </div>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <div className="relative w-20 h-20">
                    <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#f0f0f0" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15" fill="none"
                        stroke="url(#grad)" strokeWidth="3"
                        strokeDasharray="85 100"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#fb923c" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-extrabold text-orange-500 leading-none">92</span>
                      <span className="text-[8px] text-gray-500">Score</span>
                    </div>
                  </div>
                </div>
                <p className="text-[9px] text-center text-green-600 font-semibold bg-green-50 rounded-full py-1">
                  ✓ Great health today!
                </p>
                <div className="grid grid-cols-3 gap-1 mt-3">
                  {[
                    { label: "Activity", value: "3,245" },
                    { label: "Calories", value: "620" },
                    { label: "Rest Time", value: "10.2" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-xs font-bold text-gray-800">{s.value}</p>
                      <p className="text-[8px] text-gray-500">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-1.5 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] text-green-700 font-semibold">Live Location Active</span>
                </div>
              </div>
              <div className="absolute -left-6 bottom-10 bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-3 w-24 border border-gray-700">
                <div className="flex items-center justify-center mb-1 text-orange-400">
                  <HeartIcon />
                </div>
                <p className="text-[9px] text-gray-300 text-center font-medium">High Heart Rate</p>
                <p className="text-[8px] text-orange-400 text-center">Alert • 112 bpm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3-STEP PROCESS (unchanged) ─── */}
      <section className="py-20 px-6 md:px-16 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/20 via-transparent to-transparent" />
        <div className="relative z-10">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-800 mb-14">
            The Ktinoskare Process –{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex flex-col items-center text-center hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-extrabold flex items-center justify-center text-xl mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">1</div>
              <div className="w-32 h-32 mb-5 relative flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=300&fit=crop&crop=top" alt="Dog with smart collar" className="w-28 h-28 object-cover rounded-xl shadow-md" />
                <div className="absolute -bottom-2 -right-2 bg-gray-800 rounded-xl p-1 shadow-md"><div className="w-8 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-sm flex items-center justify-center"><span className="text-[6px] text-white font-bold">BAND</span></div></div>
              </div>
              <h3 className="text-orange-500 font-extrabold text-xl mb-3">Track</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Put the smart neck collar band on your pet, which tracks the vitals and activities of your pet 24x7.</p>
              <div className="mt-5 flex gap-3 flex-wrap justify-center">
                {[
                  { icon: <HeartRateIcon />, label: "Heart Rate" },
                  { icon: <StepsIcon />, label: "Activity & Steps" },
                  { icon: <SleepIcon />, label: "Sleep Quality" },
                  { icon: <TempIcon />, label: "Temperature" },
                  { icon: <LocationPinIcon />, label: "Location" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-1">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-orange-50 transition-colors duration-300">{f.icon}</div>
                    <span className="text-[9px] font-medium text-gray-500 leading-tight">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Step 2 */}
            <div className="group rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex flex-col items-center text-center hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-extrabold flex items-center justify-center text-xl mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">2</div>
              <div className="w-32 h-32 mb-5 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-2 border-dashed border-orange-200 bg-orange-50/30 flex items-center justify-center group-hover:border-orange-300 transition-colors duration-300">
                  <div className="flex flex-col items-center"><CloudIcon /><span className="text-[10px] font-bold text-orange-500 mt-1">KTINOSKARE</span><span className="text-[8px] text-gray-500">CLOUD</span></div>
                </div>
              </div>
              <h3 className="text-orange-500 font-extrabold text-xl mb-3">Analyze</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Multiple data points are collected on the Ktinoskare cloud application and processed using our advanced AI algorithms.</p>
              <div className="mt-5 flex gap-3 flex-wrap justify-center">
                {[
                  { icon: <AIIcon />, label: "AI Algorithms" },
                  { icon: <AnomalyIcon />, label: "Anomaly Detection" },
                  { icon: <SecureCloudIcon />, label: "Secure Cloud" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-1">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-orange-50 transition-colors duration-300">{f.icon}</div>
                    <span className="text-[9px] font-medium text-gray-500 leading-tight">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Step 3 */}
            <div className="group rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex flex-col items-center text-center hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-extrabold flex items-center justify-center text-xl mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">3</div>
              <div className="w-32 h-32 mb-5 flex items-center justify-center">
                <div className="relative">
                  <div className="w-24 h-16 bg-gray-800 rounded-xl shadow-md flex items-center justify-center"><div className="w-20 h-12 bg-gradient-to-b from-blue-900 to-indigo-900 rounded flex flex-col gap-1 p-1"><div className="h-1.5 bg-orange-400 rounded w-3/4" /><div className="h-1.5 bg-gray-600 rounded w-1/2" /><div className="h-1.5 bg-gray-600 rounded w-2/3" /></div></div>
                  <div className="absolute -right-8 -bottom-3 w-14 h-24 bg-gray-900 rounded-xl border-2 border-gray-700 shadow-lg flex flex-col items-center justify-center gap-1 p-1"><div className="w-full h-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded" /><div className="w-full h-1 bg-gray-700 rounded" /><div className="w-full h-1 bg-gray-700 rounded" /><div className="w-5 h-5 rounded-full bg-green-500 mt-1 shadow-inner" /></div>
                </div>
              </div>
              <h3 className="text-orange-500 font-extrabold text-xl mb-3">Inform</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Filtered meaningful information in the form of health alerts, activity details, vitals, location and more is presented to you via the Ktinoskare web dashboard or mobile app in real-time.</p>
              <div className="mt-5 flex gap-2 flex-wrap justify-center">
                {[
                  { icon: <BellIcon />, label: "Health Alerts" },
                  { icon: <StepsIcon />, label: "Activity Details" },
                  { icon: <HeartRateIcon />, label: "Vitals" },
                  { icon: <LocationPinIcon />, label: "Live Location" },
                  { icon: <StepsIcon />, label: "Reports" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-1">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-orange-50 transition-colors duration-300">{f.icon}</div>
                    <span className="text-[9px] font-medium text-gray-500 leading-tight">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GET STARTED IN 3 EASY STEPS (unchanged) ─── */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-800 mb-14">Get Started in <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">3 Easy Steps</span></h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group flex flex-col items-center text-center">
            <div className="relative mb-5"><div className="w-32 h-32 rounded-2xl shadow-xl overflow-hidden border-2 border-white group-hover:shadow-2xl transition-all duration-300"><img src="https://m.media-amazon.com/images/I/51JH7qVV8dL.jpg" alt="Ktinoskare product box" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div><div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full text-white text-sm font-bold flex items-center justify-center shadow-lg">1</div></div>
            <h3 className="font-extrabold text-lg mb-2 text-gray-800">Buy</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Buy the smart collar band from our website or our partner e-commerce platforms.</p>
            <div className="mt-4 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-50 transition-colors duration-300"><ShoppingCartIcon /></div>
          </div>
          <div className="group flex flex-col items-center text-center">
            <div className="relative mb-5"><div className="w-32 h-32 rounded-2xl shadow-xl bg-white flex items-center justify-center border-2 border-white group-hover:shadow-2xl transition-all duration-300"><img src="https://c8.alamy.com/comp/F07102/activate-green-button-isolated-on-white-background-F07102.jpg" alt="Golden retriever with band" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full text-white text-sm font-bold flex items-center justify-center shadow-lg">2</div></div></div>
            <h3 className="font-extrabold text-lg mb-2 text-gray-800">Activate</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Activate the band in your account on our website or mobile app.</p>
            <div className="mt-4 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-50 transition-colors duration-300"><UserCheckIcon /></div>
          </div>
          <div className="group flex flex-col items-center text-center">
            <div className="relative mb-5"><div className="w-32 h-32 rounded-2xl shadow-xl overflow-hidden border-2 border-white group-hover:shadow-2xl transition-all duration-300"><img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=top" alt="Golden retriever with band" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div><div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full text-white text-sm font-bold flex items-center justify-center shadow-lg">3</div></div>
            <h3 className="font-extrabold text-lg mb-2 text-gray-800">Place &amp; Monitor</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Place the band on your pet and start receiving daily alerts, 24x7 live data, weekly reports, live location and more.</p>
            <div className="mt-4 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-50 transition-colors duration-300"><MonitorIcon /></div>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET (rewritten with react-icons, no map) ─── */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-800 mb-14">
          What You Get with{" "}
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Ktinoskare
          </span>
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Smart Health Alerts */}
          <div className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaBell className="w-8 h-8 text-orange-500" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-800 leading-tight">Smart Health Alerts</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Instant alerts for any abnormalities or unusual behavior.</p>
          </div>

          {/* 24x7 Live Data */}
          <div className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaChartLine className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-800 leading-tight">24x7 Live Data</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Real-time monitoring of vitals, activity, sleep and more.</p>
          </div>

          {/* AI-Powered Reports */}
          <div className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaBrain className="w-8 h-8 text-blue-500" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-800 leading-tight">AI-Powered Reports</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Weekly health insights and trends to help you make better decisions.</p>
          </div>

          {/* Live Location */}
          <div className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaMapMarkerAlt className="w-8 h-8 text-red-500" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-800 leading-tight">Live Location</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Track your pet's location in real-time and set safe zones.</p>
          </div>

          {/* Secure & Trusted */}
          <div className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaShieldAlt className="w-8 h-8 text-purple-500" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-800 leading-tight">Secure &amp; Trusted</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Your data is encrypted and protected with the highest security standards.</p>
          </div>
        </div>
      </section>

      {/* ─── BETTER DATA SECTION (unchanged) ─── */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden relative">
        <Paw_Print  className="absolute right-8 top-8 w-28 h-28 text-orange-100/50 rotate-12" />
        <Paw_Print  className="absolute left-4 bottom-6 w-20 h-20 text-orange-100/50 -rotate-12" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Better Data.<br />Better Insights.<br /><span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Better Care.</span> <span className="text-orange-500 inline-block animate-pulse">♥</span></h2>
            <p className="text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed">Ktinoskare helps you understand your pet better and gives them the care they deserve, every single day.</p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50">
              <img src="https://www.petsit.com/stuff/contentmgr/files/9/04f36a441896acc0ce23454786eb84ec/files/new_pet_tips_psi.jpg" alt="Woman hugging golden retriever" className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
          <div className="flex-1 z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 relative border border-white/50">
              <div className="absolute -top-4 -left-4"><QuoteIcon /></div>
              <p className="text-gray-700 mt-4 leading-relaxed italic font-medium">"Ktinoskare gives me peace of mind every day. Now I always know that my buddy is healthy, safe and happy."</p>
              <p className="text-sm font-bold text-gray-800 mt-4">– Priya, Pet Parent</p>
              <div className="absolute bottom-6 right-6 text-orange-500 animate-pulse"><HeartIcon /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES (unchanged) ─── */}
<footer className="bg-gray-900 py-8 px-6 md:px-16 lg:px-24">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-7 items-center">
      {[
        { icon: <PawPrint  className="w-6 h-6 text-white" />, title: "Trusted by", sub: "Pet Parents" },
        { icon: <ShieldIcon className="w-6 h-6 text-white" />, title: "Veterinarian", sub: "Recommended" },
        { icon: <ShieldIcon className="w-6 h-6 text-white" />, title: "Safe & Secure", sub: "Technology" },
        { icon: <MessageSquare   className="w-6 h-6 text-white" />, title: "Dedicated Customer", sub: "Support" },
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
        <Paw_Print   className="w-5 h-5 text-orange-500" />
        <span className="text-white font-extrabold text-sm tracking-widest uppercase">Ktinoskare</span>
      </div>
      <p className="text-orange-400 font-extrabold text-sm text-center">
        Because They Deserve the Best Care{" "}
        <span className="text-red-400">❤</span>
      </p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default HowItWorks;