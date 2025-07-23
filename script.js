// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const welcomeSlide = document.getElementById('welcome-slide');
    const loginSlide = document.getElementById('login-slide');
    const loginForm = document.querySelector('.login-form');
    
    // إخفاء الشريحة الأولى وإظهار الثانية بعد 3 ثوانٍ
    setTimeout(function() {
        welcomeSlide.classList.add('hidden');
        loginSlide.classList.remove('hidden');
    }, 3000);
    
    // التعامل مع نموذج تسجيل الدخول
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.querySelector('input[type="email"]').value;
            const password = document.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                alert('يرجى ملء جميع الحقول');
                return;
            }
            
            // التحقق من صحة البريد الإلكتروني
            if (!bayareqDB.validateEmail(email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }
            
            // محاولة تسجيل الدخول
            const loginResult = bayareqDB.loginVisitor(email, password);
            
            if (loginResult.success) {
                // تسجيل الدخول نجح
                alert('مرحباً بك! تم تسجيل الدخول بنجاح');
                
                // الانتقال إلى صفحة الألعاب
                window.location.href = 'games.html';
            } else {
                // فشل تسجيل الدخول - محاولة إنشاء حساب جديد
                const registerResult = bayareqDB.addVisitor({
                    email: email,
                    password: password,
                    name: email.split('@')[0] // استخدام الجزء الأول من البريد كاسم مؤقت
                });
                
                if (registerResult.success) {
                    // تم إنشاء الحساب بنجاح
                    alert('تم إنشاء حساب جديد وتسجيل الدخول بنجاح!');
                    
                    // تسجيل الدخول تلقائياً
                    bayareqDB.loginVisitor(email, password);
                    
                    // الانتقال إلى صفحة الألعاب
                    window.location.href = 'games.html';
                } else {
                    alert('حدث خطأ: ' + registerResult.error);
                }
            }
        });
    }
    
    // إضافة تأثيرات تفاعلية للحقول
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.backgroundColor = '#b8c8b8';
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.backgroundColor = '#c5d4c5';
            this.style.transform = 'scale(1)';
        });
    });
    
    // إضافة تأثيرات للأيقونات الاجتماعية
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // يمكن إضافة روابط فعلية هنا
            console.log('تم النقر على أيقونة التواصل الاجتماعي');
        });
    });
    
    // إضافة تأثير للشعار
    const logos = document.querySelectorAll('.logo');
    
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
