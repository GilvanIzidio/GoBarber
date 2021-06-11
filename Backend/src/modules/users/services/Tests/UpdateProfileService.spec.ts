import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '../UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeHashProvider = new FakeHashProvider();
		fakeUserRepository = new FakeUserRepository();
		updateProfile = new UpdateProfileService(
			fakeUserRepository,
			fakeHashProvider,
		);
	});

	it('should be able update the profile', async () => {
		const user = await fakeUserRepository.create({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		const updatedUser = await updateProfile.execute({
			user_id: user.id,
			name: 'Gilvan Modified',
			email: 'g@example.com',
		});
		expect(updatedUser.name).toBe('Gilvan Modified');
		expect(updatedUser.email).toBe('g@example.com');
	});

	it('should not be able to change to another user email', async () => {
		await fakeUserRepository.create({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		const user = await fakeUserRepository.create({
			name: 'teste',
			email: 'teste@gmail.com',
			password: '123456',
		});

		await expect(
			updateProfile.execute({
				user_id: user.id,
				name: 'Gilvan Modified',
				email: 'gilvan@gmail.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able update the password', async () => {
		const user = await fakeUserRepository.create({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		const updatedUser = await updateProfile.execute({
			user_id: user.id,
			name: 'Gilvan Modified',
			email: 'g@example.com',
			password: '123123',
			old_password: '123456',
		});
		expect(updatedUser.password).toBe('123123');
	});

	it('should not be able update the password without old Password', async () => {
		const user = await fakeUserRepository.create({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		await expect(
			updateProfile.execute({
				user_id: user.id,
				name: 'Gilvan Modified',
				email: 'g@example.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able update the password with wrong old password', async () => {
		const user = await fakeUserRepository.create({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		await expect(
			updateProfile.execute({
				user_id: user.id,
				name: 'Gilvan Modified',
				email: 'g@example.com',
				password: '123123',
				old_password: 'wrong-password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
