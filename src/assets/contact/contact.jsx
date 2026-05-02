import React from 'react'
import { FaWhatsapp, FaEnvelope, FaInstagram, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './contact.css'

function Contacts(){
  const email = 'ykaushal639@gmail.com';
  const phone = '9045669297';

  const handleWhatsApp = () => {
    window.open(`https://wa.me/91${phone}`, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:${email}`, '_blank');
  };

  return(
    <div className="contact-page">
      <div className="contact-bg-shapes">
        <div className="contact-shape shape-1"></div>
        <div className="contact-shape shape-2"></div>
        <div className="contact-shape shape-3"></div>
      </div>

      <div className="contact-wrapper">
        <div className="contact-card">
          <div className="contact-header">
            <div className="contact-icon">
              <i className="fas fa-paper-plane"></i>
            </div>
            <h2>Get in Touch</h2>
            <p>Have questions about our courses or need guidance? We are here to help you start your learning journey.</p>
          </div>

          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <span className="info-label">Email</span>
              <span className="info-value">{email}</span>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaPhone />
              </div>
              <span className="info-label">Phone</span>
              <span className="info-value">+91 {phone}</span>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <span className="info-label">Location</span>
              <span className="info-value">Bareilly, Uttar Pradesh</span>
            </div>
          </div>

          <div className="contact-actions">
            <button onClick={handleWhatsApp} className="btn-whatsapp">
              <FaWhatsapp size={20}/> Chat on WhatsApp
            </button>

            <button onClick={handleEmail} className="btn-email">
              <FaEnvelope size={20}/> Send Email
            </button>
          </div>

          <div className="contact-social">
            <p>Connect with me on social media</p>
            <div className="social-links">
              <a href="https://instagram.com/ankityaduvanshiy" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <FaInstagram size={28}/>
              </a>
              <a href="https://github.com/Kaushal639" target="_blank" rel="noopener noreferrer" className="social-link github">
                <FaGithub size={28}/>
              </a>
              <a href="https://www.linkedin.com/in/kaushal-7b3565323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                <FaLinkedin size={28}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contacts;

