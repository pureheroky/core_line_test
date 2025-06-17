import { useEffect } from "react";

const useInfiniteScroll = (
  ref: React.RefObject<Element | null>,
  onIntersect: () => void,
  active: boolean
) => {
  useEffect(() => {
    const node = ref.current;
    if (!node || !active) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.unobserve(node);
          onIntersect();
        }
      },
      { rootMargin: "100px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [ref, onIntersect, active]);
};

export default useInfiniteScroll;
