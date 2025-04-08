'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  let lastScroll = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const header = document.getElementById('site-header');

      if (!header) return;

      if (currentScroll > lastScroll && currentScroll > 50) {
        header.style.transform = 'translateY(-100%)';
        setShowHeader(false);
      } else {
        header.style.transform = 'translateY(0)';
        setShowHeader(true);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <button
        className="text-black focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col p-6 space-y-4 text-lg">
          <button
            className="self-end"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
          <a href="/categoria/tecnologia" onClick={() => setIsOpen(false)}>Tecnología</a>
          <a href="/categoria/vida" onClick={() => setIsOpen(false)}>Vida</a>
          <a href="/categoria/opinion" onClick={() => setIsOpen(false)}>Opinión</a>
          <a href="/contacto" onClick={() => setIsOpen(false)}>Contacto</a>
          <a href="/sobre-mi" onClick={() => setIsOpen(false)}>Sobre mí</a>
        </div>
      )}
    </>
  );
}