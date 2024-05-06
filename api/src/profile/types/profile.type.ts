import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Channel, Server } from "src/server/types/types";

@ObjectType()
export class Profile {
    @Field(()=>ID)
    id: number;
    @Field()
    name: string;
    @Field()
    email: string;
    @Field(()=>[Server], {nullable: 'itemsAndList'})
    servers: Server[];
    @Field()
    imageUrl: string;
    @Field(()=>[Channel], {nullable: 'itemsAndList'})
    channels: Channel[];


}