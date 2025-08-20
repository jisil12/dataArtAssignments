
import './Header.css';

interface HeaderProps {
  isDarkTheme: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkTheme, onThemeToggle }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Timeline App</h1>
          <span className="subtitle">Historical Events Explorer</span>
        </div>
        <button 
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header; 