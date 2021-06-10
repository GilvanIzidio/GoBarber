import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeMailProvider = new FakeMailProvider();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
			fakeUserTokensRepository,
		);
	});

	it('should be able to recovery the password using the email', async () => {
		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
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
		await expect(
			sendForgotPasswordEmail.execute({
				email: 'izidio@gmail.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should generate a forgot password token', async () => {
		const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

		const user = await fakeUsersRepository.create({
			name: 'Gilvan Izidio',
			email: 'g@gmail.com',
			password: '123456',
		});

		await sendForgotPasswordEmail.execute({
			email: 'g@gmail.com',
		});

		expect(generateToken).toHaveBeenCalledWith(user.id);
	});
});
