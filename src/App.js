import InfiniteScroll from "react-infinite-scroll-component"
import  axios  from "axios"
import { useEffect, useState } from "react"

function ScrollDetail(){
  const [result,setResult] = useState('');
  const [limit,setLimit] = useState(20);

  

  useEffect(() => {
    axios
    .get("http://api.sampleapis.com/codingresources/codingResources")
    .then((response)=>{
      const limitingItem = response.data.slice(0,limit)
      setLimit(limitingItem)
    })
    .catch((error) =>{
      console.log(error);
    })
  },[limit])

  
}

function Card(){

}

function Loader(){

}

function App() {
  return (
    <div className="main-screen">
      <ScrollDetail/>
    </div>
  )
}

export default App

