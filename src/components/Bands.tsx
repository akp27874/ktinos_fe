
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { theme } from '../theme';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Bands = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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


  return (
    <section
      ref={ref}
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



      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Product Card 1 - Dog Tracker */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-lg overflow-hidden shadow-lg bg-purple-100"
        >
          <div className="relative h-80 bg-gradient-to-br from-purple-300 to-purple-200 flex items-center justify-center">
            <img
              src="https://i.pcmag.com/imagery/roundup-products/06CEGEDw7Ftp0TrfK1D7I2Z.fit_lim.size_919x518.v1758747468.jpg"
              alt="Dog Tracker"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-purple-200 opacity-20"></div>
          </div>
          <div className="p-6">
            <p className="text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: theme.fonts.body }}>PRODUCTS</p>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
                Dog Tracker
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition text-sm"
                style={{ fontFamily: theme.fonts.body }}
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Product Card 2 - Cat Tracker */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-lg overflow-hidden shadow-lg bg-yellow-50"
        >
          <div className="relative h-80 bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center">
            <img
              src="https://beardpet.com/wp-content/uploads/2024/11/DSC2587-scaled.jpg"
              alt="Cat Tracker"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-yellow-100 opacity-10"></div>
          </div>
          <div className="p-6">
            <p className="text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: theme.fonts.body }}>PRODUCTS</p>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
                Cat Tracker
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition text-sm"
                style={{ fontFamily: theme.fonts.body }}
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Bands;