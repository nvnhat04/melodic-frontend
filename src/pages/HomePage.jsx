import React, { useEffect, useState } from "react";
import AlbumSlider from "../components/common/Slider";
import { Box, Stack, Typography } from "@mui/material";
import Container from "../components/common/Container";
import MusicPlayer from "../components/common/MusicPlayer";

const mockAlbums = [
    {
      "id": "MTVkYThlMmEtZDA5NC00NTkyLWFlMmItNDcxNDBmYTY3Yjhm",
      "title": "Tim Anh Ghen",
      "lyrics": "Bởi vì nguyên team anh geng geng\r\nBởi vì nguyên team anh geng geng\r\nBọn anh on the same lane, xuyên qua màn đêm đen, follow game plan\r\nIce chain leng keng, đồng hồ trên tay anh trông như ben10",
      "release_date": "2024-10-30T17:00:00.000Z",
      "duration": 279,
      "language": "Vietnamese",
      "track_url": "1UnYyuloL-3UT-6zs5jAGqMG0dxDY5DtI",
      "genres": null,
      "artists": [
          "nhat nguyen"
      ],
      "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNcqqlxSjVVcNbnAYS-mvZIypKavEO3edz6g&s",
  },
  {
    "id": "MzY3M2IxOTAtYTYzNS00ZmE2LTgxZjYtNjM2NmRmZjgzNTFh",
    "title": "Đừng làm trái tim anh đau",
    "lyrics": "Hình như trong lòng anh đã không còn hình bóng ai ngoài em đâu\r\nHằng đêm anh nằm thao thức suy tư, chẳng nhớ ai ngoài em đâu\r\nVậy nên không cần nói nữa, yêu mà đòi nói trong vài ba câu\r\n",
    "release_date": "2024-11-24T17:00:00.000Z",
    "duration": 279,
    "language": "Vietnamese",
    "track_url": "1fLPnCdHiYmgWzOdss9b1oIzn9lvJEArp",
    "genres": [
      "pop"
    ],
    "artists": [
      "Sơn Tùng M-TP"
    ],
    "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbdUlAVv8BhOstJLt47s3uceLIQQg-E2JDVg&s",

  },
  {
    "id": "YTliMjM4OTItOThjZi00Y2Q0LTkxYjMtZTViZTRkZjEwYTY1",
    "title": "Có chắc yêu là đây",
    "lyrics": "Thấp thoáng ánh mắt…\r\nThấp thoáng ánh mắt\r\nThấp thoáng ánh mắt đôi môi mang theo hương mê say\r\nEm cho anh tan trong miên man quên luôn đi đêm ngày\r\nChạm nhẹ vội vàng hai ba giây nhưng con tim đâu hay\r\nBối rối khẽ lên ngôi yêu thương đong đầy thật đầy\r\nAnh ngẩn ngơ cứ ngỡ\r\nĐó chỉ là giấc mơ\r\nAnh ngẩn ngơ cứ ngỡ\r\nNhư đang ngất ngây trong giấc mơ\r\nThật ngọt ngào êm dịu đắm chìm phút chốc viết tương tư gieo nên thơ\r\nCó câu ca trong gió hát ngân nga ru trời mây nhẹ nhàng đón ban mai ngang qua trao nụ cười\r\nNắng đua chen khoe sắc vui đùa giữa muôn ngàn hoa dịu dàng đến nhân gian âu yếm tâm hồn người\r\nHình như chính em\r\nCho anh mong chờ\r\nHình như chính là em\r\nCho anh vấn vương\r\nĐừng thờ ơ xin hãy lắng nghe và giúp anh trả lời đôi điều còn băn khoăn\r\n\r\nCó chắc yêu là đây đây đây\r\nCó chắc yêu là đây đây\r\nCó chắc yêu là đây đây đây\r\nCó chắc yêu là đây đây\r\nEm lang thang cả ngày trong tâm trí\r\nĐi không ngừng cả ngày trong tâm trí\r\nSi mê thêm cuồng quay\r\nAh uhhhhhhhhhh\r\n\r\nCó chắc yêu là đây\r\nChắc gì nữa mà chắc\r\nSáng thì nhớ đêm trắng tương tư còn không phải yêu là gì\r\nCó chắc yêu là đây\r\nRồi thắc gì nữa mà mắc\r\nĐến bên nắm tay nói ra ngay ngồi mơ mộng thêm làm gì\r\nNhanh chân chạy mua một bó hoa\r\nThêm luôn một món quà\r\nKhuôn mặt tươi cười lên vô tư gạt đi lo âu mạnh mẽ nha\r\nVà rồi bước ra… bước ra… bước ra…\r\n\r\nCó câu ca trong gió hát ngân nga ru trời mây nhẹ nhàng đón ban mai ngang qua trao nụ cười\r\nNắng đua chen khoe sắc vui đùa giữa muôn ngàn hoa dịu dàng đến nhân gian âu yếm tâm hồn người\r\nHình như chính em\r\nCho anh mong chờ\r\nHình như chính là em\r\nCho anh vấn vương\r\nĐừng thờ ơ xin hãy lắng nghe và giúp anh trả lời đôi điều còn băn khoăn\r\n\r\nCó chắc yêu là đây đây đây\r\nCó chắc yêu là đây đây\r\nCó chắc yêu là đây đây đây\r\nCó chắc yêu là đây đây\r\nEm lang thang cả ngày trong tâm trí\r\nĐi không ngừng cả ngày trong tâm trí\r\nSi mê thêm cuồng quay\r\nAh uhhhhhhhhhh\r\nCó chắc yêu là đây\r\nAh ahhhh\r\nCó chắc yêu là đây\r\nUhhhhhhh\r\nCó chắc yêu là đâyyy …\r\nPlease come to me, come to me, please come to meeeeee …\r\nCó chắc yêu là đây đây đây\r\nCó chắc yêu là đây đây\r\nCó chắc yêu là đây đây đây\r\nCó chắc yêu là đây đây\r\nEm lang thang cả ngày trong tâm trí\r\nĐi không ngừng cả ngày trong tâm trí\r\nSi mê thêm cuồng quay\r\nAh uhhhhhhhhhh\r\n\r\nM-TP\r\nMột bài hát dành đến cho tất cả những ai đang yêu, chưa yêu và sẽ được yêu\r\nHạnh phúc nhaaaa …",
    "release_date": "2024-11-26T17:00:00.000Z",
    "duration": 215,
    "language": "Vietnamese",
    "track_url": "1BnU_FwkmYuq_dzd6FSH1Yt3WsmZFQoq5",
    "genres": [
      "ballad"
    ],
    "artists": [
      "Sơn Tùng M-TP"
    ],
    "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8D6I_OM3e_cbZ5zhovzOMAm8BZxlsxxVsw&s",

  },
  {
    "id": "NTNmN2FiNTktMjZlMy00MjM1LWJmMzItYWIwMmVjNTU4ZGVl",
    "title": "the most beautiful moment in life",
    "lyrics": "오늘따라 림이 멀어 보여\r\n코트 위에 한숨이 고여\r\n현실이 두려운 소년\r\n공을 던질 때면 유일하게 맘이 되려 놓여 홀로 던지는 공\r\n림을 향해서 내가 던지는 건 수많은 고민과 삶의 걱정거리\r\n세상을 아는 척 하지만 아직 설익은 몸\r\n슛 코트가 나의 놀이터\r\n손짓에 따라서 발 옆엔 작은 공이 튀어\r\n성적은 바닥을 기지만 난 더 오히려 세상에 다 잘 될 거라며 괜시리 소리쳐\r\n하지만 세상은 되려 겁줘\r\n그럴 거면 멈춰\r\n머리를 채운 상념\r\n공 대신 미래를 던져\r\n또 남들이 칠하는 별점과 성공의 기준에 결격 덕에\r\n암처럼 퍼지는 걱정 God damn it\r\n던져버린 공과 함께 퍼진 웃음\r\n턱까지 차오른 이 숨은 꿈틀대는 꿈들\r\n빨라지는 드리블 행복해지는 마음\r\n이 순간은 영원할 듯 하지만\r\n해지는 밤이 다시 찾아오면 좀먹는 현실\r\n정신을 차리면 또 겁먹은 병신같은 내 모습에 자꾸만 또 겁이 나\r\n덮쳐오는 현실감\r\n남들은 앞서 달려 가는데 왜 난 아직 여기 있나\r\n숨을 쉬어 아니면 꿈을 꿔\r\n지금 심장박동에 맞춰 다시 노를 저어\r\n남들의 얄팍한 잣대에 갇혀 모른 척하며 살다간\r\n코트처럼 인생도 노을 져\r\nWhat am I doin' with my life?\r\n이 순간은 언제든 다시 찾아오지 않아\r\n다시 나에게 되물어봐 지금 행복한가\r\n그 답은 이미 정해졌어 난 행복하다",
    "release_date": "2024-11-25T17:00:00.000Z",
    "duration": 160,
    "language": "Other",
    "track_url": "1BF4j0g3GzRu0KHMyOYyFN_R_irkfrMVr",
    "genres": [
      "pop"
    ],
    "artists": [
      "Sơn Tùng M-TP"
    ],
    "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8D6I_OM3e_cbZ5zhovzOMAm8BZxlsxxVsw&s",
  },
  {
    "id": "M2Q1YWJjNTctYmVmZC00MGJiLTk1NGMtNWQ5YjBkNTZiMDM3",
    "title": "Hãy trao cho anh",
    "lyrics": "La-la-la-la-la-la-la-la-la-la-la-la (yeah, yeah)\r\nLa-la-la-la-la-la-la-la-la-la-la-la (yeah, yeah)\r\nLa-la-la-la-la-la-la-la-la-la-la-la, la (yeah, yeah)\r\n(Good boy)\r\n \r\nBóng ai đó nhẹ nhàng vụt qua nơi đây\r\nQuyến rũ ngây ngất loạn nhịp làm tim mê say\r\nCuốn lấy áng mây theo cơn sóng xô dập dìu\r\nNụ cười ngọt ngào cho ta tan vào phút giây miên man quên hết con đường về eh\r\nChẳng thể tìm thấy lối về ehhhhh\r\nĐiệu nhạc hòa quyện trong ánh mắt đôi môi\r\nDẫn lối những bối rối rung động khẽ lên ngôi\r\n\r\n \r\n\r\nChạm nhau mang vô vàn\r\nĐắm đuối vấn vương dâng tràn\r\nLấp kín chốn nhân gian\r\nLàn gió hoá sắc hương mơ màng\r\nMột giây ngang qua đời\r\nCất tiếng nói không nên lời\r\nẤm áp đến trao tay ngàn sao trời lòng càng thêm chơi vơi\r\nDịu êm không gian bừng sáng đánh thức muôn hoa mừng\r\nQuấn quít hát ngân nga từng chút níu bước chân em dừng\r\nBao ý thơ tương tư ngẩn ngơ\r\nLưu dấu nơi mê cung đẹp thẫn thờ\r\n\r\n \r\n\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh thứ anh đang mong chờ\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy mau làm điều ta muốn vào khoảnh khắc này đê\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao anh trao cho anh đi những yêu thương nồng cháy\r\nTrao anh ái ân nguyên vẹn đong đầy\r\n\r\n \r\n\r\nLooking at my Gucci is about that time\r\nWe can smoke a blunt and pop a bottle of wine\r\nNow get yourself together and be ready by nine\r\nCuz we gon’ do some things that will shatter your spine\r\nCome one, undone, Snoop Dogg, Son Tung\r\nLong Beach is the city that I come from\r\nSo if you want some, get some\r\nBetter enough take some, take some\r\n\r\n \r\n\r\nChạm nhau mang vô vàn\r\nĐắm đuối vấn vương dâng tràn\r\nLấp kín chốn nhân gian làn\r\nGió hóa sắc hương mơ màng\r\nMột giây ngang qua đời\r\nCất tiếng nói không nên lời\r\nẤm áp đến trao tay ngàn sao trời lòng càng thêm chơi vơi\r\nDịu êm không gian bừng sáng đánh thức muôn hoa mừng\r\nQuấn quít hát ngân nga từng chút níu bước chân em dừng\r\nBao ý thơ tương tư ngẩn ngơ\r\nLưu dấu nơi mê cung đẹp thẫn thờ\r\n\r\n \r\n\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh thứ anh đang mong chờ\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy mau làm điều ta muốn vào khoảnh khắc này đê\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao anh trao cho anh đi những yêu thương nồng cháy\r\nTrao anh ái ân nguyên vẹn đong đầy\r\n\r\n \r\n\r\nEm cho ta ngắm thiên đàng vội vàng qua chốc lát\r\nNhư thanh âm chứa bao lời gọi mời trong khúc hát\r\nLiêu xiêu ta xuyến xao rạo rực khát khao trông mong\r\nDịu dàng lại gần nhau hơn dang tay ôm em vào lòng\r\nTrao đi trao hết đi đừng ngập ngừng che dấu nữa\r\nQuên đi quên hết đi ngại ngùng lại gần thêm chút nữa\r\nChìm đắm giữa khung trời riêng hai ta như dần hòa quyện mắt nhắm mắt tay đan tay hồn lạc về miền trăng sao\r\n\r\n \r\n\r\nEm cho ta ngắm thiên đàng vội vàng qua chốc lát\r\nNhư thanh âm chứa bao lời gọi mời trong khúc hát\r\nLiêu xiêu ta xuyến xao rạo rực khát khao trông mong\r\nDịu dàng lại gần nhau hơn dang tay ôm em vào lòng\r\nTrao đi trao hết đi đừng ngập ngừng che dấu nữa\r\nQuên đi quên hết đi ngại ngùng lại gần thêm chút nữa\r\nChìm đắm giữa khung trời riêng hai ta như dần hòa quyện mắt nhắm mắt tay đan tay hồn lạc về miền trăng sao\r\n\r\n \r\n\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh\r\nHãy trao cho anh thứ anh đang mong chờ",
    "release_date": "2024-11-26T17:00:00.000Z",
    "duration": 262,
    "language": "Vietnamese",
    "track_url": "1wCbyOR0E__okyNu0N2EgadixMG876mr1",
    "genres": [
      "r&b"
    ],
    "artists": [
      "Sơn Tùng M-TP"
    ],
    "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8D6I_OM3e_cbZ5zhovzOMAm8BZxlsxxVsw&s",
  }

];

function HomePage() {
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [dailyTopHits, setDailyTopHits] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    setPopularAlbums(mockAlbums);
    setDailyTopHits(mockAlbums);
    setNewReleases(mockAlbums);
  }, []);

  return (
    <Stack
          spacing={7}
          sx={{ width: "75vw", margin: "2rem auto", color: "#fff" }}
        >
          {popularAlbums.length > 0 && (
            <Container header="Popular Albums">
              <AlbumSlider list={popularAlbums} type={"Album"} />
            </Container>
          )}
          {dailyTopHits.length > 0 && (
            <Container header="Daily Top Hits">
              <AlbumSlider list={dailyTopHits} type={"track"} />
            </Container>
          )}
          {newReleases.length > 0 && (
            <Container header="New Releases">
              <AlbumSlider list={newReleases} type={"Album"} />
            </Container>
          )}
          <Box sx={{ height: "13%", width: "100%" }}> 
            
          </Box>
        </Stack>
  );
}

export default HomePage;
