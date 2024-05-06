import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Member } from "src/member/member.types";
import { Profile } from "src/profile/types/profile.type";

@ObjectType()
export class Channel {
    @Field(()=>ID)
    id: number;
    @Field({nullable: true})
    name: string;
    @Field(()=>ChannelType)
    type: ChannelType;
    @Field()
    createdAt: Date;
    @Field()
    updatedAt: Date;
    @Field(()=>[Member], {nullable: true})
    members: Member[];

}

export enum ChannelType {
    TEXT,
    AUDIO,
    VIDEO,
}

registerEnumType(ChannelType, {
    name: "ChannelType",
    description: "The type of channel"
});

@ObjectType()
export class Server{
    @Field(()=>ID)
    id: number;
    @Field()
    name: string;
    @Field()
    imgUrl: string;
    @Field({nullable: true})
    inviteCode: string
    @Field()
    profileId: number;
    @Field(()=>Profile, {nullable: true})
    profile: Profile;
    @Field(()=>[Member], {nullable: 'itemsAndList'})
    members: Member[];
    @Field(()=>[Channel], {nullable: 'itemsAndList'})
    channels: Channel[];
}