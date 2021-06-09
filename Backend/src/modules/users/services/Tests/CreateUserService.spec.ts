import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';

describe('CreateUser', () => {
	it('should be able to create a new user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUser.execute({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
	});

	it('shoud not be able to create two emails equals', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const emailEqual = 'fulano@gmail.com';

		await createUser.execute({
			name: 'Gilvan',
			email: emailEqual,
			password: '123456',
		});

		expect(
			createUser.execute({
				name: 'Gilvan',
				email: emailEqual,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});