let t=null;const e={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),bodyEl:document.querySelector("body")};e.btnStop.setAttribute("disabled",!0),e.btnStart.addEventListener("click",(function(){e.btnStart.setAttribute("disabled",!0),e.btnStop.removeAttribute("disabled"),t=setInterval((()=>{e.bodyEl.style.background=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.btnStop.addEventListener("click",(function(){e.btnStart.removeAttribute("disabled"),e.btnStop.setAttribute("disabled",!0),clearInterval(t)}));
//# sourceMappingURL=01-color-switcher.c0b8edf3.js.map
