import SectionShell from './SectionShell';

const MemeIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MemeSection = ({ meme, source, loading, error }) => (
  <SectionShell
    title="Daily Meme"
    description="A light moment from the community"
    icon={<MemeIcon />}
    source={source}
    loading={loading}
    error={error}
    className="lg:col-span-2"
  >
    {meme?.url ? (
      <figure className="flex flex-col items-center">
        <div className="w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-800 p-3">
          <img
            src={meme.url}
            alt={meme.title || 'Crypto meme'}
            className="w-full max-h-72 object-contain rounded-lg mx-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        {meme.title && (
          <figcaption className="text-sm text-slate-400 mt-3 text-center font-medium">
            {meme.title}
          </figcaption>
        )}
      </figure>
    ) : (
      <p className="text-slate-400 text-sm text-center py-8">No meme available.</p>
    )}
  </SectionShell>
);

export default MemeSection;
