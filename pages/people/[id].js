import { Component } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import * as API from '../../constants';

export default class Person extends Component {
  render() {
    const { name, content } = this.props.person;

    return (
      <div className={styles.container}>
        <Head>
          <title>{name}</title>
        </Head>

        <main className="w-100">
          <h5 className="mt-4">{name}</h5>

          <div className="mt-3">
            <div>
              <strong>Content:</strong>
            </div>
            {content}
          </div>
        </main>
      </div>
    );
  }
}

const getServerSideProps = async (context) => {
  const res = await fetch(
    `${API.CONTENT_API}/${decodeURIComponent(context.params.id)}`
  );
  const data = await res.json();

  return {
    props: {
      person: data,
    },
  };
};

export { getServerSideProps };

// const getStaticPaths = async () => {
//     const res = await fetch(
//         API.CONTENT_API
//     );
//     const data = await res.json();

//     const paths = data.map((person) => {
//         return {
//             params: {
//                 id: decodeURIComponent(person.id),
//             },
//         };
//     });

//     return {
//         paths,
//         fallback: false,
//     };
// };

// const getStaticProps = async ({ params }) => {
//     const res = await fetch(
//         `${API.CONTENT_API}/${decodeURIComponent(params.id)}`
//     );
//     const data = await res.json();

//     return {
//         props: {
//             person: data,
//         },
//     };
// };

// export { getStaticPaths, getStaticProps };
