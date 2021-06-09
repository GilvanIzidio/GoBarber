import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '../UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
	it('should be able to update avatar user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const UpdateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		const user = await fakeUsersRepository.create({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		await UpdateUserAvatar.execute({
			user_id: user.id,
			avatarFilename: 'avatar.jpg',
		});

		expect(user.avatar).toBe('avatar.jpg');
	});

	it('should not be able to update avatar from non exists user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const UpdateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		expect(
			UpdateUserAvatar.execute({
				user_id: 'non-exists-id',
				avatarFilename: 'avatar.jpg',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should delete old avatar when updating new one', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

		const UpdateUserAvatar = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		const user = await fakeUsersRepository.create({
			name: 'Gilvan',
			email: 'gilvan@gmail.com',
			password: '123456',
		});

		await UpdateUserAvatar.execute({
			user_id: user.id,
			avatarFilename: 'avatar.jpg',
		});

		await UpdateUserAvatar.execute({
			user_id: user.id,
			avatarFilename: 'avatar2.jpg',
		});

		expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
		expect(user.avatar).toBe('avatar2.jpg');
	});
});
