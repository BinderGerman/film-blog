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
        excerptLength: 30,
        highlightParam: "highlight",
        renderResult: (
          result: HTMLElement,
          data: {
            url: string;
            meta: {
              title?: string;
              excerpt?: string;
              image?: string;
              tag?: string | string[];
            };
          }
        ) => {
          const image = data.meta?.image
            ? `<img src="${data.meta.image}" class="pagefind-ui__result-image" alt="Preview" />`
            : "";
      
          const title = data.meta?.title || "";
          const excerpt = data.meta?.excerpt || "";
          const tags = data.meta?.tag
            ? Array.isArray(data.meta.tag)
              ? data.meta.tag.map(tag => `<span class="bg-[--color-highlight-gold] text-[--color-highlight-white] rounded px-2 py-1 text-sm mr-2">${tag}</span>`).join("")
              : `<span class="bg-[--color-highlight-gold] text-[--color-highlight-white] rounded px-2 py-1 text-sm">${data.meta.tag}</span>`
            : "";
      
          return `
            <a href="${data.url}" class="pagefind-ui__result hover:bg-gray-100 transition rounded-lg">
              ${image}
              <div class="pagefind-ui__result-content">
                <h2 class="pagefind-ui__result-title">${title}</h2>
                <p class="pagefind-ui__result-excerpt mt-1">${excerpt}</p>
                ${tags ? `<div class="mt-2 flex flex-wrap gap-1">${tags}</div>` : ""}
              </div>
            </a>
          `;
        }
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
