import React, { useEffect, useState } from "react";
import { Removecart } from "./../../Redux/Action/actions";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { proceeds } from "../../instance";
import CheckoutForm from "./checkoutForm";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51MaOSqE6HtvcwmMAdMy883aTXdyWTHnC8vQEIODCdn8OSGY8ePIRmlyGibnWuS9WYw1vqLYLRns32dQHzlmDVFr200yWroca7l');
const Proceed = () => {
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [type, setSerivce] = useState("");
  const [controllingTime, setControllingTime] = useState([]);
  const [timeCheck,setTimeCheck]=useState(false)

  const { cartItems } = useSelector((reducers) => reducers.cartReducer);

  const item = cartItems;
  useEffect(()=>{
 try {
     

       


      axios.get("http://localhost:5000/checkout")
      .then(data=>{
        
        
        setControllingTime(data);

      })
      .catch(error=>{
        console.log(error)
      })
    }
    catch (ex){
      console.log(ex)
    }
  },[])
  console.log(time,"==========>time")
  console.log(controllingTime,"check=========>data")

  const total = item
    .map((item) => Number(item.price))
    .reduce((prev, curr) => prev + curr, 0);
    const sending_data = {
        firstName:firstName,
        lastName:lastName,
        Phone: Phone,
        email:email,
        address:address,
        city:city,
        total:total,
        country:country,
        cartItems:cartItems,
        time:time
      }
 console.log(cartItems,"cardData")
  let handleSubmit = async (e) => {
    e.preventDefault();
     setTimeCheck(false);
    
   
    try {
      const data_order = {
        firstName:firstName,
        lastName:lastName,
        Phone: Phone,
        email:email,
        address:address,
        city:city,
        total:total,
        country:country,
        cartItems:cartItems,
        time:time
      }
     
 
      
 
  axios.post("http://localhost:5000/checkout",data_order)
      .then(data=>{
        console.log(data_order)
        console.log(data,"=============>data")
if(data?.data?.message==="checkout saved"){
alert("Address submitted successfully Submitted")
}if(data?.data?.message==="time change"){
  alert("please select another time")
}
      })
      .catch(error=>{
        console.log(error)
      })
}
     
    
    catch (ex){
      console.log(ex)
    }
  }
  let handleEasyPaisa = async (e) => {
    e.preventDefault();
    console.log(cartItems)
    try {
      const data_order = {
        firstName:firstName,
        lastName:lastName,
        Phone: Phone,
        email:email,
        address:address,
        city:city,
        total:total,
        country:country,
        cartItems:cartItems
      }

     


      axios.post("http://localhost:5000/checkout/easyPaisa",data_order)
      .then(data=>{
        console.log(data_order)
        console.log(data)
if(data.status=200){
alert("Address submitted successfully Submitted")
}else{
  alert("Check your connecteion Try again")
}
      })
      .catch(error=>{
        console.log(error)
      })
    }
    catch (ex){
      console.log(ex)
    }
  }
  // useEffect(() => {
  //   proceeds.get('checkout')
  //           .then(res => {
  //             setProduct(res.data)
  //             console.log("checkout",res)
  //           })
  //           .catch(err => {
  //               if (err.response.data.error) {
  //                   console.log(err.response.data.error)
  //               }
  //           })
  // }, [])
  return (
    <>
      <div className="container">
        <main>
          <div className="py-5 text-center">
            <img
              className="d-block mx-auto mb-4"
              src="https://cdn.pixabay.com/photo/2014/04/03/10/00/shopping-cart-309592__480.png"
              alt=""
              width="72"
              height="57"
            />
            <h2>Checkout form</h2>
            <p className="lead">
            Please provide the details necessary 
            for a complete product purchase, and for the salon to process your product.
            </p>
          </div>

          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>   <button
                          className=" btn btn-block btn-outline-dark mt-auto custom-button-primary"
                          onClick={() => {
                            dispatch(Removecart(cartItems));
                          }}
                        >
                          Clear Cart
                        </button>
                <span className="badge bg-primary rounded-pill">
                  {cartItems.length}
                </span>
              </h4>

              {cartItems.map((item) => {
                return (
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-muted">{item.description}</small>
                      </div>
                      <span className="text-muted">Rs {item.price}</span>
                    </li>
                  </ul>
                );
              })}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (Rs)</span>
                <strong>Rs.{total}</strong>
              </li>
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form onSubmit={handleSubmit} className="needs-validation" novalidate>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label for="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label for="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label for="Phone" className="form-label">
                      Phone
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text"></span>
                      <input
                        type="number"
                        className="form-control"
                        id="Phone"
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <div className="invalid-feedback">
                        Your Phone is required.
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label for="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label for="address" className="form-label">
                      Adress
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="1234 Main St"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="col-12">
                    <label for="address2" className="form-label">
                      Booking (date and time): <span className="text-muted"></span>
                    </label>
                    <input
                      type="datetime-local"
                      step="1800"
                      id="time"
                      name="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div className="col-md-5">
                    <label for="country" className="form-label">
                      Country
                    </label>
                    <select
                      className="form-select"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      <option value="">Choose...</option>
                      <option>Pakistan</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>

                  <div className="col-md-5">
                    <label for="country" className="form-label">
                      Type
                    </label>
                    <select
                      className="form-select"
                      id="type"
                      value={type}
                      onChange={(e) => setSerivce(e.target.value)}
                      required
                    >
                      <option value="">Choose...</option>
                      <option>Product</option>
                    </select>
                    <div className="invalid-feedback">Please select the type</div>
                  </div>

                  <div className="col-md-4">
                    <label for="state" className="form-label">
                      City
                    </label>
                    <select
                      className="form-select"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    >
                      <option value="">Choose...</option>
                      <option>Islamabad</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid city.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label for="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                  />
                  <label className="form-check-label" for="same-address">
                    Shipping address is the same as my billing address
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="save-info"
                  />
                  <label className="form-check-label" for="save-info">
                    Save this information for next time
                  </label>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Payment</h4>

                <div className="my-3">
                  <div className="form-check">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      checked
                      required
                    />
                    <label className="form-check-label" for="credit">
                      Credit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label" for="debit">
                      Debit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label" for="paypal">
                      PayPal
                    </label>
                  </div>
                </div>

                <div className="row gy-3">
                  <div className="col-md-6">
                    <label for="cc-name" className="form-label">
                      Name on card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder=""
                      required
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">Name on card is required</div>
                  </div>

                  <div className="col-md-6">
                    <label for="cc-number" className="form-label">
                      Credit card number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label for="cc-expiration" className="form-label">
                      Expiration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">Expiration date required</div>
                  </div>

                  <div className="col-md-3">
                    <label for="cc-cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-cvv"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">Security code required</div>
                  </div>
                </div>*/}

                <hr className="my-4" />

                <button className="w-100 btn btn-dark btn-lg" type="submit" >
                  Continue to checkout
                </button>
                
                 
              </form>
              <Elements stripe={stripePromise} >
                            <CheckoutForm userData={sending_data} />
                  </Elements>
            </div>
          </div>
        </main>

        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">&copy; 2017–2021 Company Name</p>
          <ul className="list-inline"></ul>
        </footer>
      </div>
    </>
  );
};

export default Proceed;
