const isEqual = (obj1, obj2) => {
    // debugger
    if(obj1 && obj2){
        const values1 = Object.values(obj1.native)
        const values2 = Object.values(obj2.native)
        if(values1.length !== values2.length){
            return false
        }
        for(let value of values1){
            if(obj1[value] !== obj2[value]){
                return false
            }
        }
    }
    else{
        // console.log("No objects to compare...");
        return
    }
    return true
}

export const runOnArrays = (nfts, selectedNFTs) => {
    let isEquals;
    if(nfts && selectedNFTs){
        nfts.forEach((nft, index) => {
            if(isEqual(nft, selectedNFTs[index])){
                isEquals = true
            }
            else {
                isEquals = false
            }
        })
    }
    else{
        // console.log("No array to run on...");
    }
    return isEquals
}

export const compareSingleNFTs = (nft, selectedNFT) => {
    // debugger
   return isEqual(nft, selectedNFT[0]) ? true : false
}