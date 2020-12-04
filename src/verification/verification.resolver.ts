import { VerificationService } from './verification.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLBoolean } from 'graphql';

@Resolver()
export class VerificationResolver {
  constructor(private readonly verificationService: VerificationService) {
  }

  @Mutation(() => GraphQLBoolean)
  async verifyEmail(
    @Args({
      name: 'token', type: () => GraphQLBoolean,
    }) token: string,
  ): Promise<boolean> {
    return this.verificationService.verify(token);
  }
}
