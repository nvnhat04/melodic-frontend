import { parseBlob } from 'music-metadata';

export default async function detectDuration(file) {
    try {
        if (!(file instanceof Blob)) {
            throw new Error('Invalid file: Expected a Blob or File object');
        }

        // Sử dụng parseBlob để phân tích metadata của file âm thanh
        const metadata = await parseBlob(file);
        return metadata.format.duration || 0; // Trả về thời gian tính bằng giây
    } catch (error) {
        console.error('Error detecting duration:', error.message);
        return 0;
    }
}
