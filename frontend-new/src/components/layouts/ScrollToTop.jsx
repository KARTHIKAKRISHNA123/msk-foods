import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Disable smooth scrolling temporarily (prevents animation lag)
    document.documentElement.style.scrollBehavior = 'auto';
    
    // 2. Force scroll to top on Window and Body
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    
    // 3. Optional: If your App has a wrapper with overflow, scroll that too
    const rootElement = document.getElementById('root');
    if (rootElement) {
        rootElement.scrollTo(0, 0);
    }

    // 4. Re-enable smooth scrolling after the jump
    // (We use a tiny timeout to ensure the jump happened first)
    const timeout = setTimeout(() => {
        document.documentElement.style.scrollBehavior = ''; 
    }, 10);

    return () => clearTimeout(timeout);
    
  }, [pathname]);

  return null;
}