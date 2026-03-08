import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../theme';

const areas = [
  { title: 'The Future of Pet Safety', desc: 'Know the signs early so you can take action sooner. Advanced geo-fencing technology ensures your pet stays safe within designated areas, offering you unparalleled peace of mind.', icon: '📍' },
  { title: 'Smart Monitoring, Happier Pets', desc: 'Stay informed about your pet\'s health with real-time monitoring. Ktinoskare provides vital health data, helping you prevent potential issues before they arise.', icon: '💚' },
  { title: 'From Playtime to Nutrition', desc: 'Discover insights into your pet\'s well-being. From activity levels to dietary needs, you\'ll have everything you need to ensure a happy, healthy pet.', icon: '🎯' },
  { title: 'Seamless Pet Care', desc: 'Explore the unique features that set Ktinoskare apart. With seamless integration into your daily routine, caring for your pet has never been easier.', icon: '⚡' },
  { title: 'From Concern to Confidence', desc: 'Hear from satisfied pet owners who trust Ktinoskare for their pets\' safety and health. Their stories highlight the transformative impact of proactive care.', icon: '🌟' },
  { title: 'Data-Driven Insights', desc: 'Empower yourself with intelligent analytics that help you make informed decisions about your animal\'s health and wellbeing.', icon: '📊' }
];

const PracticeAreas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="practice-areas" className="py-20" style={{ backgroundColor: theme.colors.neutral.lightBg }} ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Key Features</h1>
          <p className="max-w-2xl mx-auto text-lg" style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>
            Proactive solutions that empower you to care for your animals with confidence and precision.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {areas.map((area, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: `0 10px 30px ${theme.colors.primary.deepPurple}26` }}
              className="flex gap-4 p-6 rounded-lg transition"
              style={{ backgroundColor: theme.colors.neutral.white }}
            >
              <div className="flex-shrink-0">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-md"
                  style={{ background: `linear-gradient(to bottom right, ${theme.colors.primary.tealWellness}, ${theme.colors.primary.healthGreen})` }}
                >
                  {area.icon}
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{area.title}</h3>
                <p style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[600] }}>{area.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
