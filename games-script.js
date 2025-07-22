// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const gameSelectionSlide = document.getElementById('game-selection-slide');
    const categorySelectionSlide = document.getElementById('category-selection-slide');
    const youthButton = document.querySelector('.youth-button');
    const familyButton = document.querySelector('.family-button');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // التعامل مع زر "بيارق مع الشباب"
    youthButton.addEventListener('click', function() {
        gameSelectionSlide.classList.add('hidden');
        categorySelectionSlide.classList.remove('hidden');
    });
    
    // منع النقر على زر "بيارق أولادين"
    familyButton.addEventListener('click', function(e) {
        e.preventDefault();
        // يمكن إضافة رسالة تنبيه هنا
        console.log('هذا الخيار غير متاح حالياً');
    });
    
    // التعامل مع أزرار الفئات
    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // الفئات المتاحة: الموروث الشعبي (3)، الأكلات (5)، المناسبات السعودية (1)
            const availableCategories = [0, 2, 4]; // المؤسسات السعودية، الاحتفال الشعبية، أكلت ومشروبات
            
            if (availableCategories.includes(index)) {
                // الفئة متاحة
                console.log('تم اختيار الفئة:', button.textContent);
                // يمكن إضافة الانتقال إلى الصفحة التالية هنا
            } else {
                // الفئة مغلقة
                console.log('هذه الفئة غير متاحة حالياً');
            }
        });
    });
    
    // إضافة تأثيرات تفاعلية للحقول
    const countryField = document.querySelector('.country-field');
    
    if (countryField) {
        countryField.addEventListener('focus', function() {
            this.style.borderColor = '#5a8a5a';
            this.style.backgroundColor = '#f9f9f9';
        });
        
        countryField.addEventListener('blur', function() {
            this.style.borderColor = '#ccc';
            this.style.backgroundColor = 'transparent';
        });
    }
    
    // إضافة تأثير للشعار
    const logoImages = document.querySelectorAll('.logo-image');
    
    logoImages.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

