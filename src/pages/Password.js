import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Password extends Component {
  state = {
    title: 'Ganti Kata Sandi'
  }

  componentDidMount(){
    document.title = this.state.title;
    this.props.sessionCheck();
  }

    render() {
        return(
            <React.Fragment>
                <Sidebar data={this.state} />
                  <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                  <Header data={this.state} />
                    <div className="body flex-grow-1 px-3 d-flex flex-row align-items-center">
                        <div className="container-lg">
                          <div className="row justify-content-center">
                              <div className="col-md-6">
                                <div className="card mb-4 mx-4">
                                  <div className="card-body p-4">
                                    <img src="https://i.ibb.co/qJ3BLj6/undraw-Forgot-password-re-hxwm.png" alt="signup" width="150" />
                                    <h1>{this.state.title}</h1>
                                    <p className="text-medium-emphasis">Silahkan masukan kata sandi baru untuk mengganti kata sandi saat ini.</p>
                                    <div className="input-group mb-3"><span className="input-group-text">
                                        <svg className="icon">
                                          <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                                        </svg></span>
                                      <input className="form-control" type="password" placeholder="Kata Sandi Baru" />
                                    </div>
                                    <div className="input-group mb-4"><span className="input-group-text">
                                        <svg className="icon">
                                          <use href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                                        </svg></span>
                                      <input className="form-control" type="password" placeholder="Ulangi Kata Sandi" />
                                    </div>
                                    <button to="login" className="btn btn-block btn-danger text-white" type="button">Ganti Kata Sandi</button>
                                  </div>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    <Footer />
                  </div>
            </React.Fragment>
        )
    }
}

export default withAuth(Password)