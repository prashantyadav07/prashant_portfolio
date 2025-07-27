import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  Star, 
  Calendar,
  MapPin,
  User,
  Briefcase,
  GraduationCap,
  Zap,
  Rocket,
  Database,
  Settings,
  Trophy,
  Lightbulb,
  Coffee,
  Code
} from 'lucide-react';
import * as THREE from 'three';

// Importa tus recursos desde la carpeta de assets
import resumePdf from '../src/assets/PRASHANT_YADAV_CV.pdf';
import profileImage from '../src/assets/d2.jpg';

// Componente de fondo 3D optimizado
const ThreeJSBackground = memo(() => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.8, 16, 16),
      new THREE.ConeGeometry(0.8, 1.5, 8),
      new THREE.TorusGeometry(0.8, 0.3, 16, 32),
    ];

    const materials = [
      new THREE.MeshLambertMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 }),
      new THREE.MeshLambertMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 }),
      new THREE.MeshLambertMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6 }),
    ];

    const meshes = [];
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 25;
      mesh.position.y = (Math.random() - 0.5) * 25;
      mesh.position.z = (Math.random() - 0.5) * 25;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 15;

    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.002;
        mesh.position.y += Math.sin(elapsedTime + index) * 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 opacity-10" />;
});


function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        className="bg-slate-800/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl"
        whileHover={{ y: -10, scale: 1.02 }}
        layout
      >
        <div className="relative overflow-hidden">
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {project.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 rounded-full text-black text-xs font-bold flex items-center space-x-1">
              <Star size={12} />
              <span>Featured</span>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-300 mb-4 leading-relaxed">
            {isExpanded ? project.longDescription : project.description}
          </p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: techIndex * 0.1 }}
                      className="bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 text-emerald-300 px-3 py-1 rounded-full text-sm border border-emerald-500/20"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex justify-between items-center mt-4">
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink size={18} />
              <span className="text-sm">Live Demo</span>
            </motion.a>
            
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.1 }}
              className="text-amber-400 hover:text-amber-300 text-sm font-medium"
            >
              {isExpanded ? 'Show Less' : 'Learn More'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    { 
      id: 1, 
      title: "ByteMatrix Solutions", 
      description: "Full-stack startup platform using React.js and Node.js with MongoDB. Implemented secure authentication and achieved 40% performance improvement.", 
      longDescription: "A comprehensive startup platform built with the MERN stack, featuring user authentication, real-time data processing, and scalable architecture. Includes admin dashboard, user management, advanced analytics, and automated deployment pipelines.", 
      tech: ["React.js", "Node.js", "MongoDB", "JWT", "Socket.io", "Redux", "Docker", "AWS"], 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", 
      live: "https://bytematrixsolutions.com/", 
      featured: true 
    },
    { 
      id: 2, 
      title: "Communicate AI", 
      description: "Full-stack MERN application for automated user engagement with AI-powered form generation using Google Gemini API.", 
      longDescription: "An intelligent communication platform that leverages AI to create dynamic forms and automate user interactions. Built with modern React patterns and microservices architecture.", 
      tech: ["React.js", "Node.js", "MongoDB", "Google Gemini API"], 
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop", 
      live: "https://communicateai.netlify.app/", 
      featured: true 
    },
    { 
      id: 3, 
      title: "ATS Resume Analyzer", 
      description: "Advanced resume scoring system with custom algorithms and automated deployment using modern web technologies.", 
      longDescription: "A sophisticated ATS system that uses machine learning algorithms to analyze resumes against job descriptions, providing detailed scoring and improvement suggestions.", 
      tech: ["React.js", "Express.js", "MongoDB", "Vercel", "JWT"], 
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop", 
      live: "https://miniresumeanalyzer.netlify.app/", 
      featured: false 
    },
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (isLoading) {
    return (
      <motion.div 
        className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50"
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          <motion.div
            className="w-24 h-24 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Prashant Yadav
          </motion.h2>
          <motion.div 
            className="text-gray-400 text-lg"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Crafting amazing experiences...
          </motion.div>
          <div className="w-64 h-2 bg-white/10 rounded-full mt-8 mx-auto overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <ThreeJSBackground />
            
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-amber-500 origin-left z-50"
        style={{ scaleX }}
      />
      
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/10 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Prashant Yadav
            </motion.div>
            <div className="flex space-x-2 md:space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-xl transition-all ${
                      activeSection === item.id 
                        ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                    <span className="hidden md:block">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div 
              className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-cyan-500 via-emerald-600 to-amber-500 p-1 shadow-2xl"
              animate={{ 
                boxShadow: [
                  '0 0 0px rgba(6, 182, 212, 0.5)',
                  '0 0 50px rgba(6, 182, 212, 0.8)',
                  '0 0 0px rgba(6, 182, 212, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img src={profileImage} alt="Prashant Yadav" className="w-full h-full rounded-full object-cover" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent"
          >
            Prashant Yadav
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-4xl text-gray-300 mb-6 font-light"
          >
            Full Stack Developer · MERN Specialist
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <a href={resumePdf} download="PRASHANT_YADAV_CSIT.pdf">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg text-lg flex items-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Resume</span>
                </motion.button>
            </a>
          </motion.div>

          {/* --- ICONOS SOCIALES ACTUALIZADOS --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center space-x-6 mb-16"
          >
            {[
              { icon: Github, href: "https://github.com/prashantyadav07", color: "hover:text-gray-300" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/prashant-yadav-83a94a2ab", color: "hover:text-cyan-400" },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`w-16 h-16 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center transition-all shadow-lg border border-white/20 ${social.color}`}
                >
                  <Icon size={28} />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-10 border border-emerald-500/20 shadow-2xl">
                <h3 className="text-3xl font-semibold mb-8 text-cyan-400 flex items-center">
                  <Rocket className="mr-4" size={32} />
                  My Journey
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  I'm a results-driven Full Stack Developer with expertise in the MERN stack and a strong 
                  foundation in Data Structures and Algorithms. My passion lies in transforming complex 
                  problems into elegant, scalable solutions that make a real difference.
                </p>
                
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Currently pursuing a Bachelor of Technology in Computer Science & Information Technology 
                  from Meerut Institute of Engineering and Technology. I specialize in creating robust 
                  backend architectures, crafting intuitive frontend experiences, and integrating secure APIs.
                </p>
                
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-emerald-400 flex items-center">
                    <GraduationCap className="mr-3" size={24} />
                    Education & Achievements
                  </h4>
                  <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20">
                    <div className="font-semibold text-white text-lg">Bachelor of Technology in CSE & IT</div>
                    <div className="text-gray-300">Meerut Institute of Engineering and Technology</div>
                    <div className="text-gray-400 text-sm mt-1">2022 - 2026 · CGPA: 8.5/10</div>
                    <div className="mt-3 flex items-center space-x-2">
                      <Trophy size={16} className="text-amber-400" />
                      <span className="text-sm text-gray-300">Dean's List · Top 10% in class</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1 }}
            >
                <div className="grid grid-cols-2 gap-4">
                  {['MERN Stack', 'AI Integration', 'DSA Expert', 'API Development', 'Cloud Computing', 'DevOps'].map((skill, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05, rotateZ: 2 }}
                      className="bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 text-emerald-300 px-4 py-3 rounded-xl text-sm border border-emerald-500/20 text-center font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-2xl p-6 border border-amber-500/20"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="text-amber-400" size={24} />
                  <h4 className="text-lg font-semibold">My Philosophy</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Code is poetry written in logic. Every line should tell a story, 
                  solve a problem, and inspire the next developer who reads it."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-slate-800/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-gray-400 text-lg mb-20 max-w-3xl mx-auto"
          >
            Here are some of my recent projects that showcase my skills in full-stack development, 
            AI integration, and modern web technologies.
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-cyan-600/10 to-emerald-600/10 rounded-3xl p-12 border border-cyan-500/20">
              <h3 className="text-3xl font-bold mb-4">Want to see more?</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Check out my GitHub for more projects and contributions to open source.
              </p>
              <motion.a
                href="https://github.com/prashantyadav07"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-600 to-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
              >
                <Github size={24} />
                <span>View GitHub Profile</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Let's Work Together
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-gray-400 text-lg mb-16 max-w-3xl mx-auto"
          >
            Ready to bring your ideas to life? I'm always open to discussing new opportunities, creative projects, 
            or potential collaborations.
          </motion.p>
          
          <div className="max-w-xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-semibold mb-8 text-center">Get In Touch</h3>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'prashantyadav9407@gmail.com', href: 'mailto:prashantyadav9407@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+91-8533915030', href: 'tel:+918533915030' },
                  { icon: MapPin, label: 'Location', value: 'Meerut, UP, India', href: '#' }
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <motion.a
                      key={index}
                      href={contact.href}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-800/50 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-lg"
                    >
                      <div className="w-14 h-14 bg-cyan-600/20 rounded-xl flex items-center justify-center">
                        <Icon size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-lg">{contact.label}</div>
                        <div className="text-gray-300">{contact.value}</div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20 pt-12 border-t border-white/10"
          >
            <p className="text-gray-400 mb-4">
              © 2025 Prashant Yadav. Crafted with ❤️ and lots of ☕
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>Made with React.js</span>
              <span>•</span>
              <span>Framer Motion</span>
              <span>•</span>
              <span>Three.js</span>
              <span>•</span>
              <span>Tailwind CSS</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}