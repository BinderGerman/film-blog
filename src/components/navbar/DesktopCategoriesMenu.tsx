import { useEffect, useRef, useState } from "react";
import type { Category } from "../../types/category";

interface Props {
  categories: Category[];
}

export default function DesktopCategoriesMenu({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Al inicio del componente (después de useState y useRef)
  useEffect(() => {
    const event = new CustomEvent("categoriesMenuToggle", { detail: isOpen });
    window.dispatchEvent(event);
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-highlight-white hover:text-highlight-red transition duration-200 mr-6"
      >
        Categorías
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`
          absolute left-0 top-full bg-white shadow-md mt-6 w-80
          transition-all duration-300 ease-out
          ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
        <ul className="flex flex-col p-2 space-y-2">
          {categories.map((category) => (
            <li key={category.slug.current} className="w-full">
              <a
                href={`/categoria/${category.slug.current}`}
                className="block w-full whitespace-nowrap font-semibold text-primary hover:text-highlight-red transition duration-200"
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
