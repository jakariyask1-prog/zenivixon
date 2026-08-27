export function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.035] dark:opacity-[0.06] animate-[float_12s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #2563eb, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.025] dark:opacity-[0.05] animate-[float_16s_ease-in-out_infinite_2s]"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.02] dark:opacity-[0.04] animate-[float_20s_ease-in-out_infinite_4s]"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
      />
    </div>
  );
}