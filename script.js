// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const welcomeSlide = document.getElementById('welcome-slide');
    const loginSlide = document.getElementById('login-slide');
    
    // إخفاء الشريحة الأولى وإظهار الثانية بعد 3 ثوانٍ
    setTimeout(function() {
        welcomeSlide.classList.add('hidden');
        loginSlide.classList.remove('hidden');
    }, 3000);
    
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

