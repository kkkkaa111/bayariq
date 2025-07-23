// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const welcomeSlide = document.getElementById('welcome-slide');
    const loginSlide = document.getElementById('login-slide');
    const gameTypeSlide = document.getElementById('game-type-slide');
    const categoriesSlide = document.getElementById('categories-slide');
    const loginForm = document.querySelector('.login-form');
    const youthOption = document.getElementById('youth-option');
    const kidsOption = document.getElementById('kids-option');
    
    // إخفاء شريحة الترحيب وإظهار شريحة تسجيل الدخول بعد 3 ثوانٍ
    setTimeout(function() {
        if (welcomeSlide) {
            welcomeSlide.style.display = 'none';
        }
        if (loginSlide) {
            loginSlide.classList.remove('hidden');
            loginSlide.style.display = 'flex';
        }
    }, 3000);
    
    // التعامل مع نموذج تسجيل الدخول
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.querySelector('input[type="email"]').value;
            const password = document.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                return;
            }
            
            // التحقق من صحة البريد الإلكتروني
            if (!bayareqDB.validateEmail(email)) {
                return;
            }
            
            // محاولة تسجيل الدخول
            const loginResult = bayareqDB.loginVisitor(email, password);
            
            if (loginResult.success) {
                // تسجيل الدخول نجح - الانتقال إلى شريحة اختيار اللعبة
                loginSlide.style.display = 'none';
                gameTypeSlide.classList.remove('hidden');
                gameTypeSlide.style.display = 'flex';
            } else {
                // فشل تسجيل الدخول - محاولة إنشاء حساب جديد
                const registerResult = bayareqDB.addVisitor({
                    email: email,
                    password: password,
                    name: email.split('@')[0]
                });
                
                if (registerResult.success) {
                    // تم إنشاء الحساب بنجاح
                    bayareqDB.loginVisitor(email, password);
                    
                    // الانتقال إلى شريحة اختيار اللعبة
                    loginSlide.style.display = 'none';
                    gameTypeSlide.classList.remove('hidden');
                    gameTypeSlide.style.display = 'flex';
                }
            }
        });
    }
    
    // التعامل مع خيار "بيارق مع الشباب"
    if (youthOption) {
        youthOption.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                // إخفاء شريحة اختيار اللعبة وإظهار شريحة الفئات
                gameTypeSlide.style.display = 'none';
                categoriesSlide.classList.remove('hidden');
                categoriesSlide.style.display = 'flex';
            }
        });
    }
    
    // منع النقر على خيار "بيارق أولادين" المغلق
    if (kidsOption) {
        kidsOption.addEventListener('click', function(e) {
            e.preventDefault();
        });
    }
    
    // التعامل مع الفئات
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                // الانتقال لصفحة إعداد الفرق أولاً
                window.location.href = 'team-setup.html';
            }
        });
        
        // إضافة تأثيرات تفاعلية للفئات النشطة
        if (btn.classList.contains('active')) {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        }
    });
    
    // إضافة تأثيرات تفاعلية للحقول
    const inputs = document.querySelectorAll(".form-input");
    
    inputs.forEach(input => {
        input.addEventListener("focus", function() {
            this.style.backgroundColor = "#b8c8b8";
            this.style.transform = "scale(1.02)";
        });
        
        input.addEventListener("blur", function() {
            this.style.backgroundColor = "#c5d4c5";
            this.style.transform = "scale(1)";
        });
    });
    
    // التعامل مع حقل اسم الجولة
    const countryField = document.querySelector('.country-field');
    
    if (countryField) {
        countryField.addEventListener('focus', function() {
            this.style.backgroundColor = '#f8f8f8';
        });
        
        countryField.addEventListener('blur', function() {
            this.style.backgroundColor = 'transparent';
        });
    }
    
    // إضافة تأثيرات للأيقونات الاجتماعية
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // يمكن إضافة روابط فعلية هنا
        });
    });
});

