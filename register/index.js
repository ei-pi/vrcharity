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

        /**
         * @type {boolean}
         */
        active;

        /**
         * @type {Date}
         */
        tourneyDate;

        /**
         * @param {string} name
         * @param {boolean} active
         * @param {Date} date
         */
        constructor (name, active, date) {
            this.name = name;
            this.active = active;
            this.date = date;
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
         * @param {tourney[]} activeTourneys
         * @param {tourney[]} pastTourneys
         */
        constructor (name, activeTourneys, pastTourneys) {
            this.name = name;
            this.tourneys = [...activeTourneys.concat(pastTourneys)];
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
                        actTourneys: this.tourneys.filter(t => t.active).length,
                        pasTourneys: this.tourneys.filter(t => !t.active).length
                    }
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
                                .filter(t => t.active)
                                .map(t => makeElement(
                                    "div",
                                    {
                                        className: "game-tourney"
                                    },
                                    [
                                        makeElement(
                                            "p",
                                            { textContent: t.name }
                                        ),
                                        makeElement(
                                            "p",
                                            { textContent: t.date.toUTCString() }
                                        )
                                    ]
                                ))
                        );
                    }

                    return {
                        click(ev) {
                            if (!ev.button) {
                                collapsed = !collapsed;

                                if (collapsed) {
                                    T.#div.appendChild(generateWidget());
                                } else {
                                    widget?.remove?.();
                                }
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
            [],
            []
        ],
        [
            "VAIL",
            [],
            []
        ],
        [
            "Contractors",
            [],
            []
        ],
        [
            "VTOL",
            [],
            []
        ],
        [
            "Walkabout Mini Golf",
            [
                {
                    name: "The legends Mini golf tournament!",
                    date: new Date(0)
                }
            ],
            []
        ],
        [
            "Hyper Dash",
            [],
            [
                {
                    name: "test",
                    date: new Date(0)
                }
            ]
        ],
        [
            "Echo Arena",
            [],
            []
        ]
    ].sort(/** @param {[string, { name: string, date: Date }[], { name: string, date: Date }[]]} a @param {[string, { name: string, date: Date }[], { name: string, date: Date }[]]} b */(a, b) => {
        return Math.sign(b[1].length) - Math.sign(a[1].length) || Math.sign(b[2].length) - Math.sign(a[2].length);
    })
        .forEach(/** @param {[string, { name: string, date: Date }[], { name: string, date: Date }[]]} e */e => {
            new game(
                e[0],
                e[1].map(t => new tourney(t.name, true, t.date)),
                e[2].map(t => new tourney(t.name, false, t.date))
            );
        });

    render();
}