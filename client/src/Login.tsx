import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState<any>(null)


  const url = "http://localhost:8000/api/users"
  async function getStatus<T>(url: string): Promise<T> {

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    return res.json()
      .catch(error => {
        console.error("ERR :", error);
      })
  }

  useEffect(() => {
    getStatus(url).then(data => { setStatus(data) })
  }, [])

  return (
    <>
      <p>{JSON.stringify(status)}</p>
    </>
  )
}

export default App
