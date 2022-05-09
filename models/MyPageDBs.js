module.exports = (sequelize, DataTypes) => {
  const MyPageDBs = sequelize.define(
    "MyPageDBs",
    {
      area: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "지역",
      },
      tripTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "여행 제목",
      },
      thumbnail: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
        comment: "일정 대표 사진",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "설명",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  MyPageDBs.associate = (models) => {
    MyPageDBs.hasMany(models.Schedule, {
      foreignKey: "page_id",
      sourceKey: "id",
      onDelete: "cascade",
    });
  };

  return MyPageDBs;
};

// mypage에서 대표적으로 사진을 넣으니까 이렇게만 하고 id를 연동해서 schedule에 넣으면 될거같음
