(() => {
  function openMetaMaskUrl(url) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_self";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

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
      if (typeof ev?.data === "string" || ev?.data instanceof String) {
        const msg = ev?.data?.split("###");

        if (
          msg[0] === "From Widget: Open MetaMask" &&
          url[0]?.includes(ev.origin)
        ) {
          const link = `dapp://${`${url[0].replace(/^https?:\/\//, "")}/${
            msg[1]
          }`}`;
          openMetaMaskUrl(link);
          widget?.contentWindow?.postMessage(
            {
              type: "redirectFromTop",
              status: true,
            },
            url[0]
          );
        }
      }
    },
    false
  );
})();
