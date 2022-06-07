const express = require("express");
const app = express();
const port = 3000;
const { User, Restaurant } = require("./models/Restaurant");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/key");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
let cors_origin = [`http://localhost:8080`];
app.use(
  cors({
    origin: cors_origin, // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  })
);
//application.x-www0form-! 분석가능하게 해 줌
app.use(bodyParser.urlencoded({ extended: true }));
//json 파일 분석 하게 해줌
app.use(bodyParser.json());
// app.use(cookieParser());
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("connect well"))
  .catch((err) => console.log(err));

// mongodb+srv://younheesong:<password>@basic.zrmmot3.mongodb.net/?retryWrites=true&w=majority
app.get("/", (req, res) => {
  res.send("Hello World!!");
});
app.post("/restaurant/upload", (req, res) => {
  const rest = new Restaurant(req.body);
  rest.save((err, restInfo) => {
    console.log(restInfo);
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.post("/restaurant", (req, res) => {
  Restaurant.find(
    {
      keywords: { $all: req.body.tags.split(",") },
      type: req.body.type,
    },
    (err, restaurant) => {
      if (err) {
        res.send(err);
      } else {
        return res.send(restaurant);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
