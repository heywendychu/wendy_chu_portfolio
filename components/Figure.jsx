"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

// Image + optional caption. Click to open a zoomable lightbox.
export default function Figure({ src, alt = "", width, height, caption, priority = false, className = "" }) {
  const [open, setOpen] = useState(false);
  if (!src) return null;
  return (
    <figure className={`figure ${className}`}>
      <button type="button" className="figure__button" onClick={() => setOpen(true)} aria-label={`Enlarge image${alt ? `: ${alt}` : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
        />
      </button>
      {caption ? <figcaption>{caption}</figcaption> : null}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt, width, height }]}
        plugins={[Zoom]}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        styles={{ container: { backgroundColor: "rgba(27, 44, 99, 0.94)" } }}
      />
    </figure>
  );
}
