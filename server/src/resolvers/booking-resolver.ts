import { AppContext, Booking } from '../types/types';
import { AppDataSource } from '../connection/datasource';

import { Repository } from 'typeorm';
import {
  Args,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { pubSub } from '../../pub-sub';

@Resolver((of) => Booking)
export class BookingResolver {
  private bookingRepository: Repository<Booking> = AppDataSource.getRepository(Booking);
  @Query((returns) => [Booking])
  @Authorized()
  bookings(@Args('eventId') eventId: number, @Ctx() ctx: AppContext): Promise<Booking[]> {
    const isUserAdmin = ctx.userContext?.role === 'ROLE_ADMIN';
    if (isUserAdmin) {
      return this.bookingRepository.find({ where: { eventId } });
    } else {
      return this.bookingRepository.find({ where: { eventId, userId: ctx.userContext?.id } });
    }
  }
}
