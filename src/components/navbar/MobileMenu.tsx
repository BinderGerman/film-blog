"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

interface Category {
  title: string;
  slug: { current: string };
}

interface MobileMenuProps {
  categories: Category[];
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="text-black focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 font-semibold text-primary" />
        ) : (
          <Menu className="w-6 h-6 font-semibold text-highlight-white" />
        )}
      </button>

      <div
        className={`
          fixed top-0 left-0 z-40 flex flex-col p-6 space-y-4 text-lg bg-white
          h-screen w-full
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          className="self-end"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        <span className="text-2xl font-semibold text-primary">Categorías</span>
        {categories.map((category) => (
          <a
            className="pl-4 text-xl text-primary hover:text-highlight-red transition duration-200"
            key={category.slug.current}
            href={`/categoria/${category.slug.current}`}
            onClick={() => setIsOpen(false)}
          >
            {category.title}
          </a>
        ))}
        <a
          className="text-2xl font-semibold text-primary hover:text-highlight-red transition duration-200"
          href="/contacto"
          onClick={() => setIsOpen(false)}
        >
          Contacto
        </a>
        <a
          className="text-2xl font-semibold text-primary hover:text-highlight-red transition duration-200"
          href="/soy-alguien"
          onClick={() => setIsOpen(false)}
        >
          Soy alguien?
        </a>
      </div>
    </>
  );
}
