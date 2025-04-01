
import { MongoDBConfig } from '@/types/AlgorithmTypes';

const mongoDBConfig: MongoDBConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  dbName: 'algoVisionAI',
  collections: {
    algorithms: 'algorithms',
    userHistory: 'userHistory'
  }
};

export default mongoDBConfig;
