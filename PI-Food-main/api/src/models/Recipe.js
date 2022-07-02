const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: true
      }
    },
    summary: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 0,
        max: 100
      }
    },
    healthScore: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 0,
        max: 100
      }
    },
    steps: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://data.whicdn.com/images/338252817/original.jpg"
    },
    createdInDb: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
