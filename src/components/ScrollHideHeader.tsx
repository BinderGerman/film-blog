'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollHideHeader() {
  const lastScroll = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleMenuToggle = (event: Event) => {
      const customEvent = event as CustomEvent;
      setMenuOpen(customEvent.detail);
    };

    window.addEventListener('categoriesMenuToggle', handleMenuToggle);

    return () => {
      window.removeEventListener('categoriesMenuToggle', handleMenuToggle);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const header = document.getElementById('site-header');

      if (!header) return;

      // No ocultar si el menú está abierto
      if (menuOpen) {
        header.style.transform = 'translateY(0)';
        return;
      }

      if (currentScroll > lastScroll.current && currentScroll > 50) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  return null;
}

