import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Profile } from "src/profile/types/profile.type";
import { Server } from "src/server/types/types";

@ObjectType()
export class Member {
    @Field(()=>ID)
    id: number;
    @Field(()=>Profile, {nullable: true})
    profile: Profile;
    @Field()
    profileId: string;
    @Field(()=>Server, {nullable: true})
    server: Server;
    @Field(()=>MemberRole)
    role: MemberRole;
    @Field({nullable: true})
    imageUrl: string;
    @Field()
    email: string;
    @Field()
    name: string;
    @Field()
    createdAt: Date;
    @Field()
    updatedAt: Date;
}

export enum MemberRole {
    MODERATOR= 'MODERATOR',
    ADMIN= 'ADMIN',
    GUEST= 'GUEST',
}

registerEnumType(MemberRole, {
    name: "MemberRole",
    description: "The role of the member"
});