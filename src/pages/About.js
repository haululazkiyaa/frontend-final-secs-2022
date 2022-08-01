import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
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
                          <div className="avatar bg-success text-white m-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-node-js"></use>
                            </svg>
                          </div>
                          <div className="avatar bg-info text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-react"></use>
                            </svg>
                          </div>
                          <div className="avatar bg-dark text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-coreui-c"></use>
                            </svg>
                          </div>
                          <div className="avatar bg-warning text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-html5-shield"></use>
                            </svg>
                          </div>
                          <div className="avatar bg-primary text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-css3-shiled"></use>
                            </svg>
                          </div>
                          <div className="avatar bg-secondary text-white">
                            <strong>+2</strong>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <span>BE stack:</span>
                          <div className="avatar bg-success text-white m-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-node-js"></use>
                            </svg>
                          </div>
                          <div className="avatar bg-secondary text-white me-2">
                            <svg className="icon">
                              <use href="vendors/@coreui/icons/svg/brand.svg#cib-postgresql"></use>
                            </svg>
                          </div>
                          <div className="avatar bg-secondary text-white">
                            <strong>+2</strong>
                          </div>
                        </div>
                      </div>
                      <h2>Credit</h2>
                      <ul>
                        <li><strong>Foto Telkom Univeristy </strong>- https://unsplash.com/photos/FcLyt7lW5wg</li>
                        <li><strong>Foto wanita memegang folder </strong>- https://unsplash.com/photos/FcLyt7lW5wg</li>
                      </ul>
                      <hr />
                      <Link to="" className="btn btn-primary me-2" type="button">
                        <svg className="icon me-2">
                          <use href="vendors/@coreui/icons/svg/brand.svg#cil-book"></use>
                        </svg>Dokumentasi
                      </Link>
                      <Link to="https://github.com/haululazkiyaa/frontend-final-secs-2022#readme" className="btn btn-success text-white" type="button">
                        <svg className="icon me-2">
                          <use href="vendors/@coreui/icons/svg/brand.svg#cib-github"></use>
                        </svg>Source Code
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-4">
                        <img src="https://masulyablog.sirv.com/secs2022/haulul.jpg" className="img-fluid rounded-start" alt="Foto Muhammad Haulul Azkiyaa" />
                      </div>
                      <div className="col-8">
                        <div className="card-body">
                          <p className="badge text-bg-success text-white">Frontend</p>
                          <h5 className="card-title">Muhammad Haulul Azkiyaa</h5>
                          <p className="card-text">SMAN Tanjungsari</p>
                          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <a href="mailto:haululazkiya@gmail.com" type="button" className="btn btn-danger text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-gmail"></use>
                              </svg>
                            </a>
                            <a href="https://instagram.com/haululazkiyaa" type="button" className="btn btn-info text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-instagram"></use>
                              </svg>
                            </a>
                            <a href="https://github.com/haululazkiyaa" type="button" className="btn btn-dark text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-github"></use>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-4">
                        <img src="https://masulyablog.sirv.com/secs2022/juan.jpeg" className="img-fluid rounded-start" alt="Foto Juan D. Khusuma" />
                      </div>
                      <div className="col-8">
                        <div className="card-body">
                          <p className="badge text-bg-warning">Backend</p>
                          <h5 className="card-title">Juan Dharmananda Khusuma</h5>
                          <p className="card-text">SMAN 1 Tembilahan</p>
                          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <a href="https://www.instagram.com/juan.d.khusuma" type="button" className="btn btn-info text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-instagram"></use>
                              </svg>
                            </a>
                            <a href="https://github.com/juankhusuma" type="button" className="btn btn-dark text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-github"></use>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-4">
                        <img src="https://masulyablog.sirv.com/secs2022/perdi.jpg" className="img-fluid rounded-start" alt="Foto Perdi" />
                      </div>
                      <div className="col-8">
                        <div className="card-body">
                          <p className="badge text-bg-warning">Backend</p>
                          <h5 className="card-title">P e r d i</h5>
                          <p className="card-text">SMAN 2 Pangkep</p>
                          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <a href="https://www.instagram.com/stei_if" type="button" className="btn btn-info text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-instagram"></use>
                              </svg>
                            </a>
                            <a href="https://github.com/perdiDev" type="button" className="btn btn-dark text-white">
                              <svg className="icon">
                                  <use href="vendors/@coreui/icons/svg/brand.svg#cib-github"></use>
                              </svg>
                            </a>
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