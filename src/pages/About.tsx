
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <WhatsAppButton />
      
      {/* About Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container-custom">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="heading-lg mb-4"
            >
              About RK.Creation
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="/lovable-uploads/9b5842dd-9df6-4558-b7b1-8f96bda04cce.png"
                alt="RK.Creation Logo" 
                className="w-24 h-24 mx-auto my-6"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Artist Info */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="heading-md mb-4">The Artist</h2>
                <h3 className="text-xl font-medium mb-2">Krishna Chhayani</h3>
                <p className="text-muted-foreground">
                  Based in Vadodara, Gujarat, Krishna Chhayani is a skilled artist specializing in custom handkerchiefs and fabric paintings. With a passion for traditional art forms and contemporary designs, Krishna creates unique pieces that blend cultural heritage with modern aesthetics.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">The Journey</h3>
                <p className="text-muted-foreground">
                  RK.Creation began as a small artistic venture and has grown into a recognized brand known for its exceptional craftsmanship and attention to detail. Each handkerchief and fabric painting is handcrafted with care, making every piece one-of-a-kind.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  Our mission is to preserve the traditional art of handcrafted textiles while creating beautiful, meaningful pieces that become treasured keepsakes for special occasions, particularly weddings and celebrations.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-md"
            >
              <img 
                src="https://images.unsplash.com/photo-1604335398480-e8c535e7b3bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                alt="Artistic Handkerchief Creation" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Craftsmanship */}
      <section className="py-12 bg-secondary/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="heading-md mb-6">Our Craftsmanship</h2>
            <p className="text-muted-foreground mb-8">
              At RK.Creation, we take pride in our meticulous attention to detail and the quality of our materials. Each product undergoes a careful creation process:
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                title: "Design",
                description: "Every piece begins with a thoughtful design that balances traditional motifs with contemporary aesthetics.",
                delay: 0
              },
              {
                title: "Material Selection",
                description: "We carefully select premium fabrics and materials to ensure quality, durability, and a luxurious feel.",
                delay: 0.1
              },
              {
                title: "Handcrafted Creation",
                description: "Each handkerchief is meticulously crafted by hand, ensuring uniqueness and attention to the smallest details.",
                delay: 0.2
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Location & Contact */}
      <section className="py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="heading-md mb-4">Find Us</h2>
            <p className="text-muted-foreground">
              Located in the cultural heart of Gujarat, we welcome your inquiries and custom orders.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59404.13147247856!2d73.13354899036095!3d22.322104446451807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1690389712078!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="RK.Creation Location Map"
            ></iframe>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
