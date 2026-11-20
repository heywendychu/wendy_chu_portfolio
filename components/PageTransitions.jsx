"use client";
// Fade-and-rise page changes (design review 9, option D). Wraps clicks on internal links in a View
// Transition: the new page opens at the top (no smooth glide up from where you were), the old page fades
// out and the new one rises in. Browsers without View Transitions just navigate as before.
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PageTransitions() {
  const router = useRouter();
  useEffect(() => {
    if (!document.startViewTransition) return undefined;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.hash || url.pathname === location.pathname) return;
      e.preventDefault();
      const root = document.documentElement;
      document.startViewTransition(
        () =>
          new Promise((done) => {
            root.style.scrollBehavior = "auto";
            router.push(url.pathname + url.search, { scroll: false });
            // Rendering is paused during a view transition's update, so poll with timers (not rAF).
            const t0 = performance.now();
            const check = () => {
              if (location.pathname.replace(/\/$/, "") === url.pathname.replace(/\/$/, "") || performance.now() - t0 > 1500) {
                setTimeout(() => {
                  window.scrollTo(0, 0);
                  root.style.scrollBehavior = "";
                  done();
                }, 30);
              } else setTimeout(check, 16);
            };
            check();
          })
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);
  return null;
}
