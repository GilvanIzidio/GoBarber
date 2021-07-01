import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import ICacheProvider from '../CacheProvider/models/ICacheProvider';
import RedisCacheProvider from '../CacheProvider/implementations/RedisCacheProvider';


const providers = {
	redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
	'CacheProvider',providers.redis);
