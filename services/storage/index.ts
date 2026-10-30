export interface StorageObject {
  key: string;
  url: string;
  contentType: string;
  sizeBytes: number;
}

export interface StorageAdapter {
  put(input: { key: string; body: Uint8Array; contentType: string }): Promise<StorageObject>;
  remove(key: string): Promise<void>;
}
