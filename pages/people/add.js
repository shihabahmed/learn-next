import { Component } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import FormValidator from '../../helper/form-validator';

export default class Add extends Component {
  validator = null;

  componentDidMount() {
    const validationRules = {
      email: [
        {
          required: true,
          message: 'Email is required.',
        },
        {
          regex: '',
          message: 'Email is invalid.',
        },
      ],
      select: [
        {
          required: true,
          message: 'You must select an option.',
        },
      ],
      text: [
        {
          required: true,
          message: 'Text is required.',
        },
      ],
    };

    this.validator = new FormValidator(validationRules);
  }

  submit(event) {
    event.preventDefault();
    console.log(this);
  }

  render() {
    return (
      <div className={styles.container + ' container'}>
        <Head>
          <title>Add People</title>
        </Head>

        <main className="w-100">
          <form onSubmit={this.submit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="form-group">
              <label>Example select</label>
              <select className="form-control" name="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="form-group">
              <label>Example textarea</label>
              <textarea className="form-control" name="text" rows="3"></textarea>
            </div>
            <button>Submit</button>
          </form>
        </main>
      </div>
    );
  }
}
