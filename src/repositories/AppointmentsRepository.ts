import { isEqual } from 'date-fns';
import Appointments from '../models/Appointment';

interface CreateAppointmentDTO {
	provider: string;
	date: Date;
}

class AppointmentsRepository {
	private bdAppointments: Appointments[];

	constructor() {
		this.bdAppointments = [];
	}

	public findByDate(date: Date): Appointments | null {
		const findAppointment = this.bdAppointments.find(appointment =>
			isEqual(date, appointment.date),
		);
		return findAppointment || null;
	}

	public create({ provider, date }: CreateAppointmentDTO): Appointments {
		const appointment = new Appointments({ provider, date });

		this.bdAppointments.push(appointment);

		return appointment;
	}

	public all(): Appointments[] {
		return this.bdAppointments;
	}
}

export default AppointmentsRepository;
