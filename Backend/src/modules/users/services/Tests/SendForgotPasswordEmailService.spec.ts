import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

describe('SendForgotPasswordEmail', () => {
	it('should be able to recovery the password using the email', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeMailProvider = new FakeMailProvider();

		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

		const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
		);

		await fakeUsersRepository.create({
			name: 'Gilvan',
			email: 'izidio@gmail.com',
			password: '123456',
		});

		await sendForgotPasswordEmail.execute({
			email: 'izidio@gmail.com',
		});

		expect(sendMail).toHaveBeenCalled();
	});

	it('should not be able to recovery the password a non-existing user password', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeMailProvider = new FakeMailProvider();

		const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
		);

		await expect(
			sendForgotPasswordEmail.execute({
				email: 'izidio@gmail.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
