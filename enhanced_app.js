// JavaScript for the Taiwan Digital Asset Policy Research Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initNavigation();
    initMobileMenu();
    initScrollProgress();
    initScrollToTop();
    initAnimatedCounters();
    initInteractiveTimeline();
    initCharts();
    initSmoothScrolling();
    initModals();
    initAnimations();

    // Set initial active section
    showSection('home');
});

// Research data
const researchData = {
    timeline: [
        {date: "2021年6月", event: "《VASP洗錢防制辦法》發布", phase: "第一階段", businesses: 0},
        {date: "2022年9月", event: "首次VASP業者訪查(3家)", phase: "第一階段", businesses: 3},
        {date: "2023年9月", event: "VASP指導原則公布", phase: "第二階段", businesses: 27},
        {date: "2024年6月", event: "VASP公會正式成立", phase: "第二階段", businesses: 24},
        {date: "2024年7月", event: "26家業者完成法遵聲明", phase: "第三階段", businesses: 26},
        {date: "2024年11月", event: "《VASP登記辦法》發布", phase: "第三階段", businesses: 25},
        {date: "2025年3月", event: "《虛擬資產服務法》草案預告", phase: "第四階段", businesses: 25},
        {date: "2025年9月", event: "首批9家合規業者名單公布", phase: "第三階段", businesses: 9}
    ],
    vaspBusinesses: [
        {name: "現代財富科技", brand: "MaiCoin/MAX", status: "通過登記", position: "領導者"},
        {name: "幣託科技", brand: "BitoPro", status: "通過登記", position: "第二大"},
        {name: "鏈科股份", brand: "XREX", status: "通過登記", position: "企業導向"},
        {name: "禾亞數位科技", brand: "HOYA BIT", status: "通過登記", position: "理財專精"},
        {name: "拓荒數碼科技", brand: "ZONE Wallet", status: "通過登記", position: "錢包服務"},
        {name: "跨鏈科技", brand: "Atrix", status: "通過登記", position: "衍生品"},
        {name: "重量科技", brand: "KryptoGO Transfer", status: "通過登記", position: "場外交易"},
        {name: "富昇數位", brand: "TWEX", status: "通過登記", position: "新進者"},
        {name: "鴻朱數位", brand: "HzBit", status: "通過登記", position: "新進者"}
    ],
    internationalComparison: [
        {country: "美國", stage: "成熟期", framework: "多部門監管", openness: "高", etf: "已開放"},
        {country: "日本", stage: "成熟期", framework: "資金結算法", openness: "中", etf: "未開放"},
        {country: "韓國", stage: "發展期", framework: "特金法", openness: "中", etf: "未開放"},
        {country: "香港", stage: "發展期", framework: "虛擬資產條例", openness: "中", etf: "未開放"},
        {country: "新加坡", stage: "發展期", framework: "PS Act", openness: "高", etf: "未開放"},
        {country: "台灣", stage: "起步期", framework: "虛擬資產服務法(草案)", openness: "保守", etf: "未開放"}
    ]
};

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all nav links
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Get the target section
            const targetSection = this.getAttribute('data-section');

            // Show the target section
            showSection(targetSection);

            // Close mobile menu if open
            closeMobileMenu();

            // Scroll to top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        targetSection.classList.add('fade-in-up');

        setTimeout(() => {
            targetSection.classList.remove('fade-in-up');
        }, 600);

        // Reinitialize counters when showing home section
        if (sectionId === 'home') {
            setTimeout(() => {
                initAnimatedCounters();
            }, 100);
        }

        // Reinitialize charts when showing analysis section
        if (sectionId === 'analysis') {
            setTimeout(() => {
                initCharts();
            }, 100);
        }
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Keyboard support for nav toggle
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Scroll progress bar
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', '回到頂部');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll to section with easing
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 3000; // 1.5 seconds
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        // 線性增長到 70% 然後逐漸放緩的緩動函數
        let t = Math.min(timeElapsed / duration, 1);
        let progress;

        if (t <= 0.7) {
            // 前 70% 線性增長
            progress = t / 0.7 * 0.7;
        } else {
            // 後 30% 逐漸放緩 (ease-out)
            const remaining = (t - 0.7) / 0.3;
            const easeOut = 1 - Math.pow(1 - remaining, 3);
            progress = 0.7 + easeOut * 0.3;
        }

        const currentPosition = startPosition + (distance * progress);
        window.scrollTo(0, currentPosition);

        if (t < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Enhanced animated counters with ease-out effect
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    // Reset counters first
    counters.forEach(counter => {
        counter.textContent = '0';
        counter.classList.remove('counted');
    });

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounterWithEasing(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Enhanced counter animation with custom easing
function animateCounterWithEasing(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        // 線性進度 t
        let t = Math.min(elapsed / duration, 1);

        // 自訂緩動：線性增長到 70% 然後逐漸放緩
        let progress;
        if (t <= 0.7) {
            // 前 70% 線性增長
            progress = t / 0.7 * 0.7;
        } else {
            // 後 30% 使用 ease-out cubic
            const remaining = (t - 0.7) / 0.3;
            const easeOut = 1 - Math.pow(1 - remaining, 3);
            progress = 0.7 + easeOut * 0.3;
        }

        const currentValue = Math.floor(progress * target);
        element.textContent = currentValue + suffix;

        if (t < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Interactive Timeline
function initInteractiveTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;

    // Clear existing content
    timelineContainer.innerHTML = '';

    // Create timeline
    const timeline = document.createElement('div');
    timeline.className = 'timeline';

    researchData.timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-phase">${item.phase}</div>
            <div class="timeline-event">${item.event}</div>
            <div class="timeline-businesses">業者數量: ${item.businesses}家</div>
        `;

        // Add hover effects
        timelineItem.addEventListener('mouseenter', function() {
            this.classList.add('highlighted');
        });

        timelineItem.addEventListener('mouseleave', function() {
            this.classList.remove('highlighted');
        });

        timeline.appendChild(timelineItem);
    });

    timelineContainer.appendChild(timeline);
}

// Charts initialization with Chart.js
function initCharts() {
    // Timeline Chart
    initTimelineChart();
    // Business Distribution Chart
    initBusinessDistributionChart();
    // International Comparison Chart
    initInternationalComparisonChart();
}

function initTimelineChart() {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;

    // Destroy existing chart if exists
    if (window.timelineChartInstance) {
        window.timelineChartInstance.destroy();
    }

    const labels = researchData.timeline.map(item => item.date);
    const data = researchData.timeline.map(item => item.businesses);

    window.timelineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'VASP業者數量',
                data: data,
                borderColor: '#32808d',
                backgroundColor: 'rgba(50, 128, 141, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'VASP業者數量發展趨勢',
                    color: '#ffffff',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function initBusinessDistributionChart() {
    const ctx = document.getElementById('businessChart');
    if (!ctx) return;

    if (window.businessChartInstance) {
        window.businessChartInstance.destroy();
    }

    const positions = researchData.vaspBusinesses.reduce((acc, business) => {
        acc[business.position] = (acc[business.position] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(positions);
    const data = Object.values(positions);
    const colors = ['#32808d', '#2da6b2', '#1d7480', '#326873', '#29a1a0', '#1a6873', '#2d9ea1', '#268c8f', '#1f7380'];

    window.businessChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'VASP業者市場定位分布',
                    color: '#ffffff',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

function initInternationalComparisonChart() {
    const ctx = document.getElementById('internationalChart');
    if (!ctx) return;

    if (window.internationalChartInstance) {
        window.internationalChartInstance.destroy();
    }

    const countries = researchData.internationalComparison.map(item => item.country);
    const stages = researchData.internationalComparison.map(item => {
        switch(item.stage) {
            case '成熟期': return 3;
            case '發展期': return 2;
            case '起步期': return 1;
            default: return 0;
        }
    });

    window.internationalChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countries,
            datasets: [{
                label: '監管成熟度',
                data: stages,
                backgroundColor: '#32808d',
                borderColor: '#2da6b2',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: '各國虛擬資產監管成熟度比較',
                    color: '#ffffff',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            switch(value) {
                                case 1: return '起步期';
                                case 2: return '發展期';
                                case 3: return '成熟期';
                                default: return '';
                            }
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Modal functionality
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.classList.remove('modal-open');
        }
    });
}

// Animation on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize handler for charts
window.addEventListener('resize', debounce(function() {
    if (window.timelineChartInstance) window.timelineChartInstance.resize();
    if (window.businessChartInstance) window.businessChartInstance.resize();
    if (window.internationalChartInstance) window.internationalChartInstance.resize();
}, 250));
