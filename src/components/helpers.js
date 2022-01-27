import { useEffect } from "react";

export const isEqual = (value, other) => {
  let equal = true
  // debugger
  if(value.length === other.length){
    value.forEach(( item, i ) => {
      // debugger
      const { chainId, contract, tokenId } = item.native
      if(chainId !== other[i].native.chainId || contract !== other[i].native.contract || tokenId !== other[i].native.tokenId){
        // debugger 
        equal = false
      }
    });
  } else {
    equal = false
  }
	return equal;
};


export function DetectOutsideClick(ref, childFunction) {
  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
              childFunction()
          }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
}

export const checkTheError = error => {
  debugger
  const { message, data } = error
  console.error(message);
  return message
}