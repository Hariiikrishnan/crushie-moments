import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Fab from "@mui/material/Fab";
// import { makeStyles } from '@mui/material/styles';
import './stylesComponent.css'
// import { styled } from '@mui/styles';
import Slide from '@mui/material/Slide';

function Post(props) {
  // console.log("big post clikced");
  // console.log(props);
  // const useStyles = makeStyles({
  //   editPen:{
  //     marginLeft:"20%"
  //   },
  // });
  // const classes=useStyles();


  // console.log(props);
  const deleteButton ={
        // display:"flex",
        // alignItems:"flexEnd",
        // justifyContent: "end",
        left:"60%"
        
  }

  return (
    <div className="post">
    
      <div className="backButton">
        <Fab
          onClick={() => {
            props.handleBackBtn();
          }}
        ><ArrowBackIcon /> 
        </Fab>
        <br></br>
        
      </div>
      <div className="postHead fullPost">
        <h2>{props.date}</h2>
        <h2>{props.time}</h2>
      </div>
      <label>Where did you Saw her ?</label>
      <h3>{props.seenplace}</h3>
      <label>Dress Color :</label>
      <h3>{props.dresscolor}</h3>
      <label>Did She Saw You ?</label>
      <h3>{props.shesaw}</h3>
      <label>How did i React ?</label>
      <h3>{props.reaction}</h3>

      <div className="backButton onlyEdit">
        <Fab
          onClick={() => {
            props.onEdit(props.id);
          }}  className="editpen"
        >
          <span class="material-symbols-outlined editPen">edit</span>
          {/* <span class="material-symbols-outlined">
                   favorite
                  </span><span class="material-symbols-outlined editPen">
                  edit
                  </span> */}
        </Fab>

         
        <Fab
          onClick={() => {
            props.OnDelete(props.id);
            // handleDelete(id);
          }} style={deleteButton}
          className="deleteHeart"
        >
          <span class="material-symbols-outlined ">heart_minus</span>
        </Fab>
        </div>
      
    </div>
    
  );
}

export default Post;
