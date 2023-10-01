import { useEffect } from "react";

const useScrollToTop = () => {
  // auto scroll to top when entering this page
  useEffect(() => {
    setTimeout(() => {
      // @ts-expect-error
      window?.scrollTo({ top: 0, behavior: "instant" });
    }, 10);
  }, []);
};

export default useScrollToTop;
