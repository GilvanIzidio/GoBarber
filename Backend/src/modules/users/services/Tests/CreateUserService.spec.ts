import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider()
		createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider,fakeCacheProvider);
	});
	it('should be able to create a new user', async () => {
		const user = await createUser.execute({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
	});

	it('shoud not be able to create two emails equals', async () => {
		//  const emailEqual = 'fulano@gmail.com';

		await createUser.execute({
			name: 'Mateus',
			email: 'fulano@gmail.com',
			password: '965874',
		});

		await expect(
			createUser.execute({
				name: 'Gilvan',
				email: 'fulano@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
