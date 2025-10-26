import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUp, Sparkles } from 'lucide-react';
import { GradientText } from './GradientText';
import { useState } from 'react';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  const footerLinks = {
    Product: ['Features', 'API Documentation', 'Pricing', 'Changelog'],
    Company: ['About Us', 'Blog', 'Careers', 'Contact'],
    Resources: ['Documentation', 'Guides', 'API Status', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licenses'],
  };

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: 'https://x.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/RITHIKKUMARAN' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rithikkumarank' },
    { icon: Mail, label: 'Email', href: 'rithikkumarank@gmail.com' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-transparent to-black/50 pt-32 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-purple-400" />
              </motion.div>
              <span className="text-3xl font-bold">
                <GradientText>TextAI</GradientText>
              </span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              Transform your text with cutting-edge AI technology. Summarize, paraphrase, and extract
              insights with unprecedented accuracy and speed.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-purple-500/50 transition-all group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
              <motion.button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 TextAI. All rights reserved. Built with cutting-edge AI technology.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <motion.a
                href="#"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Privacy
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Terms
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Cookies
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </motion.button>

      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />
    </footer>
  );
};
