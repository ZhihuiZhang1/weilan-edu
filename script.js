document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // 初始化轮播图
    function initSlider() {
        // 设置自动播放
        startSlideShow();
        
        // 添加按钮事件监听
        prevButton.addEventListener('click', showPreviousSlide);
        nextButton.addEventListener('click', showNextSlide);
        
        // 添加圆点事件监听
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });

        // 鼠标悬停时暂停自动播放
        slider.addEventListener('mouseenter', stopSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);
    }

    // 更新轮播图显示
    function updateSlider() {
        // 更新幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        
        // 更新圆点
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    // 显示下一张幻灯片
    function showNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    // 显示上一张幻灯片
    function showPreviousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // 开始自动播放
    function startSlideShow() {
        stopSlideShow(); // 先清除之前的定时器
        slideInterval = setInterval(showNextSlide, 3000); // 每3秒切换一次
    }

    // 停止自动播放
    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // 初始化轮播图
    initSlider();

    // 标签页切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 添加当前活动状态
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.querySelector(`.tab-content.${tabId}`).classList.add('active');
        });
    });

    // 好评反馈轮播功能
    const testimonialSlider = {
        currentSlide: 0,
        slides: document.querySelectorAll('.testimonial-card'),
        dotsContainer: document.querySelector('.slider-dots'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        
        init() {
            // 初始化轮播点
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `第${index + 1}条评价`);
                this.dotsContainer.appendChild(dot);
            });

            // 隐藏除第一张外的所有幻灯片
            this.slides.forEach((slide, index) => {
                if (index !== 0) slide.style.display = 'none';
            });

            // 绑定事件
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // 自动轮播
            setInterval(() => this.nextSlide(), 5000);
        },

        showSlide(index) {
            // 隐藏当前幻灯片
            this.slides[this.currentSlide].style.display = 'none';
            document.querySelectorAll('.slider-dots .dot')[this.currentSlide].classList.remove('active');

            // 显示新幻灯片
            this.currentSlide = index;
            this.slides[this.currentSlide].style.display = 'block';
            document.querySelectorAll('.slider-dots .dot')[this.currentSlide].classList.add('active');
        },

        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(next);
        },

        prevSlide() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prev);
        }
    };

    // 初始化轮播
    testimonialSlider.init();
}); 