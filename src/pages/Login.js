import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";

class Login extends Component {
  state = {
    // page title
    title: "Login",
    // login form data
    username: "",
    password: "",
  };

  // handle first load
  componentDidMount() {
    document.title = this.state.title;
  }

  // handle form input
  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // handle login form submit
  handleSubmit = (e) => {
    e.preventDefault();

    // handle user login
    this.props.login(this.state);
  };

  render() {
    // handle active session
    if (this.props.isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <React.Fragment>
        <div className="gradient-animation min-vh-100 d-flex flex-row align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card-group d-block d-md-flex row">
                  <div className="card shadow-none col-md-7 p-4 mb-0">
                    <div className="card-body">
                      <img
                        src="https://masulyablog.sirv.com/secs2022/login.png"
                        alt="Ilustrasi pengguna login"
                        width="150"
                      />
                      <h1>{this.state.title}</h1>
                      <p className="text-medium-emphasis">
                        Silahkan login menggunakan akun anda untuk mengakses
                        layanan Telkom University.
                      </p>
                      <form onSubmit={this.handleSubmit}>
                        <div
                          class="alert alert-warning alert-dismissible fade show"
                          role="alert"
                          hidden={this.props.responseMessage === ""}
                        >
                          {this.props.responseMessage}
                          <button
                            type="button"
                            class="btn-close"
                            data-coreui-dismiss="alert"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/free.svg#cil-credit-card"></use>
                            </svg>
                          </span>
                          <input
                            className="form-control"
                            name="username"
                            type="text"
                            minLength="10"
                            maxLength="10"
                            placeholder="NIM/NIP"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                            </svg>
                          </span>
                          <input
                            className="form-control"
                            name="password"
                            type="password"
                            placeholder="Kata Sandi"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <button
                              className="btn btn-danger text-white px-4"
                              type="submit"
                              disabled={this.props.isLoading === true}
                            >
                              <span
                                class="spinner-border spinner-border-sm me-2"
                                role="status"
                                hidden={this.props.isLoading === false}
                              ></span>
                              Login
                            </button>
                          </div>
                          <div className="col-6 text-end">
                            <Link
                              to="/"
                              className="btn btn-link text-danger px-0"
                              type="button"
                            >
                              Butuh bantuan?
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card col-md-5 text-white glass-m py-5">
                    <div className="card-body text-center">
                      <div>
                        <h2 className="mb-4">Registrasi</h2>
                        <img
                          src="https://masulyablog.sirv.com/secs2022/login-reg.png"
                          alt="Registrasi"
                          width="150"
                        />
                        <p>
                          Dosen atau Mahasiswa yang belum memiliki akun silahkan
                          melakukan registrasi akun baru terlebih dahulu.
                        </p>
                        <Link
                          to="/pendaftaran"
                          className="btn btn-outline-light mt-3"
                          type="button"
                        >
                          <svg className="icon me-2">
                            <use href="vendors/@coreui/icons/svg/free.svg#cil-user-plus"></use>
                          </svg>
                          Registrasi akun baru
                        </Link>
                      </div>
                    </div>
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

export default withAuth(Login);
