export const copyCode = (setCopied, id) => {
    var aux = document.createElement("div");
    aux.setAttribute("contentEditable", true);
    aux.innerHTML = document.getElementById(
      id//"iframeSrc"
    ).innerHTML;
    aux.setAttribute(
      "onfocus",
      "document.execCommand('selectAll',false,null)"
    );
    document.body.appendChild(aux);
    aux.focus();
    document.execCommand("copy");
    document.body.removeChild(aux);

    // navigator.clipboard.writeText(
    //</div> `<iframe src='${iframeSrc}' frameborder='0' ></iframe>`
    //);
    setCopied(true);

    setTimeout(() => setCopied(false), 500);
  }