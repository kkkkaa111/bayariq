// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const youthOption = document.getElementById('youth-option');
    const kidsOption = document.getElementById('kids-option');
    
    // التعامل مع خيار "بيارق مع الشباب"
    if (youthOption) {
        youthOption.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                // إضافة تأثير بصري للاختيار
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
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
});

