import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointments {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	provider: string;

	@Column('time with time zone')
	date: Date;
}
export default Appointments;
