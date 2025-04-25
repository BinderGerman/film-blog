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
    <div className="relative ml-2 sm:ml-4" ref={menuRef}>
      <Search
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-highlight-white hover:text-highlight-red transition duration-200"
      />

      <div
        className={`absolute right-0 top-full bg-white shadow-lg mt-6 w-[350px] sm:w-[500px] lg:w-[600px] rounded p-3 transition-all duration-300 ease-out z-50
          ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
        <div id="search" className="w-full" />
      </div>
    </div>
  );
}
