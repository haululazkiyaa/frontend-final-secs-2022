import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

class NotFound extends Component {
  state = {
    title: "404 Not Found",
  };

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    return (
      <React.Fragment>
        <div className="gradient-animation min-vh-100 d-flex flex-row align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="clearfix text-white">
                  <h1 className="float-start display-3 me-4">404</h1>
                  <h4 className="pt-3">Uups! terjadi kesalahan.</h4>
                  <p className="text-white">
                    Halaman yang anda cari tidak ditemukan.
                  </p>
                  <div class="text-center">
                    <Link to="/" class="btn btn-outline-light mt-3" type="button">
                      <svg className="icon me-2">
                        <use href="vendors/@coreui/icons/svg/free.svg#cil-home"></use>
                      </svg>
                      Back to home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(NotFound);
