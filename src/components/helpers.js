function isEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }

export const findInArray = (given, array) => {
    let alow = false
    if(array.length){
        alow = !array.some(arrayObj => isEqual(arrayObj, given))
    }
    else{
       console.log("Empty array"); 
       alow = true
    }
    return alow
}

// export const searchInSelected = ( single, arrayNFTs ) => {
//     debugger
//     return !arrayNFTs.some( nft => isEqual(nft, single))
// }

// export const searchInApproved = ( single, arrayNFTs ) => {
//    return arrayNFTs.some( nft => isEqual(nft, single))
// }

// export const runOnArrays = (approvedNFTList, selectedNFTs) => {
//     let isEquals;
//     if(approvedNFTList.length && selectedNFTs.length){
//         approvedNFTList.forEach((nft, index) => {
//             if(isEqual(nft, selectedNFTs[index])){
//                 isEquals = true
//             }
//             else {
//                 isEquals = false
//             }
//         })
//     }
//     else{
//         console.log("No array to run on...");
//     }
//     return isEquals
// }
