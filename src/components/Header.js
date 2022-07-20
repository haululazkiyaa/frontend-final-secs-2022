import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";

class Header extends Component {
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
                        <li className="nav-item">Selamat Malam, Muhammad Haulul Azkiyaa</li>
                    </div>
                    <ul className="header-nav ms-auto">
                        <li className="nav-item dropdown"><a className="nav-link py-0" data-coreui-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">
                            <div className="avatar avatar-md"><img className="avatar-img" src="assets/img/avatars/8.jpg" alt="user@email.com" /></div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end pt-0">
                            <div className="dropdown-header bg-light py-2">
                            <div className="fw-semibold">Account</div>
                            </div><a className="dropdown-item" href="/">
                            <svg className="icon me-2">
                                <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                            </svg>Change Password</a>
                            <div className="dropdown-divider"></div><a className="dropdown-item" href="/">
                            <svg className="icon me-2">
                                <use href="vendors/@coreui/icons/svg/free.svg#cil-account-logout"></use>
                            </svg>Logout</a>
                        </div>
                        </li>
                    </ul>
                    </div>
                    <div className="header-divider"></div>
                    <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb my-0 ms-2">
                        <li className="breadcrumb-item">
                            <a href="/">Home</a>
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