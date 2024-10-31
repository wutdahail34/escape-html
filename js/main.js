// 处理全屏功能
const gameFrame = document.querySelector('.game-frame');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const gameContainer = document.querySelector('.game-container');

if (fullscreenBtn && gameFrame) {
    fullscreenBtn.addEventListener('click', toggleFullScreen);
}

function toggleFullScreen() {
    // 简化为纯CSS方案，不再区分设备
    gameFrame.classList.toggle('browser-fullscreen');
    gameContainer.classList.toggle('fullscreen-mode');
    
    // 更新按钮文本
    const btnText = fullscreenBtn.querySelector('.btn-text');
    if (btnText) {
        btnText.textContent = gameFrame.classList.contains('browser-fullscreen') ? 'Exit Fullscreen' : 'Fullscreen';
    }
    
    // 锁定/解锁body滚动
    document.body.style.overflow = gameFrame.classList.contains('browser-fullscreen') ? 'hidden' : '';
}
