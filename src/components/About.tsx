import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../theme';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
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
          <p className="max-w-2xl mx-auto text-lg mb-0" style={{ fontFamily: "'Kalam', cursive", color: theme.colors.neutral.gray[700], fontSize: '1.4rem' }}>
            Pets naturally hide their pain until it worsens.
          </p>
          <p className="max-w-2xl mx-auto text-lg" style={{ fontFamily: "'Kalam', cursive", color: theme.colors.neutral.gray[700], fontSize: '1.4rem' }}>
            Spot issues early — to prevent needless suffering & pain.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80" alt="Animal Care" className="rounded-lg shadow-xl w-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.softLavender }}>Our Mission</h2>
            <div className="space-y-4" style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: theme.colors.primary.healthGreen }}>✓</span>
                <p>Transform animal care from reactive to proactive</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: theme.colors.primary.healthGreen }}>✓</span>
                <p>Empower owners with data-driven insights</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: theme.colors.primary.healthGreen }}>✓</span>
                <p>Enable veterinarians to deliver precise care</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl" style={{ color: theme.colors.primary.healthGreen }}>✓</span>
                <p>Create healthier, happier lives for animals</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ x: 10 }}
              className="mt-6 font-semibold flex items-center"
              style={{ fontFamily: theme.fonts.body, color: theme.colors.primary.deepPurple }}
            >
              Learn more <span className="ml-2">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;