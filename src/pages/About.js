import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

class About extends Component {
  state = {
    title: 'Tentang PAMa'
  }

  componentDidMount() {
    document.title = this.state.title;
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
              <div className="row">
                <div className="col-lg-6">
                  <div className="card mb-4">
                    <div className="card-header">{this.state.title}</div>
                    <div className="card-body">
                      <p><strong>Portal Akademik Mahasiswa</strong> disingkat <strong>PAMa</strong> merupakan aplikasi berbasis website yang terinspirasi dari Sistem Akademik Mahasiswa atau lebih dikenal dengan SIAkad. Fitur-fitur PAMA juga terinspirasi dari SIAKad seperti laman Jadwal Kuliah dan Ujian dan laman Nilai.</p>
                      <h2>Latar Belakang</h2>
                      <p>Aplikasi ini dibuat khusus untuk memenuhi tugas <strong>Software Engineer Competition Scholarship (SECS) 2022</strong> yang diselenggarakan oleh <strong>Telkom University</strong>.</p>
                      <h2>Pengembangan</h2>
                      <p>Pengembangan aplikasi ini diinisiasi oleh TIM II yang terdiri dari tiga orang, yakni sebagai berikut:</p>
                      <ul>
                        <li><strong>Muhammad Haulul Azkiyaa</strong> (Frontend)</li>
                        <li><strong>Juan Dharmananda Khusuma</strong> (Backend)</li>
                        <li><strong>P e r d i</strong> (Backend)</li>
                      </ul>
                      <h2>Teknologi</h2>
                      <div className="row">
                        <div className="col">
                          <span>FE stack:</span>
                          <div class="avatar bg-success text-white m-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-node-js"></use>
                            </svg>
                          </div>
                          <div class="avatar bg-info text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-react"></use>
                            </svg>
                          </div>
                          <div class="avatar bg-dark text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-coreui-c"></use>
                            </svg>
                          </div>
                          <div class="avatar bg-warning text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-html5-shield"></use>
                            </svg>
                          </div>
                          <div class="avatar bg-primary text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-css3-shiled"></use>
                            </svg>
                          </div>
                          <div class="avatar bg-secondary text-white">
                            <strong>+2</strong>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <span>BE stack:</span>
                          <div class="avatar bg-success text-white m-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-node-js"></use>
                            </svg>
                          </div>
                          <div class="avatar bg-secondary text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-postgresql"></use>
                            </svg>
                          </div>
                          <div class="avatar bg-secondary text-white">
                            <strong>+2</strong>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <button class="btn btn-primary me-2" type="button">
                        <svg class="icon me-2">
                          <use href="vendors/@coreui/icons/svg/brand.svg#cib-docusign"></use>
                        </svg>Unduh Dokumentasi
                      </button>
                      <button class="btn btn-success text-white" type="button">
                        <svg class="icon me-2">
                          <use href="vendors/@coreui/icons/svg/brand.svg#cib-github"></use>
                        </svg>Unduh Source Code
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-4">
                        <img src="https://avatars.githubusercontent.com/u/105899777" class="img-fluid rounded-start" alt="..." />
                      </div>
                      <div class="col-8">
                        <div class="card-body">
                          <p class="badge text-bg-success text-white">Frontend</p>
                          <h5 class="card-title">Muhammad Haulul Azkiyaa</h5>
                          <p class="card-text">SMAN Tanjungsari</p>
                          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-danger text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-gmail"></use>
                              </svg>
                            </button>
                            <button type="button" class="btn btn-info text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-instagram"></use>
                              </svg>
                            </button>
                            <button type="button" class="btn btn-dark text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-github"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-4">
                        <img src="https://raw.githubusercontent.com/juankhusuma/juankhusuma/main/profile_pic.jpeg" class="img-fluid rounded-start" alt="..." />
                      </div>
                      <div class="col-8">
                        <div class="card-body">
                          <p class="badge text-bg-warning">Backend</p>
                          <h5 class="card-title">Juan Dharmananda Khusuma</h5>
                          <p class="card-text">SMAN 1 Tembilahan</p>
                          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-danger text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-gmail"></use>
                              </svg>
                            </button>
                            <button type="button" class="btn btn-info text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-instagram"></use>
                              </svg>
                            </button>
                            <button type="button" class="btn btn-dark text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-github"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-4">
                        <img src="https://avatars.githubusercontent.com/u/108800230" class="img-fluid rounded-start" alt="..." />
                      </div>
                      <div class="col-8">
                        <div class="card-body">
                          <p class="badge text-bg-warning">Backend</p>
                          <h5 class="card-title">P e r d i</h5>
                          <p class="card-text">SMAN 2 Pangkep</p>
                          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-danger text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-gmail"></use>
                              </svg>
                            </button>
                            <button type="button" class="btn btn-info text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-instagram"></use>
                              </svg>
                            </button>
                            <button type="button" class="btn btn-dark text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-github"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
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

export default withAuth(About)