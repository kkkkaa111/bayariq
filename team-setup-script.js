// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const minusBtn = document.getElementById('minusBtn');
    const plusBtn = document.getElementById('plusBtn');
    const teamCountDisplay = document.getElementById('teamCount');
    const teamsContainer = document.getElementById('teamsContainer');
    const startBtn = document.getElementById('startBtn');
    
    let teamCount = 2;
    const maxTeams = 10;
    const minTeams = 2;
    
    // تحديث عرض الفرق
    function updateTeamsDisplay() {
        teamsContainer.innerHTML = '';
        
        for (let i = 1; i <= teamCount; i++) {
            const teamInput = document.createElement('div');
            teamInput.className = 'team-input';
            teamInput.innerHTML = `
                <input type="text" placeholder="الفريق ${getArabicNumber(i)}" class="team-field">
                <div class="divider-line"></div>
            `;
            teamsContainer.appendChild(teamInput);
        }
    }
    
    // تحويل الأرقام للعربية
    function getArabicNumber(num) {
        const arabicNumbers = ['', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'];
        return arabicNumbers[num] || `الفريق ${num}`;
    }
    
    // زر الزيادة
    if (plusBtn) {
        plusBtn.addEventListener('click', function() {
            if (teamCount < maxTeams) {
                teamCount++;
                teamCountDisplay.textContent = teamCount;
                updateTeamsDisplay();
            }
        });
    }
    
    // زر النقصان
    if (minusBtn) {
        minusBtn.addEventListener('click', function() {
            if (teamCount > minTeams) {
                teamCount--;
                teamCountDisplay.textContent = teamCount;
                updateTeamsDisplay();
            }
        });
    }
    
    // زر البدء - الوحيد القابل للنقر حسب الملاحظة
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            // جمع أسماء الفرق
            const teamFields = document.querySelectorAll('.team-field');
            const teams = [];
            
            teamFields.forEach((field, index) => {
                const teamName = field.value.trim() || `الفريق ${getArabicNumber(index + 1)}`;
                teams.push(teamName);
            });
            
            // حفظ بيانات الفرق في localStorage
            localStorage.setItem('bayareq_teams', JSON.stringify(teams));
            
            // الانتقال لصفحة بدء اللعبة
            window.location.href = 'game-start.html';
        });
    }
    
    // تحديث العرض الأولي
    updateTeamsDisplay();
});

