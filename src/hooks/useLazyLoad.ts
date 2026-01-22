import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazyLoadOptions<T> {
  itemsPerPage?: number;
  threshold?: number;
  rootMargin?: string;
}

const useLazyLoad = <T>(
  items: T[],
  options: UseLazyLoadOptions<T> = {}
) => {
  const {
    itemsPerPage = 10,
    threshold = 0.1,
    rootMargin = '100px',
  } = options;

  const [visibleItems, setVisibleItems] = useState<T[]>(items.slice(0, itemsPerPage));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(items.length > itemsPerPage);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (!hasMore) return;

    const nextPage = page + 1;
    const startIndex = 0;
    const endIndex = nextPage * itemsPerPage;
    
    if (endIndex >= items.length) {
      setHasMore(false);
      setVisibleItems(items);
    } else {
      setVisibleItems(items.slice(startIndex, endIndex));
      setPage(nextPage);
    }
  }, [page, itemsPerPage, hasMore, items]);

  useEffect(() => {
    setVisibleItems(items.slice(0, itemsPerPage));
    setPage(1);
    setHasMore(items.length > itemsPerPage);
  }, [items, itemsPerPage]);

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, threshold, rootMargin]);

  return {
    items: visibleItems,
    hasMore,
    ref: loadMoreRef,
    loadMore,
  };
};

export default useLazyLoad;
