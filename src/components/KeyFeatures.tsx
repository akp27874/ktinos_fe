import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { theme } from '../theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import AIHealthInsight from '../assets/images/AI-Health-Insights.jpg';
import HeartRateMonitoring from '../assets/images/Heart-Rate-Monitoring.jpg';
import SmartActivityTracking from '../assets/images/Smart-Activity-Tracking.jpg';
import BreedIntelligence from '../assets/images/Breed-Intelligence.jpg';
import MultiPetDashboard from '../assets/images/Multi-Pet-Dashboard.jpg';
import WellnessReports from '../assets/images/Wellness-Reports.jpg';

type Feature = {
  icon: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  accentColor: string;
};

const features: Feature[] = [
  {
    icon: '📊',
    title: 'Smart Activity Tracking',
    description:
      "Track every walk, run and adventure.",
    imageSrc: SmartActivityTracking,
    imageAlt: 'Pet activity charts',
    accentColor: '#f59e0b',
  },
  {
    icon: '💚',
    title: 'Heart Rate Monitoring',
    description:
      'Continous wellness tracking.',
    imageSrc: HeartRateMonitoring,
    imageAlt: 'Pet health dashboard',
    accentColor: '#3b82f6',
  },
  {
    icon: '🔍',
    title: 'AI Health Insights',
    description:
      'Personalized recommendations powered by machine learning.',
    imageSrc: AIHealthInsight,
    imageAlt: 'AI Health Insights',
    accentColor: '#22c55e',
  },
  {
    icon: '🎯',
    title: 'Breed Intelligence',
    description:
      'Insights tailored to your pet\'s unique profile.',
    imageSrc: BreedIntelligence,
    imageAlt: 'Breed Intelligence',
    accentColor: '#ec4899',
  },
  {
    icon: '⚙️',
    title: 'Wellness Reports',
    description:
      'Track long-term health trends.',
    imageSrc: WellnessReports,
    imageAlt: 'Wellness Reports',
    accentColor: '#06b6d4',
  },
  {
    icon: '👥',
    title: 'Multi-Pet Dashboard',
    description:
      'Manage every pet from one place.',
    imageSrc: MultiPetDashboard,
    imageAlt: 'Multi pet Dashboard',
    accentColor: '#8b5cf6',
  },
  
];

const FeatureCard = ({ feature, isMobile }: { feature: Feature; isMobile: boolean }) => (
  <div
    style={{
      background: '#ffffff',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      display: 'flex',
      flexDirection: 'column',
      height: isMobile ? 'auto' : '100%',
      width: '100%',
    }}
  >
    <div
      style={{
        width: '100%',
        height: isMobile ? '200px' : '230px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <img
        src={feature.imageSrc}
        alt={feature.imageAlt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          display: 'block',
          background: '#f8fafc',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: feature.accentColor,
        }}
      />
    </div>
    <div
      style={{
        padding: isMobile ? '18px 18px 22px' : '24px 24px 28px',
        flexGrow: 1,
      }}
    >
      <h3
        style={{
          fontSize: isMobile ? '1rem' : '1.05rem',
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: '10px',
          marginTop: 0,
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </h3>
      <p
        style={{
          fontSize: isMobile ? '0.85rem' : '0.88rem',
          color: '#64748b',
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {feature.description}
      </p>
    </div>
  </div>
);

const KeyFeatures = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = features;

  return (
    <section id="key_features" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
            PROACTIVE ANIMAL CARE
          </h1>
          <p className="max-w-2xl mx-auto text-lg mb-0" style={{ fontFamily: theme.fonts.handwritten, color: theme.colors.neutral.gray[700], fontSize: '1.4rem' }}>
            Pets naturally hide their pain until it worsens.
          </p>
          <p className="max-w-2xl mx-auto text-lg" style={{ fontFamily: theme.fonts.handwritten, color: theme.colors.neutral.gray[700], fontSize: '1.4rem' }}>
            Spot issues early — to prevent needless suffering & pain.
          </p>
        </motion.div>
        
        {/* SWIPER */}
      <Swiper
        className="pet-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={isMobile ? 1 : 4}
        spaceBetween={isMobile ? 0 : 20}
        navigation={!isMobile}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={700}
        autoHeight={isMobile}
      >
        {slides.map((feature, slideIdx) => (
          <SwiperSlide key={slideIdx}>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <FeatureCard feature={feature} isMobile={isMobile} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  );
};

export default KeyFeatures;