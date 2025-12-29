import SideBar from "./Components/SideBar";
import Board from "./Components/Board";
import Alert from "./Components/Alert";
import { BoardProvider } from "./context/BoardContext";

function App() {
    return (
        <BoardProvider>
            <div className="App">
                <Alert />
                <div className="flex min-h-screen dark:bg-gray-800">
                    <Board />
                    <SideBar />
                </div>
            </div>
        </BoardProvider>
    );
}

export default App;
