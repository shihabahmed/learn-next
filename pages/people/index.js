import { Component } from 'react';
import Head from 'next/head';
import Link from '../../components/Link';
import styles from '../../styles/Home.module.css';
import * as API from '../../constants';

export default class People extends Component {
  render() {
    return (
      <div className={styles.container + ' container'}>
        <Head>
          <title>People</title>
        </Head>

        <main className="w-100">
          <Link href="/people/add">
            <a className="btn btn-primary">Add People</a>
          </Link>
          {this.props.people.map((person) => {
            return (
              <div key={person.id} id={person.id} className="p-3 my-3 border">
                <Link href={`/people/${person.id}`}>
                  <a>
                    <h6>{person.name}</h6>
                  </a>
                </Link>
              </div>
            );
          })}
        </main>
      </div>
    );
  }
}

const getStaticProps = async () => {
  const res = await fetch(API.CONTENT_API);
  const data = await res.json();

  return {
    props: {
      people: data,
    },
    revalidate: 1,
  };
};

export { getStaticProps };
