export const copyCode = (setCopied, id) => {
  var aux = document.createElement("div");
  aux.setAttribute("contentEditable", true);
  aux.innerHTML = document.getElementById(
    id //"iframeSrc"
  ).innerHTML;
  aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
  document.body.appendChild(aux);
  aux.focus();
  document.execCommand("copy");
  document.body.removeChild(aux);

  // navigator.clipboard.writeText(
  //</div> `<iframe src='${iframeSrc}' frameborder='0' ></iframe>`
  //);
  setCopied(true);

  setTimeout(() => setCopied(false), 500);
};

export const checkRgbaOut = (text) =>
  text.includes("rgba(") ? "#" + text : text;
export const checkRgbaIn = (text) =>
  text.includes("rgba(") ? text.replace("#", "") : text.replace("##", "#");

export function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  console.log(elmnt.id + " .header");
  if (document.querySelector("#" + elmnt.id + " .header")) {
    // if present, the header is where you move the DIV from:
    document.querySelector(
      "#" + elmnt.id + " .header"
    ).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
