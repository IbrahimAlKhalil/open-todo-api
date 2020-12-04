import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { RegisterInput } from './register.input';
import { GraphQLBoolean } from 'graphql';

@Resolver()
export class RegistrationResolver {
  constructor(private readonly useService: UserService) {
  }

  @Mutation(() => GraphQLBoolean)
  async register(
    @Args('input') input: RegisterInput,
  ): Promise<boolean> {
    await this.useService.create(input);

    return true;
  }
}
