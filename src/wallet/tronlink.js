export const TronLink = () => {
    window.addEventListener('message', trnlnk)
    var obj = setInterval(async ()=>{
      //if (window.tronLink.tronWeb)
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            clearInterval(obj)
          //let tronweb = window.tronLink.tronWeb
            let tronweb = window.tronWeb
        }
    }, 10)
    
}

 function trnlnk(e) {
    if (e.data.message && e.data.message.action == "tabReply") {
        console.log("tabReply event", e.data.message)
        console.log(e.data.message.data.data.message, 'akdslldakslkadsadkls')
        if(e.data.message.data.data && e.data.message.data.data.message.includes('whitelist')) {
            // site is already whitelisted
        }
    }

    if (e.data.message && e.data.message.action == "setAccount") {
        console.log("setAccount event", e.data.message)
        console.log("current address:", e.data.message.data.address)

    }
    if (e.data.message && e.data.message.action == "setNode") {
        console.log("setNode event", e.data.message)
        if (e.data.message.data.node.chain == '_'){
            console.log("tronLink currently selects the main chain")
        }else{
            console.log("tronLink currently selects the side chain")
        }
      
   // Tronlink chrome v3.22.1 & Tronlink APP v4.3.4 started to support 
    if (e.data.message && e.data.message.action == "connect") {
        console.log("connect event", e.data.message.isTronLink)
    }
      
   // Tronlink chrome v3.22.1 & Tronlink APP v4.3.4 started to support 
    if (e.data.message && e.data.message.action == "disconnect") {
        console.log("disconnect event", e.data.message.isTronLink)
    }
      
   // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support 
    if (e.data.message && e.data.message.action == "accountsChanged") {
        console.log("accountsChanged event", e.data.message)
        console.log("current address:", e.data.message.data.address)
    }
      
   // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support  
    if (e.data.message && e.data.message.action == "connectWeb") {
        console.log("connectWeb event", e.data.message)
        console.log("current address:", e.data.message.data.address)
    }
      
   // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support   
    if (e.data.message && e.data.message.action == "accountsChanged") {
        console.log("accountsChanged event", e.data.message)
    }
      
    // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support      
    if (e.data.message && e.data.message.action == "acceptWeb") {
        console.log("acceptWeb event", e.data.message)
    }
    // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support      
    if (e.data.message && e.data.message.action == "disconnectWeb") {
        console.log("disconnectWeb event", e.data.message)
    }
      
    // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support     
    if (e.data.message && e.data.message.action == "rejectWeb") {
        console.log("rejectWeb event", e.data.message)
    }
       
    }
}