const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-11 w-11 border-[3px]',
};

const LoadingSpinner = ({ size = 'md' }) => (
  <div
    className={`${sizes[size]} border-sky-500 border-t-transparent rounded-full animate-spin`}
    role="status"
    aria-label="Loading"
  />
);

export default LoadingSpinner;
