// متغيرات عامة
let currentQuestion = null;
let selectedAnswer = null;
let usedQuestions = [];
let teamScores = {};
let currentTeam = 0;

// بيانات الأسئلة
const questionsData = {
    "اللهجات السعودية": {
        100: {
            question: "ما معنى كلمة 'حنا' في اللهجة السعودية؟",
            image: null,
            answers: ["أ) نحن", "ب) هنا", "ج) الآن", "د) كيف"],
            correct: 0
        },
        200: {
            question: "ما معنى كلمة 'وش' في اللهجة السعودية؟",
            image: null,
            answers: ["أ) أين", "ب) متى", "ج) ماذا", "د) كيف"],
            correct: 2
        },
        300: {
            question: "ما معنى كلمة 'زين' في اللهجة السعودية؟",
            image: null,
            answers: ["أ) سيء", "ب) جميل", "ج) كبير", "د) صغير"],
            correct: 1
        },
        400: {
            question: "ما معنى كلمة 'يالله' في اللهجة السعودية؟",
            image: null,
            answers: ["أ) تعال", "ب) اذهب", "ج) هيا بنا", "د) توقف"],
            correct: 2
        }
    },
    "الموروث الشعبي": {
        100: {
            question: "ما اسم الفن الشعبي الذي يؤدى في المملكة؟",
            image: "https://via.placeholder.com/300x200/7ba05b/ffffff?text=العرضة+السعودية",
            answers: ["أ) اللحجة الشمالية", "ب) العرضة الجنوبية", "ج) الفروسي", "د) العرضة السعودية"],
            correct: 3
        },
        200: {
            question: "ما هو تاريخ يوم التأسيس؟",
            image: "https://via.placeholder.com/300x200/7ba05b/ffffff?text=يوم+التأسيس",
            answers: ["أ) 22 فبراير", "ب) 23 سبتمبر", "ج) 22 يناير", "د) 23 فبراير"],
            correct: 0
        },
        300: {
            question: "في أي سنة تم الإعلان عن رؤية المملكة 2030؟",
            image: "https://via.placeholder.com/300x200/7ba05b/ffffff?text=رؤية+2030",
            answers: ["أ) 2015", "ب) 2016", "ج) 2017", "د) 2018"],
            correct: 1
        },
        400: {
            question: "ما اسم أول ملك للمملكة العربية السعودية؟",
            image: "https://via.placeholder.com/300x200/7ba05b/ffffff?text=الملك+عبدالعزيز",
            answers: ["أ) الملك فيصل", "ب) الملك عبدالعزيز", "ج) الملك سعود", "د) الملك فهد"],
            correct: 1
        }
    },
    "المناسبات السعودية": {
        100: {
            question: "متى يتم الاحتفال باليوم الوطني السعودي؟",
            image: "https://via.placeholder.com/300x200/7ba05b/ffffff?text=اليوم+الوطني",
            answers: ["أ) 22 سبتمبر", "ب) 23 سبتمبر", "ج) 24 سبتمبر", "د) 25 سبتمبر"],
            correct: 1
        },
        200: {
            question: "ما هي مناسبة يوم التأسيس؟",
            image: "https://via.placeholder.com/300x200/7ba05b/ffffff?text=يوم+التأسيس",
            answers: ["أ) توحيد المملكة", "ب) تأسيس الدولة السعودية الأولى", "ج) اكتشاف النفط", "د) إنشاء مجلس الشورى"],
            correct: 1
        },
        300: {
            question: "في أي شهر يتم الاحتفال بيوم التأسيس؟",
            image: null,
            answers: ["أ) يناير", "ب) فبراير", "ج) مارس", "د) أبريل"],
            correct: 1
        },
        400: {
            question: "ما هو شعار رؤية المملكة 2030؟",
            image: "https://via.placeholder.com/300x200/7ba05b/ffffff?text=رؤية+2030",
            answers: ["أ) وطن طموح", "ب) مجتمع حيوي", "ج) اقتصاد مزدهر", "د) جميع ما سبق"],
            correct: 3
        }
    },
    "أكلت ومشروبات": {
        100: {
            question: "ما هو المشروب الشعبي السعودي المصنوع من التمر؟",
            image: null,
            answers: ["أ) القهوة العربية", "ب) الشاي الأحمر", "ج) عصير التمر", "د) اللبن"],
            correct: 2
        },
        200: {
            question: "ما هو الطبق الشعبي السعودي المكون من الأرز واللحم؟",
            image: null,
            answers: ["أ) الكبسة", "ب) المندي", "ج) البرياني", "د) جميع ما سبق"],
            correct: 3
        },
        300: {
            question: "ما هي الحلوى الشعبية السعودية المصنوعة من التمر والمكسرات؟",
            image: null,
            answers: ["أ) المعمول", "ب) القطايف", "ج) الكليجة", "د) المأمول"],
            correct: 0
        },
        400: {
            question: "ما هو المشروب التقليدي الذي يقدم مع الضيافة السعودية؟",
            image: null,
            answers: ["أ) الشاي", "ب) القهوة العربية", "ج) العصير", "د) الماء"],
            correct: 1
        }
    }
};

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // تحميل بيانات الفرق
    loadTeamData();
    
    // إعداد أحداث الأزرار
    setupEventListeners();
    
    // تحميل الأسئلة المستخدمة
    loadUsedQuestions();
    
    // إظهار شبكة الأسئلة
    showQuestionsGrid();
}

function loadTeamData() {
    const teamNames = JSON.parse(localStorage.getItem('teamNames') || '[]');
    const teamCount = parseInt(localStorage.getItem('teamCount') || '2');
    
    // إعداد نقاط الفرق
    teamScores = {};
    teamNames.forEach((name, index) => {
        teamScores[name] = 0;
    });
}

function setupEventListeners() {
    // أزرار النقاط في الشبكة
    const pointBtns = document.querySelectorAll('.point-btn');
    pointBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('used')) {
                const category = this.getAttribute('data-category');
                const points = parseInt(this.getAttribute('data-points'));
                selectQuestion(category, points, this);
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
    
    // زر العودة
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', goBackToGrid);
    }
}

function selectQuestion(category, points, buttonElement) {
    // التحقق من وجود السؤال
    if (!questionsData[category] || !questionsData[category][points]) {
        alert('السؤال غير متوفر');
        return;
    }
    
    currentQuestion = {
        category: category,
        points: points,
        data: questionsData[category][points],
        buttonElement: buttonElement
    };
    
    // إظهار صفحة السؤال
    showQuestionPage();
}

function showQuestionPage() {
    const gridPage = document.getElementById('questionsGrid');
    const questionPage = document.getElementById('questionPage');
    
    if (gridPage) gridPage.classList.add('hidden');
    if (questionPage) questionPage.classList.remove('hidden');
    
    // تحديث محتوى السؤال
    updateQuestionContent();
}

function updateQuestionContent() {
    if (!currentQuestion) return;
    
    const questionData = currentQuestion.data;
    
    // تحديث نص السؤال
    const questionText = document.getElementById('questionText');
    if (questionText) {
        questionText.textContent = questionData.question;
    }
    
    // تحديث صورة السؤال
    const questionImg = document.getElementById('questionImg');
    if (questionImg && questionData.image) {
        questionImg.src = questionData.image;
        questionImg.style.display = 'block';
    } else if (questionImg) {
        questionImg.style.display = 'none';
    }
    
    // تحديث خيارات الإجابة
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach((btn, index) => {
        if (questionData.answers[index]) {
            btn.textContent = questionData.answers[index];
            btn.style.display = 'block';
            btn.classList.remove('selected', 'correct', 'wrong');
        } else {
            btn.style.display = 'none';
        }
    });
}

function selectAnswer(answerButton) {
    // إزالة التحديد من جميع الأزرار
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // تحديد الإجابة المختارة
    answerButton.classList.add('selected');
    selectedAnswer = Array.from(document.querySelectorAll('.answer-btn')).indexOf(answerButton);
    
    // التحقق من الإجابة بعد ثانية واحدة
    setTimeout(() => {
        checkAnswer();
    }, 1000);
}

function checkAnswer() {
    if (!currentQuestion || selectedAnswer === null) return;
    
    const correctAnswer = currentQuestion.data.correct;
    const answerBtns = document.querySelectorAll('.answer-btn');
    
    // إظهار الإجابة الصحيحة والخاطئة
    answerBtns.forEach((btn, index) => {
        if (index === correctAnswer) {
            btn.classList.add('correct');
        } else if (index === selectedAnswer && index !== correctAnswer) {
            btn.classList.add('wrong');
        }
    });
    
    // إظهار النتيجة
    setTimeout(() => {
        showResult(selectedAnswer === correctAnswer);
    }, 2000);
}

function showResult(isCorrect) {
    const questionPage = document.getElementById('questionPage');
    const resultPage = document.getElementById('resultPage');
    
    if (questionPage) questionPage.classList.add('hidden');
    if (resultPage) resultPage.classList.remove('hidden');
    
    // تحديث رسالة النتيجة
    const correctMessage = document.querySelector('.result-message.correct');
    const wrongMessage = document.querySelector('.result-message.wrong');
    
    if (isCorrect) {
        if (correctMessage) correctMessage.classList.remove('hidden');
        if (wrongMessage) wrongMessage.classList.add('hidden');
        
        // إضافة النقاط
        addPointsToCurrentTeam();
    } else {
        if (correctMessage) correctMessage.classList.add('hidden');
        if (wrongMessage) wrongMessage.classList.remove('hidden');
    }
    
    // تحديث الزر كمستخدم
    if (currentQuestion && currentQuestion.buttonElement) {
        currentQuestion.buttonElement.classList.add('used');
        
        // حفظ السؤال كمستخدم
        const questionKey = `${currentQuestion.category}-${currentQuestion.points}`;
        usedQuestions.push(questionKey);
        saveUsedQuestions();
    }
}

function addPointsToCurrentTeam() {
    // هذه الوظيفة يمكن تطويرها لإضافة النقاط للفريق الحالي
    // حالياً سنحفظ النقاط في localStorage
    const points = currentQuestion ? currentQuestion.points : 0;
    let totalScore = parseInt(localStorage.getItem('totalScore') || '0');
    totalScore += points;
    localStorage.setItem('totalScore', totalScore.toString());
}

function goBackToGrid() {
    const questionPage = document.getElementById('questionPage');
    const resultPage = document.getElementById('resultPage');
    const gridPage = document.getElementById('questionsGrid');
    
    if (questionPage) questionPage.classList.add('hidden');
    if (resultPage) resultPage.classList.add('hidden');
    if (gridPage) gridPage.classList.remove('hidden');
    
    // إعادة تعيين المتغيرات
    currentQuestion = null;
    selectedAnswer = null;
}

function showQuestionsGrid() {
    const gridPage = document.getElementById('questionsGrid');
    if (gridPage) gridPage.classList.remove('hidden');
}

function saveUsedQuestions() {
    localStorage.setItem('usedQuestions', JSON.stringify(usedQuestions));
}

function loadUsedQuestions() {
    usedQuestions = JSON.parse(localStorage.getItem('usedQuestions') || '[]');
    
    // تحديث الأزرار المستخدمة
    usedQuestions.forEach(questionKey => {
        const [category, points] = questionKey.split('-');
        const button = document.querySelector(`[data-category="${category}"][data-points="${points}"]`);
        if (button) {
            button.classList.add('used');
        }
    });
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
    if (e.target.classList.contains('point-btn') || 
        e.target.classList.contains('answer-btn') || 
        e.target.classList.contains('back-btn')) {
        addClickEffect(e.target);
    }
});

