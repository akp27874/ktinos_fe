import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import { theme } from '../theme';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialData {
  id: number;
  heading: string;
  name: string;
  petType: string;
  deviceType: string;
  text: string;
  image: string;
  icon?: string;
}

interface Props {
  testimonials?: TestimonialData[];
}

const defaultTestimonials: TestimonialData[] = [
  {
    id: 1,
    heading: "'The Night That Changed Everything'",
    name: "Charlie's owner",
    petType: "DOG 6",
    deviceType: "DOG 6",
    text: "It was past midnight when I got an alert from Ktinoskare—my dog's temperature was higherthan normal. He looked fine, but something felt off. We rushed to the vet, and it turned out to bean early infection. The doctor said we came just in time. That night, Ktinoskare didn't just track my pet… it protected my family",
    image: "https://m.media-amazon.com/images/I/61B84rvfljL.jpg",
    icon: "🐾",
  },
  {
    id: 2,
    heading: "'Miles Apart, Yet Always Close'",
    name: "Oscar's owner",
    petType: "CAT 6 Mini",
    deviceType: "CAT 6 Mini",
    text: "Work takes me away from home for long hours, and leaving my pet alone always comes with guilt. But now, every time I check the app and see his activity, his calm resting patterns, I feel connected. Ktinoskare didn't just give me data—it gave me peace of mind.",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80",
    icon: "🐾",
  },
  {
    id: 3,
    heading: "'Understanding the Silent Ones'",
    name: "Caspar's owner",
    petType: "DOG 6",
    deviceType: "DOG 6",
    text: "My cat never shows when something is wrong. No sounds, no signs. But Ktinoskare noticed what I couldn't—reduced activity and unusual sleep patterns. That small alert helped us detect a health issue early. For the first time, I felt like I could truly understand her.",
    image: "https://img.magnific.com/premium-vector/canine-companion-harness-vest-vector-illustration_1322553-86826.jpg?semt=ais_hybrid&w=740&q=80",
    icon: "🐾",
  },
  {
    id: 4,
    heading: "'One Home, Many Heartbeats'",
    name: "Luna's owner",
    petType: "DOG 5",
    deviceType: "DOG 5",
    text: "With three pets, every day used to feel like a guessing game—who ate less, who was less active, who might be unwell. Now, Ktinoskare shows me everything in one place. Each heartbeat, each step, each movement—it's like I can hear them even when they're silent.",
    image: "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3N8ZW58MHx8MHx8fDA%3D",
    icon: "🐾",
  },
  {
    id: 5,
    heading: "'More Than a Recommendation'",
    name: "Luna's owner",
    petType: "Cat 5",
    deviceType: "Cat_mini 5",
    text: "As a vet, I've seen cases where early signs go unnoticed. When I came across Ktinoskare, I recommended it to my clients—and even started using it for my own pet. The continuous vitals and AI insights are not just technology… they're a second chance at timely care.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDCsqRYLAFDdL4Ix_AHai7kNVyoPV9Ssv1xg&s",
    icon: "🐾",
  },
  {
    id: 6,
    heading: "'From Anxiety to Assurance'",
    name: "Luna's owner",
    petType: "DOG 5",
    deviceType: "DOG 5",
    text: "Bringing my first pet home was filled with love—and fear. Every small change made me worry. But Ktinoskare became my guide. The alerts, the health insights, the constant tracking—it felt like I wasn't alone in this journey anymore. It turned my anxiety into confidence.",
    image: "https://thegadgetflow.com/wp-content/uploads/2025/09/GlocalMe-Launches-PetPhone-blog-featured.jpg",
    icon: "🐾",
  },
];

const Testimonial = ({ testimonials = defaultTestimonials }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Show 2 cards on desktop, 1 on mobile
  const visibleTestimonials = useMemo(() => {
    const visibleCount = windowWidth >= 1024 ? 2 : 1;
    const result: TestimonialData[] = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return result;
  }, [currentIndex, windowWidth, testimonials]);

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-gradient-to-b from-white via-white to-light-bg overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.primary.deepPurple,
            }}
          >
            Trusted by Pet Owners
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg md:text-xl"
            style={{
              fontFamily: theme.fonts.body,
              color: theme.colors.neutral.gray[600],
            }}
          >
            See how our users are transforming their pet care with real-time insights and peace of mind
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* 2-column grid on desktop; each card is a horizontal layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {visibleTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)",
                }}
                className="group overflow-hidden rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: "#F7F6F3",
                }}
              >
                {/* ──────────────────────────────────────────── */}
                {/* HORIZONTAL LAYOUT: Image Left | Text Right  */}
                {/* ──────────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row h-full gap-4 md:gap-6 p-5 md:p-6">
                  {/* ── LEFT PANEL : Pet Image ── */}
                  <div className="flex-shrink-0 w-full md:w-40 lg:w-48 h-64 md:h-80 lg:h-96">
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden shadow-md"
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* ── RIGHT PANEL : Text Content ── */}
                  <div className="flex flex-col flex-1 justify-between py-2 md:py-4">
                    {/* Top block: paw icon, heading, and quote */}
                    <div>
                      {/* Paw Icon */}
                      <div className="text-2xl mb-3 inline-block">
                        {testimonial.icon}
                      </div>

                      <h3
                        className="font-bold text-base lg:text-lg mb-3"
                        style={{
                          fontFamily: theme.fonts.heading,
                          color: theme.colors.primary.deepPurple,
                        }}
                      >
                        {testimonial.heading}
                      </h3>

                      <p
                        className="text-sm md:text-base leading-relaxed"
                        style={{
                          fontFamily: theme.fonts.body,
                          color: theme.colors.neutral.gray[700],
                          lineHeight: "1.75",
                        }}
                      >
                        "{testimonial.text}"
                      </p>
                    </div>

                    {/* Bottom block: divider + owner info + badge */}
                    <div className="mt-4 md:mt-6">
                      <div
                        className="w-10 h-1 rounded-full mb-4"
                        style={{ backgroundColor: theme.colors.primary.healthGreen }}
                      />

                      <div
                        className="flex items-center justify-between gap-3 flex-wrap"
                      >
                        <div>
                          <h4
                            className="font-semibold text-base"
                            style={{
                              fontFamily: theme.fonts.heading,
                              color: theme.colors.primary.deepPurple,
                            }}
                          >
                            {testimonial.name}
                          </h4>
                          <p
                            className="text-xs uppercase tracking-wider font-medium"
                            style={{ color: theme.colors.neutral.gray[500] }}
                          >
                            {testimonial.petType}
                          </p>
                        </div>

                        {/* Device Badge */}
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide flex-shrink-0"
                          style={{
                            backgroundColor: `${theme.colors.primary.healthGreen}20`,
                            color: theme.colors.primary.healthGreen,
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: theme.colors.primary.healthGreen }}
                          />
                          {testimonial.deviceType}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls - Desktop */}
          <div className="hidden lg:flex absolute -left-6 -right-6 top-1/2 -translate-y-1/2 justify-between pointer-events-none px-4">
            <motion.button
              onClick={handlePrevious}
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pointer-events-auto"
              style={{
                backgroundColor: theme.colors.primary.deepPurple,
                color: "white",
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pointer-events-auto"
              style={{
                backgroundColor: theme.colors.primary.deepPurple,
                color: "white",
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Mobile Navigation - Arrows Below */}
          <div className="flex lg:hidden justify-center gap-4 mt-8">
            <motion.button
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full"
              style={{
                backgroundColor: `${theme.colors.primary.deepPurple}10`,
                color: theme.colors.primary.deepPurple,
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full"
              style={{
                backgroundColor: `${theme.colors.primary.deepPurple}10`,
                color: theme.colors.primary.deepPurple,
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Dots Indicator */}
        <motion.div
          className="flex justify-center items-center gap-2 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? "w-8 h-3" : "w-3 h-3"
              }`}
              style={{
                backgroundColor:
                  index === currentIndex
                    ? theme.colors.primary.deepPurple
                    : theme.colors.neutral.gray[300],
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;