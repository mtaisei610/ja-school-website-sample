import React, { useEffect, useState, useRef } from "react";
import { parse } from "smol-toml";
import {
  Facebook,
  Instagram,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Calendar,
  Award,
  MapPin,
  ArrowRight,
  Globe,
  Sparkles,
  Zap,
  PlayCircle,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Types for the configuration */
interface CareerItem {
  year: string;
  event: string;
}

interface LanguageConfig {
  name: string;
  title: string;
  bio: string;
  location: string;
  qualifications: string[];
  career: CareerItem[];
  pricing: {
    label: string;
    standard_title: string;
    standard_desc: string;
    standard_price: string;
    standard_unit: string;
    bulk_title: string;
    bulk_desc: string;
    bulk_detail: string;
    trial_title: string;
    trial_desc: string;
    trial_detail: string;
  };
  booking: {
    title: string;
    description: string;
    button_text: string;
  };
  sns_section: {
    title: string;
    description: string;
  };
}

interface Config {
  common: {
    image: string;
    location_icon: string;
    sns_facebook?: string;
    sns_instagram?: string;
    sns_tiktok?: string;
    google_form_url: string;
  };
  jp: LanguageConfig;
  th: LanguageConfig;
}

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SakuraPetals = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: -20,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: Math.random() * 120 - 10 + "%",
            rotate: 720,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear",
          }}
          className="absolute w-3 h-4 bg-pink-200/60"
          style={{
            borderRadius: "100% 10% 100% 10%",
            transform: `scale(${0.4 + Math.random() * 0.8})`,
          }}
        />
      ))}
    </div>
  );
};

const SNSSidebar = ({
  common,
  className,
}: {
  common: Config["common"];
  className?: string;
}) => (
  <div className={cn("flex items-center gap-6", className)}>
    {common.sns_facebook && (
      <a
        href={common.sns_facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-stone-500 hover:text-pink-500 transition-colors"
      >
        <Facebook size={20} />
      </a>
    )}
    {common.sns_instagram && (
      <a
        href={common.sns_instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-stone-500 hover:text-pink-500 transition-colors"
      >
        <Instagram size={20} />
      </a>
    )}
    {common.sns_tiktok && (
      <a
        href={common.sns_tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="text-stone-500 hover:text-pink-500 transition-colors"
      >
        <TikTokIcon className="w-5 h-5" />
      </a>
    )}
  </div>
);

export default function App() {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<"jp" | "th">("th"); // Default to Thai for target audience

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`./config.toml?t=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to load configuration");
        const text = await response.text();
        const data = parse(text) as unknown as Config;
        setConfig(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load configuration.");
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffafb]">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-pink-400 font-serif text-2xl italic"
        >
          Now Loading...
        </motion.div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffafb] p-4 text-[#2d2d2d]">
        <div className="text-center max-w-md">
          <p className="text-red-400 font-medium mb-4">{error}</p>
          <p className="text-stone-500 text-sm">
            Please check public/config.toml
          </p>
        </div>
      </div>
    );
  }

  const current = config[lang];
  const common = config.common;

  return (
    <div className="min-h-screen bg-[#fffafb] text-[#2d2d2d] font-sans selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden relative">
      <SakuraPetals />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-pink-400 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-pink-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-serif italic text-xl text-pink-500">
            {current.title}
          </div>

          <div className="flex items-center gap-8">
            <SNSSidebar common={common} className="hidden md:flex" />
            <div className="glass p-1 rounded-full flex gap-1">
              <button
                onClick={() => setLang("th")}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black transition-all duration-300",
                  lang === "th"
                    ? "bg-pink-500 text-white"
                    : "text-stone-500 hover:text-pink-500",
                )}
              >
                TH
              </button>
              <button
                onClick={() => setLang("jp")}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black transition-all duration-300",
                  lang === "jp"
                    ? "bg-pink-500 text-white"
                    : "text-stone-500 hover:text-pink-500",
                )}
              >
                JP
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simplified & Compact */}
      <section className="relative min-h-[70vh] flex items-center pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-4 text-pink-500">
              <div className="w-8 h-px bg-pink-500" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                {current.location}
              </span>
              <div className="w-8 h-px bg-pink-500" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase bg-gradient-to-r from-rose-300 via-pink-400 to-fuchsia-300 bg-clip-text text-transparent">
              {current.name}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-serif italic"
          >
            {current.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            <a
              href="#booking"
              className="px-12 py-5 bg-pink-500 text-white rounded-full font-black uppercase tracking-tighter hover:bg-stone-800 hover:text-white transition-all duration-300 flex items-center gap-3 shadow-xl shadow-pink-200"
            >
              {current.booking.button_text}
              <ArrowRight size={20} />
            </a>
            <SNSSidebar common={common} />
          </motion.div>
        </div>
      </section>

      {/* Info Grid - Consolidated */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-px bg-pink-100/30 border border-pink-100 rounded-[2rem] overflow-hidden shadow-sm">
          {/* Qualifications & Career */}
          <div className="p-8 md:p-12 space-y-12 bg-white/40 backdrop-blur-sm">
            <div className="space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-3">
                <Award size={14} /> Qualifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {current.qualifications.map((q, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 glass rounded-lg text-[10px] font-bold uppercase tracking-widest text-stone-700"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-3">
                <GraduationCap size={14} /> Timeline
              </h2>
              <div className="space-y-4">
                {current.career.map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="text-xs font-black text-stone-400 group-hover:text-pink-500 transition-colors pt-1">
                      {item.year}
                    </span>
                    <p className="text-sm font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SNS Tips & Call to Action */}
          <div className="p-8 md:p-12 bg-white space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-pink-500">
                <Sparkles size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Daily Tips
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none text-stone-800">
                {current.sns_section.title}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                {current.sns_section.description}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <SNSSidebar common={common} className="text-stone-800" />
              <div className="h-px flex-grow bg-pink-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Compact Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-4">
            {current.pricing.label}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: current.pricing.trial_title,
              price: "0",
              desc: current.pricing.trial_desc,
              detail: current.pricing.trial_detail,
              accent: false,
            },
            {
              title: current.pricing.standard_title,
              price: current.pricing.standard_price,
              desc: current.pricing.standard_desc,
              detail: "1-on-1 Lesson",
              accent: true,
            },
            {
              title: current.pricing.bulk_title,
              price: (parseInt(current.pricing.standard_price) * 5).toString(),
              desc: current.pricing.bulk_desc,
              detail: current.pricing.bulk_detail,
              accent: false,
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={cn(
                "p-8 rounded-3xl border transition-all duration-300",
                plan.accent
                  ? "bg-pink-500 border-pink-400 text-white shadow-xl shadow-pink-200/50"
                  : "bg-white border-pink-50 text-stone-800 hover:border-pink-200 shadow-sm",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  plan.accent ? "text-pink-100" : "text-stone-400",
                )}
              >
                {plan.desc}
              </span>
              <h3 className="text-xl font-black uppercase mt-1">
                {plan.title}
              </h3>
              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-black">{plan.price}</span>
                <span
                  className={cn(
                    "text-xs font-bold",
                    plan.accent ? "text-pink-100" : "text-stone-400",
                  )}
                >
                  {current.pricing.standard_unit}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2
                  size={14}
                  className={plan.accent ? "text-pink-200" : "text-pink-500"}
                />
                {plan.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking - Minimalist */}
      <section id="booking" className="py-32 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-stone-800">
            Start
            <br />
            Learning
          </h2>
          <p className="text-stone-500 text-lg font-serif italic">
            {current.booking.description}
          </p>
          <div className="flex flex-col items-center gap-8 pt-4">
            <a
              href={common.google_form_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-pink-500 text-white rounded-full font-black uppercase tracking-tighter hover:bg-stone-800 transition-all duration-300 flex items-center gap-3 shadow-xl shadow-pink-200"
            >
              {current.booking.button_text}
              <ArrowRight size={20} />
            </a>
            <SNSSidebar common={common} />
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-pink-50 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif italic text-lg text-pink-500">
            {current.title}
          </div>
          <div className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} {current.name}.
          </div>
        </div>
      </footer>
    </div>
  );
}
