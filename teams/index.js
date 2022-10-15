"use strict";
{
    const tabContainer = document.querySelector("div#tourney-container div#tabs"),
        bodyContainer = document.querySelector("div#tourney-container div#body"),
        /**
         * @type {tourney[]}
         */
        tourneys = [],
        /**
         * @type {team[]}
         */
        teams = [];

    function render() {
        tourneys.forEach(t => t.addToTabs());
    }

    class tourney {
        /**
         * @type {string}
         */
        name;

        /**
         * @type {team[]}
         */
        teams = [];

        /**
         * @type {DocumentFragment}
         */
        #docFrag = new DocumentFragment;

        /**
         * @param {string} name
         */
        constructor (name) {
            this.name = name;

            tourneys.push(this);
        }

        /**
         * @param {team} team
         */
        addTeam(team) {
            this.teams.push(team);
            team.verified.set(this.name, false);
        }

        setTeamVerification(team, value) {
            this.teams.find(t => t === team)?.verified?.set?.(this.name, value);
        }

        addToTabs() {
            document.querySelector("div#no-tourneys")?.remove?.();

            const active = !tabContainer.childElementCount,
                T = this;

            tabContainer.appendChild(makeElement(
                "button",
                {
                    innerText: this.name,
                    className: `tourney${active ? " selected" : ""}`
                },
                void 0,
                {
                    click(ev) {
                        if (!ev.button) {
                            const active = document.querySelector(".selected");

                            if (active !== this) {
                                active?.classList?.remove?.("selected");
                                this.classList.add("selected");
                                T.addToDOM();
                            }
                        }
                    }
                }
            ));

            if (active) {
                this.addToDOM();
            }
        }

        addToDOM() {
            [...bodyContainer.children, ...this.#docFrag.children].forEach(e => e.remove());

            const T = this;

            this.teams.forEach(team => {
                const verified = team.verified.get(this.name) ?? false;

                this.#docFrag.appendChild(makeElement(
                    "div",
                    {
                        textContent: team.name,
                        className: "team collapsed"
                    },
                    makeElement(
                        "p",
                        {
                            textContent: `${verified ? "Verified" : "Pending"}`,
                            className: `verified-widget ${verified ? "verif" : "pend"}`,
                            title: verified ? "Entry fee received" : "Entry fee not received"
                        },
                        void 0,
                        {
                            click(ev) { ev.stopPropagation(); }
                        }
                    ),
                    (() => {
                        /**
                         * @type {HTMLUListElement}
                         */
                        let names,
                            /**
                             * @type {HTMLUListElement}
                             */
                            participatedTourneys;

                        function generateNames() {
                            return names = makeElement(
                                "ul",
                                {
                                    textContent: "Members",
                                    className: "member-list"
                                },
                                team.members.map(m => makeElement("li", { textContent: m }))
                            );
                        }

                        function generateTourneys() {
                            const otherTourneys = [...team.verified.keys()].filter(v => v != T.name);

                            return participatedTourneys = otherTourneys.length ? makeElement(
                                "ul",
                                {
                                    textContent: "Also participated in:",
                                    className: "tourney-list"
                                },
                                otherTourneys.map(v => makeElement("li", { textContent: v }))
                            ) : void 0;
                        }

                        return {
                            click(ev) {
                                if (!ev.button) {
                                    this.classList.toggle("collapsed");
                                    const exapanded = this.classList.toggle("expanded");

                                    if (exapanded) {
                                        generateTourneys();
                                        this.appendChild(generateNames());
                                        participatedTourneys && this.appendChild(participatedTourneys);
                                    } else {
                                        names.remove();
                                        participatedTourneys.remove();
                                    }
                                }
                            }
                        };
                    })()
                ));
            });

            bodyContainer.appendChild(this.#docFrag);
        }
    }

    class team {
        /**
         * @type {Map<string, boolean>}
         */
        verified = new Map;

        /**
         * @type {string}
         */
        name;

        /**
         * @type {string[]}
         */
        members = [];

        /**
         * @param {string} name
         * @param {string[]} members
         */
        constructor (name, members) {
            this.name = name;
            this.members = members;

            teams.push(this);
        }
    }

    [
        [
            "Office-wide table hockey tourney 04/25/2001",
            [
                ["The A team", ["Imelda", "Vincent", "Patrick", "Harold"]],
                ["The B team", ["Daryll", "Pierre", "Ashley", "Eugene"]],
                ["Janitor gang", ["00", "01", "04", "13"]],
                ["THE BOSSES", ["Natalie", "Alex", "Carol", "Katelyn"]],
                ["Administration", ["admin_00", "admin_01", "admin_02", "admin_03"]]
            ]
        ],
        [
            "Office-wide table hockey tourney 03/14/2001",
            [
                ["Professional idiots", ["Imelda", "Ashley", "Steven"]],
                ["The ROB clan", ["Robert", "Bob", "Daryll"]],
                ["Bosses", ["Natalie", "Josh", "Alex", "Carol"]],
                ["Administration", ["admin_00", "admin_01", "admin_02", "admin_03"]]
            ]
        ],
        [
            "Volley tourney",
            [
                ["Kings", ["Robert", "Daryll", "Imelda", "Pierre"]],
                ["Team name goes here", ["Vincent", "Alex", "Gary", "Eric"]],
                ["; DROP TABLE *", ["supreme hacker", "arch user", "null", "steve linus gates"]],
                ["Administration", ["admin_00", "admin_01", "admin_02", "admin_03"]]
            ]
        ]
    ].forEach(/** @param {[string, [string, string[]][]]} e */e => {
        const tour = new tourney(e[0]);

        for (const [teamName, members] of e[1]) {
            const teamFound = teams.find(team => team.name == teamName);

            if (teamFound) {
                tour.addTeam(teamFound);
                teamFound.members = members;
                continue;
            }

            tour.addTeam(new team(teamName, members));
        }

        tour.teams.forEach(e => e.verified.set(tour.name, Math.random() > 0.5));
    });

    render();
}