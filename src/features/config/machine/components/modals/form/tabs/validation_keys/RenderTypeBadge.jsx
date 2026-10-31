const RenderTypeBadge = (type) => {
    switch (type) {
      case 'double':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800">
            double
          </span>
        );
      case 'boolean':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800">
            boolean
          </span>
        );
      case 'integer':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800">
            integer
          </span>
        );
      case 'string':
      default:
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800">
            string
          </span>
        );
    }
  };

  export default RenderTypeBadge;