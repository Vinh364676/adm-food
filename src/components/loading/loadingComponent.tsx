import React from 'react'
import Lottie from 'lottie-react';
export default function LoadingComponent() {
  return (
    <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", margin:"auto 0", background:"#F8FAFC"}}>
       <Lottie animationData={require('../../assets/loading/loading.json')} style={{width:"200px",height:"100%", display:"flex", justifyContent:"center", margin:"auto 0", alignItems:"center"}}/>
    </div>
  )
}
