const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // 크기
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = null;

// 랜덤 음식 위치
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

// 방향 설정
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// 게임 루프
function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);

    // 음식
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // 뱀
    ctx.fillStyle = "lime";
    snake.forEach((part, index) => {
        ctx.fillRect(part.x, part.y, box, box);
    });

    // 뱀 머리 이동
    let head = { x: snake[0].x, y: snake[0].y };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // 음식 먹기
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);

    // 벽충돌 or 자기 몸 충돌 → 게임 리셋
    if (
        head.x < 0 || head.x >= 400 ||
        head.y < 0 || head.y >= 400 ||
        snake.slice(1).some(p => p.x === head.x && p.y === head.y)
    ) {
        snake = [{ x: 9 * box, y: 9 * box }];
        direction = null;
    }
}

setInterval(draw, 100);

