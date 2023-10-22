import { useState } from "react";
import swal from "sweetalert";
const Myregister = () =>{
    let[fullname,pickName] = useState("");
    let[mobile,pickMobile] = useState("");
    let[email,pickEmail] = useState("");
    let[password,pickPassword] = useState("");

    const save =()=>{
        let formStatus = true;

        // name validation 
        if(fullname==""){
            formStatus = false;
            // updateNameError("Invalid product name !");
        }else{
            // updateNameError("");
        }

        // mobile validation 
        var mpattern = /^[0]?[6789]\d{9}$/
        if( !mpattern.test(mobile))
        {
            formStatus = false;  
        }
        // email validation 
        var epatern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(! epatern.test(email))
        {
            formStatus = false; 
        }
        //password validation
        if(password ==="")
        {
            formStatus = false; 
        }
        

        if (formStatus === false)
        {
            swal("Invalid Input ","please fill The required field","warning")
        }else{
            let url = "http://localhost:1234/account";
            let userdata = {
                name:fullname,
                mobile:mobile,
                email:email,
                password:password
            }
            let postdata = {
                headers: {'Content-Type' : 'application/json'},
                method: "POST",
                body: JSON.stringify(userdata) 
            }
            fetch(url,postdata)
            .then(response=>response.json())
            .then(sellerinfo=>{
                swal("Welcome,"+ fullname +"Your Account Created Successfully !","success")
                pickName();pickMobile();pickEmail();pickPassword();
            })
                
        }
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="border rounded p-4">
                        <h3 className="mb-4"> <i className="fa fa-user-plus"></i> Create New Account </h3>
                        <p className="text-denger">* Marked Field Are Mandatory </p>
                        <div className="mb-3">
                            <label> Seller Name <i className="text-danger">*</i> </label>
                            <input type="text" className="form-control mt-2" value={fullname}
                            onChange={obj=>pickName( obj.target.value )}/>
                        </div>
                        <div className="mb-3">
                            <label> Mobile No <i className="text-danger">*</i> </label>
                            <input type="number" className="form-control mt-2" value={mobile}
                            onChange={obj=>pickMobile( obj.target.value )}/>
                        </div>
                        <div className="mb-3">
                            <label> e-Mail Id <i className="text-danger">*</i> </label>
                            <input type="email" className="form-control mt-2" value={email}
                            onChange={obj=>pickEmail( obj.target.value )}/>
                        </div>
                        <div className="mb-3">
                            <label> Password <i className="text-danger">*</i> </label>
                            <input type="password" className="form-control mt-2" value={password}
                            onChange={obj=>pickPassword( obj.target.value )}/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={save}> Create Account </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Myregister;