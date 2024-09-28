
function HomePage() {
    return (
        <div style={
            {
                display: 'flex',
                justifyContent: 'left',
                height: '80vh'
            }
        }>
            <div    className="navBar" 
                    style = {
                        {
                            margin: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '10vh',
                            width: '20hv',
                        }
            }>
                <a>HomePage</a>
                <a>Click on the links above to navigate</a>
                <a>Top 50</a>
                <a>Search</a>
            </div>
            <div className="mainContent">
                <h1>Welcome to the HomePage</h1>
                <p>This is a simple example of a HomePage</p>
            </div>
        </div>
    );
}
export default HomePage;