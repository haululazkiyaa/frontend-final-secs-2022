import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  state = {
    // get page title
    locate: this.props.data.title,
  };

  // handle first load
  componentDidMount() {
    if (this.props.sidebarUnfoldable === " sidebar-narrow-unfoldable show") {
      this.props.toggleSidebarMobile();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="sidebar-backdrop fade show"
          hidden={
            this.props.sidebarUnfoldable !== " sidebar-narrow-unfoldable show"
          }
          onClick={this.props.toggleSidebarMobile}
        ></div>
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
                src="https://masulyablog.sirv.com/secs2022/PAMa-white.png"
                height="42"
                alt="logo"
              />
            </div>
            <div className="sidebar-brand-narrow">
              <img
                src="https://masulyablog.sirv.com/secs2022/PAMa-icon-white.png"
                height="42"
                alt="logo"
              />
            </div>
          </div>
          <ul
            className="sidebar-nav"
            data-coreui="navigation"
            data-simplebar=""
          >
            <li className="nav-title">MENU</li>
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={
                  this.state.locate === "Dashboard"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={this.props.subMenu}
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-apps"></use>
                </svg>
                Dashboard
              </Link>
            </li>
            <li className="nav-title">AKADEMIK</li>
            <li className="nav-item">
              <Link
                to="/jadwal"
                className={
                  this.state.locate === "Jadwal"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={this.props.subMenu}
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-list-rich"></use>
                </svg>
                Jadwal
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/nilai"
                className={
                  this.state.locate === "Nilai" ? "nav-link active" : "nav-link"
                }
                onClick={this.props.subMenu}
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-bar-chart"></use>
                </svg>
                Nilai
              </Link>
            </li>
            <li
              className={
                this.props.subMenuShow === "show1" ? "nav-group show" : "nav-group"
              }
            >
              <Link
                to="#"
                id="show1"
                className="nav-link nav-group-toggle"
                onClick={this.props.subMenu}
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-clone"></use>
                </svg>
                Lainnya
              </Link>
              <ul className="nav-group-items">
                <li className="nav-item">
                  <Link
                    to="/404"
                    className={
                      this.state.locate === "404 Not Found"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    Halaman 404
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item mt-auto">
              <Link
                to="/about"
                className={
                  this.state.locate === "Tentang PAMa"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={this.props.subMenu}
              >
                <svg className="nav-icon">
                  <use href="vendors/@coreui/icons/svg/free.svg#cil-info"></use>
                </svg>
                Tentang PAMa
                <span className="badge badge-sm bg-danger ms-auto">!</span>
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
