document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const resetBtn = document.createElement("button");

    container.classList.add("relative", "grid", "grid-cols-3", "gap-1", "mt-10");

    resetBtn.textContent = "Reset Game";
    resetBtn.classList.add("hidden", "mt-4", "px-4", "py-2", "bg-gray-600", "text-white", "font-bold", "rounded-lg", "transition-all", "duration-200", "hover:bg-gray-800");

    document.body.appendChild(resetBtn);

    let currentPlayer = "X";
    let gameOver = false;

    const createBoard = () => {
        container.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add(
                "w-full", "h-full", "aspect-square", "flex", "items-center", "justify-center",
                "text-3xl", "sm:text-4xl", "md:text-5xl", "font-bold", "cursor-pointer", "bg-gray-300"
            );
    
            if (i < 6) cell.style.borderBottom = "3px solid black";
            if (i % 3 !== 2) cell.style.borderRight = "3px solid black";
    
            cell.addEventListener("click", () => {
                if (!gameOver && cell.textContent === "") {
                    cell.textContent = currentPlayer;
                    checkWins();
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            });
    
            container.appendChild(cell);
        }
    };
    

    const checkWins = () => {
        const cells = Array.from(container.children);
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < wins.length; i++) {
            const [a, b, c] = wins[i];
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                drawLine(wins[i]);
                cells[a].classList.add("text-gray-400");
                cells[b].classList.add("text-gray-400");
                cells[c].classList.add("text-gray-400");
                gameOver = true;
                resetBtn.classList.remove("hidden");
                setTimeout(() => alert(cells[a].textContent + " is the winner!"), 500);
                return;
            }
        }

        if (cells.every(cell => cell.textContent !== "")) {
            alert("It's a tie!");
            gameOver = true;
            resetBtn.classList.remove("hidden");
        }
    };

    const drawLine = (combo) => {
        const line = document.createElement("div");
        line.classList.add("absolute", "bg-red-500", "transition-all", "duration-500", "opacity-0");

        // Winning Line Logic
        if (combo.includes(0) && combo.includes(1) && combo.includes(2)) {
            line.classList.add("w-full", "h-[5px]", "top-[16%]", "left-0");
        } else if (combo.includes(3) && combo.includes(4) && combo.includes(5)) {
            line.classList.add("w-full", "h-[5px]", "top-[50%]", "left-0");
        } else if (combo.includes(6) && combo.includes(7) && combo.includes(8)) {
            line.classList.add("w-full", "h-[5px]", "top-[84%]", "left-0");
        } else if (combo.includes(0) && combo.includes(3) && combo.includes(6)) {
            line.classList.add("h-full", "w-[5px]", "left-[16%]", "top-0");
        } else if (combo.includes(1) && combo.includes(4) && combo.includes(7)) {
            line.classList.add("h-full", "w-[5px]", "left-[50%]", "top-0");
        } else if (combo.includes(2) && combo.includes(5) && combo.includes(8)) {
            line.classList.add("h-full", "w-[5px]", "left-[84%]", "top-0");
        } else if (combo.includes(0) && combo.includes(4) && combo.includes(8)) {
            line.classList.add("w-[140%]", "h-[5px]", "top-[50%]", "left-[-20%]", "rotate-45");
        } else if (combo.includes(2) && combo.includes(4) && combo.includes(6)) {
            line.classList.add("w-[140%]", "h-[5px]", "top-[50%]", "left-[-20%]", "rotate-[-45deg]");
        }

        container.appendChild(line);
        setTimeout(() => {
            line.classList.remove("opacity-0");
            line.classList.add("opacity-100");
        }, 100);
    };

    resetBtn.addEventListener("click", () => {
        gameOver = false;
        resetBtn.classList.add("hidden");
        createBoard();
    });

    createBoard();
});
