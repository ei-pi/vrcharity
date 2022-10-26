"use strict";
// console.log("Built using the vanilla.js framework. (http://vanilla-js.com)");

{
    const header = document.querySelector("header"),
        linkCont = document.querySelector("div#link-container"),
        mobileLayout = window.matchMedia("screen and (max-width: 1000px)");

    header.addEventListener("click", ev => {
        if (!ev.button && mobileLayout.matches) {
            header.classList.toggle("collapsed");
            header.style.height = linkCont.style.height = header.classList.toggle("expanded") ? `${linkCont.scrollHeight}px` : "";
        }
    });

    mobileLayout.addEventListener("change", () => {
        if (!mobileLayout.matches) {
            header.classList.remove("expanded");
            header.classList.add("collapsed");
            header.style.height = linkCont.style.height = "";
        }
    });
}

{
    for (const a of [...document.querySelectorAll("a")]) {
        if (!a.classList.contains("no-title")) {
            a.title = a.href;
        }
    }
}

function makeElement(key, properties, children, listeners) {
    const ele = document.createElement(key);

    for (const [key, value] of Object.entries(properties ?? {})) {
        if (typeof ele[key] == "object") {
            for (const [objKey, objVal] of Object.entries(value)) {
                ele[key][objKey] = objVal;
            }
        } else {
            ele[key] = value;
        }
    }
    ele.append(...([children].flat()).filter(v => v !== void 0));
    for (const [ev, li] of Object.entries(listeners ?? {})) {
        for (const l of [li].flat()) {
            ele.addEventListener(ev, ...(typeof l == "function" ? [l] : [l.callback, l.options]));
        }
    }
    return ele;
}