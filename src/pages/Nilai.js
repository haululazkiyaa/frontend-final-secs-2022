import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NilaiDosen from "../view/dosen/NilaiDosen";
import NilaiMahasiswa from "../view/mahasiswa/NilaiMahasiswa";

class Nilai extends Component {
  state = {
    // set page title
    title: "Nilai",
  };

  // handle first load
  componentDidMount() {
    document.title = this.state.title;

    // check active session
    this.props.sessionCheck();
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar data={this.state} />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <Header data={this.state} />
          <div className="body flex-grow-1 px-3">
            <div className="container-lg">
              <div className="card mb-4">
                <div className="card-header">{this.state.title}</div>
                <div className="card-body">
                  {this.props.userLoggedIn.Role === "MAHASISWA" ? (
                    <NilaiMahasiswa />
                  ) : (
                    <NilaiDosen />
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(Nilai);
