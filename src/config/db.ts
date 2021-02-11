import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(
      `✨ ` +
        colors.cyan.bold.underline(
          `MongoDB Connected at - ${conn.connection.host}`
        )
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
