import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Toggleable 12-column grid overlay.
 *
 * Press ` (backtick) to toggle the grid overlay on/off.
 * A brief toast confirms the action.
 */
export default function GridDebug() {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1200);
  }, []);

  const toggleGrid = useCallback(() => {
    setVisible((v) => {
      showToast(v ? "Grid OFF" : "Grid ON");
      return !v;
    });
  }, [showToast]);

  const toggle = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.code === "Backquote" &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        toggleGrid();
      }
    },
    [toggleGrid]
  );

  useEffect(() => {
    window.addEventListener("keydown", toggle);
    return () => {
      window.removeEventListener("keydown", toggle);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [toggle]);

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 2000,
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-00)",
            color: "var(--color-bg)",
            background: "var(--color-text)",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        >
          {toast}
        </div>
      )}

      {/* Mobile toggle button — hidden on desktop via CSS */}
      <button
        className="grid-toggle-btn"
        onClick={toggleGrid}
        aria-label={visible ? "Hide grid overlay" : "Show grid overlay"}
      >
        <span className="mono">[#]</span>
      </button>

      {/* Grid overlay */}
      {visible && (
        <div className="grid-debug" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="grid-debug__col" />
          ))}
        </div>
      )}
    </>
  );
}
