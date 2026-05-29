import SectionShell from './SectionShell';
import { formatDate } from '../utils/formatters';

const NewsIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const NewsSection = ({ news, source, loading, error }) => (
  <SectionShell
    title="Market News"
    description="Latest headlines from crypto markets"
    icon={<NewsIcon />}
    source={source}
    loading={loading}
    error={error}
  >
    {!news?.length ? (
      <p className="text-slate-400 text-sm text-center py-6">No news available.</p>
    ) : (
      <ul className="space-y-4 max-h-[28rem] overflow-y-auto scrollbar-thin pr-2">
        {news.map((item, index) => (
          <li key={`${item.title}-${index}`}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg p-3 -mx-3 hover:bg-slate-800/80 transition-colors"
            >
              <p className="text-sm font-medium text-slate-100 group-hover:text-sky-300 line-clamp-2 leading-relaxed">
                {item.title}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-slate-400">
                <span className="inline-flex items-center rounded-md bg-slate-800 border border-slate-700 px-2 py-0.5 text-slate-300 font-medium">
                  {item.source}
                </span>
                <span aria-hidden>·</span>
                <time dateTime={item.publishedAt} className="text-slate-400">
                  {formatDate(item.publishedAt)}
                </time>
              </div>
            </a>
          </li>
        ))}
      </ul>
    )}
  </SectionShell>
);

export default NewsSection;
