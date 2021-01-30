import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut, getMe } from './redux/modules/cuenta/login';

// Maquetado
import SideBar from './common/components/layout/Sidebar/SideBar';
import Footer from './common/components/layout/Footer/Footer';

import Navbar from './common/components/layout/Navbar/Navbar';
import PublicNavbar from './common/components/layout/Navbar/PublicNavbar';
import { VerifyLogin } from './common/components/layout';

class PublicRouteBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleOpen: true,
        };
    }

    navToggle = () => {
        this.setState({ toggleOpen: !this.state.toggleOpen });
    };

    isAuthenticated = () => {
        const token = localStorage.getItem('token');
        const {
            getMe,
            login: { me },
        } = this.props;
        if (!!token && !!me.username) {
            return true;
        } else if (token) {
            getMe();
            return 'Verifying';
        }
        return false;
    };

    render() {
        const {
            component: Component,
            logOut,
            login: { me },
            ...rest
        } = this.props;
        const isAuthenticated = this.isAuthenticated();
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        isAuthenticated === true ? (
                            <div>
                                <SideBar
                                    toggleOpen={this.state.toggleOpen}
                                    navToggle={this.navToggle}
                                    logOut={logOut}
                                />
                                <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                                    <div className="main-navbar bg-white sticky-top">
                                        <div className="p-0 container">
                                            <Navbar
                                                navToggle={this.navToggle}
                                                logOut={logOut}
                                                user={me}
                                            />
                                        </div>
                                    </div>
                                    <div className="main-content-container px-4 container-fluid">
                                        <Component {...props} />
                                    </div>
                                    <Footer />
                                </main>
                            </div>
                        ) : (
                            <div>
                            <SideBar
                                toggleOpen={this.state.toggleOpen}
                                navToggle={this.navToggle}
                                logOut={logOut}
                            />
                            <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                                <div className="main-navbar bg-white sticky-top">
                                    <div className="p-0 container">
                                        <PublicNavbar
                                            navToggle={this.navToggle}
                                        />
                                    </div>
                                </div>
                                <div className="main-content-container px-4 container-fluid">
                                    <Component {...props} />
                                </div>
                                <Footer />
                            </main>
                        </div>
                        )
                    ) : (
                        <div>
                            <SideBar
                                toggleOpen={this.state.toggleOpen}
                                navToggle={this.navToggle}
                                logOut={logOut}
                            />
                            <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                                <div className="main-navbar bg-white sticky-top">
                                    <div className="p-0 container">
                                        <PublicNavbar
                                            navToggle={this.navToggle}
                                        />
                                    </div>
                                </div>
                                <div className="main-content-container px-4 container-fluid">
                                    <Component {...props} />
                                </div>
                                <Footer />
                            </main>
                        </div>
                        // <Redirect
                        //     to={{
                        //         pathname: "/login",
                        //         state: { from: props.location }
                        //     }}
                        // />
                    )
                }
            />
        );
    }
}

const ms2p = state => ({ ...state });

const md2p = { logOut, getMe };

const PublicRoute = connect(ms2p, md2p)(PublicRouteBase);

export default PublicRoute;
