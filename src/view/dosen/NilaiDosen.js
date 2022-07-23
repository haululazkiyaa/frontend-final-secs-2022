import React, { Component } from "react";
import { withAuth } from "../../context/AuthContext";

class NilaiDosen extends Component {
    render() {
        return(
            <React.Fragment>
                <h1>Saya Dosen</h1>
            </React.Fragment>
        )
    }
}

export default withAuth(NilaiDosen)