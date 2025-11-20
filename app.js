// JavaScript for the Taiwan Digital Asset Policy Research Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    // Navigation sections list - single source of truth
    window.NAV_SECTIONS = ['home', 'background', 'method', 'analysis', 'conclusion', 'resources', 'faq'];

    // Ensure legacy code referencing `sections` works.
    // Some handlers use a `sections` identifier; keep a synced alias to avoid "undefined" errors.
    const sections = window.NAV_SECTIONS;

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animated counters
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
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2300;
    const startTime = performance.now();
    
    function update(now) {
        const elapsed = now - startTime;
        // 線性進度 t
        let t = Math.min(elapsed / duration, 1);
        
        // 自訂緩動：線性增長到 60% 然後逐漸放緩
        let progress;
        if (t <= 0.6) {
            // 前 60% 線性增長
            progress = t / 0.6 * 0.6;
        } else {
            // 後 40% 使用 ease-out cubic
            const remaining = (t - 0.6) / 0.4;
            const easeOut = 1 - Math.pow(1 - remaining, 3);
            progress = 0.6 + easeOut * 0.4;
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
        
        timelineItem.addEventListener('click', function() {
            // Remove active class from all items
            document.querySelectorAll('.timeline-item').forEach(item => {
                item.classList.remove('active');
            });
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show modal with details
            showTimelineModal(item);
        });
        
        // Add keyboard support
        timelineItem.setAttribute('tabindex', '0');
        timelineItem.setAttribute('aria-label', `時間軸項目: ${item.event}`);
        timelineItem.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        timeline.appendChild(timelineItem);
    });
    
    timelineContainer.appendChild(timeline);
    
    // Timeline navigation arrows
    const leftArrow = document.querySelector('.timeline-arrow.left');
    const rightArrow = document.querySelector('.timeline-arrow.right');
    
    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', function() {
            timelineContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        rightArrow.addEventListener('click', function() {
            timelineContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}

function showTimelineModal(data) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="關閉">&times;</button>
            <h3>${data.event}</h3>
            <p><strong>日期：</strong>${data.date}</p>
            <p><strong>發展階段：</strong>${data.phase}</p>
            <p><strong>業者數量：</strong>${data.businesses}家</p>
            <div class="timeline-details">
                <h4>政策重要性</h4>
                <p>這個時點標誌著台灣VASP監管制度的重要里程碑，對整體產業發展具有關鍵影響。</p>
                <h4>主要影響</h4>
                <ul>
                    <li>提升投資者保護水準</li>
                    <li>建立業者合規標準</li>
                    <li>促進產業健康發展</li>
                    <li>強化風險管控機制</li>
                </ul>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Keyboard support
    const handleEscape = function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Focus management
    const focusableElements = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 300);
}

// Charts initialization
function initCharts() {
    // Timeline Chart
    const timelineCtx = document.getElementById('timelineChart');
    if (timelineCtx) {
        // Destroy existing chart if it exists
        if (window.timelineChartInstance) {
            window.timelineChartInstance.destroy();
        }
        
        const timelineData = researchData.timeline.map((item, index) => ({
            x: index,
            y: item.businesses,
            label: item.date + ': ' + item.event
        }));
        
        window.timelineChartInstance = new Chart(timelineCtx, {
            type: 'line',
            data: {
                labels: researchData.timeline.map(item => item.date),
                datasets: [{
                    label: 'VASP業者數量',
                    data: researchData.timeline.map(item => item.businesses),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#FFC185',
                    pointHoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '台灣VASP業者數量發展趨勢',
                        font: { size: 18, weight: 'bold' },
                        color: '#134252',
                        padding: 20
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: '#134252',
                            font: { size: 14 },
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(19, 52, 59, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#1FB8CD',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                const item = researchData.timeline[context.dataIndex];
                                return [
                                    `業者數量: ${context.parsed.y}家`,
                                    `發展階段: ${item.phase}`,
                                    `重要事件: ${item.event}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '時間軸',
                            color: '#134252',
                            font: { size: 14, weight: 'bold' }
                        },
                        ticks: {
                            color: '#626c71',
                            font: { size: 12 },
                            maxRotation: 45
                        },
                        grid: {
                            color: 'rgba(98, 108, 113, 0.1)',
                            drawBorder: false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '業者數量 (家)',
                            color: '#134252',
                            font: { size: 14, weight: 'bold' }
                        },
                        ticks: {
                            color: '#626c71',
                            font: { size: 12 },
                            stepSize: 5
                        },
                        grid: {
                            color: 'rgba(98, 108, 113, 0.1)',
                            drawBorder: false
                        },
                        beginAtZero: true,
                        max: 30
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                elements: {
                    point: {
                        hoverBorderWidth: 3
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }
}

/***************************************************************
 * 1) 平滑捲動函式 ─ 新增 finalOffset 參數 (正數往下、負數往上)
 ***************************************************************/
function scrollToSection(sectionId, finalOffset = 0) {
    const targetEl = document.getElementById(sectionId);
    if (!targetEl) return;

    const startY   = window.pageYOffset;
    const targetY  = targetEl.offsetTop;
    const distance = targetY - startY;
    const duration = 600;           // 捲動速度 (ms)；想快改小、想慢改大
    let   startT   = null;

    function animate(now) {
        if (startT === null) startT = now;
        const elapsed = now - startT;

        // t = 0→1；70% 線性、30% ease-out
        let t = Math.min(elapsed / duration, 1);
        let progress = t <= 0.9
            ? (t / 0.9) * 0.9
            : 0.9 + (1 - Math.pow(1 - (t - 0.9) / 0.1, 1)) * 0.1;

        window.scrollTo(0, startY + distance * progress + finalOffset);

        if (t < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

/***************************************************************
 * 2) 「開始探索」按鈕事件 ─ 呼叫時傳 offset 即可微調
 ***************************************************************/
function initSmoothScrolling() {
    const exploreBtn = document.querySelector('.hero .btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            // 例：-100 讓目標區塊再往上 100px；0 = 原本位置
            scrollToSection('motivation', -80);
        });
    }
}

// Modal functionality
function initModals() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') && !e.target.closest('.modal-content')) {
            const modal = e.target;
            closeModal(modal);
        }
    });
}

// Animations and intersection observer
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe animatable elements
    const animatableElements = document.querySelectorAll(
        '.content-section, .stat-item, .timeline-item, .card, .analysis-item, .conclusion-item, .team-member'
    );
    
    animatableElements.forEach(element => {
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

// Handle window resize
const handleResize = debounce(function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
    
    // Reinitialize charts on resize
    if (window.timelineChartInstance) {
        window.timelineChartInstance.resize();
    }
}, 250);

window.addEventListener('resize', handleResize);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal);
        } else {
            closeMobileMenu();
        }
    }
    
    // Arrow keys for section navigation (with Alt key)
    if (e.altKey) {
        const currentSection = document.querySelector('.section.active');
        if (currentSection) {
            const currentIndex = window.NAV_SECTIONS.indexOf(currentSection.id);
            
            if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
                navigateToSection(sections[currentIndex + 1]);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                navigateToSection(sections[currentIndex - 1]);
            }
        }
    }
});

function navigateToSection(sectionId) {
    // Update URL hash
    history.pushState(null, null, '#' + sectionId);
    
    // Update navigation
    updateActiveNavLink(sectionId);
    
    // Show section
    showSection(sectionId);
}

function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    const section = hash || 'home';
    
    updateActiveNavLink(section);
    showSection(section);
});

// Touch gestures for mobile section navigation
let touchStartX = 0;
let touchStartY = 0;
let isSwipeEnabled = false;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwipeEnabled = true;
});

document.addEventListener('touchmove', function(e) {
    if (!isSwipeEnabled || !touchStartX || !touchStartY) return;
    
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Only handle horizontal swipes with minimum distance
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
        const currentSection = document.querySelector('.section.active');
        if (currentSection) {
            const currentIndex = window.NAV_SECTIONS.indexOf(currentSection.id);
            
            if (diffX > 0 && currentIndex < sections.length - 1) {
                // Swipe left - next section
                navigateToSection(sections[currentIndex + 1]);
                isSwipeEnabled = false;
            } else if (diffX < 0 && currentIndex > 0) {
                // Swipe right - previous section
                navigateToSection(sections[currentIndex - 1]);
                isSwipeEnabled = false;
            }
        }
    }
});

document.addEventListener('touchend', function() {
    touchStartX = 0;
    touchStartY = 0;
    isSwipeEnabled = true;
});

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('頁面載入時間:', loadTime, 'ms');
        });
    }
}

measurePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('應用程式錯誤:', e.error);
});

// Accessibility enhancements
function enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = '跳到主要內容';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 8px 12px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce section changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    // Update announcer when sections change
    const originalShowSection = showSection;
    window.showSection = function(sectionId) {
        originalShowSection(sectionId);
        const sectionTitles = {
            home: '首頁',
            background: '研究背景',
            method: '研究方法',
            analysis: '成果分析',
            conclusion: '結論',
            resources: '資源',
            faq: '教學與常見問題'
        };
        announcer.textContent = `現在顯示${sectionTitles[sectionId] || sectionId}頁面`;
    };
}

enhanceAccessibility();

// Data export functionality
window.exportResearchData = function() {
    const exportData = {
        title: "加密未來：台灣數位資產政策與挑戰研究",
        author: "黃培恩",
        studentInfo: {
            class: "處三孝",
            studentId: "13",
            group: "第五組"
        },
        timeline: researchData.timeline,
        vaspBusinesses: researchData.vaspBusinesses,
        internationalComparison: researchData.internationalComparison,
        keyFindings: [
            "監管框架逐步完善",
            "市場規模持續成長", 
            "國際比較仍有差距",
            "產業發展面臨挑戰"
        ],
        researchMethods: [
            "政策文件分析",
            "法規比較研究",
            "產業數據統計",
            "SWOT分析法"
        ],
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'taiwan-vasp-research-data.json';
    link.click();
    
    console.log('研究資料已導出');
};

// Print functionality
window.printResearch = function() {
    window.print();
};

// Initialize URL-based navigation on load
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && window.NAV_SECTIONS.includes(hash)) {
        updateActiveNavLink(hash);
        showSection(hash);
    }
});

// Console welcome message
console.log('%c🚀 加密未來：台灣數位資產政策與挑戰研究', 'color: #218595; font-size: 16px; font-weight: bold;');
console.log('%c研究者：黃培恩 | 處三孝 13號 | 第五組', 'color: #626c71; font-size: 12px;');
console.log('%c完整版研究網站已成功載入完成！', 'color: #218595; font-size: 12px;');
console.log('%c功能包含：互動時間軸、動畫統計、圖表視覺化、多頁面內容、響應式設計', 'color: #626c71; font-size: 11px;');
console.log('%c操作提示：使用 Alt + 左右箭頭鍵快速切換頁面', 'color: #626c71; font-size: 11px;');