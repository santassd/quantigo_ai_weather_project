interface FormatDateOptions {
  weekday?: 'short' | 'long';
  year?: 'numeric';
  month?: 'short' | 'long' | 'numeric';
  day?: 'numeric';
}

export function formatDate(timestamp: number, options: FormatDateOptions = {}) {
  const date = new Date(timestamp * 1000); 
  return date.toLocaleDateString(undefined, options);
}
