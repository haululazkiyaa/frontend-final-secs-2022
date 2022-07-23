import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DataTable from 'react-data-table-component';
import NilaiDosen from "../view/dosen/NilaiDosen";
import NilaiMahasiswa from "../view/mahasiswa/NilaiMahasiswa";

class Nilai extends Component {
  state = {
    title: 'Nilai'
  }

  componentDidMount(){
    document.title = this.state.title;
    this.props.sessionCheck();
  }

    render() {
      const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
    ];
    
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

        return(
            <React.Fragment>
                <Sidebar data={this.state} />
                    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <Header data={this.state} />
                    <div className="body flex-grow-1 px-3">
                      <div className="container-lg">
                        <div className="card mb-4">
                          <div className="card-header">{this.state.title}</div>
                          <div className="card-body">
                            {
                              this.props.user.Role === "MAHASISWA" ? <NilaiMahasiswa />
                                                                    : <NilaiDosen />
                            }
                            <DataTable
                                columns={columns}
                                data={data}
                                selectableRows
                            />
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

export default withAuth(Nilai)