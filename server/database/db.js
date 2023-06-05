const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

// function to create a user in the database
async function createUser(username, password) {
  await sequelize.sync();

  await User.create({ username, password });
}
