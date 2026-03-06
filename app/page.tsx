'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Star, 
  Calendar, 
  UserCheck, 
  MapPin, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowRight, 
  Menu, 
  X,
  ImageOff,
  Bottle,
  ChevronRight,
  Quote
} from 'lucide-react';

// --- Components ---

const SafeImage = ({ src, alt, fill, width, height, className, priority }: any) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/5 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
};

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

const useTypewriter = (text: string, speed = 80) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(prev => prev + text.charAt(i));
        i++;
      } else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- Data ---

const BRAND = {
  name: "Fade Masters",
  tagline: "The Future of Grooming is Here.",
  description: "Brooklyn's premier high-end barbershop, blending masterful traditional cutting techniques with a cutting-edge, street-luxe aesthetic.",
  address: "123 Fulton St, Brooklyn, NY 11201",
  email: "booking@fademastersbk.com",
  instagram: "@fademasters_bk"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1583955746149-71a61419d759?auto=format&fit=crop&w=1920&q=80",
  about: "https://images.unsplash.com/photo-1523471826770-c437b4636fe6?auto=format&fit=crop&w=1080&q=80",
  products: [
    "https://images.unsplash.com/photo-1689893265427-d7da200eff05?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550912788-1a59d63dbd3d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1631015108968-ba3b87f89005?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1663763947660-e1f78ec7f814?auto=format&fit=crop&w=800&q=80"
  ]
};

const SERVICES = [
  { name: "The Classic Fade", price: "$45", desc: "Perfectly blended low to mid-fade with a crisp lineup." },
  { name: "The Line Up & Shape Up", price: "$30", desc: "Sharp, geometric reshaping of the hairline and beard." },
  { name: "The Hot Towel Shave", price: "$55", desc: "Traditional straight-razor shave with hot towels and balm." },
  { name: "The Mohawk/Design Cut", price: "$70+", desc: "Intricate, custom hair art or patterned fades." }
];

const FEATURES = [
  { title: "Master Barbers", desc: "Certified experts with years of specialized street-edge experience.", icon: Scissors },
  { title: "Walk-In Friendly", desc: "While we prefer appointments, we keep slots open for the neighborhood.", icon: UserCheck },
  { title: "Premium Products", desc: "Top-tier, professional-grade grooming kits for the sharpest finish.", icon: Bottle },
  { title: "Loyalty Rewards", desc: "Earn points on every session for upgrades and free services.", icon: Star }
];

const STATS = [
  { number: "15+", label: "Years Experience" },
  { number: "5k+", label: "Satisfied Clients" },
  { number: "98%", label: "5-Star Ratings" }
];

const TESTIMONIALS = [
  { name: "Marcus R.", role: "Entrepreneur", text: "Best line-up I've ever had. The atmosphere is exactly what a modern shop should be." },
  { name: "Javier S.", role: "Artist", text: "Worth the wait. The attention to detail on my design cut was flawless. This is culture." },
  { name: "David K.", role: "Finance", text: "The hot towel service is next level. I walk out feeling renewed every time." }
];

// --- Sections ---

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const typedHeadline = useTypewriter(BRAND.tagline, 60);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-heading text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-accent flex items-center justify-center rounded">
              <Scissors size={18} className="text-black" />
            </div>
            <span>FADE MASTERS</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Services', 'About Us', 'Book Now'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-black px-6 py-2.5 rounded font-black text-sm hover:brightness-110 transition-all animate-glow">
              BOOK NOW
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="relative ml-auto w-[80%] max-w-sm h-full bg-primary border-l border-white/10 p-10 flex flex-col animate-slideIn">
            <button className="self-end text-white mb-10" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {['Services', 'About Us', 'Book Now'].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} onClick={() => setMenuOpen(false)} className="font-heading text-4xl font-black uppercase tracking-tight hover:text-accent">
                  {link}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-4 bg-accent text-black px-8 py-4 text-center font-black text-lg">
                GET STARTED
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex items-center justify-center bg-black px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 text-center max-w-5xl">
          <h1 className="font-heading text-[11vw] md:text-[8vw] font-black text-white leading-[0.9] tracking-tighter uppercase">
            {typedHeadline}<span className="text-accent animate-pulse">_</span>
          </h1>
          <p className="text-white/50 mt-8 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {BRAND.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="#contact" className="bg-accent text-black px-12 py-5 font-black text-xl border-2 border-black shadow-[6px_6px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#fff] transition-all">
              BOOK YOUR SLOT
            </a>
            <a href="#services" className="px-12 py-5 border-2 border-white/20 font-black text-xl hover:bg-white/10 transition-all uppercase tracking-widest">
              VIEW MENU
            </a>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="py-8 bg-accent overflow-hidden border-y-4 border-black">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-3xl font-black text-black uppercase flex items-center gap-6">
                Street-Luxe Vibe <Scissors size={28} />
              </span>
              <span className="text-3xl font-black text-black uppercase flex items-center gap-6">
                Precision Grooming <Star size={28} />
              </span>
              <span className="text-3xl font-black text-black uppercase flex items-center gap-6">
                Brooklyn Born <MapPin size={28} />
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter">Our Craftsmanship</h2>
            <p className="text-accent font-black tracking-widest mt-4 uppercase">No-brainer quality since day one.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={idx} ref={ref as any} style={{ transitionDelay: `${idx * 150}ms` }} className={`p-10 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-accent/40 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <div className="w-16 h-16 bg-accent/10 flex items-center justify-center rounded-lg mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                    <feature.icon className="text-accent group-hover:text-black transition-colors" size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold uppercase mb-4">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-zinc-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Services & Pricing</h2>
              <p className="text-white/40 mt-6 text-xl">Select the cut that defines your style. Precision is mandatory.</p>
            </div>
            <a href="#contact" className="group flex items-center gap-3 text-accent font-black uppercase tracking-widest text-lg">
              Book a custom cut <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="flex gap-6 p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group items-center">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0">
                  <SafeImage src={IMAGES.products[idx]} alt={service.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-heading text-2xl font-bold uppercase">{service.name}</h3>
                    <span className="text-accent font-black text-2xl">{service.price}</span>
                  </div>
                  <p className="text-white/50 mt-2 text-sm max-w-md">{service.desc}</p>
                  <a href="#contact" className="mt-4 inline-block text-xs font-bold uppercase tracking-tighter border-b border-accent pb-1">Reserve Slot</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="aboutus" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <SafeImage src={IMAGES.about} alt="Barber Shop" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 p-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl max-w-xs">
              <p className="text-accent font-black text-5xl mb-1">2009</p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/70">Established in the heart of Brooklyn</p>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter">Our Brooklyn Roots</h2>
            <p className="text-white/60 mt-8 text-xl leading-relaxed">
              Born from the grit and style of Downtown Brooklyn, Fade Masters is more than a shop; it’s a culture. We blend classic technique with street artistry to deliver unmatched results. Every chair tells a story.
            </p>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              {STATS.map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-black text-accent">{stat.number}</p>
                  <p className="text-white/40 text-xs font-bold uppercase mt-1 tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 border-l-4 border-accent bg-white/5 rounded-r-2xl italic text-white/80">
              <Quote className="text-accent mb-4" size={32} />
              "We don't just cut hair; we engineer confidence. That's the Brooklyn way."
              <p className="mt-4 font-bold not-italic uppercase text-sm tracking-widest">— Founders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-accent/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter">Client Verdict</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-10 bg-zinc-900 border border-white/5 rounded-2xl relative">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#B8860B" className="text-accent" />)}
                </div>
                <p className="text-lg text-white/80 italic leading-relaxed mb-8">"{t.text}"</p>
                <div>
                  <p className="font-black uppercase tracking-widest">{t.name}</p>
                  <p className="text-accent text-sm font-bold mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="booknow" className="py-32 px-6 bg-primary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 bg-zinc-900 rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
          <div className="p-10 md:p-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Secure Your Spot</h2>
            <p className="text-white/50 text-xl mb-12">Appointments recommended. Walk-ins based on availability.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                  <MapPin size={24} className="text-accent group-hover:text-black" />
                </div>
                <p className="text-lg font-bold">{BRAND.address}</p>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Mail size={24} className="text-accent group-hover:text-black" />
                </div>
                <p className="text-lg font-bold">{BRAND.email}</p>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Instagram size={24} className="text-accent group-hover:text-black" />
                </div>
                <p className="text-lg font-bold">{BRAND.instagram}</p>
              </div>
            </div>
          </div>

          <div className="p-10 md:p-20 bg-accent/5 border-l border-white/5">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6">
                  <UserCheck size={40} className="text-black" />
                </div>
                <h3 className="font-heading text-4xl font-black uppercase mb-4">You're Booked.</h3>
                <p className="text-white/60">Check your email for confirmation details. See you at the shop.</p>
                <button onClick={() => setSubmitted(false)} className="mt-10 text-accent font-bold uppercase tracking-widest border-b border-accent">Book another session</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-3 text-white/40">Full Name</label>
                  <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-6 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-3 text-white/40">Email Address</label>
                  <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-6 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-3 text-white/40">Service Type</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-lg px-6 py-4 focus:outline-none focus:border-accent transition-colors">
                    {SERVICES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-3 text-white/40">Message/Request</label>
                  <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-6 py-4 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Any special requests?"></textarea>
                </div>
                <button type="submit" className="w-full bg-accent text-black font-black text-xl py-5 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-3">
                  CONFIRM APPOINTMENT <ArrowRight size={24} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="font-heading text-4xl font-black tracking-tighter mb-6">FADE MASTERS</div>
              <p className="text-white/40 max-w-sm text-lg leading-relaxed">
                Brooklyn's destination for elite grooming. Blending urban edge with precision mastery since 2009.
              </p>
              <div className="flex gap-6 mt-10">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-8 text-accent">Links</h4>
              <ul className="space-y-4 text-white/50 font-medium">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#aboutus" className="hover:text-white transition-colors">Culture</a></li>
                <li><a href="#booknow" className="hover:text-white transition-colors">Book Online</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Why Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-8 text-accent">Hours</h4>
              <ul className="space-y-4 text-white/50 font-medium">
                <li className="flex justify-between"><span>Mon - Fri</span> <span className="text-white">9am - 8pm</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span className="text-white">8am - 6pm</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span className="text-white">10am - 4pm</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-sm font-bold uppercase tracking-tighter">
              &copy; {new Date().getFullYear()} FADE MASTERS BK. ALL RIGHTS RESERVED.
            </p>
            <p className="text-white/20 text-sm font-bold uppercase tracking-tighter">
              BORN IN BROOKLYN. RAISED IN STYLE.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}