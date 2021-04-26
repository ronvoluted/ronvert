import { openDB } from 'idb';

const initialiseIDB = async (databaseName, stores, version = 1) => {
  const database = await openDB(databaseName, version, {
    upgrade(database) {
      if (stores.size >= 1) {
        stores.forEach((store) => {
          database.createObjectStore('files');
        });
      }
    }
  });
};

const addFile = async (databaseName, storeName, value, key, mode = 'readwrite', version = 1) => {
  const database = await openDB(databaseName, version);
  const transaction = database.transaction(storeName, mode);
  await transaction.store.put(value, key);
  await transaction.done;
};

const getFile = async (databaseName, storeName, key) => {
  const database = await openDB(databaseName);
  return await database.transaction(storeName).store.get(key);
};

const clearStore = async (databaseName, storeName, version = 1) => {
  const database = await openDB(databaseName, version);
  const transaction = await database.transaction(storeName, 'readwrite');
  const keys = await transaction.store.getAllKeys();

  keys.forEach((key) => {
    transaction.store.delete(key);
  });

  await transaction.done;
};

export { initialiseIDB, addFile, getFile, clearStore };
