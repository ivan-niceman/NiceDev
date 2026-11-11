export function getAltLocalePath(
  pathname: string,
  currentLang: 'ru' | 'en',
): string {
  const withoutEnPrefix =
    pathname.replace(/^\/en\/?/, '/').replace(/\/+$/, '') || '/';
  return currentLang === 'ru'
    ? `/en${withoutEnPrefix === '/' ? '' : withoutEnPrefix}`
    : withoutEnPrefix;
}
