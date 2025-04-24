import { useEffect, useRef, useState } from "react";

import { Search } from "lucide-react";

export default function DesktopSearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const event = new CustomEvent("searchBarMenuToggle", { detail: isOpen });
    window.dispatchEvent(event);
    console.log("soy el primer useEffect");
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    console.log("soy el segundo useEffect");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      console.log("soy el segundo useEffect");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const initSearch = () => {
      // @ts-ignore
      new window.PagefindUI({
        element: "#search",
        showSubResults: false,
        showImages: true,
        highlightParam: "highlight",
      });
    };
  
    if (document.readyState === "complete") {
      initSearch();
    } else {
      window.addEventListener("load", initSearch);
      return () => window.removeEventListener("load", initSearch);
    }
  }, []);
  

  return (
    <div className="relative" ref={menuRef}>
      <Search
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-highlight-white hover:text-highlight-red transition duration-200"
      />

      <div
        id="search"
        className={`absolute top-full left-0 w-full z-50 bg-white shadow-lg mt-4 rounded
          ${isOpen ? "block" : "hidden"}
        `}
      />
    </div>
  );
}
