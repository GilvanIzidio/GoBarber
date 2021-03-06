import "reflect-metadata"
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointments from '../infra/typeorm/entities/Appointment';
import { classToClass } from "class-transformer";

interface IRequest {
	provider_id: string;
	day: number;
	month: number;
	year: number;
}

@injectable()
class ListProviderAppointmentsService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) { }

	public async execute({
		provider_id,
		year,
		month,
		day,
	}: IRequest): Promise<Appointments[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
		let appointments = await this.cacheProvider.recover<Appointments[]>(cacheKey);

		if (!appointments) {
			appointments = await this.appointmentsRepository.findAllInDayFromProvider({
				provider_id,
				year,
				month,
				day,
			},
			);

      console.log('buscou do banco')

      await this.cacheProvider.save(cacheKey, classToClass(appointments))
		}

		return appointments;
	}
}

export default ListProviderAppointmentsService;
