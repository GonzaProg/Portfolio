import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { MagicCard, MagicCardContainer } from '../animations/MagicCard';

const WhatsAppLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('¡Gracias! El formulario ha sido enviado con éxito');
        form.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('Oops! Hubo un problema al enviar tu mensaje.');
      }
    } catch (error) {
      setStatus('Oops! Hubo un problema al enviar tu mensaje.');
    }
  };

  return (
    <section id="contact" className="section container">
      <h2 className="section-title">{t('contact.title')}</h2>
      
      <MagicCardContainer>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          
          {/* Email Form */}
          <MagicCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="glass-panel"
            style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--text-main)', position: 'relative', zIndex: 10 }}>
              {t('contact.title')}
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '25px', position: 'relative', zIndex: 10 }}>
              {t('contact.description')}
            </p>

            <form action="https://formspree.io/f/mrpbyjny" method="POST" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 10 }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '0.95rem' }}>{t('contact.name')}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease, background 0.3s ease'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)' }}
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '0.95rem' }}>{t('contact.email')}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease, background 0.3s ease'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)' }}
                />
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '0.95rem' }}>{t('contact.message')}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease, background 0.3s ease'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)' }}
                ></textarea>
              </div>

              <button 
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'var(--accent-blue)',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  marginTop: '10px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#2563eb' }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'var(--accent-blue)' }}
              >
                <Send size={18} />
                {t('contact.send')}
              </button>
              
              {status && (
                <div style={{ color: '#25D366', marginTop: '10px', fontSize: '0.95rem', fontWeight: 500, textAlign: 'center' }}>
                  {status}
                </div>
              )}
            </form>
          </MagicCard>

          {/* WhatsApp Direct */}
          <MagicCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel"
            style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{
              background: 'rgba(37, 211, 102, 0.1)',
              padding: '20px',
              borderRadius: '50%',
              marginBottom: '20px',
              color: '#25D366',
              position: 'relative',
              zIndex: 10
            }}>
              <WhatsAppLogo size={48} />
            </div>
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--text-main)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
              WhatsApp
            </h3>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', textAlign: 'center', fontSize: '1.05rem', position: 'relative', zIndex: 10 }}>
              {t('contact.whatsapp')}
            </p>

            <a 
              href="https://wa.me/5493445458425"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#25D366',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '1.05rem',
                textDecoration: 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                position: 'relative',
                zIndex: 10
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.transform = 'translateY(-2px)'; 
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)'; 
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)'; 
              }}
            >
              <WhatsAppLogo size={20} />
              {t('contact.whatsapp')}
            </a>
          </MagicCard>

        </div>
      </MagicCardContainer>
    </section>
  );
};

export default Contact;
