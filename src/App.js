import React from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import  axios  from "axios"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners";







function Loader(){
  return(
    <div>
      <ClipLoader/>
    </div>
  )

}

function App() {
  const [result,setResult] = useState([]);
  const [limit,setLimit] = useState(20);
  const [more,setMore] = useState(true);

  

  useEffect(function(){
    axios
    .get("http://api.sampleapis.com/codingresources/codingResources")
    .then(function(response){
      const Limiting = response.data.slice(0,limit);
      setResult(Limiting);
      console.log(Limiting);

    })
    .catch(function(error){
      console.log(error);
    })
  },[limit])

  function getMore(){
    setTimeout(function(){
      const moreLimit = limit + 30
      setLimit(moreLimit)

      axios.get("http://api.sampleapis.com/codingresources/codingResources")
      .then(function(response){
        const Limiting = response.data.slice(0,moreLimit);
        setResult(Limiting);
        response.data.length - result.length > 0 ? setMore(true) : setMore(false);
  
      })
      .catch(function(error){
        console.log(error);
      },1000);
    })

  }


  return (
    <>
    <nav>
      <h1>InfiniteScroll</h1>
    </nav>
    <div>
      <InfiniteScroll 
      dataLength={result.length}
      next={getMore}
      hasMore={more}
      loader={<Loader/>}
      endMessage = {
        <p style={{textAlign: 'center'}}>
          That is all Thank you for Reading
        </p>
      }
      
      >
        <ul >
          {result.map((results) =>
          <li key={results.id}>
            <h3>{results.description}</h3>
            <span>{results.types.join(" ")}</span>
            <h4>Topics</h4>
            <p>{results.topics.join(", ")}</p>
            
              <h4>Level</h4>
              <h5>{results.levels.join(", ")}</h5>
              <a href={results.url}>read more</a>
          </li> 
          )}
        </ul>

      </InfiniteScroll>
    </div>
    </>
  )
}

export default App

