import React, { Component } from "react";
import { withAuth } from "../../context/AuthContext";

class NilaiMahasiswa extends Component {
    render() {
        return(
            <React.Fragment>
                <h1>Saya Mahasiswa</h1>
            </React.Fragment>
        )
    }
}

export default withAuth(NilaiMahasiswa)