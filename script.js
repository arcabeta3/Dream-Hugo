// 選擇角色與遊戲場景
const character = document.getElementById('character');

// 控制變數
let positionX = 100;   // 初始位置
let currentPlatform = 1; 
let direction = 1;     // 1 表示向右，-1 表示向左
let isSwitching = false;  // 是否切換中

// 平台位置資料
const platforms = {
    1: { left: 100, right: 300, bottom: 170 },
    2: { left: 500, right: 700, bottom: 320 },
    3: { left: 200, right: 400, bottom: 470 }
};

// 自動移動角色
function moveCharacter() {
    if (isSwitching) return; // 若切換平台，暫停移動
    
    // 當前平台資料
    const platform = platforms[currentPlatform];
    
    // 移動角色
    positionX += direction * 4;

    // 檢查邊界並反轉方向
    if (positionX <= platform.left || positionX >= platform.right - 60) {
        direction *= -1; // 反轉方向
        character.style.transform = direction === 1 ? "scaleX(1)" : "scaleX(-1)";
    }

    // 更新角色位置
    character.style.left = `${positionX}px`;
    character.style.bottom = `${platform.bottom}px`;
}

// 切換平台
function switchPlatform() {
    isSwitching = true; // 切換中，暫停移動角色

    // 更新平台編號
    currentPlatform = currentPlatform % 3 + 1; 
    const nextPlatform = platforms[currentPlatform];

    // 平滑移動到新平台的中央
    positionX = (nextPlatform.left + nextPlatform.right) / 2 - 30; 

    // 更新角色位置
    character.style.left = `${positionX}px`;
    character.style.bottom = `${nextPlatform.bottom}px`;

    // 切換完成後啟動角色移動
    setTimeout(() => {
        isSwitching = false; // 切換完成，繼續移動
    }, 500);  // 與 CSS transition 時間相同
}

// 遊戲循環
setInterval(moveCharacter, 50);   // 控制移動

// **平台切換間隔: 6 秒（延長時間）**
setInterval(switchPlatform, 6000); 
