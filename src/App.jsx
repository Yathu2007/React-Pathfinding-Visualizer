import SideBar from "./Components/SideBar";
import Board from "./Components/Board";

function App() {
    return (
        <div className="App">
            <div className="flex h-screen w-screen dark:bg-gray-800 transition-all ease-linear">
                <Board />
                <SideBar />
            </div>
        </div>
    );
}

export default App;
