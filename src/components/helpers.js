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
  }
  else{
    equal = false
  }
	return equal;
};