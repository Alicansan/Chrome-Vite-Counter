import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type CountState = {
  count: number;
};

type CounterStorage = BaseStorage<CountState> & {
  setCount: (count: number) => Promise<void>;
};

const defaultState: CountState = {
  count: 0,
};

const storage = createStorage<CountState>('counter-storage-key', defaultState, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const counterStorage: CounterStorage = {
  ...storage,
  setCount: async (count: number) => {
    await storage.set({ count });
  },
};

export default counterStorage;
