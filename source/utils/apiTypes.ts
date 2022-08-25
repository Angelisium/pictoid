export interface TokenResponse {
    "access_token": string,
    "expires_in": number,
    "token_type": "Bearer"
}

export interface User {
    id: number,
    name: string,
    picture?: { url: string },
    locale: string,
    title: string,
    oldNames: Array<{ name: string, until: Date }>,
    sites: Array<SiteUser>, // .filter(siteId)
    like: Like,
    gender: string, // male, female, null
    birthday: string, // YYYY-MM-DD
    city: string,
    country: string,
    desc: string, // HTML
    status: string // HTML
    contacts: Array<Contact>, // .filter(userId), mine only, need scope contacts
    groups: Array<GroupMember>, // mine only, need scope groups
    devApps: Array<Application>, // mine only, need scope applications
}

export interface Contact {
    friend: boolean
    user: User
}

export interface SiteUser {
    user: User,
    site: Site,
    realId: number,
    link: string,
    stats: Array<Stat>, // .filter(statId)
    achievements: Array<Achievement>, // .filter(statId)
    points: number,
    npoints: number, // float
    isBetaTester: boolean, // mine only
}

export interface Site {
    id: number,
    name: string,
    host: string,
    icon: { url: string },
    lang: string, // null si multilingue
    like: Like
    infos: Array<SiteInfo>, // .filter(lang)
    me: SiteUser,
    status: string, // hide, soon, beta, open
}

export interface SiteInfo {
    id: number,
    site: Site,
    lang: string,
    cover: { url: string },
    tagLine: string,
    description: string,
    tid: string,
    icons: Array<{ tag: string, altTag: string | null, url: string, type: string }> // type = icon|image
}

export interface Like {
    url: string,
    likes: number,
    title: string,
}

export interface Stat {
    id: string,
    score: number,
    name: string,
    icon: string | null,
    description: string,
    rare: number,
    social: boolean
}

export interface Achievement {
    id: string, // siteId_statId_index
    name: string,
    stat: string,
    score: number, // required stat score to obtain this achievement
    points: number,
    npoints: number, // float
    description: string,
    data: { type: string, title?: string, url?: string, prefix?: boolean, suffix?: boolean },
    date: Date,
    index: number
}

export interface Application {
    id: number,
    name: string,
    url: string,
    owner: User,
    picture: { url: string },
    icon: { url: string },
    description: string,

    // reserved to owner + scope applications
    access: string, // OwnerOnly, OwnerContacts, Everyone
    dailyQuota: number,
    stats: Array<{ date: Date, calls: number, users: number }> // .filter(date)
}

export interface Group {
    id: number,
    name: string,
    link: string,
    banner?: { url: string },
    roles: Array<{ name: string }>,
    owner: User,
    members: Array<GroupMember>,
    size: number
}

export interface GroupMember {
    group: Group,
    user: User,
    title: string,
    role: { id: number, name: string }
}

export interface Lang {
    id: string,
    name: string,
    titleLinkWords: Array<string>,
    moderator: string
}

export interface AppliScope {
    scope: string,
    name: string,
    site: Site | null,
    active: boolean
}
