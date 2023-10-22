import { useState, useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";



const Myhome = () => {
    let [allproduct, updateProduct] = useState([]);

    const getProduct = () => {
        let url = "http://localhost:1234/product";
        fetch(url)
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray.reverse());
            })
    }

    useEffect(() => {
        getProduct();
    }, [1]);

    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    const addtocart = async (productinfo) => {
        productinfo["qty"] = 1
        let url = "http://localhost:1234/cart"
        let postdata = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(productinfo)
        }
        try {
            await fetch(url, postdata)
                .then(response => response.json())
                .then(pinfo => {
                    swal(productinfo.name, "Added In your cart", "success")
                })
        }
        catch (error) {
            swal(productinfo.name, "Already Your Cart", "warning")
        }
    }

    let [keyword, updateKeyword] = useState("");

    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="Mango.jpg" className="d-block w-100 " height="400" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5> Shoop From Home </h5>
                            <p> The Online shop is open 24/7 all the day </p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="shoes.png" className="d-block w-100" height="400" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5> 50% Discount on all Item </h5>
                            <p> If You can bay 4 you will get 8 </p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="Mango.jpg" className="d-block w-100" height="400" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5> Kids, Female,Male </h5>
                            <p> You can return in 7 day </p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-lg-8"></div>
                    <div className="col-lg-4">
                        <input type="text" placeholder="Search" id="" className="form-control"
                            onChange={obj => updateKeyword(obj.target.value)} />
                    </div>
                </div>

                <div className="row mt-4 mb-5">
                    {

                        allproduct.slice(offset, offset + PER_PAGE).map((product, index) => {
                            if (product.name.toLowerCase().includes(keyword.toLowerCase()) || product.price.includes(keyword)) {

                                return (

                                    <div className="col-lg-3 mb-5" key={index}>
                                        <div className="p-3 border rounded">
                                            <h4 className="text-center text-primary">{product.name}</h4>
                                            <img src={product.photo} className="rounded" height="200" width="100%" alt="" />
                                            <p className="mt-2 mb-2"> {product.details} </p>
                                            <p className="p-3 rounded border text-primary text-center"> {product.price} </p>

                                            <p className="text-center mt-2 bt-block">
                                                <button className="btn btn-danger" onClick={addtocart.bind(this, product)}>
                                                    <i className="fa fa-plus"> Add To Cart
                                                    </i>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className="mb-4 mt-4">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination  justify-content-center"}
                        pageClassName={"page-item "}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active primary"}
                    />
                </div>
            </div>
            <footer class="bg-dark text-center text-white">
                <div class="container p-4">
                    <section class="mb-4">
                        <a class="btn btn-outline-light btn-floating m-1" href="" role="button"
                        ><i class="fab fa-facebook-f"></i
                        ></a>

                        <a class="btn btn-outline-light btn-floating m-1" href="" role="button"
                        ><i class="fab fa-twitter"></i
                        ></a>

                        <a class="btn btn-outline-light btn-floating m-1" href="" role="button"
                        ><i class="fab fa-google"></i
                        ></a>

                        <a class="btn btn-outline-light btn-floating m-1" href="" role="button"
                        ><i class="fab fa-instagram"></i
                        ></a>

                        <a class="btn btn-outline-light btn-floating m-1" href="" role="button"
                        ><i class="fab fa-linkedin-in"></i
                        ></a>

                        <a class="btn btn-outline-light btn-floating m-1" href="" role="button"
                        ><i class="fab fa-github"></i
                        ></a>
                    </section>

                    <section class="">
                        <form action="">
                            <div class="row d-flex justify-content-center">
                                <div class="col-auto">
                                    <p class="pt-2">
                                        <strong>Sign up for our newsletter</strong>
                                    </p>
                                </div>

                                <div class="col-md-5 col-12">
                                    <div class="form-outline form-white mb-4">
                                        <input type="email" id="form5Example21" class="form-control" />
                                        <label class="form-label" for="form5Example21">Email address</label>
                                    </div>
                                </div>

                                <div class="col-auto">
                                    <button type="submit" class="btn btn-outline-light mb-4">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>

                    <section class="mb-4">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
                            repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
                            eum harum corrupti dicta, aliquam sequi voluptate quas.
                        </p>
                    </section>

                    <section class="">
                        <div class="row">
                            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 class="text-uppercase">Links</h5>

                                <ul class="list-unstyled mb-0">
                                    <li>
                                        <a href="" class="text-white">Link 1</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 2</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 3</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 4</a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 class="text-uppercase">Links</h5>

                                <ul class="list-unstyled mb-0">
                                    <li>
                                        <a href="" class="text-white">Link 1</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 2</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 3</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 4</a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 class="text-uppercase">Links</h5>

                                <ul class="list-unstyled mb-0">
                                    <li>
                                        <a href="" class="text-white">Link 1</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 2</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 3</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 4</a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 class="text-uppercase">Links</h5>

                                <ul class="list-unstyled mb-0">
                                    <li>
                                        <a href="" class="text-white">Link 1</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 2</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 3</a>
                                    </li>
                                    <li>
                                        <a href="" class="text-white">Link 4</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="text-center p-3" >
                    © 2020 Copyright:
                    <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
            </footer>
        </>
    )
}

export default Myhome;