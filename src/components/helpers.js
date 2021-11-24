export const isEqual = (obj1, obj2) => {
    // debugger
    if(obj1 && obj2 && !Array.isArray(obj1) && !Array.isArray(obj2)){
        // debugger
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

export const searchInSelected = ( single, arrayNFTs ) => {
    // debugger
    const some = arrayNFTs.some( nft => isEqual(nft, single))
    console.log("searchInSelected", some);
    return some
}
let counter = 0
export const searchInApproved = ( single, arrayNFTs ) => {
    // debugger
    const some = arrayNFTs.some( nft => isEqual(nft, single))
    console.log("searchInSelected", some, counter);
    counter++
    return some
}


export const runOnArrays = (approvedNFTList, selectedNFTs) => {
    let isEquals;
    if(approvedNFTList.length && selectedNFTs.length){
        approvedNFTList.forEach((nft, index) => {
            if(isEqual(nft, selectedNFTs[index])){
                isEquals = true
            }
            else {
                isEquals = false
            }
        })
    }
    else{
        console.log("No array to run on...");
    }
    return isEquals
}
