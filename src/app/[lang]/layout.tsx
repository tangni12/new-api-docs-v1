import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n';
import { Provider } from '@/components/provider';
import '../global.css';
import type { Metadata } from 'next';
import { createMetadata, baseUrl } from '@/lib/metadata';
import { notFound } from 'next/navigation';

const { provider } = defineI18nUI(i18n, {
  translations: {
    zh: {
      displayName: '简体中文',
      search: '搜索文档',
      searchNoResult: '没有结果',
      toc: '目录',
      lastUpdate: '最后更新于',
      chooseTheme: '选择主题',
      chooseLanguage: '选择语言',
      nextPage: '下一页',
      previousPage: '上一页',
      tocNoHeadings: '目录为空',
    },
  },
});

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    metadataBase: baseUrl,
    title: {
      default: 'ApiFlow - AI 模型接口文档',
      template: '%s | ApiFlow',
    },
    description: 'ApiFlow 使用指南与 AI 模型接口参考文档。',
    keywords: [
      'ApiFlow',
      'AI API',
      'AI 模型接口',
      'OpenAI Compatible API',
      'API 文档',
    ],
    authors: [{ name: 'ApiFlow', url: 'https://api.apiflow-ai.com' }],
    creator: 'ApiFlow',
    alternates: {
      languages: {
        zh: '/zh',
      },
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      title: 'ApiFlow - AI 模型接口文档',
      description: 'ApiFlow 使用指南与 AI 模型接口参考文档。',
      siteName: 'ApiFlow',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ApiFlow - AI 模型接口文档',
      description: 'ApiFlow 使用指南与 AI 模型接口参考文档。',
    },
  });
}

export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;

  if (!i18n.languages.includes(lang as (typeof i18n.languages)[number])) {
    notFound();
  }

  return (
    <Provider i18n={provider(lang)} lang={lang}>
      {children}
    </Provider>
  );
}
