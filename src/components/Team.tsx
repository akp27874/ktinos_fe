import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../theme';

const team = [
  { name: 'Jeff Finley', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80', role: 'Chief Veterinary Officer', reverse: true },
  { name: 'Craig Campbell', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80', role: 'Technology Director', reverse: false }
];

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="our-team" className="py-20" style={{ backgroundColor: theme.colors.neutral.lightBg }} ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Our Team</h1>
          <p className="max-w-2xl mx-auto text-lg" style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>
            Meet the caring and innovative minds behind Ktinoskare, dedicated to transforming animal healthcare.
          </p>
        </motion.div>
        
        {team.map((member, idx) => (
          <div key={idx} className={`grid md:grid-cols-2 gap-12 items-center mb-16 ${member.reverse ? 'md:flex-row-reverse' : ''}`}>
            <motion.div 
              initial={{ opacity: 0, x: member.reverse ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: member.reverse ? 50 : -50 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className={member.reverse ? 'md:order-2' : ''}
            >
              <img src={member.img} alt={member.name} className="rounded-lg shadow-xl w-full" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: member.reverse ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: member.reverse ? -50 : 50 }}
              transition={{ duration: 0.8, delay: idx * 0.2 + 0.2 }}
              className={member.reverse ? 'md:order-1' : ''}
            >
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{member.name}</h2>
              <p className="font-semibold mb-4" style={{ fontFamily: theme.fonts.body, color: theme.colors.primary.softLavender }}>{member.role}</p>
              <p className="mb-4" style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>
                With years of experience in veterinary care and technology, our team is committed to delivering innovative solutions that empower pet owners and veterinarians alike.
              </p>
              <p style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>
                We believe in proactive care that prevents issues before they arise, ensuring every animal receives the attention and care they deserve.
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
