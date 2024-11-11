import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MonthlyListeners from "../components/ArtistDashboard/MonthlyListeners";
import Revenue from "../components/ArtistDashboard/Revenue";
import Sidebar from "../components/ArtistDashboard/Sidebar";
import TopMusicSection from "../components/ArtistDashboard/TopMusicSection";

const mockTracksData = [
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
    name: "Blue Train",
    artist: "230 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
    name: "Lazy Bird",
    artist: "200 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
    name: "I'm Old Fashioned",
    artist: "150 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/My_Favorite_Things.jpg",
    name: "My Favorite Things",
    artist: "100 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/My_Favorite_Things.jpg",
    name: "Everytime We Say Goodbye",
    artist: "90 000 plays",
  },
];

const mockAlbumsData = [
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
    name: "Blue Train",
    artist: "900 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/My_Favorite_Things.jpg",
    name: "My Favorite Things",
    artist: "300 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/John_Coltrane_-_A_Love_Supreme.jpg/220px-John_Coltrane_-_A_Love_Supreme.jpg",
    name: "A Love Supreme",
    artist: "150 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Coltrane_Giant_Steps.jpg/220px-Coltrane_Giant_Steps.jpg",
    name: "Giant Steps",
    artist: "100 000 plays",
  },
  {
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/2a/Duke_Ellington_%26_John_Coltrane.jpg",
    name: "Duke Ellington & John Coltrane",
    artist: "90 000 plays",
  },
];

export default function ArtistDashboard() {
  return (
    <Box sx={{ display: "flex", flexFlow: "row" }}>
      <Sidebar />
      <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1em",
          }}
        >
          <Typography variant="h6">Welcome back, John Coltraine!</Typography>
          <Box sx={{ display: "flex", flexWrap:"wrap", gap: "1em" }}>
            <MonthlyListeners />
            <Revenue />
          </Box>
          <Box sx={{ display: "flex", flexFlow:"row wrap" }}>
            <TopMusicSection
              title="Top Monthly Tracks"
              items={mockTracksData}
            />
            <TopMusicSection
              title="Top Monthly Albums"
              items={mockAlbumsData}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
