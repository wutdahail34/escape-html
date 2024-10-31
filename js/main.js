// 处理全屏功能
document.querySelector('.fullscreen-btn').addEventListener('click', () => {
    const gameFrame = document.querySelector('.game-frame');
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.webkitRequestFullscreen) {
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) {
        gameFrame.msRequestFullscreen();
    }
});

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

// 示例排行榜数据
const leaderboardData = [
    { rank: 1, player: "SpeedMaster", score: 12500 },
    { rank: 2, player: "RoadKing", score: 11200 },
    { rank: 3, player: "DriftQueen", score: 10800 },
    { rank: 4, player: "EscapeArtist", score: 9500 },
    { rank: 5, player: "NightRider", score: 9200 },
    { rank: 6, player: "PoliceEvader", score: 8800 },
    { rank: 7, player: "CoinCollector", score: 8500 },
    { rank: 8, player: "ProDriver", score: 8200 },
    { rank: 9, player: "RushHour", score: 7900 },
    { rank: 10, player: "CityRunner", score: 7500 }
];

// 示例评论数据
const commentsData = [
    {
        player: "GameLover",
        date: "2024-01-15",
        content: "Best driving game ever! The police chases are so intense!",
        likes: 45
    },
    {
        player: "SpeedRacer",
        date: "2024-01-14",
        content: "Just unlocked the sports car, it's amazing! The handling is perfect.",
        likes: 38
    },
    {
        player: "CasualGamer",
        date: "2024-01-13",
        content: "Great game to play during breaks. Simple controls but challenging gameplay.",
        likes: 29
    },
    {
        player: "ProGamer",
        date: "2024-01-12",
        content: "Pro tip: Use the alleys to lose the police helicopters quickly!",
        likes: 56
    }
];



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
