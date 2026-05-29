const SourceBadge = ({ source }) => {
  const isLive = source === 'live' || source === 'ai';

  return (
    <span
      className={`shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${
        isLive
          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
          : 'bg-amber-950 text-amber-300 border-amber-700'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isLive ? 'bg-emerald-400' : 'bg-amber-400'
        }`}
        aria-hidden
      />
      {isLive ? 'Live' : 'Fallback'}
    </span>
  );
};

export default SourceBadge;
