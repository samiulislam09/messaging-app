import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { ServerService } from './server.service';
import { Server } from './types/types';
import { Request } from 'express';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/guards/auth.guard';
import { CreateServerDto } from './dto/createServerDto';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
import { createWriteStream } from 'fs';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}
  @Query(()=>[Server])
  async getServers(@Args('profileId') profileId: number, @Context('req') ctx: {req: Request}){
    if(!ctx.req?.profile.email) {
      throw new BadRequestException('Profile not found');
    }
    return this.serverService.getServersByEmail(ctx.req.profile.email);
  }

  @Mutation(()=>Server)
  async createServer(@Args('input') input: CreateServerDto, @Args('file', {type: () => GraphQLUpload, nullable: true}) file: GraphQLUpload){
    const {createReadStream, filename} = await file;
    const fileName = `${Date.now()}-${filename}`;
    const imagePath = join(process.cwd(), 'uploads', fileName);
    const imageUrl = `http://localhost:3000/${fileName}`;
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));
    return this.serverService.createServer(input, imageUrl);
  }
    
}
