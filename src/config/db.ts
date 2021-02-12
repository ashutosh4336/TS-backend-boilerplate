import mongoose from 'mongoose';
import colors from 'colors';
import createMasterData from '../utils/master';
import Logger from '../utils/logger';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true,
      poolSize: 10, // Maintain up to 10 socket connections
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    // Logger.debug(process.env.MONGO_URI);

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', () => {
      Logger.info(
        'Mongoose default connection open to ' + process.env.MONGO_URI
      );
    });

    // If the connection throws an error
    mongoose.connection.on('error', (err) => {
      Logger.error('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      Logger.info('Mongoose default connection disconnected');
    });

    console.log(
      `✨ ` +
        colors.cyan.bold.underline(
          `MongoDB Connected at - ${conn.connection.host}`
        )
    );

    await createMasterData();
    console.log('📝️ ' + colors.cyan.bold.underline(`Master Data Created...`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
