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
        <span class="exit-text">Exit</span>
    `;
    gameContainer.appendChild(exitFullscreenBtn);
    exitFullscreenBtn.addEventListener('click', exitFullScreen);

    // 监听iOS的orientationchange事件
    window.addEventListener('orientationchange', () => {
        if (gameFrame.classList.contains('mobile-fullscreen')) {
            // 重新计算高度
            setTimeout(updateIOSFullscreenSize, 100);
        }
    });
}

function toggleFullScreen() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobile = /Android/.test(navigator.userAgent) || isIOS;

    if (isMobile) {
        // 移动端：使用CSS全屏方案
        gameFrame.classList.add('mobile-fullscreen');
        gameContainer.classList.add('fullscreen-mode');
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');
        
        // iOS特殊处理
        if (isIOS) {
            updateIOSFullscreenSize();
        }
        
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
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobile = /Android/.test(navigator.userAgent) || isIOS;

    if (isMobile) {
        gameFrame.classList.remove('mobile-fullscreen');
        gameContainer.classList.remove('fullscreen-mode');
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
        
        // iOS特殊处理
        if (isIOS) {
            gameFrame.style.height = '';
            gameFrame.style.width = '';
        }
        
        document.querySelector('.exit-fullscreen-btn').style.display = 'none';
        
        // 平滑滚动到游戏区域
        setTimeout(() => {
            gameContainer.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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

// iOS全屏尺寸更新
function updateIOSFullscreenSize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // 处理iOS Safari的工具栏
    const isLandscape = window.orientation === 90 || window.orientation === -90;
    const toolbarHeight = isLandscape ? 0 : 75; // iOS工具栏大约高度
    
    gameFrame.style.width = `${windowWidth}px`;
    gameFrame.style.height = `${windowHeight - toolbarHeight}px`;
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

    // 点击页面其他区���关闭菜单
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !menuToggle.contains(e.target) && 
            !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}
