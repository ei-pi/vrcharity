"use strict";
{
    // News
    const newsContainer = document.querySelector("section#news");

    /**
     * @param {string} title
     * @param {string} author
     * @param {Date} date
     * @param {string} body
     */
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
                        innerText: date?.toDateString?.() ?? "Unknown date"
                    }
                ),
            ]
        ));
    }


    [].forEach(/** @param {[string, string, Date, string]} e */ e => {
        pushNewsEntry(...e);
    });

    // Sponsors
    const sponsorContainer = document.querySelector("div#sponsor-container");

    /**
     * @param {string} imgPath
     * @param {string} site
     * @param {string} bgColor
     */
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
            "https://www.facebook.com/TheHiveVR/"
        ],
    ].forEach(/** @param {[string, string, string | undefined]} e */e => {
        addSponsor(...e);
    });
}