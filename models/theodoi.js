module.exports = function(sequelize, DataTypes) {
  return sequelize.define('THEO_DOI', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    THOI_GIAN: {
      type: DataTypes.DATE,
      allowNull: false
    },
    TRUY_CAP: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'THEO_DOI',
    freezeTableName: true,
    timestamps: false,
  });
};
