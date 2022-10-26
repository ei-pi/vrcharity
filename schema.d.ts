// As stored in the DB
// Pointers will probably be deref'd when sent to the client

type Pointer<T extends { readonly ID: unknown; }> = T["ID"];
type link = string;
type email = `mailto:${string}`;
type JSONDate = string; // The result of Date.prototype.toJSON()
type nullptr = -1;

interface Basic {
    name: string;
    ID: number;
}

interface User extends Basic {
    password: string;
    permissions: number;
    teams: Pointer<Team>[];
    activeTeam: { readonly [key: `${Pointer<Tournament>}`]: Pointer<Team>; };
    verified: { readonly [key: `${Pointer<Tournament>}`]: boolean; };
}

interface Team extends Basic {
    reserves: Pointer<User>[];
    members: Pointer<User>[];
    captain: Pointer<User>;
    tourneys: Entry[];
}

interface Entry {
    verified: true | { readonly [key: Pointer<User>]: boolean; };
    bracket: Pointer<Bracket>;
    tournament: Pointer<Tournament>;
}

interface Bracket extends Basic {
    parent: Pointer<Tournament>;
    teams: Pointer<Team>[];
}

interface Tournament extends Basic {
    game: Pointer<Game>;
    brackets: Bracket[];

    get open(): boolean;
    get passed(): boolean;

    rules: link;
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

interface Sponsor {
    name: string;
    image: link;
    link: link;
    backgroundColor: string;
}

interface Charity extends Basic {
    description: string;
    link: link;
}

interface Contact {
    name: string;
    title: string;
    email: email;
}
export interface DB {
    users: User[];
    teams: Team[];
    tournaments: Tournament[];
    games: Game[];
    charities: Charity[];
    news: News[];
    sponsors: Sponsor[];
    contacts: Contact[];
}