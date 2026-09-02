import './styles/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('devclient:theme');
    var theme = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system';
    var resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    if (resolved === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = resolved;
  } catch (e) {}
})();
`

const script = document.createElement('script')
script.textContent = themeScript
document.head.appendChild(script)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
