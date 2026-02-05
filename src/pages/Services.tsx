import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Smartphone, 
  Palette, 
  Server, 
  Cloud, 
  ArrowRight, 
  Globe, 
  Layers,
  CheckCircle2,
  Zap,
  Clock,
  MessageSquare
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Reveal, RevealText } from '../components/ui/RevealText';

// Services Data
const SERVICES = [
  {
    title: "Web Development",
    description: "High-performance, scalable websites and web applications tailored to your business goals. We build with modern frameworks for speed and SEO.",
    features: ["Custom React & Next.js Development", "Progressive Web Apps (PWA)", "E-commerce Solutions", "CMS Integration"],
    icon: <Globe className="size-8 text-cyan-400" />
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that provide seamless user experiences. We turn your ideas into powerful apps for iOS and Android.",
    features: ["iOS & Android Development", "React Native & Flutter", "App Store Optimization", "Maintenance & Updates"],
    icon: <Smartphone className="size-8 text-blue-400" />
  },
  {
    title: "UI/UX Design",
    description: "User-centric designs that blend aesthetics with functionality. We create intuitive interfaces that engage users and drive conversions.",
    features: ["User Research & Personas", "Wireframing & Prototyping", "Visual Identity & Branding", "Interaction Design"],
    icon: <Palette className="size-8 text-indigo-400" />
  },
  {
    title: "Backend & API Development",
    description: "Robust server-side solutions that power your applications. We ensure security, speed, and reliability for your data and logic.",
    features: ["RESTful & GraphQL APIs", "Microservices Architecture", "Database Design (SQL/NoSQL)", "Authentication & Security"],
    icon: <Server className="size-8 text-cyan-400" />
  },
  {
    title: "Cloud & Deployment",
    description: "Secure and scalable cloud infrastructure to keep your applications running smoothly. We handle deployment, scaling, and monitoring.",
    features: ["AWS / Google Cloud / Azure", "CI/CD Pipelines", "Docker & Kubernetes", "Serverless Architecture"],
    icon: <Cloud className="size-8 text-blue-500" />
  }
];

// Process Data
const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    description: "We start by understanding your vision, goals, and target audience to lay a solid foundation."
  },
  {
    step: "02",
    title: "Strategy & Design",
    description: "We create a roadmap and design intuitive interfaces that align with your brand identity."
  },
  {
    step: "03",
    title: "Development",
    description: "Our engineers build your solution using cutting-edge technologies and best coding practices."
  },
  {
    step: "04",
    title: "Testing",
    description: "Rigorous testing ensures your product is bug-free, secure, and ready for the real world."
  },
  {
    step: "05",
    title: "Launch & Support",
    description: "We help you launch successfully and provide ongoing support to ensure continued growth."
  }
];

// Why Choose Us Data
const FEATURES = [
  {
    title: "Transparent Communication",
    description: "You're never in the dark. We provide regular updates and open channels for feedback throughout the project.",
    icon: <MessageSquare className="size-6 text-cyan-400" />
  },
  {
    title: "Agile Methodology",
    description: "We adapt to changes quickly, delivering value in iterations so you can see progress faster.",
    icon: <Zap className="size-6 text-blue-400" />
  },
  {
    title: "Scalable Solutions",
    description: "Our code is built to grow. We design architectures that can handle your future success.",
    icon: <Layers className="size-6 text-blue-500" />
  },
  {
    title: "On-Time Delivery",
    description: "We respect deadlines. Our efficient processes ensure we deliver quality work when promised.",
    icon: <Clock className="size-6 text-indigo-400" />
  }
];

// Tech Categories
const TECHNOLOGIES = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Python", "Express", "Django", "FastAPI"] },
  { category: "Mobile", items: ["React Native", "Flutter", "iOS Swift", "Android Kotlin"] },
  { category: "Database & Cloud", items: ["PostgreSQL", "MongoDB", "AWS", "Firebase", "Docker"] }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex justify-center items-center pt-40 pb-20 z-10 px-4 sm:px-6 lg:px-8"
               style={{backgroundImage: "url('/services.jpeg')", backgroundSize: "cover", backgroundPosition: "center"}}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/50 z-0" />
        
        {/* Bottom Fade to Black */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-center text-white leading-tight drop-shadow-lg">
              <RevealText className="block mb-2 py-3" width="100%">Building Digital Excellence for</RevealText>
              <RevealText className="block text-transparent pb-3 bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-500 drop-shadow-none filter brightness-110" width="100%">
                Visionary Companies
              </RevealText>
            </h1>
            <Reveal delay={0.2} width="100%">
                <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl font-medium mb-10 drop-shadow-md">
                We transform ideas into powerful digital realities. From web & mobile apps to complex backend systems, we deliver engineering tailored for your growth.
                </p>
            </Reveal>
            <motion.a 
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Get a Free Consultation
              <ArrowRight className="size-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 z-10 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <RevealText><h2 className="text-3xl md:text-5xl font-bold mb-4">Our Expertise</h2></RevealText>
            <Reveal delay={0.1} width="100%"><p className="text-gray-400">Comprehensive solutions for every stage of your digital journey.</p></Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="mb-6 p-4 rounded-2xl bg-white/[0.05] w-fit group-hover:bg-blue-500/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="size-4 text-cyan-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <RevealText><h2 className="text-3xl md:text-5xl font-bold mb-4">How We Work</h2></RevealText>
            <Reveal delay={0.1} width="100%"><p className="text-gray-400">A streamlined process designed for efficiency and transparency.</p></Reveal>
          </div>

          <div className="relative">
             {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              {PROCESS.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-black border-2 border-blue-500/30 flex items-center justify-center text-xl font-bold text-blue-400 mb-6 z-10 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-24 z-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#050505] to-black">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
            <RevealText><h2 className="text-3xl md:text-5xl font-bold mb-4">Core Technologies</h2></RevealText>
            <Reveal delay={0.1} width="100%"><p className="text-gray-400">We build with the best tools in the industry to ensure modern, future-proof results.</p></Reveal>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TECHNOLOGIES.map((tech, index) => (
              <motion.div 
                key={index} 
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-6 text-blue-300 pb-2 border-b border-white/10">{tech.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {tech.items.map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <RevealText><h2 className="text-3xl md:text-5xl font-bold mb-6">Why Partner With Us?</h2></RevealText>
            <Reveal delay={0.1}>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We don't just write code; we build partnerships. Our mission is to help you succeed by delivering digital products that make a real impact.
                </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-6">
              {FEATURES.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h4 className="font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-3xl rounded-full" />
            <motion.div 
              className="relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Code2 className="size-12 text-white mb-6" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-gray-200 mb-6">
                "Their team didn't just build what we asked for. They helped us refine our idea and delivered a product that exceeded our expectations."
              </blockquote>
              <div>
                 <div className="font-bold text-white">Alex Morgan</div>
                 <div className="text-blue-400 text-sm">CEO, TechStart Inc.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Build Something Amazing?</h2>
          </RevealText>
          <Reveal delay={0.1} width="100%">
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Let's discuss your project and see how we can bring your vision to life. No commitment, just a friendly chat.
            </p>
          </Reveal>
          <motion.div
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
          >
            <a href="/contact" className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-full shadow-lg shadow-blue-900/40 hover:shadow-blue-700/60 transition-all">
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
