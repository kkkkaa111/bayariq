// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const gameTypeSlide = document.getElementById('game-type-slide');
    const categoriesSlide = document.getElementById('categories-slide');
    const youthOption = document.getElementById('youth-option');
    const kidsOption = document.getElementById('kids-option');
    
    // التعامل مع خيار "بيارق مع الشباب"
    if (youthOption) {
        youthOption.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                // إخفاء الشريحة الأولى وإظهار الثانية
                gameTypeSlide.classList.add('hidden');
                categoriesSlide.classList.remove('hidden');
            }
        });
    }
    
    // منع النقر على خيار "بيارق أولادين" المغلق
    if (kidsOption) {
        kidsOption.addEventListener('click', function(e) {
            e.preventDefault();
            // لا يحدث شيء لأن الخيار مغلق
        });
    }
    
    // التعامل مع الفئات
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                // يمكن إضافة منطق للانتقال لصفحة اللعبة الفعلية
                console.log('تم اختيار الفئة:', this.textContent);
                
                // الانتقال لصفحة إعداد الفرق
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
    
    // التعامل مع حقل اسم الدولة
    const countryField = document.querySelector('.country-field');
    
    if (countryField) {
        countryField.addEventListener('focus', function() {
            this.style.backgroundColor = '#f8f8f8';
        });
        
        countryField.addEventListener('blur', function() {
            this.style.backgroundColor = 'transparent';
        });
    }
});

