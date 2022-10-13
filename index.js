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

    [
        [
            "ouch man",
            "Robert",
            "April 23rd 2001",
            "not cool :("
        ],
        [
            "Office. Now. Both of you",
            "Administration",
            "April 23rd 2001",
            "You idiotic bumbling pieces of utterly inept rubbish, you're both demoted to customer. I'll be sending your paychecks to the trashcan, and you'll both end up there yourselves if you don't leave the building within the next 5 minutes."
        ],
        [
            "Not much better",
            "Bob",
            "April 23rd 2001",
            "I think it's to give us something to do… I'm currently stuck looking for images, which isn't much more fun."
        ],
        [
            "How's your work coming along?",
            "Robert",
            "April 23rd 2001",
            "I've got about 20 more pages to write for this article, what a bummer! Can't concentrate, especially with this chatroom! Why do we need to write so much anyways?"
        ],
        [
            "Sounds like a plan!",
            "Bob",
            "April 23rd 2001",
            "Sounds good! I'll talk to Daryll about it, maybe he'll want to come along too!"
        ],
        [
            "I read you loud and clear, Bob",
            "Robert",
            "April 23rd 2001",
            "I can happily confirm that I can, in fact, recieve your messages! This really is exciting! Party at my place this Saturday? I've got some leftover beer."
        ],
        [
            "Robert, come in Robert",
            "Bob",
            "April 23rd 2001",
            "We have access to the announcement board now! I purged all the other ones cause they were boring anyways… please reply ASAP! I think this new chatroom could be very useful!"
        ]
    ].forEach(e => {
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