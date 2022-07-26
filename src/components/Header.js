import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../context/AuthContext";

class Header extends Component {
    state = {
        greeting: 'Halo'
    }

    componentDidMount(){
        this.showTime()
    }

    showTime = () => {
        const now = new Date().getHours();

        if(now < 12) {
            this.setState({
                greeting: 'Selamat pagi'
            })
        } else if (now < 18) {
            this.setState({
                greeting: 'Selamat siang'
            })
        } else {
            this.setState({
                greeting: 'Selamat malam'
            })
        }
    }

    render() {
        return(
            <React.Fragment>
              <header className="header header-sticky mb-4">
                    <div className="container-fluid">
                    <button className="header-toggler px-md-0 me-md-3 d-none d-md-block" type="button" onClick={this.props.toggleSidebar}>
                        <svg className="icon icon-lg">
                        <use href="vendors/@coreui/icons/svg/free.svg#cil-menu"></use>
                        </svg>
                    </button>
                    <button className="header-toggler px-md-0 me-md-3 d-md-none" type="button" onClick={this.props.toggleSidebarMobile}>
                        <svg className="icon icon-lg">
                        <use href="vendors/@coreui/icons/svg/free.svg#cil-menu"></use>
                        </svg>
                    </button><a className="header-brand d-md-none" href="/">
                        <svg width="118" height="46" alt="CoreUI Logo">
                        <use href="assets/brand/coreui.svg#full"></use>
                        </svg></a>
                    <div className="header-nav d-none d-md-flex">
                        <li className="nav-item">{this.state.greeting}, {this.props.user.name}</li>
                    </div>
                    <ul className="header-nav ms-auto">
                        <li className="nav-item dropdown"><a className="nav-link py-0" data-coreui-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">
                            <svg className="icon icon-lg" width="118" height="46" alt="CoreUI Logo">
                                <use href="vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                            </svg>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end pt-0">
                            <div className="dropdown-header bg-light py-2">
                            <div className="fw-semibold">Akun</div>
                            </div><Link to="/password" className="dropdown-item">
                            <svg className="icon me-2">
                                <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                            </svg>Ganti Kata Sandi</Link>
                            <div className="dropdown-divider"></div><button className="dropdown-item" onClick={this.props.logout}>
                            <svg className="icon me-2">
                                <use href="vendors/@coreui/icons/svg/free.svg#cil-account-logout"></use>
                            </svg>Keluar</button>
                        </div>
                        </li>
                    </ul>
                    </div>
                    <div className="header-divider"></div>
                    <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb my-0 ms-2">
                        <li className="breadcrumb-item" hidden={this.props.data.title === "Dashboard"}>
                            <a href="/dashboard">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active"><span>{this.props.data.title}</span></li>
                        </ol>
                    </nav>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}

export default withAuth(Header)