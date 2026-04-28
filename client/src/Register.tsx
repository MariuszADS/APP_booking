import { useEffect, useState } from 'react'
import './App.css'

function Register() {

  const [status, setStatus] = useState<any>(null)

  const url = "http://localhost:8000/auth/register"

  async function system(data,error,loading){

    //DATA
    const res = await fetch(url)
    if(!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`) 
    }else{
      return JSON.stringify(res)
    }
    //ERROR
    
    //LOADING
  }
}

export default Register
