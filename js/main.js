// 处理全屏功能
const gameFrame = document.querySelector('.game-frame');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const gameContainer = document.querySelector('.game-container');

if (fullscreenBtn && gameFrame) {
    fullscreenBtn.addEventListener('click', toggleFullScreen);

    // 添加退出全屏按钮
    const exitFullscreenBtn = document.createElement('button');
    exitFullscreenBtn.className = 'exit-fullscreen-btn';
    exitFullscreenBtn.innerHTML = `
        <span class="exit-icon">×</span>
        <span class="exit-text">Exit Fullscreen</span>
    `;
    gameContainer.appendChild(exitFullscreenBtn);
    exitFullscreenBtn.addEventListener('click', exitFullScreen);
}

function toggleFullScreen() {
    // 检查是否为移动设备
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // 移动端：使用CSS全屏方案
        gameFrame.classList.add('mobile-fullscreen');
        gameContainer.classList.add('fullscreen-mode');
        document.body.style.overflow = 'hidden';
        
        // 显示退出按钮
        document.querySelector('.exit-fullscreen-btn').style.display = 'flex';
    } else {
        // 桌面端：使用Fullscreen API
        if (!document.fullscreenElement) {
            if (gameFrame.requestFullscreen) {
                gameFrame.requestFullscreen();
            } else if (gameFrame.webkitRequestFullscreen) {
                gameFrame.webkitRequestFullscreen();
            } else if (gameFrame.msRequestFullscreen) {
                gameFrame.msRequestFullscreen();
            }
        }
    }
}

function exitFullScreen() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        gameFrame.classList.remove('mobile-fullscreen');
        gameContainer.classList.remove('fullscreen-mode');
        document.body.style.overflow = '';
        
        // 隐藏退出按钮
        document.querySelector('.exit-fullscreen-btn').style.display = 'none';
        
        // 滚动到游戏区域
        gameContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// 处理iframe加载状态
document.querySelector('.game-frame').addEventListener('load', () => {
    console.log('Game loaded successfully');
});

// 添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




// 页面加载时渲染数据
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
    renderComments();
});

// 移动端菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !menuToggle.contains(e.target) && 
            !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}
