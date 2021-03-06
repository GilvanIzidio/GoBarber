import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import './CacheProvider'
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherialMailProvider from './MailProvider/implementations/EtherialMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

const providers = {
	disk: DiskStorageProvider,
	s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	providers[uploadConfig.driver],
);

container.registerSingleton<IMailTemplateProvider>(
	'MailTemplateProvider',
	HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
	'MailProvider',
	container.resolve(EtherialMailProvider),
);
