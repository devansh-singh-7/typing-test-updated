import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaUser, FaKey, FaEnvelope } from 'react-icons/fa';
import './Auth.css';

const Auth = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setIsLoading(true);
    try {
      await signInAnonymously(auth);
      onAuthSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
      </div>
      
      <div className="auth-content">
        <div className="auth-header">
          <h1>Typing Master</h1>
          <p>Improve your typing speed and accuracy</p>
        </div>
        
        <div className="auth-box">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${!isSignUp ? 'active' : ''}`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab ${isSignUp ? 'active' : ''}`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
          </div>
          
          <form onSubmit={handleEmailAuth} className="auth-form">
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="auth-subtitle">
              {isSignUp ? 'Create an account to save your progress' : 'Sign in to continue your progress'}
            </p>
            
            <div className="input-group">
              <div className="input-icon">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <div className="input-icon">
                <FaKey />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <>{isSignUp ? 'Create Account' : 'Sign In'}</>
              )}
            </button>
          </form>
          
          <div className="auth-divider">
            <span>or continue with</span>
          </div>
          
          <div className="social-auth">
            <button 
              className="google-btn" 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FcGoogle className="google-icon" />
              Google
            </button>
            
            <button 
              className="anonymous-btn" 
              onClick={handleAnonymousSignIn}
              disabled={isLoading}
            >
              <FaUser />
              Continue as Guest
            </button>
          </div>
          
          {error && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>
        
        <p className="auth-footer">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button 
            className="auth-switch-btn" 
            onClick={() => setIsSignUp(!isSignUp)}
            disabled={isLoading}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;