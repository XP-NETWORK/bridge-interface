(() => {
  if (window.ethereum) {
    const widget = document.getElementById("xpnetWidget");

    const url = widget?.getAttribute("src")?.split("?");

    url &&
      window.ethereum.on("accountsChanged", function(acc) {
        widget?.contentWindow?.postMessage(
          {
            type: "ethAddress",
            address: acc[0],
          },
          url[0]
        );
      });
  }
})();
