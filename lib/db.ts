"use client"

import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface SchoolDB extends DBSchema {
  students: {
    key: string;
    value: {
      id: string;
      name: string;
      email: string;
      grade: string;
    };
  };
  teachers: {
    key: string;
    value: {
      id: string;
      name: string;
      email: string;
      subject: string;
    };
  };
  courses: {
    key: string;
    value: {
      id: string;
      name: string;
      description: string;
      teacherId: string;
    };
  };
}

let db: IDBPDatabase<SchoolDB>;

export async function openDatabase() {
  if (!db) {
    db = await openDB<SchoolDB>('SchoolManagementSystem', 1, {
      upgrade(db) {
        db.createObjectStore('students', { keyPath: 'id' });
        db.createObjectStore('teachers', { keyPath: 'id' });
        db.createObjectStore('courses', { keyPath: 'id' });
      },
    });
  }
  return db;
}

export async function getAll<T extends keyof SchoolDB>(storeName: T): Promise<SchoolDB[T]['value'][]> {
  const db = await openDatabase();
  return db.getAll(storeName);
}

export async function add<T extends keyof SchoolDB>(storeName: T, item: SchoolDB[T]['value']): Promise<string> {
  const db = await openDatabase();
  const id = await db.add(storeName, item);
  return id.toString();
}

export async function update<T extends keyof SchoolDB>(storeName: T, item: SchoolDB[T]['value']): Promise<void> {
  const db = await openDatabase();
  await db.put(storeName, item);
}

export async function remove<T extends keyof SchoolDB>(storeName: T, id: string): Promise<void> {
  const db = await openDatabase();
  await db.delete(storeName, id);
}

export async function get<T extends keyof SchoolDB>(storeName: T, id: string): Promise<SchoolDB[T]['value'] | undefined> {
  const db = await openDatabase();
  return db.get(storeName, id);
}