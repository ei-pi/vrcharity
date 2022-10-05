{
    const header = document.querySelector("header"),
        mobileLayout = window.matchMedia("screen and (max-width: 800px)");

    header.addEventListener("click", ev => {
        if (!ev.button && mobileLayout.matches) {
            header.classList.toggle("collapsed");
            header.classList.toggle("expanded");
        }
    });
}