import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Hook for lazy loading and infinite scroll
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;

  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const elementRef = useRef<Element | null>(null);
  const frozen = useRef(false);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen.current || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin]);

  useEffect(() => {
    if (entry?.isIntersecting && freezeOnceVisible) {
      frozen.current = true;
    }
  }, [entry?.isIntersecting, freezeOnceVisible]);

  return {
    ref: elementRef,
    entry,
    isIntersecting: entry?.isIntersecting ?? false,
  };
}
