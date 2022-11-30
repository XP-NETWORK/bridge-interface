/* eslint-disable react/prop-types */
import React from "react";

import { setWrappedEGold } from "../../../store/reducers/generalSlice";

import { Chain } from "xp.network";

export const withElrond = (Wrapped) =>
  function CBU(props) {
    const getWegldBalance = (dispatch, chain, _account) => {
      return chain
        .getWegldBalance(_account)
        .then((bal) => bal && dispatch(setWrappedEGold(bal)));
    };

    return (
      <Wrapped
        {...props}
        chainSpecific={{
          ...(props.chainSpecific || {}),
          [Chain.ELROND]: getWegldBalance,
        }}
      />
    );
  };
