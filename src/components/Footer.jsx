import React from 'react';

const Footer = () => {
  // Ikona SVG për Email
  const EmailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '10px', verticalAlign: 'middle'}}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  // Ikona SVG për User/Anëtarët
  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '10px', verticalAlign: 'middle', color: '#6366f1'}}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        
        {/* Seksioni i Kontaktit */}
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Contact Us</h3>
          <p style={subTextStyle}>Na kontaktoni për mbështetje teknike ose pyetje.</p>
          <div style={{marginTop: '15px'}}>
            <a href="mailto:info@securecrypt.local" style={contactLinkStyle}>
              <EmailIcon /> info@securecrypt.local
            </a>
          </div>
        </div>

        {/* Seksioni i Grupit */}
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Team</h3>
          <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
            <li style={listItemStyle}><UserIcon /> Leonis Vorfaj</li>
            <li style={listItemStyle}><UserIcon /> Gojmir Ajdini</li>
            <li style={listItemStyle}><UserIcon /> Ermal Vecgishti</li>
          </ul>
        </div>

        {/* Seksioni i Lokacionit/Universitetit */}
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Versioni i Projektit</h3>
          <p style={subTextStyle}>Web-Based Message Encryption Tool</p>
          <p style={{...subTextStyle, marginTop: '10px', fontWeight: 'bold'}}>Version 2.0 (2025)</p>
        </div>

      </div>

      <div style={bottomBarStyle}>
        <p>© 2025 SecureCrypt Suite. Të gjitha të drejtat e rezervuara.</p>
      </div>
    </footer>
  );
};

// --- STYLES ---
const footerStyle = {
  backgroundColor: '#0f172a', // Dark blue shumë i mbyllur (më profesional se e zeza)
  color: '#f8fafc',
  padding: '60px 0 30px 0',
  marginTop: '80px',
  borderTop: '1px solid #1e293b',
  fontFamily: "'Inter', sans-serif"
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  padding: '0 40px',
  gap: '40px'
};

const sectionStyle = {
  flex: '1',
  minWidth: '280px'
};

const titleStyle = {
  fontSize: '14px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#94a3b8', // Ngjyrë gri e lehtë për titujt
  marginBottom: '20px',
  fontWeight: '700'
};

const subTextStyle = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '1.6'
};

const contactLinkStyle = {
  color: '#f8fafc',
  textDecoration: 'none',
  fontSize: '15px',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'color 0.2s',
  fontWeight: '500'
};

const listItemStyle = {
  color: '#f8fafc',
  fontSize: '15px',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center'
};

const bottomBarStyle = {
  textAlign: 'center',
  borderTop: '1px solid #1e293b',
  marginTop: '50px',
  paddingTop: '25px',
  fontSize: '13px',
  color: '#475569'
};

export default Footer;