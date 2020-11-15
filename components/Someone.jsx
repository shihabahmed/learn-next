import { Component } from 'react';
import Head from 'next/head';
import * as API from '../constants'

export default class Someone extends Component {
    state = {
        name: '',
        content: '',
    };

    componentDidMount() {
        fetch(`/api/person?id=${this.props.id}`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ ...this.state, ...data })
            });
    }

    render() {
        const { name, content } = this.state;

        return (
            <>
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
            </>
        );
    }
}
