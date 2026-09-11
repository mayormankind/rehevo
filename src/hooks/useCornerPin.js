// useCornerPin.js
import { useEffect, useState, useRef } from "react";
import { cornerPinTransform, quadPctToPx } from "@/lib/cornerPin";

const REF_W = 400;
const REF_H = 260;

export function useCornerPin(containerRef, quadPct) {
  const [transform, setTransform] = useState("");
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    if (!quadPct || !containerRef.current) {
      setTransform("");
      return;
    }

    const recompute = () => {
      if (!mountedRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const destPx = quadPctToPx(quadPct, rect.width, rect.height);
      setTransform(cornerPinTransform(REF_W, REF_H, destPx));
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(containerRef.current);

    return () => {
      mountedRef.current = false;
      ro.disconnect();
    };
  }, [containerRef, quadPct]);

  return { transform, refWidth: REF_W, refHeight: REF_H };
}
