import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";

class Footer extends Component {
    render() {
        return(
            <React.Fragment>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </React.Fragment>
        )
    }
}

export default withAuth(Footer)