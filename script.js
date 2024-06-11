var isValidSudoku = function (board) {

    function check(list) {
        let new_list = list.slice(0, list.length);
        while (new_list.length > 0) {
            let temp = new_list.pop();
            if (temp == "") {
                continue
            }
            if (new_list.includes(temp)) {
                return false
            };
        };
        return true
    }

    // 檢查橫
    for (const element of board) {
        if (!check(element)) {
            return false;
        }
    }
    // 檢查豎
    let length = board.length;
    let list = [];
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            list.push(board[j][i]);
        };
        if (!check(list)) {
            return false
        };
        list = [];
    };

    // 檢查九宮格
    list = [];
    for (let i_start = 0; i_start < board.length; i_start += 3) {
        for (let j_start = 0; j_start < board.length; j_start += 3) {
            for (let i = i_start; i < i_start + 3; i++) {
                for (let j = j_start; j < j_start + 3; j++) {
                    list.push(board[i][j]);
                };
            };
            if (!check(list)) {
                return false;
            };
            list = [];
        };
    };
    return true
};



var solveSudoku = function (board) {
    const m = board.length;
    const n = board[0].length;

    // 確認是否可行
    const isValid = (current, num) => {
        // 檢查橫
        for (let row = 0; row < m; row++) {
            if (board[row][current.col] === `${num}`) return false;
        }
        // 檢查豎
        for (let col = 0; col < n; col++) {
            if (board[current.row][col] === `${num}`) return false;
        }
        // 檢查九宮格
        const startRow = current.row - current.row % 3;
        // 另解 : startRow = Math.floor(current.row / 3) * 3
        const startCol = current.col - current.col % 3;

        for (let row = startRow; row < startRow + 3; row++) {
            for (let col = startCol; col < startCol + 3; col++) {
                if (board[row][col] === `${num}`) return false;
            }
        }
        return true;
    };

    const solveSudokuCell = (row, col) => {
        // keep going
        if (row === 9) return true;
        if (col === 9) return solveSudokuCell(row + 1, 0);

        // 扣除已被填入的數字
        if (board[row][col] !== '') return solveSudokuCell(row, col + 1);

        for (let num = 1; num <= 9; num++) {
            // 檢驗
            if (!isValid({ row, col }, num)) continue;
            // 填入
            board[row][col] = `${num}`;
            // 更新 -> 注意! 他寫在迴圈裏面! 第一格正確的同時第二格如果錯誤則第一格錯誤則重新填入
            if (solveSudokuCell(row, col + 1)) return true;
            // 擦拭答案
            board[row][col] = '';
        }
        // 1到9都錯誤
        return false;
    };

    solveSudokuCell(0, 0);
    return board;
};

window.addEventListener("DOMContentLoaded", function () {
    document.querySelector("button").addEventListener("click", function () {
        const raw_data = document.querySelectorAll(".container .box");
        let data = [];
        let temp = [];
        for (let e of raw_data) {
            temp.push(e.value);
            if (temp.length == 9) {
                // console.log(temp);
                data.push(temp);
                // console.log(data);
                temp = [];
            }
        };

        let go = isValidSudoku(data);

        if (go) {
            // 根據排查 問題出在這
            let board = solveSudoku(data);

            let x = 0;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board.length; j++) {
                    raw_data[x].value = board[i][j];
                    x += 1;
                }
            }
        }else{
            alert("錯誤，你的數獨出現了錯誤!");
        }
    });
});