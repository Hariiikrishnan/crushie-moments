import React, {useState,useEffect}  from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import CreateArea from ".//CreateArea.jsx";
import Post from ".//Post.jsx"
import HomeBtn from ".//HomeBtn.jsx"
import ShortPost from ".//ShortPost.jsx"
import Header from ".//Header.jsx"
import Zoom from '@mui/material/Zoom';
import { Update } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

function App(){

    var u_id=-1;
    var unspreadedEditPost ={};
    var editedPost;
    var balPost={};
 
    // const navigate = useNavigate();
    const [posts,setPosts]=useState([
    //     {
    //     date:"2022-12-08",
    //     time:"02:00",
    //     place:"Trichy",
    //     color:"Red",
    //     saw:"No",
    //     response:"Awkward"
    // },{
    //     date:"2020-12-08",
    //     time:"04:00",
    //     place:"Salem",
    //     color:"yellow",
    //     saw:"Yes",
    //     response:"Shy"
    // },{
    //     date:"2018-12-08",
    //     time:"06:00",
    //     place:"Thanjavur",
    //     color:"Blue",
    //     saw:"No",
    //     response:"Shy"
    // }
]);
    // const [bigPost,setBigPost]=useState();

    const [isExpanded,setExpand]=useState(false);
    const [isPostExpanded,setPostExpand]=useState(false);
    const [clickedID,setClickedId]=useState(0);
    const [isEdit,setEdit]=useState(false);
    const [transition, setTransition] = useState(undefined);
    const [startLoading,setLoading]=useState(true);
    const [openSnack,setSnack]=useState(false);
    const [snackType,setSnackType]=useState("")
  // const [removeHomeBtn,setRemoveBTn]=useState(false);

    function onAdd(newPost){
        // console.log("Req for Adding");
      
        //   console.log(newPost);
     
        setPosts((prevPosts)=>{
            return  [...prevPosts,newPost]
        }) 

        // isEdit ? [...balPost,editedPost[0]] :
        setExpand(false);
        setEdit(false);
        setPostExpand(false); 
        setSnack(true);
        setSnackType("Added")
        setInterval(()=>{
            setSnack(false);
        },2000)       
    }
    // function modifyingSnack(){
    //     const message =
    //     setSnack(true);
    //     setInterval(()=>{
    //         setSnack(false);
    //     },2000) 
    // }
    function handleUpdateReturn(newPost){

             
            console.log(newPost);
            console.log(clickedID);
            unspreadedEditPost = posts.filter((singlePost,index)=>{
                console.log(singlePost._id);
            return singlePost._id===clickedID
          })
          balPost = posts.filter((singlePost,index)=>{
            return singlePost._id!==clickedID;
          })
           console.log(unspreadedEditPost);
            editedPost =  Object.assign({},unspreadedEditPost);
            // console.log(unspreadedEditPost);
            // console.log(editedPost);

             Object.keys(editedPost[0]).forEach(key=>{
                 if(key in newPost){
                   editedPost[0][key]=newPost[key]
                 }
               })
               console.log(editedPost);
            //    console.log(...editedPost);
            //    console.log([...balPost,editedPost[0]])

           
        setExpand(false);
        setEdit(false);
        setPostExpand(false);
        setSnack(true);
        setSnackType("Updated!")
        setInterval(()=>{
            setSnack(false);
        },2000) 
    }

    async function getAllPosts(){
       
        const config ={
            headers : {
                "Content-Type": "application/json",
            },
        };
        try{
            const res= await axios.get("/post",config);
            console.log(res.data);
            
            setPosts(res.data);
            setLoading(false);
        }catch (err){
            console.error("error",err)
        }
    };
    useEffect(()=>{
        getAllPosts();
    },[])
    // async function onSubmit(e){
    //     e.preventDefault();
    //     const newMoment = {...posts}
        
        

    //     await fetch("/post/add",{
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newMoment),
    //       })
    //       .catch(error => {
    //         window.alert(error);
    //         return;
    //       });
    //     //   navigate()
    // }
//    console.log(posts);


   function HomeBtnExpand(){
       setExpand(true); 
   }
   function backBtn(){
    setExpand(false);
    setEdit(false);
   }
   async function deletePost(id){
    // console.log(id);
    await axios.delete(`/post/${id}`).then((res)=>{
        setPosts((prevPosts)=>{
            return prevPosts.filter((value,index)=>{
                return value._id!==id;
            })
        });
        setPostExpand(false);
    }
    );
    setSnack(true);
    setSnackType("Deleted!")
    setInterval(()=>{
        setSnack(false);
    },2000) 
   };

  
   function editPost(id){
    setEdit(true); 
    setPostExpand(false);
    
   }
   console.log(isEdit);
 
   function postExpand(id){
        console.log(id);
        // clickedPost=id;
        setClickedId(id);
      
        // console.log("post clicked " + clickedID)
        setPostExpand(true);
      
        
   }
  
//    console.log(currentPost);
        
    return <div>
        {/* <BrowserRouter> 
         <Routes> */}
  
         <div class="HeadandLoad">
         {/* <Route exact path="/" element={<Header />} /> */}
         <Header /> 
         { startLoading ? <CircularProgress className="loader" color="inherit" /> : null }
         </div>
         {/* <Route path="/" element= /> */}
         { 
             isExpanded  || isPostExpanded || isEdit? null  :
              <HomeBtn HomeOnClick={HomeBtnExpand}/> 
              } 

              <Snackbar
                    open={openSnack}
                    // autoHideDuration={3000}
                    // className="snackyBar"
                    // message={"Moment "+ snackType }
                    // action={action}
                    // bodyStyle={{ backgroundColor: 'red', color: 'coral' }}
                  ><SnackbarContent style={{
                    backgroundColor:'white',
                    color:'black',
                    // padding:'3%',
                    // textAlign:"center"
                    display:"center",
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:'10px',
                    margin:"0% 26%",
                    marginBottom:'15%'
                  }}
    message={<span id="client-snackbar">Moment {snackType}</span>}
  /></Snackbar>

            {/* {  <Route path="/post/add" element= { }
           /> 
           } */}
           { isExpanded  ?  <CreateArea 
          onAdd={onAdd} 
        //   onSubmit={onSubmit}
          handleBackBtn={backBtn}
          /> : null}
     
      {  isExpanded || isPostExpanded || isEdit?  null : posts.length > 0 ? posts.map((singlePost,index)=>{
        u_id++;
        
        return <ShortPost  
            key={singlePost._id}
            id={singlePost._id}
            date={singlePost.date}
            time={singlePost.time}
            seenplace={singlePost.place}

            postClick={postExpand}
            
            />
      }) : null}

      
          
       
   
        { isPostExpanded ?  posts.map((singlePost,index) => {
          
            if(clickedID===singlePost._id){
                console.log(clickedID + "And " + index);
             
                return   <Post 
                    key={singlePost._id}
                    id={singlePost._id}
                    date={singlePost.date}
                    time={singlePost.time}
                    seenplace={singlePost.place}
                    dresscolor={singlePost.color}
                    shesaw={singlePost.saw}
                    reaction={singlePost.response}

                    OnDelete={deletePost}
                    onEdit={editPost}
                    handleBackBtn={()=>{
                        setPostExpand(false);
                     }}
        /> 
               
            } 
        })  : null }          
            

        {
            isEdit ? isPostExpanded ? null:      
            posts.map((singlePost,index) => {
          
          if(clickedID===singlePost._id){
              {/* console.log(clickedID + "And " + index); */}
             return <CreateArea 
              onUpdate={handleUpdateReturn}  

             
              handleBackBtn={backBtn}
              key={singlePost._id}
              id={singlePost._id}
             date={singlePost.date}
            time={singlePost.time}
            seenplace={singlePost.place}
            dresscolor={singlePost.color}
            shesaw={singlePost.saw}
            reaction={singlePost.response}
            isEdit={isEdit}
      />
       }
              })  : null  } 
        

             
      {/* </Routes> 
     </BrowserRouter>  */}
    </div>
}
export default App;