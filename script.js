document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const animalImage = document.getElementById('animal-image');
    const nextBtn = document.getElementById('next-btn');
    const revealBtn = document.getElementById('reveal-btn');
    
    // 动物图片数组（17个动物）
    const animals = [];
    for (let i = 1; i <= 17; i++) {
        animals.push(`images/${i}a.png`);
    }
    
    let currentAnimal = '';
    let isRevealed = false;
    
    // 打乱动物顺序
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // 获取随机动物
    function getRandomAnimal() {
        if (animals.length === 0) {
            // 所有动物都展示过了，重新打乱
            for (let i = 1; i <= 17; i++) {
                animals.push(`images/${i}a.png`);
            }
            shuffleArray(animals);
        }
        
        // 从数组中取出一个动物
        return animals.pop();
    }
    
    // 显示动物轮廓（黑色剪影）
    function showSilhouette() {
        // 预先加载图片，然后添加滤镜效果
        const originalSrc = currentAnimal;
        
        // 直接显示图片，但添加CSS滤镜使其变成黑色剪影
        animalImage.src = originalSrc;
        animalImage.style.filter = 'brightness(0)'; // 将图片变成纯黑色
        animalImage.alt = '动物轮廓';
    }
    
    // 显示原始动物图片
    function revealAnimal() {
        if (!isRevealed) {
            animalImage.style.filter = 'none'; // 移除滤镜，显示原始图片
            isRevealed = true;
            revealBtn.textContent = '已显示答案';
        }
    }
    
    // 加载下一个动物
    function loadNextAnimal() {
        currentAnimal = getRandomAnimal();
        showSilhouette();
        isRevealed = false;
        revealBtn.textContent = '显示答案';
    }
    
    // 初始化游戏
    function initGame() {
        shuffleArray(animals);
        loadNextAnimal();
    }
    
    // 添加事件监听器
    nextBtn.addEventListener('click', loadNextAnimal);
    revealBtn.addEventListener('click', revealAnimal);
    
    // 游戏开始
    initGame();
}); 