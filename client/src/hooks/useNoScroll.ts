import { useEffect } from 'react';

export default function useNoScroll(): void {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      left: -${window.scrollX}px;
    `;
    return () => {
      const scrollY = document.body.style.top;
      const scrollX = document.body.style.left;
      document.body.style.cssText = `
        position: "";
        top: "";
        left: "";
      `;
      window.scrollTo(
        parseInt(scrollX || '0') * -1,
        parseInt(scrollY || '0') * -1,
      );
    };
  }, []);
}
