import { defaultLocale, isValidLocale } from "./config";

export function getLocaleFromPathname(pathname: string) {
  const segment = pathname.split("/")[1];
  return segment && isValidLocale(segment) ? segment : null;
}

export function stripLocale(pathname: string) {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname;
  const stripped = pathname.replace(`/${locale}`, "") || "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export function withLocale(locale: string, pathname: string) {
  const clean = stripLocale(pathname);
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export { defaultLocale, isValidLocale };
