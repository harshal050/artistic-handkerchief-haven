
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MapPin, Phone, Instagram, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    // Phone validation (basic Indian phone number validation)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    
    // Submit form (this would connect to backend in production)
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", phone: "", message: "" });
      
      // Reset success message after some time
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <WhatsAppButton />
      
      {/* Contact Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container-custom">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="heading-lg mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Have questions about our products or want to place a custom order? Reach out to us, and we'll be happy to assist you.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-8 flex-grow">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="heading-sm mb-6">Get in Touch</h2>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-muted-foreground">Vadodara, Gujarat, India</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">+91 7434902998</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Instagram className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Instagram</h3>
                      <a 
                        href="https://instagram.com/_rk.creation1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        @_rk.creation1
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-secondary/50 p-6 rounded-xl">
                <h3 className="font-medium mb-4">Policy Information</h3>
                <p className="text-muted-foreground mb-3">
                  All products are handcrafted with care. Please note our policy:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-red-500 mr-2">❌</span> No returns accepted
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-red-500 mr-2">❌</span> No exchanges
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="heading-sm mb-6">Send us a Message</h2>
                
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Your 10-digit phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Your message (optional)"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-primary text-primary-foreground font-medium py-3 rounded-md transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
