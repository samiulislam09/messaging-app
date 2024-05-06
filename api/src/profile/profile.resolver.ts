import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Profile } from './types/profile.type';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { ProfileService } from './profile.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/guards/auth.guard';

@Resolver()
export class ProfileResolver {
    constructor(private readonly profileService: ProfileService) {}
    @UseGuards(GraphqlAuthGuard)
    @Mutation(() => Profile)
    async createProfile(@Args('input') input: CreateProfileDto) {
        return this.profileService.createProfile(input);
    }
    @Query(() => Profile)
    async getProfileById(@Args('profileId') profileId: number) {
        return this.profileService.getProfileById(profileId);
    }
}
