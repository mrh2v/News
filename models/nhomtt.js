module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NHOM_TT', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    TEN_NHOM: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    HIEN_THI: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    THU_TU: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'NHOM_TT',
    freezeTableName: true,
    timestamps: false,
  });
};
