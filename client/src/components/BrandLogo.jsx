const BrandLogo = ({ size = 'md', showText = true }) => {
  const iconSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const textClass = size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${iconSize} rounded-xl bg-sky-600 flex items-center justify-center shrink-0`}
        aria-hidden
      >
        <svg
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      </div>
      {showText && (
        <div>
          <p className={`${textClass} font-semibold tracking-tight text-white leading-tight`}>
            Investor<span className="text-sky-400">Hub</span>
          </p>
          {size !== 'sm' && (
            <p className="text-xs text-slate-400">Crypto market intelligence</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
