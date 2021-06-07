import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
	provider_id: string;
	date: Date;
}

class createAppointmentService {
	constructor(private appointmentsRepository: IAppointmentsRepository) {}

	public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate =
			await this.appointmentsRepository.findByDate(appointmentDate);
		if (findAppointmentInSameDate) {
			throw new AppError('this appointment is already booked');
		}

		const appointment = await this.appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});

		return appointment;
	}
}

export default createAppointmentService;
