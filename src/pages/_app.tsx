import '@/styles/globals.css';
import '@/styles/prism-one-dark.css';
import '@/styles/prism-plus.css';
import "nprogress/nprogress.css";
import "@/styles/nprogress-custom.scss";

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

import LayoutWrapper from '@/components/LayoutWrapper';
import { siteConfigs } from '@/configs/siteConfigs';

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Integrate nprogress
  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider attribute="class">
      <DefaultSeo
        titleTemplate={`%s | ${siteConfigs.titleShort}`}
        defaultTitle={siteConfigs.title}
        description={siteConfigs.description}
        canonical={siteConfigs.fqdn}
        openGraph={{
          title: siteConfigs.title,
          description: siteConfigs.description,
          url: siteConfigs.fqdn,
          images: [
            {
              url: siteConfigs.bannerUrl,
            },
          ],
          site_name: siteConfigs.title,
          type: 'website',
        }}
        twitter={{
          handle: siteConfigs.twitterID,
          site: siteConfigs.twitterID,
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: siteConfigs.logoPath,
          },
          {
            rel: 'alternate',
            type: 'application/rss+xml',
            href: '/feed.xml',
          },
          {
            rel: 'alternate',
            type: 'application/atom+xml',
            href: '/atom.xml',
          },
        ]}
      />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
