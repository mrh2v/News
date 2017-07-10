module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BINHLUAN', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_TIN: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NOI_DUNG: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ID_USER: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NGUOI_BINH_LUAN: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    THOI_GIAN: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BINH_LUAN',
    freezeTableName: true,
    timestamps: false,
  });
};
