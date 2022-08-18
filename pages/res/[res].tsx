import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from '../../comps/loader'
import Navbar from '../../comps/navbar'

export default function RESTAURANT() {
    const router = useRouter()
    const [restaurantData, setRestaurantData] = useState<any>([])
    const [cartArray, setCartArray] = useState<any>([])
    useEffect(() => {
        const restaurant = router.query.res
        if(router.isReady) {
            const restaurantstring = restaurant?.toString().toLowerCase()
            axios.get('/api/'+restaurant).then((data : any) => {
                console.log(data.data[0])
                setRestaurantData(data.data[0])
            })
    }}, [router.isReady])
    function addToCart(item: string, price: any){
      setCartArray((prev): any => [...prev, {
        name: item,
        price: price
      }])
      console.log(cartArray)
    }
    function cart(){
      if(cartArray.length == 0 || cartArray == null){
        return(
          <div>
            Koszyk jest pusty
          </div>
        )
      }else{
        let sum = 0;
        return(
        cartArray.map((item): any => {
          console.log(item.price)
          let price = item.price.replace('$', '')
            price = Number(price)
            sum = (sum+price)
            console.log(sum)
          return(
            <div className='cart-in'>
              <span>{item.name}</span>
              <span className='right'>{item.price}</span>
            </div>
          )
        }))
      }
    }
    if(restaurantData == null || restaurantData.length == 0){
      return <Loader />
    }else{
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
                                <button className='button' onClick={()=>addToCart(item.name, item.price)}>Add</button>
                            </div>
                        )
                    })}
            </div>
            <div className='cart'>
              <span className='cart_title'>CART</span>
              <div className='cart-arr'>
                {cart()}
              </div>
            </div>
        </div>
       </div>

       </div>
       
    </div> 
  )
    }}
