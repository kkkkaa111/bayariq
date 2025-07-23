// بيانات الأسئلة
const questionsData = {
    "الموروث الشعبي": {
        100: {
            image: "images/ardha.jpg",
            question: "ما اسم الفن الشعبي الذي بالصورة ؟",
            options: ["الدحة الشمالية", "العرضة", "الفروسية", "العرضة السعودية"],
            correct: 3
        },
        200: {
            image: "images/heritage.webp",
            question: "في أي سنة تم الإعلان عن رؤية المملكة 2030 ؟",
            options: ["2015", "2016", "2017", "2018"],
            correct: 1
        },
        300: {
            image: "images/national.png",
            question: "ما هو تاريخ يوم التأسيس ؟",
            options: ["22 فبراير", "23 سبتمبر", "22 يناير", "23 فبراير"],
            correct: 0
        },
        400: {
            image: "images/food.jpg",
            question: "ما اسم الأكلة التي بالصورة ؟",
            options: ["العريكة", "القرصان", "الجميدة", "المضغوطة"],
            correct: 0
        }
    },
    "المناسبات السعودية": {
        100: {
            image: "images/national.png",
            question: "متى يصادف اليوم الوطني السعودي ؟",
            options: ["22 سبتمبر", "23 سبتمبر", "24 سبتمبر", "25 سبتمبر"],
            correct: 1
        },
        200: {
            image: "images/heritage.webp",
            question: "في أي عام تم توحيد المملكة ؟",
            options: ["1930", "1931", "1932", "1933"],
            correct: 2
        },
        300: {
            image: "images/ardha.jpg",
            question: "من هو مؤسس المملكة العربية السعودية ؟",
            options: ["الملك عبدالعزيز", "الملك سعود", "الملك فيصل", "الملك خالد"],
            correct: 0
        },
        400: {
            image: "images/national.png",
            question: "ما هي رؤية المملكة العربية السعودية ؟",
            options: ["رؤية 2025", "رؤية 2030", "رؤية 2035", "رؤية 2040"],
            correct: 1
        }
    },
    "أكلات ومشروبات": {
        100: {
            image: "images/food.jpg",
            question: "ما اسم الأكلة التي بالصورة ؟",
            options: ["العريكة", "القرصان", "الجميدة", "المضغوطة"],
            correct: 0
        },
        200: {
            image: "images/heritage.webp",
            question: "ما هو المشروب الشعبي المشهور في نجد ؟",
            options: ["القهوة العربية", "الشاي الأحمر", "اللبن", "العصير"],
            correct: 0
        },
        300: {
            image: "images/food.jpg",
            question: "ما اسم الحلوى الشعبية المشهورة ؟",
            options: ["المعمول", "الكليجة", "القطايف", "البقلاوة"],
            correct: 1
        },
        400: {
            image: "images/heritage.webp",
            question: "ما هي الطريقة التقليدية لطبخ الأرز ؟",
            options: ["في القدر", "في التنور", "في الفرن", "على الفحم"],
            correct: 1
        }
    },
    "اللهجات السعودية": {
        100: {
            image: "images/heritage.webp",
            question: "ماذا تعني كلمة 'حنا' في اللهجة السعودية ؟",
            options: ["نحن", "هنا", "الآن", "معنا"],
            correct: 0
        },
        200: {
            image: "images/heritage.webp",
            question: "ماذا تعني كلمة 'وش' ؟",
            options: ["أين", "متى", "ماذا", "كيف"],
            correct: 2
        },
        300: {
            image: "images/heritage.webp",
            question: "ماذا تعني كلمة 'يالله' ؟",
            options: ["تعال", "اذهب", "هيا", "توقف"],
            correct: 2
        },
        400: {
            image: "images/heritage.webp",
            question: "ماذا تعني كلمة 'زين' ؟",
            options: ["جميل", "جيد", "حسن", "كل ما سبق"],
            correct: 3
        }
    }
};

// متغيرات اللعبة
let currentQuestion = null;
let answeredQuestions = [];
let totalQuestions = 16; // 4 فئات × 4 أسئلة
let gameScore = 0;
let selectedAnswer = null;
let usedQuestions = new Set();
let currentScreen = 'grid';

// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
});

function initializeGame() {
    // إظهار شاشة الشبكة
    showScreen('questions-grid-screen');
    
    // تحديث عداد الصفحات
    updatePageCounter();
}

function setupEventListeners() {
    // أزرار النقاط
    const pointBtns = document.querySelectorAll('.point-btn');
    pointBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('used')) {
                const category = this.dataset.category;
                const points = this.dataset.points;
                showQuestion(category, points);
                this.classList.add('used');
            }
        });
    });
    
    // أزرار الإجابات
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            selectAnswer(this);
        });
    });
    
    // النقر على أي مكان في شاشة السؤال للانتقال للنتيجة
    const questionScreen = document.getElementById('question-screen');
    questionScreen.addEventListener('click', function() {
        if (selectedAnswer !== null) {
            showResult();
        }
    });
    
    // النقر على أي مكان في شاشة النتيجة للعودة للشبكة
    const resultScreen = document.getElementById('result-screen');
    resultScreen.addEventListener('click', function() {
        showScreen('questions-grid-screen');
        resetQuestion();
    });
}

function showScreen(screenId) {
    // إخفاء جميع الشاشات
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });
    
    // إظهار الشاشة المطلوبة
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }
    
    currentScreen = screenId;
}

function showQuestion(category, points) {
    const questionData = questionsData[category][points];
    if (!questionData) return;
    
    currentQuestion = {
        category: category,
        points: points,
        data: questionData
    };
    
    // تحديث محتوى السؤال
    document.getElementById('question-img').src = questionData.image;
    document.getElementById('question-text').textContent = questionData.question;
    
    // تحديث خيارات الإجابة
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach((btn, index) => {
        btn.textContent = questionData.options[index];
        btn.classList.remove('selected');
    });
    
    // إظهار شاشة السؤال
    showScreen('question-screen');
    selectedAnswer = null;
}

function selectAnswer(answerBtn) {
    // إزالة التحديد من جميع الأزرار
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // تحديد الإجابة المختارة
    answerBtn.classList.add('selected');
    selectedAnswer = Array.from(answerBtns).indexOf(answerBtn);
}

function showResult() {
    if (!currentQuestion) return;
    
    const questionData = currentQuestion.data;
    const isCorrect = selectedAnswer === questionData.correct;
    
    // إضافة النتيجة للنقاط
    if (isCorrect) {
        gameScore += currentQuestion.points;
    }
    
    // إضافة السؤال للأسئلة المجابة
    answeredQuestions.push({
        category: currentQuestion.category,
        points: currentQuestion.points,
        correct: isCorrect
    });
    
    // تحديث محتوى النتيجة
    document.getElementById('result-img').src = questionData.image;
    document.getElementById('result-text').textContent = questionData.question;
    
    // تحديث خيارات النتيجة
    const resultBtns = document.querySelectorAll('.result-btn');
    resultBtns.forEach((btn, index) => {
        btn.textContent = questionData.options[index];
        btn.classList.remove('correct', 'wrong');
        
        if (index === questionData.correct) {
            btn.classList.add('correct');
        } else if (index === selectedAnswer && selectedAnswer !== questionData.correct) {
            btn.classList.add('wrong');
        }
    });
    
    // إظهار شاشة النتيجة
    showScreen('result-screen');
    
    // التحقق من إكمال جميع الأسئلة
    if (answeredQuestions.length >= 12) { // 3 فئات × 4 أسئلة
        setTimeout(() => {
            showFinalResults();
        }, 3000);
    }
}

function resetQuestion() {
    currentQuestion = null;
    selectedAnswer = null;
}

function updatePageCounter() {
    // تحديث عداد الصفحات (يمكن تخصيصه حسب الحاجة)
    const usedCount = usedQuestions.size;
    const totalQuestions = 16; // 4 فئات × 4 أسئلة
    
    document.getElementById('current-page').textContent = usedCount + 11;
    document.getElementById('total-pages').textContent = '19';
    
    document.getElementById('question-current-page').textContent = usedCount + 11;
    document.getElementById('question-total-pages').textContent = '19';
}

function checkGameEnd() {
    const totalQuestions = Object.keys(questionsData).length * 4;
    if (usedQuestions.size >= totalQuestions) {
        // إظهار شاشة الترتيب النهائي
        setTimeout(() => {
            showScreen('ranking-screen');
        }, 2000);
    }
}

// إضافة تأثيرات تفاعلية
document.addEventListener('DOMContentLoaded', function() {
    // تأثيرات الحوم للأزرار
    const pointBtns = document.querySelectorAll('.point-btn');
    pointBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('used')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});



// دالة عرض النتائج النهائية
function showFinalResults() {
    showScreen('final-results');
    
    // حساب النتائج
    const correctAnswers = answeredQuestions.filter(q => q.correct).length;
    const totalAnswers = answeredQuestions.length;
    const percentage = Math.round((correctAnswers / totalAnswers) * 100);
    
    // عرض النتائج
    document.getElementById('final-score').textContent = `${gameScore} نقطة`;
    document.getElementById('correct-count').textContent = `${correctAnswers} من ${totalAnswers}`;
    document.getElementById('percentage').textContent = `${percentage}%`;
    
    // تحديد المركز بناءً على النسبة
    let rank = "المركز الثالث";
    if (percentage >= 90) rank = "المركز الأول";
    else if (percentage >= 70) rank = "المركز الثاني";
    
    document.getElementById('final-rank').textContent = rank;
}

