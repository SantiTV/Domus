import React from "react";
import RequestForm from "../components/RequestForm";

function RequestServiceView(props) {
  return (
    <div>
        <RequestForm user ={props.user}/>
    </div>
  );
}


export default RequestServiceView;