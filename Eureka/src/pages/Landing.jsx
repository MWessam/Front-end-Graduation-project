import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Reveal animation logic
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="landing-wrapper">
      <header className="landing-header">
        <div className="container header-content">
          <div className="logo">Eureka<span style={{color: 'var(--primary)'}}>.</span></div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <a href="#featuree">Features</a>
            <a href="#pricing1">Pricing</a>
            <a href="#footerr">Contact</a>
          </nav>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <button 
                  id="theme-toggle" 
                  className="theme-btn" 
                  aria-label="Toggle Dark Mode" 
                  onClick={toggleTheme}
                >
                  <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
                <Link to="/login" className="btn btn-primary">Get Started</Link>
              </div>
        </div>
      </header>

      <section className="hero reveal active">
        <div className="container">
          <h1>Welcome to <span className="gradient-text">Eureka</span></h1>
          <p>Unlock your potential through personalized learning<br/>experiences designed for the modern learner.</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="container reveal">
        <div className="split-section">
          <div className="split-content">
            <h2 className="section-title" style={{textAlign: 'left'}}>Motivation that feels like a game</h2>
            <p>We designed gamified learning paths that make studying addictive. Earn points, badges, and rewards as
              you progress.</p>
            <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
              <i className="fa-solid fa-trophy" style={{color: '#ffd700', fontSize: '1.5rem'}}></i>
              <i className="fa-solid fa-rocket" style={{color: '#ff6b6b', fontSize: '1.5rem'}}></i>
              <i className="fa-solid fa-star" style={{color: '#4ecdc4', fontSize: '1.5rem'}}></i>
            </div>
          </div>
          <div className="split-image">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="People working together"/>
          </div>
        </div>
      </section>

      <section className="orbit-section reveal">
        <h2 className="section-title">Explore Infinite Possibilities</h2>
        <p className="section-subtitle">Scalable offerings and adaptive technology open doors to endless subjects tailored
          for your journey.</p>

        <div className="orbit-container">
          <div className="center-circle">Learn</div>
          <div className="orbit-ring">
            <div className="satellite s1"><i className="fa-solid fa-lightbulb"></i></div>
            <div className="satellite s2"><i className="fa-solid fa-music"></i></div>
            <div className="satellite s3"><i className="fa-solid fa-code"></i></div>
            <div className="satellite s4"><i className="fa-solid fa-flask"></i></div>
            <div className="satellite s5"><i className="fa-solid fa-palette"></i></div>
            <div className="satellite s6"><i className="fa-solid fa-globe"></i></div>
          </div>
        </div>
      </section>

      <section className="container feature-grid" id="featuree">
        <center>
          <h2 className="section-title" style={{marginBottom: '5px'}}>
            Why Choose The Eureka ?
          </h2>
        </center>
        <div className="feature-row reveal">
          <div className="split-content feature-text">
            <i className="fa-solid fa-fingerprint"
              style={{color: 'var(--primary)', fontSize: '2rem', marginBottom: '10px'}}></i>
            <h3>Personalized Learning Experience</h3>
            <p>Our platform adapts to your unique learning style and pace, creating a curriculum that fits your
              goals and interests perfectly.</p>
          </div>
          <div className="feature-img">
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Personalized Learning"/>
          </div>
        </div>

        <div className="feature-row reveal">
          <div className="split-content feature-text">
            <i className="fa-solid fa-chart-line"
              style={{color: 'var(--secondary)', fontSize: '2rem', marginBottom: '10px'}}></i>
            <h3>Monitor Your Achievement</h3>
            <p>Track your progress with real-time analytics and comprehensive dashboards. See where you excel and
              where you need focus.</p>
          </div>
          <div className="feature-img">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Data Analytics"/>
          </div>
        </div>

        <div className="feature-row reveal">
          <div className="split-content feature-text">
            <i className="fa-solid fa-clock" style={{color: '#ff9f43', fontSize: '2rem', marginBottom: '10px'}}></i>
            <h3>Learn in Your Own Time</h3>
            <p>Study whenever you want, wherever you want. No rigid schedules or pressure—just flexible learning
              that fits your lifestyle.</p>
          </div>
          <div className="feature-img">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Flexible Learning"/>
          </div>
        </div>
      </section>

      <section className="pricing-section reveal" id="pricing1">
        <div className="container">
          <h2 className="section-title">Choose Your Learning Path</h2>
          <p className="section-subtitle">Flexible plans designed to meet your goals and experience level.</p>

          <div className="pricing-cards">
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-user"></i></div>
              <h3>Growth</h3>
              <p style={{color: 'var(--text-light)'}}>Perfect for personal development</p>
              <h2 style={{margin: '20px 0'}}>$19<span style={{fontSize: '1rem', color: '#999'}}>/mo</span></h2>
              <ul>
                <li><i className="fa-solid fa-check"></i> Unlimited Access</li>
                <li><i className="fa-solid fa-check"></i> Basic Analytics</li>
                <li><i className="fa-solid fa-check"></i> Community Support</li>
              </ul>
              <a href="#" className="btn btn-outline" style={{width: '100%'}}>Get Started</a>
            </div>

            <div className="card">
              <div className="card-icon" style={{background: '#e0f2fe', color: 'var(--secondary)'}}><i
                className="fa-solid fa-rocket"></i></div>
              <h3>Pro</h3>
              <p style={{color: 'var(--text-light)'}}>For career driven learners</p>
              <h2 style={{margin: '20px 0'}}>$49<span style={{fontSize: '1rem', color: '#999'}}>/mo</span></h2>
              <ul>
                <li><i className="fa-solid fa-check"></i> Everything in Growth</li>
                <li><i className="fa-solid fa-check"></i> 1-on-1 Mentorship</li>
                <li><i className="fa-solid fa-check"></i> Certification</li>
              </ul>
              <a href="#" className="btn btn-primary" style={{width: '100%'}}>Go Pro</a>
            </div>
          </div>
        </div>
      </section>

      <section className="container reveal">
        <div className="split-section">
          <div className="split-content">
            <p style={{color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.9rem'}}>Join
              the Community</p>
            <h2 className="section-title" style={{textAlign: 'left'}}>Join 10,000+ Teachers Transforming Education</h2>
            <p style={{marginBottom: '20px'}}>Become part of a thriving community of educators who are revolutionizing
              the way they teach. Get access to powerful tools.</p>

            <ul className="checklist">
              <li><i className="fa-solid fa-check"></i> <span>Global Teacher Network</span></li>
              <li><i className="fa-solid fa-check"></i> <span>Unlimited Resources</span></li>
              <li><i className="fa-solid fa-check"></i> <span>Premium Support</span></li>
            </ul>
            <br/>
            <a href="#" className="btn btn-dark" style={{background: '#1f2937', color: 'white'}}>Teach With Us</a>
          </div>
          <div className="split-image" style={{height: '500px'}}>
            <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Teacher and student"/>
          </div>
        </div>
      </section>

      <section className="container reveal">
        <div className="cta-banner">
          <i className="fa-solid fa-paper-plane" style={{fontSize: '2rem', marginBottom: '20px'}}></i>
          <h2>Ready to Start Your Learning Adventure?</h2>
          <p>Join thousands of learners who are redefining their future through our platform.</p>
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="#" className="btn" style={{background: 'white', color: 'var(--primary)'}}>Start for Free</a>
            <a href="#" className="btn btn-outline">Schedule Demo</a>
          </div>
        </div>
      </section>

      <footer id="footerr">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="logo" style={{color: 'white', marginBottom: '20px'}}>Eureka.</div>
              <p>Unlock your potential through personalized learning experiences.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Integrations</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <div className="social-icons">
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="copyright">
            &copy; 2025 Eureka Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
