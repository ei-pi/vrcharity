(() => {
    // News
    const newsContainer = document.querySelector("section#news");

    function pushNewsEntry(title, author, date, body) {
        const container = document.createElement("div"),
            articleTitle = document.createElement("p"),
            articleBody = document.createElement("p"),
            articleAuthor = document.createElement("p"),
            articleDate = document.createElement("p");

        container.className = "news-entry";
        articleTitle.className = "news-entry-title";
        articleBody.className = "news-entry-body";
        articleAuthor.className = "news-entry-author";
        articleDate.className = "news-entry-date";

        articleTitle.innerText = title ?? "No title given";
        articleBody.innerText = body ?? "Empty body";
        articleAuthor.innerText = author ?? "Anonymous";
        articleDate.innerText = date ?? "Unknown date";

        container.append(articleTitle, articleAuthor, articleDate, articleBody);

        document.querySelector("section#news div.news-entry#empty-feed")?.remove?.();
        newsContainer.appendChild(container);
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
        const container = document.createElement("div");
    
        container.style.backgroundImage = `url("${imgPath}")`;
        container.style.backgroundColor = bgColor ?? "";
        container.className = "sponsor";
        container.addEventListener("click", e => e.button || window.open(site));

        sponsorContainer.appendChild(container);
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
})();