module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    HO_TEN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
     TEN_DANG_NHAP: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    MAT_KHAU: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TEN_HIEN_THI: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    GIOI_TINH: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    QUYEN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    THOI_GIAN_CAP_NHAT: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CMND: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SDT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ANH: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'USER',
    freezeTableName: true,
    timestamps: false,
  });
};
