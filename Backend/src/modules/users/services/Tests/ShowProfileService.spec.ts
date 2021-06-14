import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../../repositories/fakes/FakeUsersRepository';
import ShowProfileService from '../ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository();

		showProfile = new ShowProfileService(fakeUserRepository);
	});

	it('should be able to show the profile', async () => {
		const user = await fakeUserRepository.create({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		const profile = await showProfile.execute({
			user_id: user.id,
		});
		expect(profile.name).toBe('Gilvan');
		expect(profile.email).toBe('gilvan@gmail.com');
	});

	it('should be able to show the profile from non-existing-user', async () => {
		expect(
			showProfile.execute({
				user_id: 'non-existing-user-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
