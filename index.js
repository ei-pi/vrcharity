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
}