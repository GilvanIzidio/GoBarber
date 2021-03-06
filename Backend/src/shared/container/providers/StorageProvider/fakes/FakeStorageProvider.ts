import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
	private storage: string[] = [];

	public async saveFile(file: string): Promise<string> {
		this.storage.push(file);
		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		const FindIndex = this.storage.findIndex(
			storageFile => storageFile === file,
		);

		this.storage.splice(FindIndex, 1);
	}
}

export default FakeStorageProvider;
