import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Signup extends Component {
  state = {
    title: 'Signup'
  }

  componentDidMount(){
    document.title = this.state.title;
  }

    render() {
        return(
            <React.Fragment>
                <Sidebar />
                    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <Header data={this.state} />
                    <div className="body flex-grow-1 px-3">
                      <div className="container-lg">
                        <div className="card mb-4">
                          <div className="card-header">Signup</div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="bg-primary theme-color w-75 rounded mb-2" style={{paddingTop: '75%'}}></div>
                                <h6>Brand Primary Color</h6>
                              </div>
                              <div className="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="bg-secondary theme-color w-75 rounded mb-2" style={{paddingTop: '75%'}}></div>
                                <h6>Brand Secondary Color</h6>
                              </div>
                              <div className="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="bg-success theme-color w-75 rounded mb-2" style={{paddingTop: '75%'}}></div>
                                <h6>Brand Success Color</h6>
                              </div>
                              <div className="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="bg-danger theme-color w-75 rounded mb-2" style={{paddingTop: '75%'}}></div>
                                <h6>Brand Danger Color</h6>
                              </div>
                              <div className="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="bg-warning theme-color w-75 rounded mb-2" style={{paddingTop: '75%'}}></div>
                                <h6>Brand Warning Color</h6>
                              </div>
                              <div className="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="bg-info theme-color w-75 rounded mb-2" style={{paddingTop: '75%'}}></div>
                                <h6>Brand Info Color</h6>
                              </div>
                              <div className="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="bg-light theme-color w-75 rounded mb-2" style={{paddingTop: '75%'}}></div>
                                <h6>Brand Light Color</h6>
                              </div>
                              <div className="col-xl-2 col-md-3 col-sm-4 col-6 mb-4">
                                <div className="bg-dark theme-color w-75 rounded mb-2" style={{paddingTop: '75%'}}></div>
                                <h6>Brand Dark Color</h6>
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

export default withAuth(Signup)