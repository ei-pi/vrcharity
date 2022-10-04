{
    const header = document.querySelector("header");

    header.addEventListener("click", ev => {
        if (!ev.button && window.matchMedia("screen and (max-width: 750px)").matches) {
            header.classList.toggle("collapsed");
            header.classList.toggle("expanded");
        }
    });
}