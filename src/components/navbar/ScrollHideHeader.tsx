'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollHideHeader() {
  const lastScroll = useRef(0);
  const [menusOpen, setMenusOpen] = useState({
    categories: false,
    search: false,  
  });

  useEffect(() => {
    const handleCategoryToggle = (event: Event) => {
      const customEvent = event as CustomEvent;
      setMenusOpen((prev) => ({ ...prev, categories: customEvent.detail }));
    };

    const handleSearchToggle = (event: Event) => {
      const customEvent = event as CustomEvent;
      setMenusOpen((prev) => ({ ...prev, search: customEvent.detail }));
    };

    window.addEventListener('categoriesMenuToggle', handleCategoryToggle);
    window.addEventListener('searchBarMenuToggle', handleSearchToggle);

    return () => {
      window.removeEventListener('categoriesMenuToggle', handleCategoryToggle);
      window.removeEventListener('searchBarMenuToggle', handleSearchToggle);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const header = document.getElementById('site-header');

      if (!header) return;

      const isAnyMenuOpen = menusOpen.categories || menusOpen.search;

      if (isAnyMenuOpen) {
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
  }, [menusOpen]);

  return null;
}

