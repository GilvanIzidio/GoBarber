import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '../ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider()

		listProviders = new ListProvidersService(fakeUserRepository,fakeCacheProvider);

	});

	it('should be able to list the providers', async () => {
		const user1 = await fakeUserRepository.create({
			name: 'Mateus',
			email: 'Mateus@gmail.com',
			password: '123456',
		});

		const user2 = await fakeUserRepository.create({
			name: 'Rodrigo',
			email: 'Rodrigo@gmail.com',
			password: '123456',
		});

		const loggedUser = await fakeUserRepository.create({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		const providers = await listProviders.execute({
			user_id: loggedUser.id,
		});
		expect(providers).toEqual([user1, user2]);
	});
});
