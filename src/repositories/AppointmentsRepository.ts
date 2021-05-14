import { isEqual } from 'date-fns';
import Appointments from '../models/Appointment';

class AppointmentsRepository {
	private bdAppointments: Appointments[];

	constructor() {
		this.bdAppointments = [];
	}
	// metodo de Pesquisa: Ainda nao implementado
	// public findByDate(date) {
	// 	const findAppointment = this.bdAppointments.find(appointment =>	);
	// }

	public create(provider: string, date: Date): Appointments {
		const appointment = new Appointments(provider, date);

		this.bdAppointments.push(appointment);

		return appointment;
	}
}

export default AppointmentsRepository;
