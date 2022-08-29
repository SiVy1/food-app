import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../../comps/loader";
import Navbar from "../../comps/navbar";

export default function Order() {
  const router = useRouter();
  const [locationData, setLocationData] = useState<any>([]);
  useEffect(() => {
    const location = router.query.location;
    if (router.isReady) {
      const locationstring = location?.toString().toLowerCase();
      axios.get("/api/get/" + locationstring).then((data) => {
        console.log(data.data[0]);
        setLocationData(data.data[0]);
      });
    }
  }, [router.isReady]);
  if (locationData == null || locationData.lenght == 0) {
    return <Loader />;
  } else {
    return (
      <div>
        <Head>
          <title>FOOD-APP ORDER SOMETHING</title>
        </Head>
        <div className="container">
          <Navbar />
          <div className="order-con">
            <div className="hero">
              <div className="img-con">
                <Image
                  src={locationData?.background}
                  alt="hero img"
                  title="Kamil Gliwiński - unsplash"
                  layout="fill"
                />
              </div>
              <span className="title">{locationData?.location}</span>
            </div>
            <div className="res">
              {locationData?.res?.map((item: any) => {
                console.log(item);
                return (
                  <div className="res-con" key={item.name}>
                    <Image
                      src={item?.img}
                      alt="hero img"
                      title={`${item?.img_taker} - unsplash`}
                      layout="fill"
                    />
                    <Link href={item?.slug}>{item?.name}</Link>
                    <span className="res-cat">{item?.category}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
