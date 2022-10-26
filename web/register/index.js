"use strict";

{
    const tourneyContainer = document.querySelector("div#tourney-container"),
        /**
         * @type {game[]}
         */
        games = [];

    function render() {
        games.forEach(g => g.render());
    }

    class tourney {
        /**
         * @type {string}
         */
        name;

        get open() { return this.registration[1].getTime() > Date.now(); };

        get passed() { return this.date.getTime() <= Date.now(); };

        /**
         * @type {string}
         */
        prize;

        /**
         * @type {string}
         */
        format;

        /**
         * @type {string | undefined}
         */
        rules;

        /**
         * @type {{ name: string, link: string, desc: string }}
         */
        charity;

        /**
         * @type {[Date, Date]}
         */
        registration;

        /**
         * @type {Date}
         */
        tourneyDate;

        /**
         * @param {{ name: string, date: Date, prize: string, registration: [Date, Date], format: string, rules: string | undefined, charity: { name: string, link: string, desc: string } }} cfg
         */
        constructor (cfg) {
            this.name = cfg.name;
            this.date = cfg.date;
            this.prize = cfg.prize;
            this.registration = cfg.registration;
            this.format = cfg.format;
            this.rules = cfg.rules;
            this.charity = cfg.charity;
        }
    }

    class game {
        /**
         * @type {string}
         */
        name;

        /**
         * @type {tourney[]}
         */
        tourneys = [];

        /**
         * @type {HTMLDivElement}
         */
        #div;

        /**
         * @param {string} name
         * @param {tourney[]} tourneys
         */
        constructor (name, tourneys) {
            this.name = name;
            this.tourneys = tourneys;
            games.push(this);
        }

        addTourney(tourney) {
            this.tourneys.push(tourney);
        }

        render() {
            document.querySelector("div#no-tourneys")?.remove?.();

            const T = this;

            tourneyContainer.appendChild(this.#div ??= makeElement(
                "div",
                {
                    textContent: this.name,
                    className: "game",
                    dataset: {
                        openTourneys: this.tourneys.filter(t => t.open).length,
                        closedTourneys: this.tourneys.filter(t => !t.open && !t.passed).length,
                        pastTourneys: this.tourneys.filter(t => t.passed).length
                    },
                    [this.tourneys.length ? "tabIndex" : ""]: 0
                },
                void 0,
                (() => {
                    let collapsed = false,
                        /**
                         * @type {HTMLDivElement}
                         */
                        widget;

                    function generateWidget() {
                        return widget = makeElement(
                            "div",
                            {
                                className: "game-tourney-container"
                            },
                            T.tourneys
                                .map(t => makeElement(
                                    "div",
                                    {
                                        className: "game-tourney"
                                    },
                                    [
                                        makeElement(
                                            "p",
                                            {
                                                className: "tourney-name",
                                                textContent: t.name
                                            }
                                        ),
                                        t.passed || !t.open
                                            ? makeElement(
                                                "p",
                                                {
                                                    className: "nopen-warning",
                                                    textContent: t.passed ? "This tournament has already ended." : !t.open ? "Registrations are closed." : ""
                                                }
                                            )
                                            : "",
                                        makeElement(
                                            "p",
                                            {
                                                className: "tourney-date",
                                                textContent: t.date.toString()
                                            }
                                        ),
                                        makeElement(
                                            "p",
                                            {
                                                className: "tourney-prize",
                                                textContent: t.prize
                                            }
                                        ),
                                        makeElement(
                                            "p",
                                            {
                                                className: "tourney-registration",
                                                textContent: `Registration: ${t.registration[0].toDateString()} to ${t.registration[1].toDateString()}`
                                            }
                                        ),
                                        makeElement(
                                            "p",
                                            {
                                                className: "tourney-format",
                                                innerText: `Format: ${t.format}`
                                            }
                                        ),
                                        makeElement(
                                            "a",
                                            t.rules ? {
                                                href: t.rules,
                                                title: t.rules,
                                                className: "tourney-rules",
                                                innerText: "See the rules here."
                                            } : {
                                                style: {
                                                    color: "unset"
                                                },
                                                className: "tourney-rules",
                                                innerText: "Rules have not been put forwards as of now."
                                            }
                                        ),
                                        makeElement(
                                            "a",
                                            {
                                                href: t.charity.link,
                                                title: t.charity.link,
                                                className: "tourney-charity",
                                                textContent: `Raising for: ${t.charity.name}`
                                            }
                                        ),
                                        makeElement(
                                            "p",
                                            {
                                                className: "tourney-charity-desc",
                                                innerText: t.charity.desc
                                            }
                                        ),
                                    ],
                                    {
                                        click(ev) { ev.stopPropagation(); }
                                    }
                                ))
                        );
                    }

                    return {
                        click(ev) {
                            if (!T.tourneys.length) { return; }
                            if (!ev.button) {
                                collapsed = !collapsed;

                                if (collapsed) {
                                    this.style.opacity = "100%";
                                    T.#div.appendChild(generateWidget());
                                } else {
                                    this.style.opacity = "";
                                    widget?.remove?.();
                                }
                            }
                        },
                        keydown(ev) {
                            if (ev.key == "Enter") {
                                this.dispatchEvent(new MouseEvent("click"));
                            }
                        }
                    };
                })()
            ));
        }
    }

    [
        [
            "Onward",
            [
                {
                    name: "Stack Up 2021",
                    date: new Date("2021-09-04T14:00-05:00"),
                    prize: "$3000+",
                    registration: [
                        new Date("2021-06-11"),
                        new Date("2021-07-31")
                    ],
                    format: "5v5, two brackets",
                    rules: void 0,
                    charity: {
                        name: "Stack Up",
                        link: "https://stackup.donordrive.com/",
                        desc: "Stack Up supports US and Allied veterans by promoting positive mental health and combating veteran suicide through gaming and geek culture with four pillar programs."
                    }
                },
                {
                    name: "Game Pink 2022",
                    date: new Date("2022-04-03T14:00-05:00"),
                    prize: "$4800+",
                    registration: [
                        new Date("2022-02-11"),
                        new Date("2022-04-03T00:00-05:00")
                    ],
                    format: "5v5, two brackets",
                    rules: "https://img1.wsimg.com/blobby/go/f42ec91a-b5d7-4947-bcee-1e14675db676/downloads/NBCF%20Tournament%202022%20Rules.pdf?ver=1662316158192",
                    charity: {
                        name: "National Breast Cancer Foundation",
                        link: "https://www.nationalbreastcancer.org",
                        desc: "NBCF was founded to fill in the gaps of cancer care, ensuring every woman has the access and information she needs to get through every step of her breast cancer journey."
                    }
                },
                {
                    name: "Stack Up 2022",
                    date: new Date("2022-09-03"),
                    prize: "$3000+",
                    registration: [
                        new Date("2022-07-03T00:00-05:00"),
                        new Date("2022-09-03T00:00-05:00")
                    ],
                    format: "5v5, two brackets; uplink format",
                    rules: "https://img1.wsimg.com/blobby/go/f42ec91a-b5d7-4947-bcee-1e14675db676/downloads/VRCT%20StackUp%202022%20Tournament.pdf?ver=1662316158192",
                    charity: {
                        name: "Stack Up",
                        link: "https://stackup.donordrive.com/",
                        desc: "Stack Up supports US and Allied veterans by promoting positive mental health and combating veteran suicide through gaming and geek culture with four pillar programs."
                    }
                }
            ]
        ],
        [
            "VAIL",
            []
        ],
        [
            "Contractors",
            []
        ],
        [
            "VTOL",
            []
        ],
        [
            "Walkabout Mini Golf",
            [
                {
                    name: "The legends Mini golf tournament",
                    date: new Date("2022-12-09T14:00-05:00"),
                    prize: "$5,000 Prize Pool for top 5 winners",
                    registration: [
                        new Date("2022-11-01T00:00-05:00"),
                        new Date("2022-12-01T00:00-05:00")
                    ],
                    format: "Swiss bracket tournament, 8 rounds. 4 players per lobby.\nSINGLE PLAYER TOURNAMENT.\nEvery 18 holes, your score will be entered on Challonge.com, before moving on to the next game (18 holes).\nAfter playing 144 holes, the players with the top 5 lowest scores win!",
                    rules: void 0,
                    charity: {
                        name: "Feeding America",
                        link: "https://www.feedingamerica.org",
                        desc: "Feeding America is the largest charity working to end hunger in the United States. We partner with food banks, food pantries, and local food programs to bring food to people facing hunger. We advocate for policies that create long-term solutions to hunger."
                    }
                }
            ]
        ],
        [
            "Hyper Dash",
            []
        ],
        [
            "Echo Arena",
            []
        ]
    ].forEach(
        /**
         * @typedef {{ name: string, date: Date, prize: string, registration: [Date, Date], format: string, rules: string | undefined, charity: { name: string, link: string, desc: string } }} JSONTourney
         * @param {[string, JSONTourney[]} e
         **/
        e => {
            new game(
                e[0],
                e[1].map(t => new tourney(t))
            );
        });

    /**
     * @template {any} T
     * @param {T[]} arr
     * @param {(value: T, index: number, array: T[]) => boolean} pred
     */
    function filteredLength(arr, pred) {
        return arr.filter(pred).length;
    }

    games.sort((a, b) => {
        return filteredLength(b.tourneys, t => t.open) - filteredLength(a.tourneys, t => t.open) ||
            filteredLength(b.tourneys, t => t.passed) - filteredLength(a.tourneys, t => t.passed);
    });

    render();
}