export const getThemeModeClass = (themeMode: string) => {
  return themeMode === 'dark' ? 'dark-mode' : 'light-mode';
};

export const trimText = (text: string, maxLength: number) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export const getErrorClassName = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};
