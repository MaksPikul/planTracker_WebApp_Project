import { Member, Project, User, $Enums, View, List, Task } from "@prisma/client";

export type ProjectWithMembersWithProfiles = Project & {
    members: (Member & {user: User})[]
}

export type MembersWithProfiles = (Member & {user: User})[]

export type ProjectWithMembers = (Project & {members: Member[]})

export type UserWithProjectsWithMembers = User & {
    projects: (Project & {
        members: Member[]})[]
}

export type ProjectWithViews = View[] & Project


export type Membership = ({project: Project} & {member: Member})

export type ListWithCards = List & {tasks: Task[]};
export type CardWithList = Task & {list: List};

