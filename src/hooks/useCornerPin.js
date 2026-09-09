// useCornerPin.js
import { useEffect, useRef, useState } from "react";
import { cornerPinTransform, quadPctToPx } from "@/lib/cornerPin";

// Reference size for the content box you're pinning. Pick numbers proportional
// to how you're laying out the content inside (e.g. matches the rehearsal panel's
// natural aspect ratio). 100 x 100 keeps the math simple if you use % inside it.
const REF_W = 400;
const REF_H = 260;

export function useCornerPin(containerRef, quadPct) {
  const [transform, setTransform] = useState("");

  useEffect(() => {
    // Null quad means "desktop corner-pin is not active" — skip entirely.
    if (!quadPct || !containerRef.current) {
      setTransform("");
      return;
    }

    const recompute = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const destPx = quadPctToPx(quadPct, rect.width, rect.height);
      setTransform(cornerPinTransform(REF_W, REF_H, destPx));
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef, quadPct]);

  return { transform, refWidth: REF_W, refHeight: REF_H };
}
