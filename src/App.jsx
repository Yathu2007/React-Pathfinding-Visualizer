import SideBar from "./Components/SideBar";
import Board from "./Components/Board";

function App() {
    return (
        <div className="App">
            <div className="flex bg-gray-600 h-screen">
                <Board />
                <SideBar />
            </div>
        </div>
    );
}

export default App;
