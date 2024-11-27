import React from "react";
import Container from "../components/common/Container";
import CardGrid from "../components/common/CardGrid";

const Libraries = ({ type }) => {
  const data = {
    artists: {
      header: "Artists",
      items: [
        {
          name: "Adele",
          cover:
            "https://tse2.mm.bing.net/th?id=OIP.8iSPE2BMlVask2TooXNt-gHaHa&pid=Api&P=0&h=180",
          id: 1,
        },
        {
          name: "Ariana Grande",
          cover:
            "https://tse2.mm.bing.net/th?id=OIP.YmcUI6eaWlXuYJGAxqC-EQHaGL&pid=Api&P=0&h=180",
          id: 2,
        },
        {
          name: "Taylor Swift",
          cover:
            "https://i.pinimg.com/236x/ec/f3/58/ecf3580e3f5b4c1572acf9a918abf826.jpg",
          id: 3,
        },
        {
          name: "Billie Eilish",
          cover:
            "https://i.pinimg.com/236x/35/86/c8/3586c84c0523e960f32861cdc58d2da2.jpg",
          id: 4,
        },
        {
          name: "BTS",
          cover:
            "https://i.pinimg.com/236x/fc/10/68/fc1068816ce57e34c5e66463b6a2f6ce.jpg",
          id: 5,
        },
        {
          name: "Drake",
          cover:
            "https://i.pinimg.com/236x/42/8e/ae/428eae6b0abb3c60e10a75bc1ed759f3.jpg",
          id: 6,
        },
        {
          name: "Ed Sheeran",
          cover:
            "https://i.pinimg.com/474x/d3/a1/4c/d3a14c1a5cb9277b6c30b1439c95f244.jpg",
          id: 7,
        },
      ],
    },
    albums: {
      header: "Albums",
      items: [
        {
          name: "25",
          artist: "Adele",
          cover:
            "https://tse2.mm.bing.net/th?id=OIP.8iSPE2BMlVask2TooXNt-gHaHa&pid=Api&P=0&h=180",
          id: 1,
        },
        {
          name: "Sweetener",
          artist: "Ariana Grande",
          cover:
            "https://tse2.mm.bing.net/th?id=OIP.8iSPE2BMlVask2TooXNt-gHaHa&pid=Api&P=0&h=180",
          id: 2,
        },
      ],
    },
    playlists: {
      header: "Playlists",
      items: [
        {
          name: "Chill",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Music_icon.svg/512px-Music_icon.svg.png",
          id: 1,
        },
        {
          name: "Workout",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Exercise_icon.svg/512px-Exercise_icon.svg.png",
          id: 2,
        },
      ],
    },
    tracks: {
      header: "Tracks",
      items: [
        {
          name: "Track 1",
          cover:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Placeholder_music_album_cover.svg/512px-Placeholder_music_album_cover.svg.png",
          artist: "Artist 1",
          id: 1,
        },
        {
          name: "Track 2",
          cover:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Placeholder_music_album_cover.svg/512px-Placeholder_music_album_cover.svg.png",
          artist: "Artist 2",
          id: 2,
        },
      ],
    },
  };

  const selectedData = data[type];

  return (
    selectedData && (
      <Container header={selectedData.header}>
        <CardGrid List={selectedData.items} type={type} />
      </Container>
    )
  );
};

export default Libraries;
