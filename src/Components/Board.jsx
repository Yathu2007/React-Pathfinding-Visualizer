const Board = () => {
    const board = [];

    for (let i = 0; i < 32; i++) {
        const row = [];

        for (let j = 0; j < 64; j++) {
            row.push(<td key={`${i}-${j}`} className="node"></td>);
        }

        board.push(<tr key={i}>{row}</tr>);
    }

    return (
        <div className="relative flex left-16 m-8 shadow-2xl">
            <table>
                <tbody>{board}</tbody>
            </table>
        </div>
    );
};

export default Board;
