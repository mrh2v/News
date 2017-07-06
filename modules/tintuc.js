module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TINTUC', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_LOAI_TIN: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_NGUOI_DANG: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TIEU_DE: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    NOI_DUNG_TT: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    NOI_DUNG: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    THOI_GIAN: {
      type: DataTypes.DATE,
      allowNull: false
    },
    SO_LAN_XEM: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TU_KHOA: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ANH: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {
    tableName: 'TINTUC',
    freezeTableName: true,
    timestamps: false,
  });
};
