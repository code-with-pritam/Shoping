import { useState } from "react";

const Myuser = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1> Manage User </h1>
                    <p>
                        Enter Name : <input type="text" className="M-3"/>
                        <button className="btn btn-primary m-3"> Save User </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Myuser;