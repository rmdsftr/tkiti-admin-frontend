import React, { useState } from 'react';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/login.css';
import img from "../assets/logo.png";

export default function LoginPage() {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi login
    setTimeout(() => {
      console.log('Login:', { nim, password, rememberMe });
      alert(`Login berhasil!\nNIM: ${nim}`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container-modern">
        <div className="login-left-modern">
          <div className="decorative-blur blur-1"></div>
          <div className="decorative-blur blur-2"></div>
          
          <div className="branding-content">
            <div className="logo-container">
              <img src={img} alt="" width={150}/>
            </div>
            
            <h1 className="branding-title">TIKITIKI ADMIN PANEL</h1>
            
            <p className="branding-description">
              Bikin artikel, update kegiatan, dan kelola web profile dengan mudah untuk Asisten Lab Tata Kelola dan Infrastruktur Teknologi Informasi
            </p>
            
            <div className="pagination-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>

        <div className="login-right-modern">
          <div className="login-form-container">
            <div className="form-header">
              <h2 className="form-title">Selamat Datang</h2>
              <p className="form-subtitle">Masuk ke akun admin kamu</p>
            </div>

            <div className="form-body">
              <div className="form-group">
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    placeholder="NIM"
                    className="form-input"
                  />
                </div>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`submit-button ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  'Masuk'
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}