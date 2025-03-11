import  {
    Cluster,
    Bucket,
    Scope,
    Collection,
    QueryResult,
    GetResult,
    MutationResult,
  } from 'couchbase';

import * as couchbase from 'couchbase';

let cluster: Cluster | null = null;

export const connectToCluster = async () => {
  if (cluster) return cluster;
  try {
    cluster = await couchbase.connect('couchbase://127.0.0.1', {
      username: 'admin',
      password: 'password',
    });
    console.log('✅ Connected to Couchbase');
    return cluster;
  } catch (error) {
    console.error('❌ Couchbase connection failed:', error);
    throw error;
  }
};

export const getCollection = async (bucketName: string, scopeName = '_default', collectionName = '_default') => {
  const cluster = await connectToCluster();
  const bucket = cluster.bucket(bucketName);
  const scope = bucket.scope(scopeName);
  const collection = scope.collection(collectionName);
  return collection;
};