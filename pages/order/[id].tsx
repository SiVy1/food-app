import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Loader from "../../comps/loader";
import Navbar from "../../comps/navbar";

export default function Order() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>([]);
  useEffect(() => {
    const id = router.query.id;
    if (router.isReady) {
      axios.get("/api/order/" + id).then((data: any) => {
        console.log(data);
        setOrderData(data.data[0]);
      });
    }
  }, [router.isReady]);
  if (orderData == null || orderData.length == 0) {
    return <Loader />;
  }
  return (
    <div className="container">
      <Navbar />
      <div>
        <div className="location-con">
          <span className="location-title">Your Order</span>
          <div className="location-creds">
            <span>Name: {orderData.location.name}</span>
            <span>Email: {orderData.location.email}</span>
            <span>Phone number: {orderData.location.number}</span>
            <span>Address: {orderData.location.address}</span>
          </div>
          <div className="order">
            {orderData.items?.map((item : any) =>{
              return(
                <div key={item.name}>
                  {item.name} {item.price}
                </div>
              )
            })}
            </div>
          </div> 
        </div>
    </div>
  );
}
