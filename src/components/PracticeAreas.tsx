import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ─── Feature data ────────────────────────────────────────────────────────────
const features = [
  {
    icon: "🔍",
    title: "Pet Safety & Geo-Fencing",
    description:
      "Advanced GPS tracking with geo-fencing technology to keep your pet safe within designated areas.",
    // Replace src with your real image path when ready
    imageSrc: "https://www.thesprucepets.com/thmb/XN-58rdUa1F1KOxK8fZmm6fXJdw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dog-gps-tracker-test-cube-real-time-cat-tracker-tstaples-3318-2186d694cccf4ea1a73d84dedc954463.jpg",
    imageAlt: "Dog wearing a GPS collar running in a park",
    accentColor: "#22c55e",
  },
  {
    icon: "💚",
    title: "Health Monitoring",
    description:
      "Real-time health monitoring with vital data tracking to prevent potential issues before they arise.",
    imageSrc: "/image (2).png",
    imageAlt: "App screen showing pet heart rate and health graph",
    accentColor: "#3b82f6",
  },
  {
    icon: "📊",
    title: "Data-Driven Insights",
    description:
      "Intelligent analytics providing comprehensive data about your pet's activity, nutrition, and wellbeing.",
    imageSrc: "/dataset.png",
    imageAlt: "Dashboard showing pet activity and nutrition charts",
    accentColor: "#f59e0b",
  },
  {
    icon: "🎯",
    title: "Holistic Pet Care",
    description:
      "Track activity levels, nutrition, playtime, and overall wellness in one seamless dashboard.",
    imageSrc: "https://animalwellnessmagazine.com/wp-content/uploads/dog-and-cat-1.jpg",
    imageAlt: "Happy dog playing outdoors",
    accentColor: "#ec4899",
  },
  {
    icon: "👥",
    title: "Multi-Pet Management",
    description:
      "Manage multiple pets with personalized profiles and health records all in one place.",
    imageSrc: "https://www.healthy-pet.com/cdn/shop/articles/ac7ae5f6fbc297bbb835a5ff8a0c0de5_9fa4a5ed-80f5-4c8d-83dd-602d39ae5def.jpg?v=1771531864",
    imageAlt: "Multiple pet profiles on a mobile app screen",
    accentColor: "#8b5cf6",
  },
  {
    icon: "⚙️",
    title: "Smart Settings",
    description:
      "Customize your experience with flexible preferences, alerts, and notification settings.",
    imageSrc: "https://scontent.fbbi5-2.fna.fbcdn.net/v/t39.30808-6/666554639_1450744553168285_487806054023360503_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=nAqbjVyrnoAQ7kNvwHY8D3O&_nc_oc=AdoCkFLrLNVdyMP-JZVdwiGWeVDFBBFepiq1evP_1hpUW1gQ7Ohd_lewJv-lwVqWZl8&_nc_zt=23&_nc_ht=scontent.fbbi5-2.fna&_nc_gid=6VQXltTo41RQ1idoXzogLg&_nc_ss=7b289&oh=00_Af4LY6gDnZBuOOCPdbOMGRNpvu48lSwdvdwv8ayToucQzg&oe=6A034DBC",
    imageAlt: "Settings screen with toggle controls",
    accentColor: "#06b6d4",
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '80px 48px 100px',
    background: '#f0f7f4',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '56px',
  },
  eyebrow: {
    display: 'inline-block',
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#16a34a',
    background: '#dcfce7',
    borderRadius: '999px',
    padding: '5px 14px',
    marginBottom: '16px',
  },
  h2: {
    fontSize: '2.4rem',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 14px',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#475569',
    maxWidth: '520px',
    margin: '0 auto',
    lineHeight: 1.7,
  },

  // ── card ──
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },

  // ── image placeholder ──
 imgBox: {
    width: '100%',
    height: '240px',
    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  placeholderIcon: {
    fontSize: '52px',
    lineHeight: 1,
    marginBottom: '10px',
    opacity: 0.7,
  },
  placeholderLabel: {
    fontSize: '0.72rem',
    color: '#94a3b8',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
  },
  accentBar: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
  },

  // ── card body ──
  cardBody: {
    padding: '24px 24px 28px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: '10px',
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: '0.88rem',
    color: '#64748b',
    lineHeight: 1.7,
    margin: 0,
    flex: 1,
  },

  // ── slide row ──
  slideRow: {
    display: 'flex',
    gap: '20px',
    padding: '8px 2px 4px',
    alignItems: 'stretch',
  },
  slideItem: {
    flex: 1,
    minWidth: 0,
  },
};

// ─── FeatureCard ──────────────────────────────────────────────────────────────
type Feature = (typeof features)[0];

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <div style={styles.card}>
      {/* Image area */}
      <div style={styles.imgBox}>
        {feature.imageSrc ? (
          <img
            src={feature.imageSrc}
            alt={feature.imageAlt}
           style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        ) : (
          <>
            {/* ↓ PLACEHOLDER — replace with real <img> when you have assets */}
            <span style={styles.placeholderIcon}>{feature.icon}</span>
            <span style={styles.placeholderLabel}>Image coming soon</span>
          </>
        )}
        {/* Coloured accent bar at the bottom of the image */}
        <div
          style={{ ...styles.accentBar, background: feature.accentColor }}
        />
      </div>

      {/* Text body */}
      <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{feature.title}</h3>
        <p style={styles.cardDesc}>{feature.description}</p>
      </div>
    </div>
  );
};

// ─── Group features into slides of 3 ─────────────────────────────────────────
const slides: Feature[][] = [];
for (let i = 0; i < features.length; i += 3) {
  slides.push(features.slice(i, i + 3));
}

// ─── Main Component ───────────────────────────────────────────────────────────
const PracticeAreas = () => {
  return (
    <section style={styles.section}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.eyebrow}>Why Choose Us</span>
        <h2 style={styles.h2}>Everything your pet needs,<br />in one smart platform</h2>
        <p style={styles.subtitle}>
          From real-time GPS tracking to AI-powered health insights — we give
          you the tools to keep your pet safe, healthy, and happy.
        </p>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={700}
        style={{ paddingBottom: '52px' }}
      >
        {slides.map((group, slideIdx) => (
          <SwiperSlide key={slideIdx}>
            <div style={styles.slideRow}>
              {group.map((feature, i) => (
                <div key={i} style={styles.slideItem}>
                  <FeatureCard feature={feature} />
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PracticeAreas;
