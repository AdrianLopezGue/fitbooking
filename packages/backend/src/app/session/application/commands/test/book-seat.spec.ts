import { SessionBuilder } from './session.builder';

import { BookSeatHandler } from '../book-seat.handler';
import { BookSeatCommand } from '../book-seat.command';

import { InMemorySessionRepository } from '../../../infrastructure';

import { UserId } from '../../../../user';

describe('Book seat command', () => {
  it('should book a seat if a session has empty seats', async () => {
    const sessionBuilder = new SessionBuilder()
      .withId('f1ce3a58-1ecd-4ba0-a186-146b92833d68')
      .withAssistants([UserId.generate(), UserId.generate()]);
    const bookSeatHandler = new BookSeatHandler(
      new InMemorySessionRepository([sessionBuilder.session]),
    );

    const result = await bookSeatHandler.execute(
      new BookSeatCommand(
        'f1ce3a58-1ecd-4ba0-a186-146b92833d68',
        '9f0a8969-d287-4b84-ad21-8909301d2bc6',
      ),
    );

    expect(result.isOk()).toBe(true);
  });
});
