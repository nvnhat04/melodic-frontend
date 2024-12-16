import TrackCard from "../components/HomePage/TrackCard";
import { Box, Typography, Stack, CircularProgress, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import SearchAPI from "../api/modules/search.api";
import { useLocation } from "react-router-dom";

const SearchGenre = () => {
    const [tracks, setTracks] = useState([]);
    const [genre, setGenre] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const [loadingMore, setLoadingMore] = useState(false); 
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 

    const location = useLocation();
    const observerRef = useRef(null); 

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const genre_id = queryParams.get("id");

        if (genre_id) {
            setGenre(genre_id);
            setPage(1);
            setHasMore(true);
            setTracks([]); // Reset lại danh sách bài hát
            loadTracks(genre_id, 1); // Gọi API ngay khi vào trang
        }
    }, [location.search]);

    // Hàm tải bài hát từ API
    const loadTracks = async (genre_id, page) => {

        // Tránh gọi API khi đang tải dữ liệu
        if (loading || loadingMore) return;

        try {
            setLoading(page === 1); // Chỉ hiển thị loading lần đầu
            setLoadingMore(page > 1); // Hiển thị loading khi tải thêm

            const response = await SearchAPI.browseByGenre(genre_id, page);
            console.log("API Response (page:", page, "):", response);

            if (response.length > 0) {
                setTracks((prevTracks) => [...prevTracks, ...response]);
            } else {
                setHasMore(false); 
            }
        } catch (error) {
            console.error("Error fetching tracks by genre:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Hàm xử lý khi nhấn nút "Load More"
    const handleLoadMore = () => {
        if (hasMore && !loadingMore) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                loadTracks(genre, nextPage); // Tải thêm bài hát khi nhấn nút
                return nextPage;
            });
        }
    };

    return (
        <Box>
            {/* Tiêu đề thể loại */}
            <Typography variant="h4" sx={{ color: "gray", fontWeight: "bold", paddingLeft: "10px" }}>
                {genre ? `Genre: ${genre}` : "No genre selected"}
            </Typography>

            {/* Danh sách bài hát */}
            <Stack spacing={2} sx={{ marginTop: 2 }} paddingLeft={2}>
                {tracks.map((track) => (
                    <Box key={track.id} sx={{ width: "100%" }}>
                        <TrackCard track={track} />
                    </Box>
                ))}

                {/* Hiển thị trạng thái */}
                {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
                {loadingMore && <Typography variant="body2">Loading more tracks...</Typography>}

                {/* Nút để tải thêm */}
                {!loading && hasMore && (
                    <Button
                        variant="contained"
                        onClick={handleLoadMore}
                        sx={{ alignSelf: "center", marginTop: 2, color: "white", backgroundColor: "darkred" }}
                    >
                        Load More
                    </Button>
                )}
                {/* Thông báo không còn dữ liệu */}
                {!hasMore && page === 1 && <Typography variant="body2" color="red">No tracks found.</Typography>}
                {!hasMore && page > 1 && <Typography variant="body2" color="red">No more tracks to load.</Typography>}
                <Box height={100}></Box>
            </Stack>
        </Box>
    );
};

export default SearchGenre;
