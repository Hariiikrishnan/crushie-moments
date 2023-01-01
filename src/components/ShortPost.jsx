import React from "react";



function ShortPost(props){
    // console.log(props)
    var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    const currentTime=new Date().toLocaleTimeString()
    const currentDate=new Date().getDate()
    const currentMonth=new Date().getMonth()
    // console.log(currentTime)    .toLocaleString("default", { month: "long" });

    return <div className="shortPost"  onClick={()=> {
        props.postClick(props.id)
      }}>
      
             <div className="postHead shortpost">
                  <h2>{props.date}</h2>
                  <h2>{props.time}</h2>
                  
             </div>
              <h1>{props.seenplace}</h1>
              <div class="postFoot">
              <p>{months[currentMonth]}</p>
              <p>{currentDate}</p>
             <p class="postTime">{currentTime}</p>
             </div>
    </div>
}

export default ShortPost;