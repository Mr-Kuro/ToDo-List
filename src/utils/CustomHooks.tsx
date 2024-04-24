import { useCallback, useEffect, useState } from "react";

export const useIsMobile = (width = 640) => {
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= width);
  }, [width]);

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [checkIsMobile]);

  return isMobile;
};
