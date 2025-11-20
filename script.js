document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initNavigation();
    initCounters();
    initTimeline();
    initCharts();
    initScrollProgress();
});

// 1. 粒子特效初始化
function initParticles() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00f2ff" },
            "opacity": { "value": 0.3, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00f2ff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.6 } } }
        },
        "retina_detect": true
    });
}

// 2. 導覽列與區塊切換
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // 手機版選單切換
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 點擊連結切換區塊
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            
            // 更新按鈕狀態
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // 切換區塊
            sections.forEach(section => {
                section.classList.remove('active');
                if(section.id === targetId) {
                    section.classList.add('active');
                }
            });

            // 手機版點擊後收起選單
            navMenu.classList.remove('active');
            window.scrollTo(0, 0);
        });
    });
}

// 全局跳轉函數 (給按鈕用)
window.scrollToSection = function(sectionId) {
    const link = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if(link) link.click();
};

// 3. 數字動畫
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000; 
    const step = target / (duration / 16); 
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.innerText = target + suffix;
            clearInterval(timer);
        } else {
            el.innerText = Math.floor(current) + suffix;
        }
    }, 16);
}

// 4. 時間軸資料與生成
const timelineData = [
    { date: "2021/06", title: "洗錢防制聲明制", desc: "行政院指定金管會為主管機關，發布 VASP 洗錢防制辦法。" },
    { date: "2022/09", title: "金管會首次訪查", desc: "針對主要交易所進行防制洗錢專案訪查。" },
    { date: "2023/09", title: "VASP 指導原則", desc: "發布十大指導原則，涵蓋資產分離、上幣審查等。" },
    { date: "2024/06", title: "VASP 公會成立", desc: "業者成立同業公會，推動自律規範。" },
    { date: "2024/11", title: "VASP 登記制", desc: "預告將從聲明制轉為更嚴格的登記制。" },
    { date: "2025 (預估)", title: "專法落地", desc: "《虛擬資產管理條例》草案審議，走向特許行業。" }
];

function initTimeline() {
    const container = document.getElementById('timelineContainer');
    timelineData.forEach(item => {
        const node = document.createElement('div');
        node.className = 'timeline-node';
        node.innerHTML = `
            <div class="timeline-date">${item.date}</div>
            <h4 style="color: #fff; font-size: 1.1rem;">${item.title}</h4>
            <p style="font-size: 0.85rem; color: #a0aabf;">${item.desc}</p>
        `;
        container.appendChild(node);
    });
}

// 5. Chart.js 圖表
function initCharts() {
    Chart.defaults.color = '#a0aabf';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

    // 雷達圖 (監管比較)
    new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
            labels: ['監管明確度', '市場開放度', '投資者保護', '創新友善', '稅務清晰'],
            datasets: [{
                label: '台灣',
                data: [70, 40, 80, 50, 30],
                backgroundColor: 'rgba(0, 242, 255, 0.2)',
                borderColor: '#00f2ff',
                pointBackgroundColor: '#00f2ff'
            }, {
                label: '美國',
                data: [90, 90, 85, 95, 80],
                backgroundColor: 'rgba(112, 0, 255, 0.2)',
                borderColor: '#7000ff',
                pointBackgroundColor: '#7000ff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' } } }
        }
    });

    // 折線圖 (業者數量)
    new Chart(document.getElementById('timelineChart'), {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025(F)'],
            datasets: [{
                label: '合規業者數量',
                data: [0, 3, 25, 26, 15], // 預估 2025 因嚴格審查數量下降
                borderColor: '#00f2ff',
                backgroundColor: 'rgba(0, 242, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 圓餅圖 (市佔率)
    new Chart(document.getElementById('businessChart'), {
        type: 'doughnut',
        data: {
            labels: ['MaiCoin/MAX', 'BitoPro', 'XREX', 'HOYA', '其他'],
            datasets: [{
                data: [40, 30, 15, 10, 5],
                backgroundColor: ['#00f2ff', '#00c8d4', '#009daa', '#7000ff', '#4c00ac'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// 6. 頂部進度條
function initScrollProgress() {
    const bar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        bar.style.width = scrolled + "%";
    });
}