import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
	provider: string;
	date: Date;
}

class createAppointmentService {
	private appointmentsRepository: AppointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	public execute({ date, provider }: Request): Appointment {
		const appointmentData = startOfHour(date);

		const findAppointmentInSameDate =
			this.appointmentsRepository.findByDate(appointmentData);
		if (findAppointmentInSameDate) {
			throw Error('his appointment is already booked');
		}

		const appointment = this.appointmentsRepository.create({
			provider,
			date: appointmentData,
		});
		return appointment;
	}
}

export default createAppointmentService;
