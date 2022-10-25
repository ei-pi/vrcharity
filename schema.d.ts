// As stored in the DB
// Pointers will probably be deref'd when sent to the client

type Pointer<T extends { readonly ID: unknown; }> = T["ID"];
type link = string;
type email = `mailto:${string}`;
type JSONDate = string; // The result of Date.prototype.toJSON()

interface Basic {
    name: string;
    readonly ID: number;
}

interface User extends Basic {
    private password: string;
    permissions: number;
}

interface Player extends User {
    team: Pointer<Team>;
}

interface Team extends Basic {
    members: Pointer<Player>[];
    captain: Pointer<Player>;
    tourneys: Pointer<Entry>[];
}

interface Entry {
    verified: true | { readonly [key: Pointer<Player>]: boolean; };
    bracket: Pointer<Bracket>;
    tournament: Pointer<Tournament>;
}

interface Bracket extends Basic {
    parent: Pointer<Tournament>;
    teams: Pointer<Team>[];
}

interface Tournament extends Basic {
    game: Pointer<Game>;
    brackets: Pointer<Bracket>[];

    get open(): boolean;
    get passed(): boolean;

    prize: string;
    format: string;
    charity: Pointer<Charity>;
    registrationInterval: [JSONDate, JSONDate];
    tournamentDate: JSONDate | [JSONDate, JSONDate];
}

interface Game extends Basic {
    tournaments: Pointer<Tournament>[];
}

interface News extends Basic {
    title: string;
    content: string;
    author: Pointer<User>;
    date: JSONDate;
}

interface Sponsor extends Basic {
    image: link;
    link: link;
}

interface Charity extends Basic {
    description: string;
    link: link;
}

interface Contact {
    name: string;
    title: string;
    address: email;
}