import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const features = [
  {
    icon: "🔍",
    title: "Pet Safety & Geo-Fencing",
    description:
      "Advanced GPS tracking with geo-fencing technology to keep your pet safe within designated areas.",
    imageSrc:
      "https://www.thesprucepets.com/thmb/XN-58rdUa1F1KOxK8fZmm6fXJdw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dog-gps-tracker-test-cube-real-time-cat-tracker-tstaples-3318-2186d694cccf4ea1a73d84dedc954463.jpg",
    imageAlt: "Dog wearing a GPS collar",
    accentColor: "#22c55e",
  },
  {
    icon: "💚",
    title: "Health Monitoring",
    description:
      "Real-time health monitoring with vital data tracking to prevent potential issues before they arise.",
    imageSrc: "/image (2).png",
    imageAlt: "Pet health dashboard",
    accentColor: "#3b82f6",
  },
  {
    icon: "📊",
    title: "Data-Driven Insights",
    description:
      "Intelligent analytics providing comprehensive data about your pet's activity, nutrition, and wellbeing.",
    imageSrc: "/dataset.png",
    imageAlt: "Pet activity charts",
    accentColor: "#f59e0b",
  },
  {
    icon: "🎯",
    title: "Holistic Pet Care",
    description:
      "Track activity levels, nutrition, playtime, and overall wellness in one seamless dashboard.",
    imageSrc:
      "https://animalwellnessmagazine.com/wp-content/uploads/dog-and-cat-1.jpg",
    imageAlt: "Happy dog and cat together",
    accentColor: "#ec4899",
  },
  {
    icon: "👥",
    title: "Multi-Pet Management",
    description:
      "Manage multiple pets with personalized profiles and health records all in one place.",
    imageSrc:
      "https://www.healthy-pet.com/cdn/shop/articles/ac7ae5f6fbc297bbb835a5ff8a0c0de5_9fa4a5ed-80f5-4c8d-83dd-602d39ae5def.jpg?v=1771531864",
    imageAlt: "Multiple pet profiles",
    accentColor: "#8b5cf6",
  },
  {
    icon: "⚙️",
    title: "Smart Settings",
    description:
      "Customize your experience with flexible preferences, alerts, and notification settings.",
    imageSrc:
      "https://www.thesprucepets.com/thmb/XN-58rdUa1F1KOxK8fZmm6fXJdw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dog-gps-tracker-test-cube-real-time-cat-tracker-tstaples-3318-2186d694cccf4ea1a73d84dedc954463.jpg",
    imageAlt: "Settings screen",
    accentColor: "#06b6d4",
  },
];

type Feature = (typeof features)[0];

const FeatureCard = ({
  feature,
  isMobile,
}: {
  feature: Feature;
  isMobile: boolean;
}) => {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        height: isMobile ? "auto" : "100%",
        width: "100%",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          width: "100%",
          height: isMobile ? "200px" : "230px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={feature.imageSrc}
          alt={feature.imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />

        {/* COLOR BAR */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: feature.accentColor,
          }}
        />
      </div>

      {/* TEXT */}
      <div
        style={{
          padding: isMobile ? "18px 18px 22px" : "24px 24px 28px",
          flexGrow: 1,
        }}
      >
        <h3
          style={{
            fontSize: isMobile ? "1rem" : "1.05rem",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "10px",
            marginTop: 0,
            lineHeight: 1.3,
          }}
        >
          {feature.title}
        </h3>

        <p
          style={{
            fontSize: isMobile ? "0.85rem" : "0.88rem",
            color: "#64748b",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
};

const PracticeAreas = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const slides: Feature[][] = [];

  if (isMobile) {
    features.forEach((f) => slides.push([f]));
  } else {
    for (let i = 0; i < features.length; i += 3) {
      slides.push(features.slice(i, i + 3));
    }
  }

  return (
    <section
      style={{
        padding: isMobile ? "40px 16px 80px" : "80px 48px 100px",
        background: "#f0f7f4",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .pet-swiper {
          width: 100%;
          overflow: hidden !important;
        }

        .pet-swiper .swiper-wrapper {
          align-items: stretch !important;
        }

        .pet-swiper .swiper-slide {
          height: auto !important;
          overflow: hidden;
        }

        .pet-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 24px;
          text-align: center;
        }

        .pet-swiper .swiper-pagination-bullet-active {
          background: #16a34a;
        }

        .pet-swiper .swiper-button-next,
        .pet-swiper .swiper-button-prev {
          color: #16a34a;
          top: 42%;
        }

        .pet-swiper .swiper-button-next::after,
        .pet-swiper .swiper-button-prev::after {
          font-size: 20px;
          font-weight: 900;
        }
      `}</style>

      {/* HEADER */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#16a34a",
            background: "#dcfce7",
            borderRadius: "999px",
            padding: "5px 14px",
            marginBottom: "16px",
          }}
        >
          Why Choose Us
        </span>

        <h2
          style={{
            fontSize: isMobile ? "1.6rem" : "2.4rem",
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 14px",
            lineHeight: 1.2,
          }}
        >
          Everything your pet needs,
          <br />
          in one smart platform
        </h2>

        <p
          style={{
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            color: "#475569",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          From real-time GPS tracking to AI-powered health insights —
          we give you the tools to keep your pet safe, healthy,
          and happy.
        </p>
      </div>

      {/* SWIPER */}
      <Swiper
        className="pet-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
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
        {slides.map((group, slideIdx) => (
          <SwiperSlide key={slideIdx}>
            <div
              style={{
                display: "flex",
                gap: isMobile ? "0px" : "20px",
                padding: "8px 2px 4px",
                alignItems: "stretch",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {group.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                  }}
                >
                  <FeatureCard
                    feature={feature}
                    isMobile={isMobile}
                  />
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