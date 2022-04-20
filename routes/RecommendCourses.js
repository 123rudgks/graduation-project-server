const express = require("express");
const router = express.Router();
const axios = require("axios");

const { RecommendCourses } = require("../models");

// ENV
require("dotenv").config();

// Router -> 지역 선택하는 과정에서 넘어오는 title을 가지고 검색

// 키워드 검색 조회
router.post("/search-keyword", async (req, res) => {
  const keyword = req.body.keyword;
  console.log(keyword);
  try {
    const response = await axios.get(
      "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword",
      {
        params: {
          serviceKey: process.env.RECOMMEND_COURSE_DATA_API,
          MobileOS: "ETC",
          MobileApp: "GoTrip",
          listYN: "Y",
          _type: "json",
          keyword: keyword,
          contentTypeId: 25,
        },
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const items = response.data;
      res.json(items);
    }
  } catch (e) {
    console.error(e);
    res.json({ msg: e });
  }
});

// 반복 정보 조회, contentTypeId = 25 => 여행코스 타입, contentId는 keyword로 부터
router.post("/detailInfo", async (req, res) => {
  const contentId = req.body.contentId;
  console.log(contentId);
  try {
    const response = await axios.get(
      "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailInfo",
      {
        params: {
          serviceKey: process.env.RECOMMEND_COURSE_DATA_API,
          MobileOS: "ETC",
          MobileApp: "GoTrip",
          _type: "json",
          contentId: contentId,
          contentTypeId: 25,
        },
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const items = response.data;
      res.json(items);
    }
  } catch (e) {
    console.error(e);
    res.json({ msg: e });
  }
});

router.get("/", (req, res) => {
  res.json("recommendCourse");
});

module.exports = router;
