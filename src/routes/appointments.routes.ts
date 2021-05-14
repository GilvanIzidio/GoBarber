import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointments from '../models/Appointments';

const appointmentsRouter = Router();

const bdAppointments: Appointments[] = [];

appointmentsRouter.post('/', (request, response) => {
	const { provider, date } = request.body;
	const parsedDate = startOfHour(parseISO(date));

	const findAppointmentInSameDate = bdAppointments.find(appointment =>
		isEqual(parsedDate, appointment.date),
	);
	if (findAppointmentInSameDate) {
		return response
			.status(400)
			.json({ message: 'This appointment is already booked' });
	}
	const appointment = new Appointments(provider, parsedDate);
	bdAppointments.push(appointment);
	return response.json(appointment);
});
export default appointmentsRouter;
