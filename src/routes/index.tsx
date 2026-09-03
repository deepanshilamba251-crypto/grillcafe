import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Flame,
  Phone,
  MapPin,
  Menu as MenuIcon,
  X,
  UtensilsCrossed,
  Pizza,
  Sandwich,
  CupSoda,
  Leaf,
  Clock3,
  Sparkles,
  Navigation,
} from "lucide-react";

import heroFood from "@/assets/hero-food.jpg";
import steamedMomos from "@/assets/menu-steamed-momos.jpg";
import friedMomos from "@/assets/menu-fried-momos.jpg";
import kurkureMomos from "@/assets/menu-kurkure-momos.jpg";
import tandooriMomos from "@/assets/menu-tandoori-momos.jpg";
import margherita from "@/assets/menu-margherita.jpg";
import cheesePizza from "@/assets/menu-cheese-pizza.jpg";
import veggiePizza from "@/assets/menu-veggie-pizza.jpg";
import paneerPizza from "@/assets/menu-paneer-pizza.jpg";
import burger from "@/assets/menu-burger.jpg";
import fries from "@/assets/menu-fries.jpg";
import drinks from "@/assets/menu-drinks.jpg";

const PHONE = "9879907633";
const PHONE_LINK = `tel:+91${PHONE}`;
const DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=Grills+Cafe+Karnal+Haryana";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grills Cafe — Momos, Pizza & Fast Food in Karnal" },
      {
        name: "description",
        content:
          "Grills Cafe in Karnal, Haryana serves hot momos, cheesy pizzas, burgers, fries and cold drinks — fresh, hygienic and delicious. Call 9879907633 to order.",
      },
      { property: "og:title", content: "Grills Cafe — Delicious Food, Made Fresh for You" },
      {
        property: "og:description",
        content:
          "Hot Momos, Cheesy Pizzas & Your Favorite Snacks in Karnal, Haryana. Order now at 9879907633.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- scroll reveal ---------- */

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- data ---------- */

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  img: string;
  tag?: string;
  accent: "flame" | "chili" | "mint";
};

const categories = [
  { id: "momos", label: "Momos", icon: Flame },
  { id: "pizza", label: "Pizza", icon: Pizza },
  { id: "burgers", label: "Burgers", icon: Sandwich },
  { id: "snacks", label: "Fries & Snacks", icon: UtensilsCrossed },
  { id: "drinks", label: "Cold Drinks", icon: CupSoda },
] as const;

const menu: Record<(typeof categories)[number]["id"], MenuItem[]> = {
  momos: [
    { name: "Steamed Momos", desc: "Soft, juicy veg momos served with our fiery red chutney.", price: "₹60", img: steamedMomos, tag: "Bestseller", accent: "flame" },
    { name: "Fried Momos", desc: "Golden-fried crisp outside, steaming hot and tender inside.", price: "₹80", img: friedMomos, accent: "chili" },
    { name: "Kurkure Momos", desc: "Crunchy crumb-coated momos with a spicy mayo dip.", price: "₹100", tag: "Must Try", img: kurkureMomos, accent: "flame" },
    { name: "Tandoori Momos", desc: "Smoky char-grilled momos tossed in tandoori masala.", price: "₹110", img: tandooriMomos, accent: "chili" },
  ],
  pizza: [
    { name: "Margherita Pizza", desc: "Classic hand-tossed base, rich tomato sauce and mozzarella.", price: "₹99", img: margherita, accent: "chili" },
    { name: "Cheese Pizza", desc: "Loaded with double cheese for the ultimate cheese pull.", price: "₹129", tag: "Cheesy!", img: cheesePizza, accent: "flame" },
    { name: "Veggie Pizza", desc: "Garden-fresh capsicum, onion, corn, tomato and olives.", price: "₹149", img: veggiePizza, accent: "mint" },
    { name: "Paneer Pizza", desc: "Spiced paneer tikka cubes over a bed of melted cheese.", price: "₹169", img: paneerPizza, accent: "flame" },
  ],
  burgers: [
    { name: "Classic Veg Burger", desc: "Crispy golden patty, cheese, fresh veggies and house sauce.", price: "₹49", img: burger, tag: "Value Pick", accent: "flame" },
    { name: "Cheese Burst Burger", desc: "Double patty, molten cheese slice and smoky mayo.", price: "₹79", img: burger, accent: "chili" },
  ],
  snacks: [
    { name: "Peri Peri Fries", desc: "Crispy fries dusted with spicy peri-peri masala.", price: "₹69", img: fries, accent: "chili" },
    { name: "Cheesy Fries", desc: "Golden fries smothered in creamy cheese sauce.", price: "₹89", img: fries, accent: "flame" },
  ],
  drinks: [
    { name: "Cold Drinks", desc: "Chilled cola, orange fizz and refreshing mint cooler.", price: "₹30", img: drinks, accent: "mint" },
    { name: "Iced Shakes", desc: "Thick, creamy shakes — chocolate, vanilla and strawberry.", price: "₹79", img: drinks, tag: "Cooling", accent: "mint" },
  ],
};

const gallery = [steamedMomos, margherita, tandooriMomos, burger, cheesePizza, fries, paneerPizza, drinks];

const accentStyles = {
  flame: "bg-flame/10 text-flame",
  chili: "bg-chili/10 text-chili",
  mint: "bg-mint/10 text-mint",
} as const;

/* ---------- components ---------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#menu", label: "Menu" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 shadow-card-lift backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-warm">
            <Flame className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">Grills Cafe</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href={PHONE_LINK}
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-warm transition-transform hover:scale-105"
          >
            <Phone className="h-4 w-4" /> Order Now
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-card-lift md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-background/95 px-4 pb-4 pt-2 backdrop-blur-md md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 font-semibold text-foreground transition-colors hover:bg-accent"
            >
              {l.label}
            </a>
          ))}
          <a
            href={PHONE_LINK}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground"
          >
            <Phone className="h-4 w-4" /> Order Now — {PHONE}
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-flame/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold tracking-wide text-accent-foreground uppercase">
            <Sparkles className="h-3.5 w-3.5" /> Karnal's Favorite Fast Food Cafe
          </span>
          <h1 className="font-display mt-5 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Delicious Food, <span className="text-gradient-flame">Made Fresh</span> for You
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Hot Momos, Cheesy Pizzas & Your Favorite Snacks — served fresh and hygienic at Grills Cafe, Karnal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PHONE_LINK}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-warm transition-transform hover:scale-105"
            >
              <Phone className="h-4 w-4" /> Order Now
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-card px-7 py-3.5 font-bold text-foreground transition-all hover:border-primary/50 hover:bg-accent"
            >
              <UtensilsCrossed className="h-4 w-4" /> View Menu
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock3 className="h-4 w-4 text-flame" /> Open Daily 11am – 10pm
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Leaf className="h-4 w-4 text-mint" /> 100% Fresh & Hygienic
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="animate-float">
            <img
              src={heroFood}
              alt="Fresh steamed momos and margherita pizza at Grills Cafe"
              width={1344}
              height={1024}
              className="w-full rounded-[2.5rem] object-cover shadow-card-lift"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-3xl bg-card px-5 py-4 shadow-card-lift sm:-left-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-chili/10 text-chili">
              <Flame className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">Momos from ₹60</p>
              <p className="text-xs text-muted-foreground">Steamed · Fried · Tandoori</p>
            </div>
          </div>
          <div className="absolute -top-4 -right-2 flex items-center gap-2 rounded-full bg-card px-4 py-2.5 shadow-card-lift sm:-right-4">
            <Pizza className="h-4 w-4 text-flame" />
            <p className="text-sm font-bold">Pizzas from ₹99</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Steamed Momos", "Cheese Pizza", "Tandoori Momos", "Veggie Burgers", "Peri Peri Fries", "Cold Drinks"];
  return (
    <div className="overflow-hidden border-y bg-primary py-3">
      <div className="animate-marquee flex w-max gap-8">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-lg font-semibold text-primary-foreground">
            {item} <Flame className="h-4 w-4 opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
}

function MenuSection() {
  const [active, setActive] = useState<(typeof categories)[number]["id"]>("momos");

  return (
    <section id="menu" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <Reveal className="text-center">
        <span className="text-xs font-bold tracking-widest text-chili uppercase">Our Menu</span>
        <h2 className="font-display mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          What's <span className="text-gradient-flame">Hot & Fresh</span> Today?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          From juicy momos to loaded pizzas — every dish is made fresh to order.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              active === cat.id
                ? "bg-primary text-primary-foreground shadow-warm"
                : "bg-card text-muted-foreground shadow-card-lift hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <cat.icon className="h-4 w-4" /> {cat.label}
          </button>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {menu[active].map((item, i) => (
          <Reveal key={item.name} delay={i * 80}>
            <article className="group h-full overflow-hidden rounded-3xl bg-card shadow-card-lift transition-transform duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  width={800}
                  height={640}
                  className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {item.tag && (
                  <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-bold">{item.name}</h3>
                  <span className={`rounded-full px-3 py-1 text-sm font-bold ${accentStyles[item.accent]}`}>
                    {item.price}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                <a
                  href={PHONE_LINK}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-flame transition-colors hover:text-chili"
                >
                  <Phone className="h-3.5 w-3.5" /> Order Now
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-cream py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <img
              src={tandooriMomos}
              alt="Smoky tandoori momos at Grills Cafe"
              loading="lazy"
              width={800}
              height={640}
              className="w-full rounded-[2.5rem] object-cover shadow-card-lift"
            />
            <div className="absolute -right-3 -bottom-5 rounded-3xl bg-mint px-6 py-4 text-mint-foreground shadow-card-lift sm:-right-6">
              <p className="font-display text-2xl font-bold">100%</p>
              <p className="text-xs font-semibold">Fresh & Hygienic</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="text-xs font-bold tracking-widest text-mint uppercase">About Us</span>
          <h2 className="font-display mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to <span className="text-gradient-flame">Grills Cafe</span>
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Nestled in the heart of Karnal, Haryana, Grills Cafe is your go-to spot for fresh, delicious and
            hygienically prepared fast food. Our kitchen is famous for its juicy momos — steamed, fried, kurkure and
            tandoori — and hand-tossed cheesy pizzas baked to perfection.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every snack, burger and drink on our menu is made with quality ingredients and a whole lot of love, so
            every visit feels like a treat.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: Flame, label: "Fresh Momos Daily", color: "bg-chili/10 text-chili" },
              { icon: Pizza, label: "Hand-Tossed Pizzas", color: "bg-flame/10 text-flame" },
              { icon: Leaf, label: "Hygiene First", color: "bg-mint/10 text-mint" },
            ].map((f) => (
              <div key={f.label} className="rounded-2xl bg-card p-4 text-center shadow-card-lift">
                <span className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${f.color}`}>
                  <f.icon className="h-5 w-5" />
                </span>
                <p className="mt-2 text-xs font-bold">{f.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal className="text-center">
        <span className="text-xs font-bold tracking-widest text-flame uppercase">Food Gallery</span>
        <h2 className="font-display mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Straight From <span className="text-gradient-flame">Our Kitchen</span>
        </h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {gallery.map((img, i) => (
          <Reveal key={i} delay={(i % 4) * 80} className={i % 5 === 0 ? "row-span-2" : ""}>
            <img
              src={img}
              alt="Grills Cafe food photography"
              loading="lazy"
              width={800}
              height={640}
              className="h-full w-full rounded-3xl object-cover shadow-card-lift transition-transform duration-300 hover:scale-[1.03]"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center text-primary-foreground shadow-warm sm:px-12">
          <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-chili/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-mint/25 blur-3xl" />
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Hungry? Let's Fix That.</h2>
          <p className="mx-auto mt-4 max-w-md text-primary-foreground/85">
            Visit us or call ahead — your momos and pizzas will be hot and ready.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 text-sm font-semibold sm:flex-row sm:justify-center sm:gap-8">
            <span className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" /> Grills Cafe
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Karnal, Haryana
            </span>
            <a href={PHONE_LINK} className="flex items-center gap-2 underline-offset-4 hover:underline">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={PHONE_LINK}
              className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 font-bold text-foreground shadow-card-lift transition-transform hover:scale-105"
            >
              <Phone className="h-4 w-4 text-flame" /> Call Now
            </a>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/40 px-7 py-3.5 font-bold transition-colors hover:bg-primary-foreground/10"
            >
              <Navigation className="h-4 w-4" /> Get Directions
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-cream py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Flame className="h-4 w-4" />
          </span>
          <span className="font-display font-bold text-foreground">Grills Cafe</span> © 2026
        </div>
        <p className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> Karnal, Haryana
        </p>
        <a href={PHONE_LINK} className="flex items-center gap-1.5 font-semibold text-foreground hover:text-flame">
          <Phone className="h-3.5 w-3.5" /> {PHONE}
        </a>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <MenuSection />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
