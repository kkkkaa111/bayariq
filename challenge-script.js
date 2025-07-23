// متغيرات عامة
let teamCount = 2;
let currentPage = 'challenge';

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // إعداد أحداث الأزرار
    setupEventListeners();
    
    // إعداد العداد
    updateTeamCounter();
}

function setupEventListeners() {
    // أزرار العداد
    const decreaseBtn = document.querySelector('.counter-btn[onclick="decreaseTeam()"]');
    const increaseBtn = document.querySelector('.counter-btn[onclick="increaseTeam()"]');
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', decreaseTeam);
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', increaseTeam);
    }
    
    // زر البدء
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startChallenge);
    }
    
    // أزرار خيارات اللعبة
    const gameOptions = document.querySelectorAll('.option-btn');
    gameOptions.forEach(btn => {
        btn.addEventListener('click', function() {
            const option = this.textContent.trim();
            selectGameOption(option);
        });
    });
    
    // أزرار الفئات
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        if (!item.classList.contains('disabled')) {
            item.addEventListener('click', function() {
                toggleCategory(this);
            });
        }
    });
}

function decreaseTeam() {
    if (teamCount > 2) {
        teamCount--;
        updateTeamCounter();
        updateTeamInputs();
    }
}

function increaseTeam() {
    if (teamCount < 10) {
        teamCount++;
        updateTeamCounter();
        updateTeamInputs();
    }
}

function updateTeamCounter() {
    const counterDisplay = document.querySelector('.counter-display');
    if (counterDisplay) {
        counterDisplay.textContent = teamCount;
    }
}

function updateTeamInputs() {
    const teamInputsContainer = document.querySelector('.team-inputs');
    if (!teamInputsContainer) return;
    
    teamInputsContainer.innerHTML = '';
    
    for (let i = 1; i <= teamCount; i++) {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'team-section';
        inputDiv.innerHTML = `
            <div class="team-label">الفريق ${i}:</div>
            <input type="text" class="team-input" placeholder="اسم الفريق ${i}" required>
        `;
        teamInputsContainer.appendChild(inputDiv);
    }
}

function startChallenge() {
    // التحقق من ملء جميع الحقول
    const teamInputs = document.querySelectorAll('.team-input');
    let allFilled = true;
    
    teamInputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    if (!allFilled) {
        alert('يرجى ملء جميع أسماء الفرق');
        return;
    }
    
    // حفظ أسماء الفرق
    const teamNames = [];
    teamInputs.forEach(input => {
        teamNames.push(input.value.trim());
    });
    
    localStorage.setItem('teamNames', JSON.stringify(teamNames));
    localStorage.setItem('teamCount', teamCount);
    
    // الانتقال إلى صفحة خيارات اللعبة
    showGameOptions();
}

function showGameOptions() {
    const challengePage = document.getElementById('challengePage');
    const gameOptionsPage = document.getElementById('gameOptionsPage');
    
    if (challengePage) challengePage.classList.add('hidden');
    if (gameOptionsPage) gameOptionsPage.classList.remove('hidden');
}

function selectGameOption(option) {
    if (option.includes('بدء اللعبة')) {
        // الانتقال إلى صفحة الأسئلة
        window.location.href = 'questions.html';
    } else if (option.includes('تعديل الفئات')) {
        // الانتقال إلى صفحة تعديل الفئات
        showCategoriesPage();
    }
}

function showCategoriesPage() {
    const gameOptionsPage = document.getElementById('gameOptionsPage');
    const categoriesPage = document.getElementById('categoriesPage');
    
    if (gameOptionsPage) gameOptionsPage.classList.add('hidden');
    if (categoriesPage) categoriesPage.classList.remove('hidden');
}

function toggleCategory(categoryElement) {
    if (categoryElement.classList.contains('disabled')) {
        return;
    }
    
    categoryElement.classList.toggle('active');
    
    // حفظ الفئات المختارة
    const activeCategories = [];
    document.querySelectorAll('.category-item.active').forEach(item => {
        activeCategories.push(item.textContent.trim());
    });
    
    localStorage.setItem('selectedCategories', JSON.stringify(activeCategories));
}

function goBackToGameOptions() {
    const categoriesPage = document.getElementById('categoriesPage');
    const gameOptionsPage = document.getElementById('gameOptionsPage');
    
    if (categoriesPage) categoriesPage.classList.add('hidden');
    if (gameOptionsPage) gameOptionsPage.classList.remove('hidden');
}

// تأثيرات بصرية
function addClickEffect(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

// إضافة تأثيرات للأزرار
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('counter-btn') || 
        e.target.classList.contains('start-btn') || 
        e.target.classList.contains('option-btn')) {
        addClickEffect(e.target);
    }
});

// حفظ حالة الصفحة
function savePageState() {
    const state = {
        teamCount: teamCount,
        currentPage: currentPage
    };
    localStorage.setItem('challengeState', JSON.stringify(state));
}

// استرجاع حالة الصفحة
function loadPageState() {
    const savedState = localStorage.getItem('challengeState');
    if (savedState) {
        const state = JSON.parse(savedState);
        teamCount = state.teamCount || 2;
        currentPage = state.currentPage || 'challenge';
        updateTeamCounter();
    }
}

