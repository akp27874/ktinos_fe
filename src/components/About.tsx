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
      </div>
    </section>
  );
};

export default About;