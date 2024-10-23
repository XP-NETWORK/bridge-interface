import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setAccount } from "../../store/reducers/generalSlice";

export const withTronConnection = (Wrapped) =>
  function CB(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      window.addEventListener("message", function(e) {
        if (e?.data?.message && e?.data?.message?.action == "disconnect") {
          // handler logic
          if (e.data.isTronLink) {
            dispatch(setAccount(""));
            navigate("/");
          }
        }
      });
    }, []);

    return <Wrapped {...props} />;
  };
