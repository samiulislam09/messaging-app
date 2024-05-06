import { Resolver, Query } from '@nestjs/graphql';
import { ServerService } from './server.service';

@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
}
