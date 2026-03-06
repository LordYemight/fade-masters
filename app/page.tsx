'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Watch, 
  Star, 
  Calendar, 
  Instagram, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  ImageOff,
  CheckCircle2,
  ChevronRight,
  User
} from 'lucide-react';

// --- Types & Data ---

const IMAGES = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80", // Hero
  "https://images.unsplash.com/photo-1599351431247-f10b21816381?auto=format&fit=crop&w=1200&q=80", // About
  "https://images.unsplash.com/photo-1621605815841-aa88c82b0ad2?auto=format&fit=crop&w=800&q=80", // Product 1
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80", // Product 2
  "https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&w=800&q=80", // Product 3
  "https://images.unsplash.com/photo-1622286332305-02758172949c?auto=format&fit=crop&w=800&q=80", // Product 4
];

const BRAND = {
  name: "Fade Masters",
  tagline: "Precision Cuts. Urban Edge.",
  description: "The premier high-end barbershop in Brooklyn, NY, offering expert grooming services tailored for the modern urban professional. Experience the fusion of classic technique and street-luxe style.",
};

const PRODUCTS = [
  { name: "The Signature Fade", description: "Precision mid/low fade with skin detailing and razor line-up.", price: "$65", image: IMAGES[2] },
  { name: "The Royal Shave", description: "Hot towel straight-razor shave, facial massage, and post-shave treatment.", price: "$40", image: IMAGES[3] },
  { name: "Haircut + Beard Trim", description: "Full haircut service combined with a detailed beard shaping and oil treatment.", price: "$95", image: IMAGES[4] },
  { name: "Kids Cut (Under 12)", description: "Expert haircut for our younger clientele.", price: "$45", image: IMAGES[5] }
];

const FEATURES = [
  { title: "Brooklyn Craftsmanship", description: "Every cut is a masterpiece, reflecting the artistry and precision synonymous with NYC's top stylists.", icon: Scissors },
  { title: "Premium Products", description: "We exclusively use high-grade, artisan grooming products designed for superior finish and hair health.", icon: User },
  { title: "VIP Experience", description: "Enjoy complimentary premium beverages and a curated music playlist while you wait.", icon: Watch }
];

const STATS = [
  { number: "10+", label: "Master Barbers", icon: Scissors },
  { number: "500+", label: "5-Star Reviews", icon: Star },
  { number: "5 Yrs", label: "Serving Brooklyn", icon: Calendar }
];

const TESTIMONIALS = [
  { name: "Marcus L.", text: "The best texture work I've ever had. The atmosphere is unmatched.", role: "Tech Entrepreneur" },
  { name: "Javier S.", text: "Finally found a spot that respects the straight-razor shave. Worth the trip from Manhattan.", role: "Creative Director" }
];

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 ${className}`}>
        <ImageOff size={32} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-heading text-2xl font-black tracking-tighter uppercase italic">
            Fade <span className="text-secondary">Masters</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'About', 'Reviews'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest hover:text-secondary transition-colors"
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-accent text-primary px-6 py-2.5 rounded-none font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-all"
            >
              Book Appointment
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu className="text-white" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[75%] bg-primary p-8 animate-slideIn">
            <button className="mb-10" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {['Services', 'About', 'Reviews'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  className="text-2xl font-heading font-bold uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a 
                href="#contact" 
                className="inline-block bg-accent text-primary px-6 py-4 font-bold text-center uppercase"
                onClick={() => setMenuOpen(false)}
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <SafeImage 
          src={IMAGES[0]} 
          alt="Barbershop Atmosphere" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-tight mb-6 animate-slideUp">
            MASTERING THE <br />
            <span className="text-secondary/50">ART OF THE CUT</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            Brooklyn's definitive destination for elite grooming and unparalleled style. No-brainer grooming for the modern professional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <a href="#contact" className="bg-accent text-primary px-10 py-4 font-bold uppercase tracking-widest hover:bg-secondary transition-all">
              Book Your Spot
            </a>
            <a href="#services" className="border border-white/20 backdrop-blur-md px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-6 bg-accent overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-2xl font-heading font-black text-primary flex items-center gap-6">
              FADE MASTERS <Scissors size={20} /> STREET-LUXE <Watch size={20} /> PRECISION <User size={20} /> BROOKLYN <Star size={20} />
            </span>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">WHY CHOOSE FADE MASTERS?</h2>
            <p className="text-secondary font-medium uppercase tracking-[0.3em]">Where technique meets attitude</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {FEATURES.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 uppercase">Services & Pricing</h2>
            <p className="text-secondary font-medium uppercase tracking-[0.3em]">Invest in your image</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, idx) => (
              <ProductCard key={idx} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square">
            <div className="absolute -top-10 -left-10 w-full h-full border-2 border-white/10 z-0" />
            <div className="relative z-10 w-full h-full overflow-hidden">
              <SafeImage src={IMAGES[1]} alt="Barber at work" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/5 blur-3xl rounded-full" />
          </div>
          <div>
            <h2 className="font-heading text-5xl font-bold mb-8 uppercase leading-tight">Our Legacy in <br /> Brooklyn</h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Founded on the principle that grooming is a form of self-respect, Fade Masters has quickly become the go-to spot for those who demand excellence. We blend the raw energy of urban culture with the meticulous standards of a luxury service.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-heading font-bold text-white mb-1">{stat.number}</p>
                  <p className="text-[10px] uppercase tracking-widest text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-16 text-center">WHAT OUR CLIENTS SAY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-10 border border-white/10 bg-primary/50 relative group">
                <Star className="text-accent mb-6" size={20} fill="currentColor" />
                <p className="text-xl italic mb-8 text-white/80 leading-relaxed font-light">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-secondary text-sm font-medium uppercase tracking-widest">{t.role}</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Star size={64} strokeWidth={1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-primary">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900 p-8 md:p-16 border border-white/5 relative">
            {formStatus === 'success' ? (
              <div className="text-center py-20 animate-scaleIn">
                <CheckCircle2 size={64} className="mx-auto text-accent mb-6" />
                <h3 className="font-heading text-4xl font-bold mb-4">BOOKING RECEIVED</h3>
                <p className="text-secondary">We'll confirm your appointment shortly via email. See you in the chair.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-10 underline uppercase tracking-widest text-sm hover:text-white"
                >
                  Book another session
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-5xl font-bold mb-12 text-center">SECURE YOUR SPOT</h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-primary/50 border border-white/10 p-4 outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-primary/50 border border-white/10 p-4 outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Preferred Service</label>
                    <select className="w-full bg-primary/50 border border-white/10 p-4 outline-none focus:border-accent transition-colors appearance-none">
                      {PRODUCTS.map(p => <option key={p.name}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Additional Notes</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tell us about your style goals..."
                      className="w-full bg-primary/50 border border-white/10 p-4 outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full bg-accent text-primary py-5 font-black uppercase tracking-widest text-lg flex items-center justify-center gap-3 hover:bg-secondary transition-all">
                    Confirm Booking <ChevronRight size={20} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <a href="#" className="font-heading text-4xl font-black uppercase mb-6 block">FADE MASTERS</a>
              <p className="text-secondary max-w-sm mb-8 leading-relaxed">
                The blend of raw energy and meticulous standards. 
                Sharp delivery, nationwide standards, Brooklyn born.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/fademasters_bk" target="_blank" className="p-3 border border-white/10 hover:border-accent hover:text-accent transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Location</h4>
              <ul className="space-y-4 text-secondary text-sm">
                <li className="flex gap-3"><MapPin size={18} className="shrink-0 text-white" /> 123 Flatbush Ave, Brooklyn, NY 11217</li>
                <li className="flex gap-3"><Mail size={18} className="shrink-0 text-white" /> bookings@fademastersbk.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Hours</h4>
              <ul className="space-y-3 text-secondary text-sm">
                <li className="flex justify-between"><span>Mon - Fri</span> <span>9am - 8pm</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span>10am - 6pm</span></li>
                <li className="flex justify-between text-white/30"><span>Sunday</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-secondary text-xs font-medium uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Fade Masters Brooklyn. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-secondary">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Subcomponents ---

function FeatureCard({ feature, index }: any) {
  const { ref, isVisible } = useScrollReveal();
  const Icon = feature.icon;
  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${index * 150}ms` }}
      className={`p-10 border border-white/5 hover:border-white/20 transition-all duration-500 bg-zinc-950/50 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
        <Icon className="text-white" size={32} />
      </div>
      <h3 className="font-heading text-2xl font-bold mb-4 uppercase">{feature.title}</h3>
      <p className="text-white/50 leading-relaxed text-sm">{feature.description}</p>
    </div>
  );
}

function ProductCard({ product, index }: any) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group relative overflow-hidden bg-primary border border-white/10 transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <SafeImage 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60" />
        <div className="absolute top-4 right-4 bg-accent text-primary font-heading font-black px-4 py-2 text-xl">
          {product.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold mb-3 uppercase tracking-tight">{product.name}</h3>
        <p className="text-white/50 text-sm mb-6 line-clamp-2">{product.description}</p>
        <a 
          href="#contact" 
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:gap-4 transition-all"
        >
          Book Now <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}