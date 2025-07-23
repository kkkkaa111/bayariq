// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const startGameBtn = document.getElementById('startGameBtn');
    const editCategoriesBtn = document.getElementById('editCategoriesBtn');
    const editTeamsBtn = document.getElementById('editTeamsBtn');
    
    // زر بدء اللعبة - الوحيد القابل للنقر حسب الملاحظة
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            // الانتقال لصفحة الأسئلة أو اللعبة الفعلية
            window.location.href = 'questions.html';
        });
    }
    
    // منع النقر على الأزرار المعطلة
    if (editCategoriesBtn) {
        editCategoriesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // لا يحدث شيء - الزر معطل حسب الملاحظة
        });
    }
    
    if (editTeamsBtn) {
        editTeamsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // لا يحدث شيء - الزر معطل حسب الملاحظة
        });
    }
});

