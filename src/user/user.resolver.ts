import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLString } from 'graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Query(() => GraphQLBoolean)
  async identityAvailable(
    @Args({ name: 'identity', type: () => GraphQLString }) identity: string,
  ): Promise<boolean> {
    return !(
      await this.userService.userExists(identity)
    );
  }
}

