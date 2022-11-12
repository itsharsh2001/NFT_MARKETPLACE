import React from 'react'
import Creator from '../../components/Creators/Creator'
import Footer from '../../components/Home/Footer'
import NavBar from '../../components/Home/NavBar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CreatorPage () {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    
    (async()=>{
      if(router.query.id){
        try {
          const { data } = await axios.post("http://localhost:2100/api/v1/user/getAllItems", {
            userId: router.query.id
          })
          setData(data);
          // console.log(data);
        } catch (error) {
          console.log(error.response.data);
        }
      }
      
    })()
  
  }, [router.query.id])
  
  
  return (
    <>
        <NavBar/>
        {data && <Creator data={data.data}/>}
        <Footer/>
    </>
  )
}

