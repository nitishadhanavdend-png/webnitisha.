// Gallery Projects Data
const projects = [
    {
        id: 1,
        title: "More Projects Coming Soon",
        category: "project",
        description: "Working on exciting new projects in fitness tech and web development",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
        tags: ["JavaScript", "CSS", "Web Development"],
        github: null,
        demo: null,
    },
    {
        id: 5,
        title: "HYROX Mumbai & Delhi",
        category: "fitness",
        description: "Participated in HYROX competitions in Mumbai and Delhi, testing endurance and functional fitness",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
        tags: ["HYROX", "CrossFit", "Competition"],
    },
    {
        id: 6,
        title: "Weightlifting Competitions",
        category: "fitness",
        description: "Won multiple weightlifting competitions in school and achieved new daily PRs consistently",
        image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=400&fit=crop",
        tags: ["Weightlifting", "Competition", "Personal Records"],
    },
    {
        id: 7,
        title: "Olympic Lifting",
        category: "fitness",
        description: "Trained in Olympic lifting for three years, mastering snatch and clean & jerk techniques",
        image: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=600&h=400&fit=crop",
        tags: ["Olympic Lifting", "Strength Training", "Technique"],
    },
    {
        id: 8,
        title: "Judo & Kung Fu",
        category: "fitness",
        description: "Trained in martial arts, focusing on discipline, technique, and mental strength",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=400&fit=crop",
        tags: ["Judo", "Kung Fu", "Martial Arts"],
    },
    {
        id: 9,
        title: "Long Distance Running",
        category: "fitness",
        description: "Regular runner pursuing endurance and speed, training for HYROX challenges",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
        tags: ["Running", "Endurance", "HYROX"],
    },
    {
        id: 10,
        title: "Elocution Competitions",
        category: "achievement",
        description: "Won multiple elocution competitions and public speaking events",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
        tags: ["Public Speaking", "Communication", "Awards"],
    },
    {
        id: 11,
        title: "Mathematical Problem Solving",
        category: "achievement",
        description: "Passionate about solving complex mathematical problems and logical puzzles",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
        tags: ["Mathematics", "Logic", "Problem Solving"],
    },
    {
        id: 12,
        title: "Chemistry Excellence",
        category: "achievement",
        description: "Specialized in chemistry with strong analytical and experimental skills",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
        tags: ["Chemistry", "Science", "Research"],
    },
    {
        id: 13,
        title: "Canva Design",
        category: "achievement",
        description: "Expert in creating stunning visual designs and graphics using Canva",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
        tags: ["Canva", "Design", "Graphics"],
    },
];

// Navigation Scroll & Active Section Detection
let isScrolling = false;
const navigation = document.getElementById('navigation');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

window.addEventListener('scroll', () => {
    if (isScrolling) return;
    
    // Add scrolled class to navigation
    if (window.scrollY > 50) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }
    
    // Detect active section
    const sections = ['hero', 'about', 'gallery', 'contact'];
    let currentSection = 'hero';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    // Update active nav links
    [...navLinks, ...mobileNavLinks].forEach(link => {
        if (link.dataset.section === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    isScrolling = true;
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = section.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.getElementById('mobileNav').classList.remove('open');
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
}

// Navigation Click Handlers
[...navLinks, ...mobileNavLinks].forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

mobileMenuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});

// Gallery Filter Functionality
let currentFilter = 'all';

function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);
    
    projectsGrid.innerHTML = '';
    
    filteredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const hasLinks = project.github || project.demo;
        
        card.innerHTML = `
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                ${hasLinks ? `
                    <div class="project-overlay">
                        ${project.github ? `
                            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                                Code
                            </a>
                        ` : ''}
                        ${project.demo ? `
                            <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link" style="background: var(--gradient-primary);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                View
                            </a>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
}

// Filter Button Handlers
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        currentFilter = filter;
        
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        renderProjects(filter);
    });
});

// Contact Form Validation & Submission
const contactForm = document.getElementById('contactForm');

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showError(fieldName, message) {
    const errorElement = document.querySelector(`[data-error="${fieldName}"]`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearError(fieldName) {
    const errorElement = document.querySelector(`[data-error="${fieldName}"]`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        subject: formData.get('subject').trim(),
        message: formData.get('message').trim(),
    };
    
    // Clear previous errors
    ['name', 'email', 'subject', 'message'].forEach(clearError);
    
    let hasErrors = false;
    
    // Validation
    if (!data.name) {
        showError('name', 'Name is required');
        hasErrors = true;
    }
    
    if (!data.email) {
        showError('email', 'Email is required');
        hasErrors = true;
    } else if (!validateEmail(data.email)) {
        showError('email', 'Please enter a valid email');
        hasErrors = true;
    }
    
    if (!data.subject) {
        showError('subject', 'Subject is required');
        hasErrors = true;
    }
    
    if (!data.message) {
        showError('message', 'Message is required');
        hasErrors = true;
    } else if (data.message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        hasErrors = true;
    }
    
    if (hasErrors) {
        showToast('Please fix the errors in the form', 'error');
        return;
    }
    
    // Success
    showToast('Message sent successfully! Thank you for reaching out. I\'ll get back to you soon!', 'success');
    contactForm.reset();
});

// Clear errors on input
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        clearError(input.name);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Render initial projects
    renderProjects('all');
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});
