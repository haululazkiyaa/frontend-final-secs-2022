import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

class Registrasi extends Component {
  state = {
    // page title
    title: "Registrasi",
    // registration form data
    username: "",
    password: "",
    role: "MAHASISWA",
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

  // handle registration form submit
  handleSubmit = (e) => {
    e.preventDefault();

    // handle user registration
    this.props.register(this.state);
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
              <div className="col-md-6">
                <div className="card shadow-none">
                  <div className="card-body p-4">
                    <img
                      src="https://masulyablog.sirv.com/secs2022/register.png"
                      alt="Ilustrasi registrasi akun"
                      width="150"
                    />
                    <h1>{this.state.title}</h1>
                    <p className="text-medium-emphasis">
                      Silahkan melakukan registrasi akun terlebih dahulu untuk
                      mengkases layanan Telkom University.
                    </p>
                    <form onSubmit={this.handleSubmit}>
                      <div className="mb-3 row g-3 align-items-center">
                        <div className="col-auto">
                          <label
                            className="col-form-label"
                            htmlFor="selectRole"
                          >
                            Registrasi sebagai:
                          </label>
                        </div>
                        <div className="col-auto">
                          <select
                            className="form-select"
                            id="selectRole"
                            name="role"
                            onChange={this.handleChange}
                            required
                          >
                            <option disabled>Pilih</option>
                            <option value="MAHASISWA">Mahasiswa</option>
                            <option value="DOSEN">Dosen</option>
                          </select>
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <svg className="icon">
                            <use href="vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                          </svg>
                        </span>
                        <input
                          className="form-control"
                          name="name"
                          type="text"
                          placeholder="Nama Lengkap"
                          onChange={this.handleChange}
                          required
                        />
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
                      <div className="input-group mb-4">
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
                      <button
                        className="btn btn-block btn-danger text-white"
                        type="submit"
                        disabled={this.props.isLoading === true}
                      >
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                          hidden={this.props.isLoading === false}
                        ></span>
                        Registrasi akun
                      </button>
                    </form>
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

export default withAuth(Registrasi);
