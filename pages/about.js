import { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default class About extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Head>
                    <title>About</title>
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        About <a href="https://nextjs.org">Next.js!</a>
                    </h1>

                    <p className={styles.description}>
                        Next.js is an open-source React front-end development
                        web framework that enables functionality such as
                        server-side rendering and generating static websites for
                        React based web applications.
                    </p>
                </main>
            </div>
        );
    }
}

const getServerSideProps = (context) => {
  return {
    props: {}
  };
}

export { getServerSideProps };