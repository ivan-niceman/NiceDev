import { describe, it, expect } from 'vitest';
import { generateSEO, type SEOProps } from './seo';

describe('generateSEO', () => {
  const baseProps: SEOProps = {
    title: 'Test Title',
    description: 'Test Description',
    keywords: 'test, keywords',
    lang: 'ru',
    canonicalPath: '/test',
    siteUrl: 'https://example.com',
  };

  it('returns correct title and description', () => {
    const seo = generateSEO(baseProps);
    expect(seo.title).toBe('Test Title');
    expect(seo.metaDescription).toBe('Test Description');
  });

  it('includes keywords when provided', () => {
    const seo = generateSEO(baseProps);
    expect(seo.metaKeywords).toBe('test, keywords');
  });

  it('omits keywords when not provided', () => {
    const seo = generateSEO({
      ...baseProps,
      keywords: undefined,
    });
    expect(seo.metaKeywords).toBeUndefined();
  });

  it('constructs canonical URL correctly', () => {
    const seo = generateSEO({
      ...baseProps,
      canonicalPath: '/',
    });
    expect(seo.canonical).toBe('https://example.com/');

    const seo2 = generateSEO({
      ...baseProps,
      canonicalPath: '/blog/post',
    });
    expect(seo2.canonical).toBe('https://example.com/blog/post');
  });

  it('sets correct OG locales', () => {
    const seoRu = generateSEO({ ...baseProps, lang: 'ru' });
    expect(seoRu.ogLocale).toBe('ru_RU');
    expect(seoRu.ogAlternateLocale).toBe('en_US');

    const seoEn = generateSEO({ ...baseProps, lang: 'en' });
    expect(seoEn.ogLocale).toBe('en_US');
    expect(seoEn.ogAlternateLocale).toBe('ru_RU');
  });
});