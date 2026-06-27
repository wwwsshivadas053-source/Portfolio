/* ==========================================================================
   AI Portfolio Website JavaScript Logic - Prajwal T.S.
   ========================================================================== */

// Initialize EmailJS
(function() {
    // Replace with your EmailJS User ID if available
    emailjs.init("YOUR_USER_ID_HERE");
})();

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initTypewriter();
    initHeroParticles();
    initMouseGlow();
    initScrollAnimations();
    initSkillProgress();
    initGitHubGrid();
    initResumeView();
    initCertificatesGrid();
});

/* ==========================================================================
   Header Scroll & Mobile Menu
   ========================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'bg-slate_bg/90', 'shadow-lg');
            header.classList.remove('py-4');
            if (backToTop) {
                backToTop.classList.remove('opacity-0', 'pointer-events-none');
                backToTop.classList.add('opacity-100', 'pointer-events-all');
            }
        } else {
            header.classList.add('py-4');
            header.classList.remove('py-2', 'bg-slate_bg/90', 'shadow-lg');
            if (backToTop) {
                backToTop.classList.add('opacity-0', 'pointer-events-none');
                backToTop.classList.remove('opacity-100', 'pointer-events-all');
            }
        }
    });
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('mobile-nav');
    
    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('hidden');
        });
        
        // Close menu on link clicks
        const links = nav.querySelectorAll('.mobile-link');
        links.forEach(l => {
            l.addEventListener('click', () => {
                nav.classList.add('hidden');
            });
        });
    }
}

/* ==========================================================================
   Typewriter Animation
   ========================================================================== */
function initTypewriter() {
    const textEl = document.getElementById('typing-text');
    if (!textEl) return;
    
    const words = [
        "an AI Engineer.",
        "a Machine Learning Engineer.",
        "a Full Stack Developer.",
        "a Data Scientist.",
        "a Python Developer."
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 120;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            delay = 60;
        } else {
            textEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            delay = 120;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            delay = 1800; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 400; // Pause before typing next word
        }
        
        setTimeout(type, delay);
    }
    
    type();
}

/* ==========================================================================
   Interactive Hero Canvas Particles (AI Network)
   ========================================================================== */
function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1.5;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
            ctx.fill();
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Boundary checks
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Interactive mouse attraction
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }
        }
    }
    
    // Spawn
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(37, 99, 235, ${0.18 * (1 - dist / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
            
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ==========================================================================
   Cursor Glow Position Tracking
   ========================================================================== */
function initMouseGlow() {
    window.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
}

/* ==========================================================================
   GSAP Scroll Reveals
   ========================================================================== */
function initScrollAnimations() {
    // Register scrolltrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Header reveal
    gsap.from("#main-header", {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    });
    
    // Hero elements reveal
    gsap.from("#home h1, #home h2, #home p, #home .flex-wrap", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out"
    });
    
    // Stats Panel reveal
    gsap.from("#home .glass-panel", {
        opacity: 0,
        x: 60,
        duration: 1.2,
        ease: "power3.out"
    });
    
    // General section header scroll animations
    const headers = document.querySelectorAll("section .text-center");
    headers.forEach(h => {
        gsap.from(h, {
            scrollTrigger: {
                trigger: h,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        });
    });
    
    // Skill cards staggering
    gsap.from(".skill-card", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 75%",
            once: true
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        onComplete: () => {
            gsap.set(".skill-card", { clearProps: "opacity,transform" });
        }
    });
    
    // Fail-safe to ensure cards are visible even if ScrollTrigger fails
    setTimeout(() => {
        const cards = document.querySelectorAll('.skill-card');
        cards.forEach(c => {
            c.style.opacity = '1';
            c.style.transform = 'none';
        });
    }, 2000);
}

/* ==========================================================================
   Skill Progress Meter Triggers
   ========================================================================== */
function initSkillProgress() {
    try {
        const meters = document.querySelectorAll('.circular-progress');
        if (!meters || meters.length === 0) return;
        
        meters.forEach(m => {
            const valAttr = m.getAttribute('data-value');
            const val = valAttr ? parseInt(valAttr) : 0;
            const circle = m.querySelector('.progress-circle');
            if (!circle) return;
            
            const radius = parseFloat(circle.getAttribute('r')) || 36;
            const circumference = radius * 2 * Math.PI;
            
            // Set initial state
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
            
            // Animate after rendering to trigger CSS transition
            setTimeout(() => {
                const offset = circumference - (val / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }, 150);
        });
    } catch (e) {
        console.error("Error in initSkillProgress:", e);
    }
}

/* ==========================================================================
   Project Filtering Logic
   ========================================================================== */
const filterBtns = document.querySelectorAll('#project-filters button');
const projectCards = document.querySelectorAll('#project-grid > div');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterVal = btn.getAttribute('data-filter');
        
        projectCards.forEach(c => {
            const cat = c.getAttribute('data-category');
            if (filterVal === 'all' || cat === filterVal) {
                gsap.to(c, { scale: 1, opacity: 1, duration: 0.4, display: 'flex' });
            } else {
                gsap.to(c, { scale: 0.9, opacity: 0, duration: 0.4, display: 'none' });
            }
        });
    });
});

/* ==========================================================================
   Featured Project Modals (Detailed Case Studies)
   ========================================================================== */
const projectData = {
    'resume-analyzer': {
        title: "AI Resume Analyzer",
        tag: "NLP & Gemini LLM",
        problem: "Recruiters evaluate hundreds of resumes manually, leading to candidate selection fatigue. Fresh graduates struggle to align their resumes with ATS keywords, lowering callback conversion ratios.",
        solution: "A web application utilizing Google Gemini LLMs to parse resume PDFs, extract competencies, evaluate skills, and cross-reference them with target Job Descriptions to produce an interactive scoring dashboard and personalized ATS suggestions.",
        architecture: `
📄 Uploaded PDF Resume -> PyMuPDF Text Extraction -> ATS Parsing Prompt
                                                       |
💻 Flask Web Server <- Gemini AI Analysis Engine <- gemini-2.5-flash LLM Model
    |
    v
📊 SQLite Database (Stores User history, scores, and job matches)
        `,
        features: [
            "ATS Score Calculation based on structural parsing.",
            "Detailed missing keywords detector using LLM semantic evaluation.",
            "Custom resume writer suggestions leveraging generative output.",
            "Admin control center to inspect recent analyses, user counts, and feedback logs."
        ],
        stack: ["Python", "Flask", "Google Gemini API (gemini-2.5-flash)", "SQLite", "Tailwind CSS", "PyMuPDF"],
        challenges: "Parsing non-standard PDF tables and multi-column designs. Resolved by extracting plain text sequentially and using tailored generative system instructions to normalize layout text before rating.",
        future: "Adding automated PDF regeneration formatting so candidates can export corrected resumes in real time.",
        github: "https://github.com/wwwsshivadas053-source/AI_Resume_analyzer",
        demo: "#playgrounds"
    },
    'disease-prediction': {
        title: "Skin Disease Diagnoser (MedVision AI)",
        tag: "Computer Vision & Medical CNN",
        problem: "Limited access to specialized dermatologists in remote areas leads to delayed skin lesion diagnosis. Standard black-box ML classifiers do not offer clinical visibility into classification regions.",
        solution: "An interactive skin screening platform built around a custom Convolutional Neural Network (CNN) trained in TensorFlow. Integrated Grad-CAM attention heatmaps overlay highlighting model focus areas, alongside bilingual support (English/Kannada) and PDF reports.",
        architecture: `
📸 Camera/Image Upload -> Image Quality Assessment (Brightness, Contrast, Blurs)
                                |
📱 Flask Web App Layer -> Custom CNN Classifier (TensorFlow/Keras .h5 Model)
                                |
🔬 Grad-CAM Explainer -> Attention Overlay Output -> PDF Report Generation
        `,
        features: [
            "Supervised CNN classifier detecting lesions (Melanoma, HFMD, etc.) with confidence metrics.",
            "Grad-CAM (Gradient-weighted Class Activation Mapping) overlay displaying pixel hotspots.",
            "Image assessment utility verifying brightness, contrast, and clarity limits before evaluation.",
            "Bilingual translation support (English and Kannada)."
        ],
        stack: ["TensorFlow", "Keras", "Flask", "SQLite", "ReportLab", "Python", "Grad-CAM API", "PIL"],
        challenges: "Installing cross-platform dependencies like TensorFlow and maintaining low-latency inference on CPU. Handled by resizing input arrays early (224x224) and setting up asynchronous image processing.",
        future: "Incorporating real-time continuous video screening via web sockets.",
        github: "https://github.com/wwwsshivadas053-source/disease_prediction_system",
        demo: "#playgrounds"
    },
    'college-notes-rag': {
        title: "College Notes RAG Chatbot",
        tag: "Retrieval-Augmented Generation",
        problem: "Search engines on static notes fail to understand the semantic intent of student queries. Directly feeding complete textbook volumes into LLM contexts is extremely expensive and exceeds token limits.",
        solution: "A local RAG platform where students upload PDF lecture notes, which are chunked, embedded, and queried. Incorporates Gemini Embeddings and FAISS vector indices, with a robust TF-IDF fallback to keep the service runnable in memory-constrained environments.",
        architecture: `
📂 Notes PDF -> PyMuPDF Text Extractor -> Overlapping Text Chunking
                                                  |
🧠 RAG Retrieval Pipeline -> Vector Store -> FAISS Indexes / local TF-IDF matcher
                                                  |
💬 User Chat Query -> Context Retrieve -> Gemini 2.0 API Context Answer Output
        `,
        features: [
            "PDF text extraction and sliding window chunking to maintain semantic coherence.",
            "Dense vector search with FAISS and Google Gemini embedding models.",
            "Local TF-IDF search fallback when API keys or local memory stores are unavailable.",
            "Admin portal to inspect feedback lists, logs, and note counts."
        ],
        stack: ["Python", "Flask", "Gemini 2.0 API (gemini-2.0-flash)", "FAISS", "PyMuPDF", "Tailwind CSS", "Alpine.js"],
        challenges: "Ensuring proper FAISS installation on Windows without compiler errors. Resolved by establishing a dual-pipeline strategy that falls back seamlessly to sklearn's TF-IDF vectorizer.",
        future: "Developing custom OCR models to read hand-written notes.",
        github: "https://github.com/wwwsshivadas053-source/college_notes_rag",
        demo: "#playgrounds"
    },
    'crop-advisor': {
        title: "Crop Advisor Chatbot",
        tag: "Recommendation System",
        problem: "Farmers make planting decisions based on historical habits, ignoring shifting meteorological datasets and micro-nutrient configurations, which lowers harvest yield rates.",
        solution: "An interactive agricultural advisory tool utilizing real-time weather API integration and NPK (Nitrogen, Phosphorus, Potassium) soil attributes to recommend suitable crop matches through interactive chat dialogs.",
        architecture: `
🌱 NPK Soil Attributes -> Weather API Coordinates Check -> Local DB Crop Matcher
                                                               |
💬 User Conversation Dialog -> Context Parser -> Crop Advisor chatbot recommendation
        `,
        features: [
            "NPK nutrient classification matrices matching target crops.",
            "Real-time Weather API integration checking temperature, humidity, and rainfall.",
            "Personalized chat dashboard mapping recommended items to historical records.",
            "SQLite database structure caching regional weather indices."
        ],
        stack: ["Python", "Flask", "SQLite", "OpenWeatherMap API", "HTML5", "Tailwind CSS", "JavaScript"],
        challenges: "Managing missing weather metrics when API limits are reached. Addressed by building a regional climate lookup index fallback directly into SQLite tables.",
        future: "Deploying a voice-activated interface for rural language compatibility.",
        github: "https://github.com/wwwsshivadas053-source/crop_advisor_system",
        demo: "#playgrounds"
    },
    'crop-yield': {
        title: "Crop Yield Vision",
        tag: "Machine Learning Regression",
        problem: "Agricultural planning requires early yield estimates, but regional variables are complex, making hand-calculations highly inaccurate.",
        solution: "A machine learning pipeline utilizing supervised regression models to forecast agricultural yield rates. Features interactive prediction inputs, statistical tables, and Pandas encoders to normalize categorical soil types.",
        architecture: `
📂 Crop CSV Dataset -> Pandas Data Wrangling -> Scikit-learn Pipeline
                                                       |
💻 Crop Yield Predictor Web Dashboard <- Pickle Saved Model (model.pkl)
        `,
        features: [
            "Pre-trained regression model (Random Forest/Linear Regressor) predicting yields.",
            "Custom categorical encoders (soil type, crop, fertilizer) using label encoders.",
            "Predictive dashboard allowing inputs and visual output feedback."
        ],
        stack: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Pickle"],
        challenges: "Avoiding model overfitting on small crop datasets. Resolved by applying k-fold cross-validation and feature scaling before training.",
        future: "Visualizing regional prediction maps using Leaflet.js maps.",
        github: "https://github.com/wwwsshivadas053-source/Crop_yield_vision",
        demo: "#playgrounds"
    },
    'property-price': {
        title: "Property Price Valuation (EstateAI)",
        tag: "Predictive ML & Full-Stack Portal",
        problem: "Real estate buyers struggle with opaque valuations. Standard portfolios only show prediction numbers, lacking reports, security portals, and admin management dashboards.",
        solution: "A full-scale real estate valuation system containing pre-trained Scikit-learn regression, interactive prediction tables, a customized PDF report exporter (ReportLab), security controls, and OTP password-reset support.",
        architecture: `
🏢 Real Estate Features -> Scikit-learn Regressor -> Valuation Estimation
                                                        |
📦 Flask Web Application -> SQLite (stores user credentials, listings, predictions)
                                                        |
📧 Forgot Password Reset -> SMTPLIB OTP Emailer -> PDF Exporter (ReportLab)
        `,
        features: [
            "Regression valuation engine calculating home value from features.",
            "ReportLab PDF report builder creating instant property sheets.",
            "SMTPLIB OTP email integration for forgot-password workflows.",
            "Admin dashboards containing statistics, user registers, and predictions."
        ],
        stack: ["Python", "Flask", "SQLite", "Scikit-learn", "ReportLab", "SMTPLIB", "Tailwind CSS"],
        challenges: "Protecting routes and managing secure sessions across admin and user roles. Handled by creating Custom Flask wrapper functions and hashing passwords with Werkzeug security tools.",
        future: "Integrating real-time pricing feeds using property listing APIs.",
        github: "https://github.com/wwwsshivadas053-source/property-price-prediction",
        demo: "#playgrounds"
    },
    'student-accommodation': {
        title: "Student Accommodation System",
        tag: "Full-Stack PHP System",
        problem: "College graduates struggle to locate affordable housing near college zones, while local landlords lack secure platforms to post and approve room applications.",
        solution: "A secure, role-based housing portal supporting Students, Landlords, and Administrators. Includes approval dashboards, listings search, registration hashes, and clean databases.",
        architecture: `
🎓 Student (Browse, Apply) | 🏠 Landlord (Post, Approve) | 👨‍💼 Admin (Manage, Stats)
                                        |
💻 Apache PHP Web Application Controller -> MySQL Relational Database
        `,
        features: [
            "Role-Based Access Controls for three separate user groups.",
            "Real-time application pipeline connecting students to property owners.",
            "Integrated admin page showcasing feedback inputs, stats, and user tables.",
            "SQL injection prevention and secure session authentication."
        ],
        stack: ["PHP", "MySQL", "CSS Grid", "Bootstrap", "XAMPP local framework"],
        challenges: "Synchronizing status updates across student and landlord pages. Resolved by structuring relational SQL keys and building atomic database queries.",
        future: "Adding payment gateway support for rent bookings.",
        github: "https://github.com/wwwsshivadas053-source/student_accommodation_system",
        demo: "extracted_files/QUICK_START.md"
    },
    'github-profile': {
        title: "Developer Workspace & Templates",
        tag: "Open Source Projects",
        problem: "Fresh developers lack unified documentation, templates, and consistent workflows, creating friction during project onboarding.",
        solution: "A central repository holding workspace configurations, readme templates, git hooks, and modular setup documents.",
        architecture: `
🛠 Git Configuration -> Workspace Layouts -> System README Templates
        `,
        features: [
            "Standardized developer profile templates.",
            "Pre-configured setup instructions for Python, PHP, and SQL workspaces.",
            "Modular markdown templates for clear documentation."
        ],
        stack: ["Markdown", "Git Config", "YAML", "CI Automation templates"],
        challenges: "Structuring generic guides suitable for Windows, macOS, and Linux. Addressed by designing modular shell commands and utilizing relative paths.",
        future: "Adding automated GitHub action validators.",
        github: "https://github.com/wwwsshivadas053-source/wwwsshivadas053-source",
        demo: "https://github.com/wwwsshivadas053-source"
    }
};

window.openProjectModal = function(projectId) {
    const data = projectData[projectId];
    if (!data) return;
    
    const contentEl = document.getElementById('modal-project-content');
    
    let techBadges = data.stack.map(s => `<span class="badge-tech px-2 py-1 rounded text-xs">${s}</span>`).join(' ');
    let featureList = data.features.map(f => `<li class="flex items-start gap-2"><span class="text-accent_sky">•</span><span>${f}</span></li>`).join(' ');
    
    contentEl.innerHTML = `
        <div class="border-b border-slate-800 pb-4">
            <span class="text-xs font-mono text-accent_sky uppercase tracking-wider">${data.tag}</span>
            <h3 class="text-2xl font-extrabold text-white mt-1">${data.title}</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div class="space-y-4">
                <div>
                    <h4 class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1"><i class="fa-solid fa-triangle-exclamation mr-1"></i> Problem Statement</h4>
                    <p class="text-slate-300 text-xs sm:text-sm">${data.problem}</p>
                </div>
                <div>
                    <h4 class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1"><i class="fa-solid fa-square-check mr-1"></i> Core Solution</h4>
                    <p class="text-slate-300 text-xs sm:text-sm">${data.solution}</p>
                </div>
                <div>
                    <h4 class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2"><i class="fa-solid fa-gears mr-1"></i> Tech Stack</h4>
                    <div class="flex flex-wrap gap-2">${techBadges}</div>
                </div>
            </div>
            
            <div class="space-y-4">
                <div>
                    <h4 class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2"><i class="fa-solid fa-sitemap mr-1"></i> Architecture Workflow</h4>
                    <pre class="bg-slate-950 p-4 rounded-lg border border-slate-800 text-[10px] text-accent_sky overflow-x-auto font-code leading-relaxed">${data.architecture.trim()}</pre>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-800 pt-6 mt-6">
            <div>
                <h4 class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2"><i class="fa-solid fa-star mr-1"></i> Key Features</h4>
                <ul class="space-y-2 text-slate-300 text-xs sm:text-sm">${featureList}</ul>
            </div>
            <div class="space-y-4">
                <div>
                    <h4 class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1"><i class="fa-solid fa-fire-extinguisher mr-1"></i> Engineering Challenges</h4>
                    <p class="text-slate-300 text-xs sm:text-sm">${data.challenges}</p>
                </div>
                <div>
                    <h4 class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1"><i class="fa-solid fa-arrows-spin mr-1"></i> Future Enhancements</h4>
                    <p class="text-slate-300 text-xs sm:text-sm">${data.future}</p>
                </div>
            </div>
        </div>
        
        <div class="flex gap-4 border-t border-slate-800 pt-6 mt-8">
            <a href="${data.github}" target="_blank" class="flex-1 py-3 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2">
                <i class="fa-brands fa-github text-sm"></i> Inspect Repository Code
            </a>
            ${data.demo.startsWith('#') ? `
            <a href="${data.demo}" onclick="hideProjectModal()" class="flex-1 py-3 text-center rounded-xl bg-accent_blue hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-circle-play text-sm"></i> Try Playground Simulator
            </a>
            ` : `
            <a href="${data.demo}" target="_blank" class="flex-1 py-3 text-center rounded-xl bg-accent_blue hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-circle-info text-sm"></i> View Demo Document
            </a>
            `}
        </div>
    `;
    
    document.getElementById('project-modal').classList.add('active');
};

window.closeProjectModal = function(e) {
    if (e.target === document.getElementById('project-modal')) {
        hideProjectModal();
    }
};

window.hideProjectModal = function() {
    document.getElementById('project-modal').classList.remove('active');
};

/* ==========================================================================
   Playground Simulator Mechanics
   ========================================================================== */
window.switchPlayground = function(type) {
    const tabs = document.querySelectorAll('#playground-tabs button');
    tabs.forEach(t => t.classList.remove('active', 'bg-accent_blue', 'text-white'));
    
    // Deactivate all sections
    document.getElementById('pg-ats').classList.add('hidden');
    document.getElementById('pg-crop').classList.add('hidden');
    document.getElementById('pg-med').classList.add('hidden');
    document.getElementById('pg-bot').classList.add('hidden');
    
    // Find active button
    const activeBtn = Array.from(tabs).find(t => t.textContent.toLowerCase().includes(type));
    if (activeBtn) {
        activeBtn.classList.add('active', 'bg-accent_blue', 'text-white');
    }
    
    // Show correct section
    if (type === 'ats') document.getElementById('pg-ats').classList.remove('hidden');
    if (type === 'crop') document.getElementById('pg-crop').classList.remove('hidden');
    if (type === 'med') document.getElementById('pg-med').classList.remove('hidden');
    if (type === 'bot') document.getElementById('pg-bot').classList.remove('hidden');
};

// ATS Simulator
window.loadSampleAts = function() {
    document.getElementById('ats-jd').value = "We are hiring an AI Engineer. Requirements: Python programming, Flask backend architectures, SQL database design (SQLite/MySQL), Machine Learning concepts, and familiarity with generative AI LLMs.";
    document.getElementById('ats-resume').value = "PRAJWAL T.S.\nAI and Web Developer\nExpertise: Machine Learning, Data Science, Web Development (HTML, CSS, JS, Bootstrap, Tailwind), Flask python APIs, PHP, MySQL databases. Certified in ML with AI from Internshala (96% Top Performer score). Experienced building agricultural crop advisors and Skin lesion models.";
};

window.runAtsSimulation = function() {
    const jd = document.getElementById('ats-jd').value.toLowerCase();
    const resume = document.getElementById('ats-resume').value.toLowerCase();
    const resultDiv = document.getElementById('ats-result');
    
    if (!jd || !resume) {
        alert("Please input both job requirements and resume text to run calculations.");
        return;
    }
    
    const keySkills = ["python", "flask", "sql", "sqlite", "mysql", "machine learning", "tensorflow", "keras", "rag", "gemini", "bootstrap", "tailwind", "php", "data science"];
    let matches = [];
    let missing = [];
    
    keySkills.forEach(s => {
        const inJd = jd.includes(s);
        const inResume = resume.includes(s);
        
        if (inJd && inResume) {
            matches.push(s);
        } else if (inJd && !inResume) {
            missing.push(s);
        }
    });
    
    // Score Calculation
    let score = 0;
    if (matches.length + missing.length > 0) {
        score = Math.round((matches.length / (matches.length + missing.length)) * 100);
    } else {
        score = 50; // default
    }
    
    // Animate display
    resultDiv.classList.remove('hidden');
    document.getElementById('ats-score-display').textContent = `${score}%`;
    document.getElementById('ats-progress-bar').style.width = `${score}%`;
    
    const matchEl = document.getElementById('ats-matches');
    const missEl = document.getElementById('ats-missing');
    
    matchEl.innerHTML = matches.length > 0 ? matches.map(m => `<li class="capitalize">${m}</li>`).join('') : "<li>No matching skills detected.</li>";
    missEl.innerHTML = missing.length > 0 ? missing.map(m => `<li class="capitalize">${m}</li>`).join('') : "<li>None! Outstanding match.</li>";
};

// Crop Simulator
window.runCropSimulation = function() {
    const ph = parseFloat(document.getElementById('crop-ph').value);
    const n = parseFloat(document.getElementById('crop-n').value);
    const p = parseFloat(document.getElementById('crop-p').value);
    const rain = parseFloat(document.getElementById('crop-rain').value);
    
    let crop = "Rice";
    let conf = 95.8;
    
    if (ph < 6.0) {
        crop = "Maize";
        conf = 91.2;
    } else if (n < 50) {
        crop = "Wheat";
        conf = 88.4;
    } else if (rain < 100) {
        crop = "Sugarcane";
        conf = 93.1;
    } else if (p > 50) {
        crop = "Coffee";
        conf = 94.6;
    }
    
    const resDiv = document.getElementById('crop-result');
    resDiv.classList.remove('hidden');
    document.getElementById('crop-display').textContent = crop;
    document.getElementById('crop-conf-display').textContent = `${conf}%`;
};

// MedVision Simulator
window.selectSkinSample = function(type) {
    const resDiv = document.getElementById('pg-med');
    const resultBox = document.getElementById('med-result');
    
    resultBox.classList.remove('hidden');
    
    const labels = {
        'melanoma': { disease: "Melanoma", conf: "94.7%", explain: "Attention heatmap maps target pixel focus on irregular mole boundaries. High risk. Recommended immediate clinical biopsy validation." },
        'hfmd': { disease: "HFMD (Hand, Foot and Mouth Disease)", conf: "89.2%", explain: "Model target hotspots align with vesicular papules commonly found in pediatric infections. Self-limiting, maintain hygiene controls." },
        'healthy': { disease: "Healthy Skin Structure", conf: "97.4%", explain: "No dermatological lesions detected. Standard dermal tissue texture observed." }
    };
    
    const d = labels[type];
    document.getElementById('med-disease').textContent = d.disease;
    document.getElementById('med-conf').textContent = d.conf;
    document.getElementById('med-explain').textContent = d.explain;
    
    // Apply styling alerts
    const labelEl = document.getElementById('med-disease');
    if (type === 'melanoma') {
        labelEl.className = "text-xl font-extrabold text-rose-500";
    } else if (type === 'hfmd') {
        labelEl.className = "text-xl font-extrabold text-amber-500";
    } else {
        labelEl.className = "text-xl font-extrabold text-accent_green";
    }
};

// Chatbot Simulator
const chatbotKnowledge = [
    { keys: ["experience", "work", "job", "career"], reply: "Prajwal has trained ML models in data science (scoring 96% top performer at Internshala), engineered skin classifiers (CNNs with Grad-CAM overlay maps), built RAG chatbot note engines with vector FAISS systems, and constructed full-stack property valuation portals (SQLite, Flask, PDF builders)." },
    { keys: ["language", "framework", "tech", "skills"], reply: "His tech stack includes: Python, Java, PHP, JavaScript, Flask, HTML5, CSS3, Tailwind CSS, Bootstrap, SQLite, MySQL, Git/GitHub, and TensorFlow/Keras." },
    { keys: ["education", "college", "degree", "study"], reply: "Prajwal is pursuing a Bachelor of Computer Application (BCA) at St. Anne's Degree College, Virajpet (graduation year: 2026)." },
    { keys: ["rag", "notes", "gemini", "vector", "faiss"], reply: "His College Notes RAG chatbot extracts PDF text using PyMuPDF, chunks nodes, creates dense embeddings, indexes them via FAISS stores, and retrieves context to generate answers via Gemini 2.0. It falls back to TF-IDF cosine matching if API limits occur." },
    { keys: ["disease", "medvision", "cnn", "image"], reply: "MedVision AI is a skin lesion classifier built with custom CNN architectures (TensorFlow/Keras). It includes blur/brightness pre-assessments, Grad-CAM attention masks overlays, English/Kannada layouts, and ReportLab PDF exporters." },
    { keys: ["property", "estate", "house", "valuation"], reply: "His real estate prediction project (EstateAI) uses regression models, provides interactive analytics dashboards, generates custom valuation PDF reports, and supports secure login structures with SMTPLIB OTP resets." },
    { keys: ["contact", "phone", "email", "linkedin"], reply: "Email: Prajwalts093@gmail.com | Phone: +91 9482612382 | LinkedIn: https://www.linkedin.com/in/prajwal-t-s-354a57359" }
];

window.handleChatKeyPress = function(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
};

window.sendChatMessage = function() {
    const input = document.getElementById('chat-query');
    const logs = document.getElementById('chat-logs');
    const query = input.value.trim().toLowerCase();
    
    if (!query) return;
    
    // Print User message
    const userMsg = document.createElement('div');
    userMsg.className = "self-end bg-accent_blue text-white p-3 rounded-lg max-w-[80%]";
    userMsg.textContent = input.value;
    logs.appendChild(userMsg);
    
    // Process response
    let reply = "I'm sorry, I don't have that specific detail cached. Try asking about my 'education', 'skills', 'experience', 'RAG chatbot', or 'disease system'.";
    
    for (let item of chatbotKnowledge) {
        if (item.keys.some(k => query.includes(k))) {
            reply = item.reply;
            break;
        }
    }
    
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = "self-start bg-slate-800 text-slate-300 p-3 rounded-lg max-w-[80%]";
        botMsg.textContent = reply;
        logs.appendChild(botMsg);
        
        // Auto scroll to bottom
        logs.scrollTop = logs.scrollHeight;
    }, 400);
    
    input.value = "";
};

/* ==========================================================================
   GitHub Contribution Heatmap Grid
   ========================================================================== */
function initGitHubGrid() {
    const grid = document.getElementById('github-cells-container');
    if (!grid) return;
    
    const count = 53 * 7; // weeks * days
    let html = "";
    
    // Simulate commit densities (more density around project build timelines: May/June 2026)
    for (let i = 0; i < count; i++) {
        let level = 0;
        const rand = Math.random();
        
        if (i > count - 45) { // recent months are highly active
            level = rand > 0.7 ? 4 : (rand > 0.4 ? 3 : (rand > 0.2 ? 2 : 1));
        } else {
            level = rand > 0.9 ? 3 : (rand > 0.75 ? 2 : (rand > 0.5 ? 1 : 0));
        }
        
        html += `<div class="github-cell lvl-${level}" title="Commits: ${level * 2}"></div>`;
    }
    
    grid.innerHTML = html;
}

/* ==========================================================================
   Interactive Resume Tab Switcher
   ========================================================================== */
const resumeLayouts = {
    'ats': `
======================================================================
PRAJWAL T.S. | AI ENGINEER & FULL STACK DEVELOPER
======================================================================
Phone: +91 94826 12382 | Email: Prajwalts093@gmail.com
LinkedIn: https://www.linkedin.com/in/prajwal-t-s-354a57359
GitHub: https://github.com/wwwsshivadas053-source

SUMMARY
----------------------------------------------------------------------
Motivated BCA student with a strong interest in Data Science, Machine
Learning, and Web Development. Passionate about building intelligent
solutions and modern web applications, with a growing skill set in
programming, data analysis, and AI tools. Eager to explore prompt
engineering and creative coding to build innovative applications.

EDUCATION
----------------------------------------------------------------------
Bachelor of Computer Application (BCA)               (2023 - 2026)
St. Anne's Degree College, Virajpet, Karnataka, India

CERTIFICATIONS
----------------------------------------------------------------------
- Machine Learning with AI (Internshala, 2026) - Score: 96%
  (Highest-ranked course completion with distinction, Top Performer)
- Data Science (Internshala, 2025) - Score: 78%
- Web Development Training (Internshala, 2025)

TECHNICAL SKILLS
----------------------------------------------------------------------
Programming:   Python, Java, PHP, JavaScript (ES6)
AI & ML:       Supervised learning regression models, CNN models,
               TensorFlow, Keras, RAG pipelines, Vector databases
Web Backend:   Flask, PHP (Core structures)
Web Frontend:  HTML5, CSS3, Tailwind CSS, Bootstrap, Alpine.js
Databases:     SQLite, MySQL
DevOps/Tools:  Git & GitHub, PyCharm, VS Code, Render, XAMPP

PROJECTS HIGHLIGHTED
----------------------------------------------------------------------
1. MedVision AI: Skin lesion classifier using custom CNNs in
   TensorFlow with Grad-CAM overlays, ReportLab PDF generators, and
   bilingual layouts (English/Kannada).
2. College Notes RAG: Chatbot query system parsing note PDFs into
   FAISS vector indices using Gemini embeddings with local TF-IDF fallbacks.
3. EstateAI: Valuation estimation tool using regression models, with admin
   analytics control pages, ReportLab exports, and SMTPLIB OTP security codes.
    `,
    'modern': `
PRAJWAL T.S.
----------------------------------------------------------------------
🎓 BCA student & AI systems developer
📍 Coorg, Karnataka, India

[TECHNICAL HIGHLIGHTS]
- peaking at 96% score in Machine Learning training with distinction.
- Deep Learning: custom CNN classifiers + Grad-CAM explainers.
- NLP: Vector indexes + FAISS retrieval + Generative LLM contexts.
- Full Stack: robust Flask/PHP controllers + relational SQL.

[PROJECT MATRIX]
- AI Resume Analyzer: Evaluates resumes against JDs using Gemini.
- MedVision AI: Classification of skin lesions + attention mapping.
- Notes RAG Bot: PDF notes text extraction and semantic question answering.
- Crop Advisor System: Dynamic NPK/weather-informed advisory system.
- EstateAI Valuation: Multi-feature property estimation + PDF receipts.
- Housing Web Portal: PHP/MySQL secure room listing board.
    `
};

window.switchResumeTab = function(type) {
    const tabs = document.querySelectorAll('#resume-tabs button');
    tabs.forEach(t => t.classList.remove('active', 'bg-accent_blue', 'text-white'));
    
    const activeTab = Array.from(tabs).find(t => t.textContent.toLowerCase().includes(type));
    if (activeTab) {
        activeTab.classList.add('active', 'bg-accent_blue', 'text-white');
    }
    
    document.getElementById('resume-text-view').innerHTML = `<pre class="font-code leading-relaxed text-xs overflow-x-auto whitespace-pre-wrap">${resumeLayouts[type].trim()}</pre>`;
};

function initResumeView() {
    switchResumeTab('ats');
}
/* ==========================================================================
   Certificates View Modals & Grid Rendering
   ========================================================================== */
const certificateDetails = {
    'ml': {
        title: "Machine Learning with AI",
        subtitle: "Internshala Training Program",
        org: "Internshala",
        description: "Awarded top performer status. Core modules included linear regressors, decision forests, cross-validation parameters, and Keras deep neural structures. Completed with a score of 96%.",
        download: "assets/Machine learning with AI Training - Certificate of Completion.pdf"
    },
    'genai': {
        title: "Generative AI Foundations",
        subtitle: "Google Cloud Training Program",
        org: "Google",
        description: "Training covers Large Language Models (LLMs), attention mechanisms, Transformer architectures, prompt crafting, and RAG retrieval pipelines.",
        download: "assets/genai_certificate.pdf"
    },
    'ds': {
        title: "Data Science with AI Training",
        subtitle: "Internshala Training Program",
        org: "Internshala",
        description: "Comprehensive 8-week online training covering Introduction to Data Science, Data Analysis Fundamentals, Data Visualization, and predictive models. Completed with a score of 78%.",
        download: "assets/Data Science with AI Training - Certificate of Completion.pdf"
    },
    'web': {
        title: "Web Development Training",
        subtitle: "Internshala Course Certification",
        org: "Internshala",
        description: "Completed professional training in frontend design covering HTML5, CSS3, JavaScript (ES6), and Bootstrap layouts.",
        download: "assets/Clear_Certificate.pdf"
    },
    'isp': {
        title: "Internshala Student Partner (ISP 54)",
        subtitle: "Direct Entry Referral Award",
        org: "Internshala",
        description: "Recognized for helping 15+ students apply for Internshala courses, demonstrating leadership, communication, and networking capabilities.",
        download: "assets/ISP 54 - Direct Entry.pdf"
    },
    'tata': {
        title: "Tata Crucible Campus Quiz",
        subtitle: "Prelims Qualification - Level 1",
        org: "Tata",
        description: "Successfully qualified in the preliminary rounds (Level 1) of the Tata Crucible Campus Quiz competition.",
        download: "assets/Tata_Cruible_Prelims_Level1.pdf"
    },
    'nptel1': {
        title: "NPTEL Online Certification (I)",
        subtitle: "Swayam E-Learning Portal",
        org: "NPTEL",
        description: "Academic certification course representing top performance in systems design and computer applications. (ID: 36106248)",
        download: "assets/CAN_36106248_4411830.pdf"
    },
    'nptel2': {
        title: "NPTEL Online Certification (II)",
        subtitle: "Swayam E-Learning Portal",
        org: "NPTEL",
        description: "Academic certification course representing top performance in programming paradigms and databases. (ID: 37876528)",
        download: "assets/CAN_37876528_5026773.pdf"
    },
    'nptel3': {
        title: "NPTEL Online Certification (III)",
        subtitle: "Swayam E-Learning Portal",
        org: "NPTEL",
        description: "Academic certification course representing top performance in data analytics and software engineering. (ID: 39483585)",
        download: "assets/CAN_39483585_5463117.pdf"
    }
};

function initCertificatesGrid() {
    const container = document.getElementById('certificates-grid');
    if (!container) return;
    
    let html = "";
    Object.keys(certificateDetails).forEach(id => {
        const cert = certificateDetails[id];
        
        let iconClass = "fa-solid fa-award text-accent_yellow";
        let orgBadge = "Internshala";
        let badgeColor = "border-accent_sky/30 text-accent_sky bg-accent_sky/10";
        
        if (cert.org === "Tata") {
            iconClass = "fa-solid fa-trophy text-amber-500";
            orgBadge = "Tata Crucible";
            badgeColor = "border-amber-500/30 text-amber-400 bg-amber-500/10";
        } else if (cert.org === "NPTEL") {
            iconClass = "fa-solid fa-graduation-cap text-purple-400";
            orgBadge = "NPTEL / Swayam";
            badgeColor = "border-purple-500/30 text-purple-400 bg-purple-500/10";
        } else if (cert.org === "Google") {
            iconClass = "fa-solid fa-medal text-accent_sky";
            orgBadge = "Google Cloud";
            badgeColor = "border-accent_blue/30 text-accent_sky bg-accent_blue/10";
        }
        
        html += `
        <div class="glass-panel p-6 flex flex-col justify-between group hover:border-slate-700 transition duration-300">
            <div>
                <div class="flex justify-between items-start mb-4">
                    <i class="${iconClass} text-3xl"></i>
                    <span class="text-[10px] font-mono border ${badgeColor} px-2 py-0.5 rounded">${orgBadge}</span>
                </div>
                <h3 class="text-md font-bold text-white group-hover:text-accent_sky transition mt-2">${cert.title}</h3>
                <p class="text-[10px] text-slate-400 mt-1">${cert.subtitle}</p>
                <p class="text-xs text-slate-300 mt-4 line-clamp-3">
                    ${cert.description}
                </p>
            </div>
            
            <div class="flex gap-3 mt-8 border-t border-slate-800/80 pt-4">
                <button onclick="openCertificateModal('${id}')" class="flex-1 py-2 text-center bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-white transition border border-slate-700">
                    Verify Certificate
                </button>
                <a href="${cert.download}" download class="px-4 py-2 bg-accent_blue/20 hover:bg-accent_blue/30 text-accent_sky text-xs font-semibold rounded-lg border border-accent_blue/40 transition flex items-center justify-center">
                    <i class="fa-solid fa-download"></i>
                </a>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

window.openCertificateModal = function(certId) {
    const data = certificateDetails[certId];
    if (!data) return;
    
    document.getElementById('cert-modal-title').textContent = data.title;
    
    // Set iframe source to show the original PDF certificate
    const iframe = document.getElementById('cert-modal-iframe');
    iframe.setAttribute('src', data.download);
    
    // Set Open New Tab and Download URLs
    const newTabBtn = document.getElementById('cert-modal-open-new-tab');
    newTabBtn.setAttribute('href', data.download);
    
    const downloadBtn = document.getElementById('cert-modal-download');
    downloadBtn.setAttribute('href', data.download);
    downloadBtn.setAttribute('download', data.download.split('/').pop());
    
    document.getElementById('certificate-modal').classList.add('active');
};

window.closeCertificateModalOverlay = function(e) {
    if (e.target === document.getElementById('certificate-modal')) {
        hideCertificateModal();
    }
};

window.hideCertificateModal = function() {
    const iframe = document.getElementById('cert-modal-iframe');
    if (iframe) iframe.setAttribute('src', '');
    document.getElementById('certificate-modal').classList.remove('active');
};
/* ==========================================================================
   Contact Form secure Submission
   ========================================================================== */
window.handleContactSubmit = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    const btn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Sending...';
    btn.disabled = true;
    
    // Using FormSubmit.co to forward messages directly to your Gmail (Prajwalts093@gmail.com)
    // No API keys required!
    const targetEmail = "prajwalts093@gmail.com";
    
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        _subject: `New Message from Portfolio: ${subject}`
    };
    
    fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(async (response) => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        const toast = document.getElementById('contact-toast');
        if (response.ok) {
            toast.classList.remove('hidden');
            toast.className = "mt-4 p-4 rounded-lg bg-accent_green/10 border border-accent_green/30 text-xs text-accent_green text-center font-mono";
            toast.innerHTML = `<i class="fa-solid fa-circle-check text-accent_green mr-2"></i> Message sent successfully! It will deliver to your Gmail.`;
            
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 6000);
            
            document.getElementById('contact-form').reset();
        } else {
            const data = await response.json();
            alert(data.message || "Failed to send message via FormSubmit.");
        }
    })
    .catch((error) => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        console.error(error);
        alert("An error occurred. Check your connection and try again.");
    });
};
