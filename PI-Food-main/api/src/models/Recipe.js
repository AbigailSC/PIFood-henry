const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    dishTypes: {
      type: DataTypes.STRING
    },
    steps: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://data.whicdn.com/images/338252817/original.jpg"
    },
    createInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
