'use client';
import { useEffect, useRef } from 'react';

export default function ScrollHideHeader() {
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const header = document.getElementById('site-header');

      if (!header) return;

      if (currentScroll > lastScroll.current && currentScroll > 50) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null; // No muestra nada
}
