import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import Script from 'next/script';
import hmac_sha256 from 'crypto-js/hmac-sha256';
import React from 'react';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const [btnstatus, setBtnstatus] = useState(true)
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();
  const [cartdata, setCartdata] = useState({});
  var check = cart.products.length;
  useEffect(() => {
    if (check > 0) {
      setBtnstatus(false);
    }
  }, [])
  // setBtnstatus(!check);
  // (cart.products.length<0) ?"":setBtnstatus(false);
  // console.log("length is "+ cart.products.)
  var extra = [];
  var name, productimg, price, quantity, orderid;

  const handler = async () => {
    var data = JSON.stringify({
      "amount": amount * 100
    });

    var config = {
      method: 'post',
      url: 'https://razorpay-server-food.herokuapp.com/create/orderId',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    try {
      const res = await axios(config);
      console.log(res.data.orderId)
      action(res.data.orderId);

    } catch (error) {
      console.log(error);
    }
    // action(order_id)
  }

  const action = async (orderId) => {


    var options = {
      "key": "rzp_test_rmgBLkcnLVVN5T", // Enter the Key ID generated from the Dashboard
      // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "CSE Project",
      "description": "Test Transaction",
      "image": "data:image/jpeg;base64,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",
      "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response) {
        console.log(response)
        var generated_signature = hmac_sha256(orderId+ "|" + response.razorpay_payment_id, 'yDLn50ZHqLX4mKM2u2LVzRob');

        if (generated_signature == response.razorpay_signature) {
          alert("payment is successful")
          saveorder(1);
        }
        else 
        {
          alert("Signature not verified")
        }

      },

      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      console.log(response)
    });
    rzp1.open();
    // e.preventDefault();

  }

  const orderlist = () => {
    console.log(cart)
  }
  const saveorder = async (type) => {
    cartdata.method = type;
    console.log(cartdata);
    try {
      const res = await axios.post("https://food-ordering-gold.vercel.app/api/orders", cartdata);
     await cart.products.map(async (product) => {
        orderid = res.data._id;
        name = product.title;
        productimg = product.img;
        quantity = product.quantity;
        price = product.price;
        product.extras.map((item) => extra.push(item.text));
        const listitem = {
          name,
          price,
          extra,
          quantity,
          productimg,
          orderid,
        }

        console.log(listitem);
        extra = [];

        try {
          const res1 = await axios.post("https://food-ordering-gold.vercel.app/api/orderlists", listitem);

        } catch (error) {
          console.log(error)
        }

      })
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const createOrder = async (data) => {
    setCash(false);
    setCartdata(data);
    return 0;

  };



  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>Rs {product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    Rs {product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>Rs {cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>Rs 0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>Rs {cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => { saveorder(0);alert("Order Placed.") }}
              >
                CASH ON DELIVERY
              </button>
              <Script src="https://checkout.razorpay.com/v1/checkout.js" />
              <button
                className={styles.payButton}
                onClick={(e)=>handler(e) }
              >
                Razorpay
              </button>


            </div>
          ) : (
            <button disabled={btnstatus} onClick={() => { setOpen(true); orderlist(); setCash(true) }} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
