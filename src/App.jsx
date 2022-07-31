import SideBar from "./Components/SideBar";
import Board from "./Components/Board";

function App() {
    return (
        <div className="App">
            <div className="flex min-h-screen max-h-max dark:bg-gray-800">
                <Board />
                <SideBar />
            </div>
        </div>
    );
}

export default App;
