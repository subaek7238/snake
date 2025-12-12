const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // 한 칸 크기
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = null;

// 랜덤 음식 위치
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

// PC용 키보드 이벤트
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// 모바일 버튼용 방향 함수
function setDirection(dir) {
    if (dir === "UP" && direction !== "DOWN") direction = "UP";
    else if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
    else if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    else if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
}

// 게임 루프
function draw() {
    // 배경
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);

    // 음식
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // 뱀 그리기
    ctx.fillStyle = "lime";
    snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

    // 머리 이동
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

    // 충돌 검사 (벽 또는 자기 자신)
    if (
        head.x < 0 || head.x >= 400 ||
        head.y < 0 || head.y >= 400 ||
        snake.slice(1).some(p => p.x === head.x && p.y === head.y)
    ) {
        snake = [{ x: 9 * box, y: 9 * box }];
        direction = null;
    }
}

// 100ms 간격으로 게임 루프 실행
setInterval(draw, 100);

