import ICacheProvider from "../models/ICacheProvider";

interface ICacheData{
  [key:string]: string
}

export default class FakeCacheProvider implements ICacheProvider {
	public async save(key: string, value: string): Promise<void> {
		await this.client.set(key,JSON.stringify(value))

	}

	public async recover<T>(key: string): Promise<T | null > {
		const data = await this.client.get(key)
		if(!data){
			return null
		}
		const parsedData = JSON.parse(data) as T;
		return parsedData;
	}

	public async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }

	public async invalidatePrefix(prefix: string): Promise<void> {
		const keys = await this.client.keys(`${prefix}:*`);

		const pipeline = this.client.pipeline()

		keys.forEach(key => {
			pipeline.del(key);
		});
		await pipeline.exec();
	}
}
