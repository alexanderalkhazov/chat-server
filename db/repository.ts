import { Collection, GetResult, MutationResult, QueryResult } from 'couchbase';
import { getCollection, connectToCluster } from './client';
import { v4 as uuid } from "uuid";


export class BaseRepository<T> {
  private bucket: string;
  private scope: string;
  private collection: string;

  constructor(bucket: string, scope: string, collection: string) {
    this.bucket = bucket;
    this.scope = scope;
    this.collection = collection;
  }

  private async getCollection(): Promise<Collection> {
    return await getCollection(this.bucket, this.scope, this.collection);
  }

  async getById(id: string): Promise<T | null> {
    const collection = await this.getCollection();
    try {
      const result: GetResult = await collection.get(id);
      return result.content as T;
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error);
      return null;
    }
  }

  async create(data: T): Promise<MutationResult> {
    const collection = await this.getCollection();
    const randomId = uuid();
    try {
      return await collection.insert(randomId, data);
    } catch (error) {
      console.error(`Error inserting document ${randomId}:`, error);
      throw error;
    }
  }

  async update(id: string, data: T): Promise<MutationResult> {
    const collection = await this.getCollection();
    try {
      return await collection.upsert(id, data);
    } catch (error) {
      console.error(`Error upserting document ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    try {
      await collection.remove(id);
      return true;
    } catch (error) {
      console.error(`Error deleting document ${id}:`, error);
      return false;
    }
  }

  async query(query: string, params: Record<string, any> = {}): Promise<QueryResult> {
    const cluster = await connectToCluster();
    try {
      const result: QueryResult = await cluster.query(query, {
        parameters: params,
      });
      return result;
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }
}