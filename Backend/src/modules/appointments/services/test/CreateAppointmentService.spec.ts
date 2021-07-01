import AppError from '@shared/errors/AppError';
import FakeNotificationsRepositoy from '@modules/notifications/repositories/fakes/fakeNotificationsRepositoy';
import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from '../CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepositoy: FakeNotificationsRepositoy;
let fakeCacheProvider: FakeCacheProvider

describe('Create Appointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		fakeNotificationsRepositoy = new FakeNotificationsRepositoy();
    fakeCacheProvider = new FakeCacheProvider();

		createAppointment = new CreateAppointmentService(
			fakeAppointmentsRepository,
			fakeNotificationsRepositoy,
      fakeCacheProvider
		);
	});

	it('should be able to create a new appoitment', async () => {
		jest.spyOn(Date, 'now').mockImplementation(() => {
			return new Date(2021, 7, 15, 16).getTime();
		});

		const appointment = await createAppointment.execute({
			date: new Date(2021, 7, 15, 17),
			user_id: '777',
			provider_id: '123123',
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('123123');
	});

	it('should not be able to create two appointments on the same time', async () => {
		const appointmentDate = new Date(2021, 7, 15, 17);

		await createAppointment.execute({
			date: appointmentDate,
			user_id: '777',
			provider_id: '123123',
		});

		expect(
			createAppointment.execute({
				date: appointmentDate,
				user_id: '777',
				provider_id: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment on a past date', async () => {
		jest.spyOn(Date, 'now').mockImplementation(() => {
			return new Date(2021, 7, 10, 16).getTime();
		});

		await expect(
			createAppointment.execute({
				date: new Date(2021, 7, 10, 13),
				user_id: '777',
				provider_id: '123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment with same user as provider', async () => {
		jest.spyOn(Date, 'now').mockImplementation(() => {
			return new Date(2021, 7, 10, 15).getTime();
		});

		await expect(
			createAppointment.execute({
				date: new Date(2021, 7, 10, 13),
				user_id: '777',
				provider_id: '777',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment before 8am after 5pm', async () => {
		jest.spyOn(Date, 'now').mockImplementation(() => {
			return new Date(2021, 7, 10, 15).getTime();
		});

		await expect(
			createAppointment.execute({
				date: new Date(2021, 7, 11, 7),
				user_id: '7377',
				provider_id: '65121',
			}),
		).rejects.toBeInstanceOf(AppError);

		await expect(
			createAppointment.execute({
				date: new Date(2021, 7, 11, 18),
				user_id: '7477',
				provider_id: '65221',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
