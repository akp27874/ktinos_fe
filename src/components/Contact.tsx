import { FormEvent, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { theme } from '../theme';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Get In Touch</h1>
          <p className="max-w-2xl mx-auto text-lg" style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>
            Have questions about Ktinoskare? We're here to help you provide the best care for your animals.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
              style={{ fontFamily: theme.fonts.body, borderColor: theme.colors.neutral.gray[200] }} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
              style={{ fontFamily: theme.fonts.body, borderColor: theme.colors.neutral.gray[200] }} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
            <textarea 
              placeholder="Your Message" 
              rows={7} 
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition"
              style={{ fontFamily: theme.fonts.body, borderColor: theme.colors.neutral.gray[200] }}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05, backgroundColor: theme.colors.primary.tealWellness }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-8 py-3 rounded-lg transition font-semibold"
              style={{ backgroundColor: theme.colors.primary.healthGreen, fontFamily: theme.fonts.body }}
            >
              Send Message
            </motion.button>
          </motion.form>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white p-8 rounded-lg"
            style={{ background: `linear-gradient(to bottom right, ${theme.colors.primary.deepPurple}, ${theme.colors.primary.softLavender})` }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: theme.fonts.heading }}>Contact Information</h3>
            <ul className="space-y-4" style={{ fontFamily: theme.fonts.body }}>
              <li className="flex items-start gap-3">
                <span className="text-xl" style={{ color: theme.colors.primary.healthGreen }}>📍</span>
                <span>198 West 21th Street, Suite 721 New York NY 10016</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl" style={{ color: theme.colors.primary.healthGreen }}>📞</span>
                <a href="tel://1235235598" className="hover:opacity-80 transition">+ 1235 2355 98</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl" style={{ color: theme.colors.primary.healthGreen }}>✉️</span>
                <a href="mailto:info@ktinoskare.com" className="hover:opacity-80 transition">info@ktinoskare.com</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl" style={{ color: theme.colors.primary.healthGreen }}>🌐</span>
                <a href="#" className="hover:opacity-80 transition">www.ktinoskare.com</a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
