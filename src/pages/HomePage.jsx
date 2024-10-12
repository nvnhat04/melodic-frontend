import Sidebar from "../components/sidebar/sidebar";
import MusicPlayer from "../components/common/MusicPlayer";

function HomePage() {
    return (
        <div className="homepage" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh' // Ensure the height of the container is set
        }}>
            <div className="content" style={{
                display: 'flex',
                justifyContent: 'space-between',
                flex: 1 // Ensure the content takes up available space
            }}>
                {/* <Sidebar /> */}
                <div>Hello</div>
                <div className="mainContent">
                    <h1>Welcome to the HomePage</h1>
                    <p>This is a simple example of a HomePage</p>
                </div>
                <div>Hello</div>
            </div>
            <MusicPlayer />
        </div>
    );
}

export default HomePage;