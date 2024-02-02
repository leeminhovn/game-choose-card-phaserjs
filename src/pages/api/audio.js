import axios from "axios";

export default async function handler(req, res) {
  const audioUrl = req.query.audio;
  console.log();
  // Thực hiện request tới URL của file audio
  axios({
    method: "get",
    url: audioUrl,
    responseType: "stream",
  })
    .then(function (response) {
      // Thiết lập Content-Type cho response
      res.setHeader("Content-Type", response.headers["content-type"]);

      // Truyền dữ liệu stream vào response của API handler
      response.data.pipe(res);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching audio" });
    });
}
