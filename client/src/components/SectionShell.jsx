import SourceBadge from './SourceBadge';
import LoadingSpinner from './LoadingSpinner';

const SectionShell = ({
  title,
  description,
  icon,
  source,
  loading,
  error,
  children,
  className = '',
}) => (
  <section className={`card card-hover animate-slide-up ${className}`}>
    <div className="flex items-start justify-between gap-4 mb-5">
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <div className="shrink-0 h-10 w-10 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center text-sky-400">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h2 className="section-title">{title}</h2>
          {description && <p className="section-desc">{description}</p>}
        </div>
      </div>
      {source && !loading && <SourceBadge source={source} />}
    </div>

    {loading ? (
      <div className="flex justify-center py-14">
        <LoadingSpinner />
      </div>
    ) : error ? (
      <div className="rounded-xl bg-red-950 border border-red-800 px-4 py-3">
        <p className="text-red-300 text-sm">{error}</p>
      </div>
    ) : (
      children
    )}
  </section>
);

export default SectionShell;
