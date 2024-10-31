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

// 渲染排行榜
function renderLeaderboard() {
    const leaderboardBody = document.querySelector('.leaderboard-body');
    leaderboardBody.innerHTML = leaderboardData.map(entry => `
        <div class="leaderboard-row">
            <span class="rank">#${entry.rank}</span>
            <span class="player">${entry.player}</span>
            <span class="score">${entry.score.toLocaleString()}</span>
        </div>
    `).join('');
}

// 渲染评论
function renderComments() {
    const commentsList = document.querySelector('.comments-list');
    commentsList.innerHTML = commentsData.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-player">${comment.player}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-content">${comment.content}</div>
            <div class="comment-footer">
                <button class="like-btn">
                    <span class="like-count">${comment.likes}</span> Likes
                </button>
            </div>
        </div>
    `).join('');
}

// 添加新评论的功能
document.querySelector('.submit-comment').addEventListener('click', () => {
    const textarea = document.querySelector('.comment-form textarea');
    const content = textarea.value.trim();
    
    if (content) {
        commentsData.unshift({
            player: "You",
            date: new Date().toISOString().split('T')[0],
            content: content,
            likes: 0
        });
        
        renderComments();
        textarea.value = '';
    }
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

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        header.addEventListener('click', () => {
            // 关闭其他所有打开的FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前FAQ的状态
            item.classList.toggle('active');
        });
    });
}); 