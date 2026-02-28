import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          material-expressive-react
        </Heading>
        <p className="hero__subtitle">
          Material 3 Expressive UI React components. Based on the Material 3 theme from{' '}
          <Link
            href="https://github.com/material-components/material-web"
            style={{
              color: 'inherit',
              textDecoration: 'underline',
              textUnderlineOffset: 4,
              fontWeight: 600,
            }}
          >
            @material/web
          </Link>
          . Added custom CSS and animations to make it expressive and as close as possible to
          Android component motion.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/intro">
            Read the docs
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://prudhviraj5.github.io/material-expressive-react/storybook/"
            style={{
              marginLeft: 12,
              border: '2px solid #fff',
            }}
          >
            Open Storybook
          </Link>
        </div>

        <p
          className="hero__subtitle"
          style={{
            marginTop: 14,
            opacity: 0.85,
            fontSize: '0.95rem',
            lineHeight: 1.4,
            maxWidth: 960,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Note: This project is not affiliated with, endorsed by, or supported by Google. It was
          built out of necessity, based on public comments suggesting Material 3 Expressive for the
          web is unlikely to ship anytime soon.
        </p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="material-expressive-react"
      description="Material 3 Expressive UI React components built on @material/web, with custom CSS and Android-like motion.">
      <HomepageHeader />
    </Layout>
  );
}
