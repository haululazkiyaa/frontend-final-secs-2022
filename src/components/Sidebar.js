import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  componentDidMount() {
    if(this.props.sidebarUnfoldable === ' sidebar-narrow-unfoldable show') {
      this.props.toggleSidebarMobile();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="sidebar-backdrop fade show" hidden={this.props.sidebarUnfoldable !== ' sidebar-narrow-unfoldable show'} onClick={this.props.toggleSidebarMobile}></div>
        <div
          className={
            "sidebar sidebar-dark sidebar-fixed" +
            this.props.sidebarHide +
            this.props.sidebarUnfoldable
          }
          id="sidebar"
        >
          <div className="sidebar-brand d-none d-md-flex">
            <div className="sidebar-brand-full">
              <img
                src="https://i.ibb.co/zrXGNkq/SAIS.png"
                height="42"
                alt="logo"
              />
            </div>
            <svg
              className="sidebar-brand-narrow"
              width="46"
              height="46"
              alt="CoreUI Logo"
            >
              <use href="assets/brand/coreui.svg#signet"></use>
            </svg>
          </div>
          <ul
            className="sidebar-nav"
            data-coreui="navigation"
            data-simplebar=""
          >
            <li className="nav-title">MENU</li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-apps"></use>
                </svg>
                Dashboard
                <span className="badge badge-sm bg-info ms-auto">BARU</span>
              </Link>
            </li>
            <li className="nav-title">AKADEMIK</li>
            <li className="nav-item">
              <Link to="/jadwal"
                className="nav-link"
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-calendar-check"></use>
                </svg>
                Jadwal
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/nilai"
                className="nav-link"
                href="https://coreui.io/docs/templates/installation/"
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-bar-chart"></use>
                </svg>
                Nilai
              </Link>
            </li>
            <li className="nav-item mt-auto">
              <Link to="/signup"
                className="nav-link"
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-layers"></use>
                </svg>
                Helpdesk
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login"
                className="nav-link"
                href="https://coreui.io/docs/templates/installation/"
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-bar-chart"></use>
                </svg>
                Nilai
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/404"
                className="nav-link"
                href="https://coreui.io/docs/templates/installation/"
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-bar-chart"></use>
                </svg>
                404
              </Link>
            </li>
          </ul>
          <button
            className="sidebar-toggler"
            type="button"
            onClick={this.props.unfoldableSidebar}
          ></button>
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(Sidebar);
