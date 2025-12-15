const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // 한 칸 크기
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = null;

// 음식 위치
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

// PC 키보드 이벤트
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// 모바일 터치 버튼용
function setDirection(dir) {
    if (dir === "UP" && direction !== "DOWN") direction = "UP";
    else if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
    else if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    else if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
}

// 게임 루프
function draw() {
    // 배경 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 음식
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // 뱀
    // 뱀 몸
ctx.fillStyle = "lime";
snake.forEach((part, index) => {
    ctx.fillRect(part.x, part.y, box, box);

    // 👀 머리에 눈 그리기
    if (index === 0) {
        ctx.fillStyle = "white";

        let eyeSize = 4;
        let offset = 5;

        let eye1 = { x: part.x, y: part.y };
        let eye2 = { x: part.x, y: part.y };

        if (direction === "RIGHT") {
            eye1.x += box - offset; eye1.y += offset;
            eye2.x += box - offset; eye2.y += box - offset;
        } else if (direction === "LEFT") {
            eye1.x += offset - eyeSize; eye1.y += offset;
            eye2.x += offset - eyeSize; eye2.y += box - offset;
        } else if (direction === "UP") {
            eye1.x += offset; eye1.y += offset - eyeSize;
            eye2.x += box - offset; eye2.y += offset - eyeSize;
        } else { // DOWN or 시작 상태
            eye1.x += offset; eye1.y += box - offset;
            eye2.x += box - offset; eye2.y += box - offset;
        }

        ctx.fillRect(eye1.x, eye1.y, eyeSize, eyeSize);
        ctx.fillRect(eye2.x, eye2.y, eyeSize, eyeSize);

        ctx.fillStyle = "lime"; // 다시 몸 색으로
    }
});

    // 머리 이동
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // 음식 먹기
if (
    Math.abs(head.x - food.x) < box / 2 &&
    Math.abs(head.y - food.y) < box / 2
) {
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
} else {
    snake.pop();
}

    snake.unshift(head);

    // 충돌 검사
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(p => p.x === head.x && p.y === head.y)
    ) {
        snake = [{ x: 9 * box, y: 9 * box }];
        direction = null;
    }
}

// 게임 루프 실행
setInterval(draw, 150);


















