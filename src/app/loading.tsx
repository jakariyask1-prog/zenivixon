export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin dark:border-slate-800 dark:border-t-blue-500"></div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-heading">
          Loading...
        </p>
      </div>
    </div>
  );
}
