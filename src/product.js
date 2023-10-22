import { useState } from "react";

const Myproduct = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 text-center mb-4">
                    <h1> Manage Product </h1>

                </div>
                <p className="col-lg-3">
                    Product Name : <input type="text" className="M-3" />
                </p>
                <p className="col-lg-3">
                    Product Price : <input type="text" className="M-3" />
                </p>
                <p className="col-lg-3">
                    Product Photo : <input type="text" className="M-3" />
                </p>
                <p className="col-lg-3">
                    <button className="btn btn-primary"> Save Product </button>
                </p>
               
            </div>
        </div>
    )
}

export default Myproduct;