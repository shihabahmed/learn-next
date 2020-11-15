import { Component } from 'react';
import Link from 'next/link';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="container">
                    <Link href="/">
                        <a className="navbar-brand">LOGO</a>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link href="/people">
                                    <a className="nav-link">People</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/about">
                                    <a className="nav-link">About</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;
