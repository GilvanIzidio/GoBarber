import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
	name: string;
	email: string;
	password: string;
}
injectable();
class CreateUserService {
	constructor(
		@inject('UserRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ name, email, password }: IRequest): Promise<User> {
		const checkUserExixts = await this.usersRepository.findByEmail(email);
		if (checkUserExixts) {
			throw new AppError('Email alredy exists');
		}

		const hashedPassword = await hash(password, 8);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export default CreateUserService;
