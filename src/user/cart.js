import { useState, useEffect } from "react";
import swal from "sweetalert";


const Mycart = () => {
    let [allproduct, updateProduct] = useState([]);

    const getProduct = () => {
        let url = "http://localhost:1234/cart";
        fetch(url)
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray.reverse());
            })
    }

    useEffect(() => {
        getProduct();
    }, [1]);


    const delCart = (id, name) => {
        let url = "http://localhost:1234/cart/" + id;
        let postdata = { "method": "delete" }
        fetch(url, postdata)
            .then(response => response.json())
            .then(productArray => {
                getProduct()
                swal(name, "Delete from your Cart", "success")
            })
    }
    let total = 0;

    const updatecart = (product, input) => {
        if (input == "Y") {

            product["qty"] = product.qty + 1
        }
        else {
            product["qty"] = product.qty - 1
        }
        if (product.qty == 0) {
            delCart(product.id, product.name);
            // getProduct();
        }

        let url = "http://localhost:1234/cart/" + product.id;
        let postdata = {
            headers: { "Content-Type": "application/json" },
            method: "put",
            body: JSON.stringify(product)
        }
        fetch(url, postdata)
            .then(response => response.json())
            .then(productArray => {
                getProduct(); // reload the list after update
                swal(product.name, "Quntity Update To " + product.qty, "success")
                
            })


    }

    let [customer, pickCustomer] = useState("");
    let [mobile, pickMobile] = useState("");
    let [email, pickEmail] = useState("");
    let [address, pickAdderss] = useState("");

    const placeholder = () => {
        let url = "http://localhost:1234/order";
        let orderdata = {
            fullname:customer,email:email,mobile:mobile,address:address,itemlist:allproduct
        }
        let postdata = {
            headers: { "Content-Type": "application/json" },
            method: "post",
            body: JSON.stringify(orderdata)
        }
        fetch(url, postdata)
        .then(response => response.json())
        .then(info => {
            swal("Hi,"+customer + " We Have Reciverd Your Order " , "success")
            //for empty the cart

            // allproduct.map((p,index)=>{
            //     delCart(p.id,p.name);
            // })
        })
        
        pickCustomer(""); pickMobile(""); pickEmail(""); pickAdderss("");
    }


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3">
                    <div className="shadow-lg p-3">
                        <h4 className="text-center"> Customer Details</h4>
                        <div className="mb-3">
                            <label> Customer Name </label>
                            <input type="text" className="form-control"
                                value={customer} onChange={obj => pickCustomer(obj.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label> Mobile Number </label>
                            <input type="text" className="form-control"
                                value={mobile} onChange={obj => pickMobile(obj.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label> email id </label>
                            <input type="text" className="form-control"
                                value={email} onChange={obj => pickEmail(obj.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label> Address </label>
                            <textarea className="form-control"
                                value={address} onChange={obj => pickAdderss(obj.target.value)} /></div>
                        <div className="mb-3 text-center">
                            <button className="btn btn-danger" onClick={placeholder}> Place Order </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <h3 className="text-center"> {allproduct.length} : Item In Your Cart </h3>
                    <table className="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th> SL No </th>
                                <th> item Name </th>
                                <th> Photo </th>
                                <th> Quantity </th>
                                <th> Price </th>
                                <th> Total </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.map((product, index) => {
                                    total = total + (product.price * product.qty);
                                    return (
                                        <tr key={index}>
                                            <td> {index + 1} </td>
                                            <td> {product.name} </td>
                                            <td> <img src={product.photo} alt="" height="50" width="50" /> </td>
                                            <td className="input-group">
                                                <button className="btn btn-sm btn-info"
                                                    onClick={updatecart.bind(this, product, "Y")}> + </button>
                                                <input type="text" className="form-control"
                                                    readonly="readonly" value={product.qty} />
                                                <button className="btn btn-sm btn-warning"
                                                    onClick={updatecart.bind(this, product, "N")}> - </button>
                                            </td>
                                            <td> {product.price} </td>
                                            <td> {product.price * product.qty} </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm"
                                                    onClick={delCart.bind(this, product.id, product.name)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan="7" className="text-end bg-light text-primary">
                                    <b> Rs. {total} - Total Cost , {allproduct.length} Item In Cart </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Mycart;