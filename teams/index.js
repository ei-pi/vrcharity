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
         * @type {Map<string, team[]>}
         */
        brackets = new Map;

        /**
         * @type {DocumentFragment}
         */
        #docFrag;

        /**
         * @param {string} name
         */
        constructor (name) {
            this.name = name;

            tourneys.push(this);
        }

        /**
         * @param {string} bracket
         * @param {team} team
         */
        addTeam(bracket, team) {
            (this.brackets.get(bracket) ?? this.brackets.set(bracket, []).get(bracket)).push(team);
            team.verified.set(this.name, false);
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
            [...bodyContainer.children].forEach(e => e.remove());

            const T = this;

            bodyContainer.appendChild(this.#docFrag ??=
                makeElement(
                    "div",
                    {},
                    [...this.brackets.entries()].map(([name, teams]) => {
                        return makeElement(
                            "div",
                            {
                                className: "bracket collapsed",
                                textContent: name,
                                tabIndex: 0
                            },
                            void 0,
                            (() => {
                                /**
                                 * @type {HTMLDivElement[]}
                                 */
                                let content;

                                function generateContent() {
                                    return content = teams.map(team => {
                                        const verified = team.verified.get(T.name) ?? false;

                                        return makeElement(
                                            "div",
                                            {
                                                textContent: team.name,
                                                className: "team collapsed",
                                                tabIndex: 0
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
                                                            textContent: team.members.length ? "Members" : "No members found…",
                                                            className: "member-list",
                                                            style: {
                                                                fontStyle: team.members.length ? "" : "italic"
                                                            }
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
                                                        ev.stopPropagation();
                                                        if (!ev.button) {
                                                            this.classList.toggle("collapsed");
                                                            const expanded = this.classList.toggle("expanded");

                                                            if (expanded) {
                                                                generateTourneys();
                                                                this.appendChild(generateNames());
                                                                participatedTourneys && this.appendChild(participatedTourneys);
                                                            } else {
                                                                names?.remove?.();
                                                                participatedTourneys?.remove?.();
                                                            }
                                                        }
                                                    },
                                                    keydown(ev) {
                                                        ev.stopPropagation();
                                                        if (ev.key == "Enter") {
                                                            this.dispatchEvent(new MouseEvent("click"));
                                                        }
                                                    }
                                                };
                                            })()
                                        );
                                    });
                                }

                                return {
                                    click(ev) {
                                        if (!ev.button) {
                                            this.classList.toggle("collapsed");
                                            const expanded = this.classList.toggle("expanded");

                                            if (expanded) {
                                                this.append(...generateContent());
                                            } else {
                                                content?.forEach(e => e.remove());
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
                        );
                    })
                )
            );
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
            "Game Pink Tournament 2022",
            [
                {
                    name: "Hero Bracket",
                    teams: [
                        ["Notorious", []],
                        ["Dark Tidings", []],
                        ["ROME", []],
                        ["STR1VE", []],
                        ["Ember", []],
                        ["Animal House", []],
                        ["Black Watch", []],
                        ["SirenSnails", []],
                        ["ODB", []],
                        ["Peacekeepers", []],
                        ["Bossfight", []],
                        ["Furious Blaze Matters", []],
                        ["INSIDIOUS", []],
                        ["Imperial", []],
                    ]
                },
                {
                    name: "Rise Up Bracket",
                    teams: [
                        ["Excommunicado", []],
                        ["After Hours", []],
                        ["Astro", []],
                        ["The Dark Wolves", []],
                        ["Death Wish", []],
                        ["Impact Momentum", []],
                        ["The Godfather's", []],
                        ["WarThug_QC", []],
                        ["Los Monjes", []],
                        ["Save 2nd Base", []],
                        ["Alchemist", []],
                        ["Bad Company", []],
                        ["OCC TEAM", []],
                        ["Patron Saints", []],
                        ["Iron Side", []],
                        ["The Amazonians", []],
                        ["In Ora Mortis", []],
                        ["Dēlēre", []],
                        ["Tau-5", []],
                        ["The Nightingales", []],
                        ["Homeland Esports", []],
                        ["SPEAR", []],
                    ]
                }
            ]
        ],
        [
            "StackUp Tournament 2021",
            [
                {
                    name: "T-Rex Bracket",
                    teams: [
                        ["Kai", []],
                        ["Animal House", []],
                        ["Very Sexy", []],
                        ["Friendly Fire", []],
                        ["ReadyUp", []],
                        ["BossFight", []],
                        ["Notorious", []],
                        ["CodLegends", []],
                        ["Dark Tidings", []],
                        ["GentlemansClub", []],
                    ]
                },
                {
                    name: "Spinosaurus Bracket",
                    teams: [
                        ["Violence of Action", []],
                        ["SnS", []],
                        ["Astro", []],
                        ["L.R.R.P", []],
                        ["Enitity", []],
                        ["After Hours", []],
                        ["Revengers", []],
                        ["Leftovers", []],
                        ["Swagalicious", []],
                        ["The Nightingales", []],
                        ["Legion", []],
                    ]
                }
            ],
        ]
    ].forEach(/** @param {[string, { name: string, teams: [string, string[]][] }[]]} e */e => {
        const tour = new tourney(e[0]);

        for (const { name, teams } of e[1]) {
            for (const [teamName, members] of teams) {
                const teamFound = teams.find(team => team.name == teamName);

                if (teamFound) {
                    tour.addTeam(teamFound);
                    teamFound.members = members;
                    continue;
                }

                tour.addTeam(name, new team(teamName, members));
            }
        }

        [...tour.brackets.values()].flat().forEach(e => e.verified.set(tour.name, true));
    });

    render();
}