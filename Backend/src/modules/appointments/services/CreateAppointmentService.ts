import 'reflect-metadata';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
	provider_id: string;
	date: Date;
	user_id: string;
}
@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,

		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({
		date,
		provider_id,
		user_id,
	}: IRequest): Promise<Appointment> {
		const appointmentDate = startOfHour(date);
    const cacheKey = `provider-appointments:${provider_id}:${format(appointmentDate,'yyyy-M-d')}`

		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError("You can't  create an appointment on a past date");
		}

		if (user_id === provider_id) {
			throw new AppError("You can't  create an appointment with yourself");
		}

		if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
			throw new AppError(
				'you can only create appointments betwheen 8am and 5pm',
			);
		}

		const findAppointmentInSameDate =
			await this.appointmentsRepository.findByDate(appointmentDate,provider_id);
		if (findAppointmentInSameDate) {
			throw new AppError('this appointment is already booked');
		}

		const appointment = await this.appointmentsRepository.create({
			provider_id,
			user_id,
			date: appointmentDate,
		});

		const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm 'h'");

		await this.notificationsRepository.create({
			recipient_id: provider_id,
			content: `Novo agendamento para dia ${dateFormatted}`,
		});

    await this.cacheProvider.invalidate(cacheKey);

		return appointment;
	}
}

export default CreateAppointmentService;
