(() => {
  const widget = document.getElementById("xpnetWidget");

  const url = widget?.getAttribute("src")?.split("?");

  if (window.ethereum && url) {
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

  window.addEventListener(
    "message",
    (ev) => {
      const msg = ev?.data?.split("###");

      if (
        msg[0] === "From Widget: Open MetaMask" &&
        url[0]?.includes(ev.origin)
      ) {
        const link = `https://metamask.app.link/dapp/${
          `${url[0]}/${msg[1]}` /*window.location.origin*/
        }`;
        window.open(link);
      }
    },
    false
  );
})();
