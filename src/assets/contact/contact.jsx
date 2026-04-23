import React from 'react'
import { FaWhatsapp, FaEnvelope, FaInstagram, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa'
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '20px',
        padding: '50px 40px',
        maxWidth: '700px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{color: '#1b5e20', fontSize: '32px', marginBottom: '10px'}}>Get in Touch</h2>
        <p style={{color: '#555', marginBottom: '35px', fontSize: '16px'}}>
          Have questions about our courses or need guidance?<br/>
          We are here to help you start your learning journey.
        </p>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '15px', fontSize: '18px', color: '#333'}}>
          <FaEnvelope color="#1b5e20" size={22}/>
          <span>{email}</span>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '35px', fontSize: '18px', color: '#333'}}>
          <FaPhone color="#1b5e20" size={20}/>
          <span>+91 {phone}</span>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '40px', flexWrap: 'wrap'}}>
          <button 
            onClick={handleWhatsApp}
            style={{
              background: '#25D366',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: '1',
              justifyContent: 'center',
              minWidth: '180px'
            }}
          >
            <FaWhatsapp size={20}/> Chat on WhatsApp
          </button>

          <button 
            onClick={handleEmail}
            style={{
              background: '#EA4335',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flex: '1',
              justifyContent: 'center',
              minWidth: '180px'
            }}
          >
            <FaEnvelope size={20}/> Send Email
          </button>
        </div>

        <div style={{borderTop: '1px solid #ddd', paddingTop: '30px'}}>
          <p style={{color: '#777', marginBottom: '20px', fontSize: '14px'}}>Connect with me on social media</p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '25px'}}>
            <a href="https://instagram.com/ankityaduvanshiy" target="_blank" rel="noopener noreferrer" style={{color: '#E1306C', transition: 'transform 0.2s'}} onMouseEnter={e => e.currentTarget.style.transform='scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
              <FaInstagram size={35}/>
            </a>
            <a href="https://github.com/Kaushal639" target="_blank" rel="noopener noreferrer" style={{color: '#333', transition: 'transform 0.2s'}} onMouseEnter={e => e.currentTarget.style.transform='scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
              <FaGithub size={35}/>
            </a>
            <a href="https://www.linkedin.com/in/kaushal-7b3565323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" style={{color: '#0077b5', transition: 'transform 0.2s'}} onMouseEnter={e => e.currentTarget.style.transform='scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
              <FaLinkedin size={35}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contacts;
