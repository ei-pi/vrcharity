"use strict";
{
    // News
    const newsContainer = document.querySelector("section#news");

    function pushNewsEntry(title, author, date, body) {
        document.querySelector("section#news div.news-entry#empty-feed")?.remove?.();

        newsContainer.appendChild(makeElement(
            "div",
            {
                className: "news-entry"
            },
            [
                makeElement(
                    "p",
                    {
                        className: "news-entry-title",
                        innerText: title ?? "No title given"
                    }
                ),
                makeElement(
                    "p",
                    {
                        className: "news-entry-body",
                        innerText: body ?? "Empty body"
                    }
                ),
                makeElement(
                    "p",
                    {
                        className: "news-entry-author",
                        innerText: author ?? "Anonymous"
                    }
                ),
                makeElement(
                    "p",
                    {
                        className: "news-entry-date",
                        innerText: date ?? "Unknown date"
                    }
                ),
            ]
        ));
    }

    [].forEach(e => {
        pushNewsEntry(...e);
    });

    // Sponsors
    const sponsorContainer = document.querySelector("div#sponsor-container");

    function addSponsor(imgPath, site, bgColor) {
        sponsorContainer.appendChild(makeElement(
            "a",
            {
                href: site,
                title: site,
                className: "sponsor",
                style: {
                    backgroundImage: `url("${imgPath}")`,
                    backgroundColor: bgColor ?? ""
                }
            }
        ));
    }

    [
        [
            "./assets/images/legends.png",
            "https://discord.com/invite/haBNCrs2mZ"
        ],
        [
            "./assets/images/protube-vr.png",
            "https://www.protubevr.com/en/",
            "black"
        ],
        [
            "./assets/images/vrml.png",
            "https://vrmasterleague.com/",
            "black"
        ],
        [
            "./assets/images/vr-cover.png",
            "https://vrcover.com/",
            "#AAA"
        ],
        [
            "./assets/images/ugl.png",
            "https://www.ugl.gg/"
        ],
        [
            "./assets/images/hive-vr.png",
            "https://www.facebook.com/TheHiveVR/?ref=page_internal"
        ],
    ].forEach(e => {
        addSponsor(...e);
    });
}