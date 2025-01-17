import { type RefObject, useEffect, useRef, useState } from 'react';

export const useElementsInView = <T extends Element, K extends Element>(
  container: K | null,
  options?: IntersectionObserverInit
): [RefObject<Record<string, T | null> | null>, Record<string, boolean>] => {
  const elementsRef = useRef<Record<string, T | null>>({});
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const { current: elements } = elementsRef;
    if (!elements || !Object.keys(elements).length) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;

    const observers = Object.values(elements).map((container) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (!(entry.target instanceof HTMLElement)) return;
        const { key } = entry.target.dataset ?? {};
        if (!key) return;
        setIsVisible((visible) => ({
          ...visible,
          [key]: entry.isIntersecting,
        }));
      }, options);
      if (container) {
        observer.observe(container);
      }
      return observer;
    });

    return () => {
      observers.map((observer, i) => {
        const container = elements[i];
        if (container) {
          observer.unobserve(container);
        }
      });
    };
  }, [elementsRef, container]);

  return [elementsRef, isVisible];
};
