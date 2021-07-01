import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '../ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider

describe('ListProviderDayAvailability', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

		listProviderAppointments = new ListProviderAppointmentsService(
			fakeAppointmentsRepository,fakeCacheProvider
		);
	});

	it('should be able to list the appointments  on a specific day', async () => {
		const appointments1 = await fakeAppointmentsRepository.create({
			provider_id: 'provider',
			user_id: '777',
			date: new Date(2020, 4, 20, 14, 0, 0),
		});

		const appointments2 = await fakeAppointmentsRepository.create({
			provider_id: 'provider',
			user_id: '777',
			date: new Date(2020, 4, 20, 15, 0, 0),
		});

		const appointments = await listProviderAppointments.execute({
			provider_id: 'provider',
			year: 2020,
			month: 5,
			day: 20,
		});

		expect(appointments).toEqual([appointments1, appointments2]);
	});
});
