import React from 'react'
import Link from 'next/link'
import {signIn, signOut, useSession} from 'next-auth/react'
export default function Navbar() {
  const {data: session}: any = useSession()
  const user = session?.user?.name
  const courier = () =>{ 
    if(user?.courier == true){
      return true;
    }else{
      return false;
    }
  } 
  return (
    <div className='navbar'>
        <div className='left'>
            FOOD-APP
        </div>
        <div className='right'>
            <span style={{display: courier() ? 'inline' : 'none'}}><Link href={'/courier'} >COURIER PANEL</Link></span>
            <Link href={'/'}>HOME</Link>
            <Link href={'/contact'}>CONTACT</Link>
            <span onClick={() => signIn()} style={{display: session ? 'none' : 'inline'}}>LOGIN</span>
            <span onClick={() => signOut()} style={{display: session ? 'inline' : 'none'}}>LOGOUT</span>
        </div>
    </div>
  )
}
