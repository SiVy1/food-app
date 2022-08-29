import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../../comps/loader";
import Navbar from "../../comps/navbar";
import { useForm } from "react-hook-form";

export default function RESTAURANT() {
  const router = useRouter();
  const [displayCart, setDisplayCart] = useState(true);
  const [restaurantData, setRestaurantData] = useState<any>([]);
  const [cartArray, setCartArray] = useState<any>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    let random = Math.floor(Math.random() * 100000000);
    axios.post("/api/order", { random, cartArray, sum, data});
    setTimeout(() => {
      window.location.replace(`/order/${random}`);
    }, 1000);
  };
  function buyItems(items: any, sum: any) {}
  useEffect(() => {
    const restaurant = router.query.res;
    if (router.isReady) {
      const restaurantstring = restaurant?.toString().toLowerCase();
      axios.get("/api/restaurant/" + restaurant).then((data: any) => {
        setRestaurantData(data.data[0]);
      });
    }
  }, [router.isReady]);
  function addToCart(item: string, price: any) {
    setCartArray((prev: any) => [
      ...prev,
      {
        name: item,
        price: price,
      },
    ]);
  }
  let sum = 0;
  function cart() {
    if (cartArray.length == 0 || cartArray == null) {
      return <div></div>;
    } else {
      return cartArray.map((item: any) => {
        let price = item.price.replace("$", "");
        price = Number(price);
        sum = sum + price;
        return (
          <div className="cart-in">
            <div className="items">
              <span>{item.name}</span>
              <span className="right">{item.price}</span>
            </div>
          </div>
        );
      });
    }
  }
  if (restaurantData == null || restaurantData.length == 0) {
    return <Loader />;
  } else {
    return (
      <div>
        <Head>
          <title>FOOD-APP ORDER SOMETHING</title>
        </Head>
        <div className="container">
          <Navbar />
          <div className="res-con">
            <div className="hero">
              <div className="img-con">
                <Image
                  src={restaurantData?.img}
                  alt="hero img"
                  title="Kamil Gliwiński - unsplash"
                  layout="fill"
                />
              </div>
              <span className="title">{restaurantData?.name}</span>
            </div>
            <div className="menu-grid">
              <div className="menu">
                {restaurantData?.menu.map((item: any) => {
                  return (
                    <div className="menu_item">
                      <div className="top">
                        <span className="item_title">{item.name}</span>
                      </div>
                      <div className="bottom">
                        <span className="item_price">{item.price}</span>
                        <span className="item_in">{item.ingredients}</span>
                      </div>
                      <button
                        className="button"
                        onClick={() => addToCart(item.name, item.price)}
                      >
                        Add
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="cart">
                <span className="cart_title">CART</span>
                <div
                  className="cart-arr"
                  style={{ display: displayCart ? "inline" : "none" }}
                >
                  {cart()}
                  <div className="sum">
                    <span className="sum-span">
                      SUM: ${(Math.round(sum * 100) / 100).toFixed(2)}
                    </span>
                    <div className="right">
                      <button
                        className="button green"
                        onClick={() => setCartArray([])}
                      >
                        CLEAR
                      </button>
                      <button
                        className="button"
                        onClick={() => setDisplayCart(!displayCart)}
                      >
                        BUY
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ display: displayCart ? "none" : "inline" }}>
                  <span>ENTER INFORMATION</span>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      placeholder="First name"
                      {...register("name", { required: true, maxLength: 80 })}
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      {...register("number", {
                        required: true,
                        minLength: 6,
                        maxLength: 12,
                      })}
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      {...register("address", { required: true })}
                    />
                    <input type="submit" className="button" />
                  </form>
                </div>
                <div className="cart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
