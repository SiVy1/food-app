import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../../comps/navbar'

export default function RESTAURANT() {
    const router = useRouter()
    const [restaurantData, setRestaurantData] = useState<any>([])
    useEffect(() => {
        const restaurant = router.query.res
        if(router.isReady) {
            const restaurantstring = restaurant?.toString().toLowerCase()
            axios.get('/api/'+restaurant).then((data : any) => {
                console.log(data.data[0])
                setRestaurantData(data.data[0])
            })
    }}, [router.isReady])
  return (
    <div>
      <Head>
        <title>FOOD-APP ORDER SOMETHING</title>
      </Head>
      <div className='container'>
      <Navbar />
      <div className='res-con'>
        <div className="hero">
          <div className="img-con">
            <Image src={restaurantData?.img} alt='hero img' title='Kamil Gliwiński - unsplash' layout='fill' />
          </div>
          <span className='title'>{restaurantData?.name}</span>
        </div>
        <div className='menu-grid'>
            <div className='menu'>
                    {restaurantData?.menu.map((item): any => {
                        console.log(item)
                        return(
                            <div className="menu_item">
                                <div className='top'>
                                    <span className='item_title'>{item.name}</span>
                                </div>
                                <div className='bottom'>
                                    <span className='item_price'>{item.price}</span>
                                    <span className='item_in'>{item.ingredients}</span>
                                </div>
                                <button className='button'>Add</button>
                            </div>
                        )
                    })}
            </div>
            <div className='cart'>
                    Cart
            </div>
        </div>
       </div>

       </div>
       
    </div> 
  )
}
