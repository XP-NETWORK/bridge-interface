import React from "react";
import { ReactComponent as Coment } from "../../assets/img/icons/Coment.svg";

function Comment() {
  return (
    <div className="ComentBox">
      <Coment className="svgWidget" alt="Comment" />
      <p className="">Try switching to another network</p>
    </div>
  );
}

export default Comment;
