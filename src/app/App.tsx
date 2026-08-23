import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Send, CheckCircle, Code, Palette, TrendingUp } from 'lucide-react';
import backgroundImage from '../imports/_blue__beach__ocean.jpg';
import computerImage from './computer.jpg';
import pricingImage from './pricing.jpeg';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Set page title and meta tags
  useEffect(() => {
    document.title = 'HR WEB STUDIO - Website Designing, Branding & Social Media Management';

    // Update or create canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = 'https://hrwebstudio.com';

    // Update or create meta description
    let metaDescription = document.querySelector("meta[name='description']") as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'HR WEB STUDIO - Professional website designing, branding, and social media management services for business organizations.';

    // Update or create Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'HR WEB STUDIO' },
      { property: 'og:description', content: 'Professional website designing, branding, and social media management services.' },
      { property: 'og:url', content: 'https://hrwebstudio.com' },
      { property: 'og:type', content: 'website' }
    ];

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property='${tag.property}']`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });
  }, []);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'process', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const validateForm = () => {
    const errors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Sends the form data via email using FormSubmit.co (no backend required)
      const response = await fetch('https://formsubmit.co/ajax/Webstudioshr@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Project Inquiry from ${formData.name} - HR WEB STUDIO`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      setSubmitError("Something went wrong sending your message. Please try again or email us directly at Webstudioshr@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-md sticky top-0 z-50">
        <motion.h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          HR WEB STUDIO
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm md:text-base">
          {['home', 'services', 'process', 'portfolio', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => handleNavClick(e, section)}
              className={`hover:text-blue-600 transition-colors capitalize relative ${
                activeSection === section ? 'text-blue-600' : ''
              }`}
            >
              {section}
              {activeSection === section && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden"
          >
            <div className="flex flex-col py-4">
              {['home', 'services', 'process', 'portfolio', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(e, section)}
                  className={`px-8 py-3 hover:bg-blue-50 transition-colors capitalize ${
                    activeSection === section ? 'text-blue-600 bg-blue-50' : ''
                  }`}
                >
                  {section}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative px-6 py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/95 to-blue-50/90"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              Professional Web Design Agency
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-700 mb-6"
            >
              We Build Stunning Websites for Business Organizations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              Transform your business with a professional, responsive website that drives results.
              We create custom web solutions tailored to your organization's unique needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg transition"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-2xl shadow-lg transition"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Our Work
              </motion.button>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={computerImage}
                alt="Web Design Workspace"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent pointer-events-none"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-40"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-8 bg-white border-y border-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '150+', label: 'Projects Completed' },
              { number: '100+', label: 'Happy Clients' },
              { number: '5+', label: 'Years Experience' },
              { number: '98%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-8 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-blue-700 mb-4">Our Services</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete digital solutions to elevate your brand and grow your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: 'Website Designing',
                description: 'Beautiful, responsive websites built with modern technologies that reflect your brand and engage your audience.'
              },
              {
                icon: Palette,
                title: 'Branding',
                description: 'Complete brand identity solutions including logo design, color schemes, and visual guidelines that make your business stand out.'
              },
              {
                icon: TrendingUp,
                title: 'Social Media Management',
                description: 'Strategic social media presence management to grow your audience, increase engagement, and drive business results.'
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                  className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-md hover:shadow-xl transition cursor-pointer border border-blue-100"
                >
                  <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h4>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="bg-gradient-to-b from-blue-50 to-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-blue-700 mb-4">Our Process</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We understand your business goals, target audience, and project requirements.' },
              { step: '02', title: 'Design', description: 'Create stunning mockups and prototypes that bring your vision to life.' },
              { step: '03', title: 'Development', description: 'Build your website with clean code, optimized performance, and best practices.' },
              { step: '04', title: 'Launch & Support', description: 'Deploy your site and provide ongoing maintenance and updates.' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition cursor-pointer border-t-4 border-blue-600"
                >
                  <div className="text-5xl font-bold text-blue-200 mb-4">{item.step}</div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-300 text-2xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-bold text-blue-700 mb-4">Our Work</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Successful projects we've delivered for business organizations
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full bg-gradient-to-br from-blue-600 to-blue-800 py-16 px-6 md:px-12"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                url: 'https://hrwebstudio01.my.canva.site/',
              },
              {
                url: 'https://hrwebstudio01.my.canva.site/02',
              },
              {
                url: 'https://hrwebstudio01.my.canva.site/03',
              },
            ].map((project, index) => (
              <motion.a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group block bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(project.url)}?w=800&h=600`}
                    alt="Website preview"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors" />
                </div>
                <div className="p-5 text-left">
                  <p className="text-sm text-gray-500 mt-1">Click to view live site</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-8 text-center bg-gradient-to-b from-white to-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <img
            src={pricingImage}
            alt="Website Designing Pricing Options"
            className="w-full h-auto rounded-2xl shadow-xl"
          />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-700 mb-6"
        >
          Let's Build Something Amazing
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto"
        >
          Ready to take your business online? Get in touch and let's discuss your project.
          We'll create a custom solution that exceeds your expectations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg"
        >
          {formSubmitted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <CheckCircle size={64} className="text-green-500 mb-4" />
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h4>
              <p className="text-gray-600">We've received your request and will contact you within 24 hours to discuss your project.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name / Company Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full border rounded-xl p-3 transition-all ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1 text-left">{formErrors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setFormErrors({ ...formErrors, email: '' });
                  }}
                  className={`w-full border rounded-xl p-3 transition-all ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1 text-left">{formErrors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <textarea
                  placeholder="Tell us about your project... (e.g., website type, features needed, timeline)"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    setFormErrors({ ...formErrors, message: '' });
                  }}
                  className={`w-full border rounded-xl p-3 h-32 transition-all ${
                    formErrors.message ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1 text-left">{formErrors.message}</p>
                )}
              </div>

              {submitError && (
                <p className="text-red-500 text-sm mb-4 text-center">{submitError}</p>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg transition flex items-center gap-2 mx-auto disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {isSubmitting ? 'Sending...' : 'Request a Quote'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">HR WEB STUDIO</h4>
              <p className="text-blue-200 text-sm">
                Building exceptional websites for business organizations worldwide.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="hover:text-white cursor-pointer transition">Website Designing</li>
                <li className="hover:text-white cursor-pointer transition">Branding</li>
                <li className="hover:text-white cursor-pointer transition">Social Media Management</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="hover:text-white cursor-pointer transition">About Us</li>
                <li className="hover:text-white cursor-pointer transition">Portfolio</li>
                <li className="hover:text-white cursor-pointer transition">Process</li>
                <li className="hover:text-white cursor-pointer transition">Contact</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="hover:text-white cursor-pointer transition">webstudioshr@gmail.com</li>
                <li className="hover:text-white cursor-pointer transition">Instagram: hr_webstudio</li>
                <li className="hover:text-white cursor-pointer transition">Facebook: hr_webstudio</li>
              </ul>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-t border-blue-600 pt-8 text-center text-sm text-blue-200"
          >
            © 2026 HR WEB STUDIO. All rights reserved. Crafting digital excellence for businesses.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}