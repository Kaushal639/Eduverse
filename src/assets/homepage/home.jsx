import React, { useEffect, useRef } from 'react';
import Card from '../components/card/card.jsx';
import Container from '../components/container/container.jsx';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    const heroRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const animatedElements = document.querySelectorAll('.scroll-animate');
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const studentSuccess = [
        { name: "Alice Johnson", department: "Information Technology", course: "Network Security", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60" },
        { name: "Bob Williams", department: "Electronics", course: "Embedded Systems", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60" },
        { name: "Carol Davis", department: "Mechanical Engineering", course: "Thermodynamics", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60" },
        { name: "David Miller", department: "Computer Science", course: "Machine Learning", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60" },
        { name: "Emma Wilson", department: "Data Science", course: "Big Data Analytics", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60" },
    ];

    const features = [
        { icon: "fa-solid fa-graduation-cap", title: "Expert Instructors", desc: "Learn from industry professionals with years of experience" },
        { icon: "fa-solid fa-laptop-code", title: "Hands-on Projects", desc: "Build real-world projects to strengthen your portfolio" },
        { icon: "fa-solid fa-users", title: "Community Support", desc: "Join a thriving community of learners and mentors" },
    ];

    return (
        <div className="homepage" id="home">
            {/* ===== HERO SECTION ===== */}
            <section className="hero-section" ref={heroRef}>
                <div className="hero-bg-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-badge animate-fadeInDown">
                        <i className="fas fa-sparkles"></i>
                        <span>Next-Gen Learning Platform</span>
                    </div>
                    <h1 className="hero-title animate-fadeInUp delay-1">
                        Master New Skills with{' '}
<span className="gradient-text">EduVerse</span>
                    </h1>
                    <p className="hero-subtitle animate-fadeInUp delay-2">
                        Unlock your potential with expert-led courses in programming, design, 
                        data science, and more. Learn at your own pace, anywhere, anytime.
                    </p>
                    <div className="hero-buttons animate-fadeInUp delay-3">
                        <Link to="/courses">
                            <button className="btn-primary hero-btn">
                                <i className="fas fa-rocket"></i>
                                Explore Courses
                            </button>
                        </Link>
                        <Link to="/about">
                            <button className="btn-outline hero-btn">
                                <i className="fas fa-play-circle"></i>
                                Learn More
                            </button>
                        </Link>
                    </div>
                    <div className="hero-stats animate-fadeInUp delay-4">
                        <div className="stat-item">
                            <span className="stat-number">10K+</span>
                            <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">Courses</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Instructors</span>
                        </div>
                    </div>
                </div>
                <div className="hero-image-wrapper animate-floatSlow">
                    <div className="hero-image-glow"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80" 
                        alt="Students learning"
                        className="hero-image"
                    />
                </div>
            </section>

            {/* ===== FEATURES SECTION ===== */}
            <section className="features-section">
                <div className="section-header scroll-animate">
                    <span className="section-tag">Why Choose Us</span>
                    <h2 className="section-title">Features that set us <span className="gradient-text">apart</span></h2>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="feature-card scroll-animate"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="feature-icon">
                                <i className={feature.icon}></i>
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SUCCESS STORIES ===== */}
            <section className="success-section" ref={cardsRef}>
                <Container title="Success Stories">
                    <div className="success-header scroll-animate">
                        <p className="success-desc">
                            Meet our graduates who transformed their careers through dedicated learning
                        </p>
                    </div>
                    {studentSuccess.map((student, index) => (
                        <Card 
                            key={index}
                            name={student.name}
                            department={student.department}
                            course={student.course}
                            image={student.image}
                            delay={index}
                        />
                    ))}
                </Container>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="cta-section scroll-animate">
                <div className="cta-content">
                    <h2>Ready to Start Your Journey?</h2>
                    <p>Join thousands of learners already transforming their careers</p>
                    <Link to="/courses">
                        <button className="btn-primary cta-btn">
                            Get Started Today
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;

