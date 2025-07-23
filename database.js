// إدارة قاعدة البيانات المحلية للموقع
class BayareqDatabase {
    constructor() {
        this.initializeDatabase();
    }

    // تهيئة قاعدة البيانات
    initializeDatabase() {
        // إنشاء الجداول الأساسية إذا لم تكن موجودة
        if (!localStorage.getItem('visitors')) {
            localStorage.setItem('visitors', JSON.stringify([]));
        }
        
        if (!localStorage.getItem('gameScores')) {
            localStorage.setItem('gameScores', JSON.stringify([]));
        }
        
        if (!localStorage.getItem('teams')) {
            localStorage.setItem('teams', JSON.stringify([]));
        }
        
        if (!localStorage.getItem('gameSettings')) {
            localStorage.setItem('gameSettings', JSON.stringify({
                selectedCategories: ['المؤسسات السعودية', 'الموروث الشعبي', 'الاحتفال الشعبية'],
                teamCount: 2,
                currentGame: null
            }));
        }
    }

    // إضافة زائر جديد
    addVisitor(visitorData) {
        try {
            const visitors = this.getVisitors();
            const newVisitor = {
                id: this.generateId(),
                email: visitorData.email,
                password: visitorData.password, // في التطبيق الحقيقي، يجب تشفير كلمة المرور
                name: visitorData.name || '',
                visitDate: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                gamesPlayed: 0,
                totalScore: 0
            };
            
            visitors.push(newVisitor);
            localStorage.setItem('visitors', JSON.stringify(visitors));
            
            return { success: true, visitor: newVisitor };
        } catch (error) {
            console.error('خطأ في إضافة الزائر:', error);
            return { success: false, error: error.message };
        }
    }

    // التحقق من تسجيل الدخول
    loginVisitor(email, password) {
        try {
            const visitors = this.getVisitors();
            const visitor = visitors.find(v => v.email === email && v.password === password);
            
            if (visitor) {
                // تحديث آخر تسجيل دخول
                visitor.lastLogin = new Date().toISOString();
                this.updateVisitor(visitor);
                
                // حفظ الجلسة الحالية
                localStorage.setItem('currentUser', JSON.stringify(visitor));
                
                return { success: true, visitor: visitor };
            } else {
                return { success: false, error: 'بيانات الدخول غير صحيحة' };
            }
        } catch (error) {
            console.error('خطأ في تسجيل الدخول:', error);
            return { success: false, error: error.message };
        }
    }

    // الحصول على المستخدم الحالي
    getCurrentUser() {
        try {
            const currentUser = localStorage.getItem('currentUser');
            return currentUser ? JSON.parse(currentUser) : null;
        } catch (error) {
            console.error('خطأ في الحصول على المستخدم الحالي:', error);
            return null;
        }
    }

    // تسجيل الخروج
    logoutVisitor() {
        localStorage.removeItem('currentUser');
        return { success: true };
    }

    // الحصول على جميع الزوار
    getVisitors() {
        try {
            const visitors = localStorage.getItem('visitors');
            return visitors ? JSON.parse(visitors) : [];
        } catch (error) {
            console.error('خطأ في الحصول على الزوار:', error);
            return [];
        }
    }

    // تحديث بيانات زائر
    updateVisitor(updatedVisitor) {
        try {
            const visitors = this.getVisitors();
            const index = visitors.findIndex(v => v.id === updatedVisitor.id);
            
            if (index !== -1) {
                visitors[index] = updatedVisitor;
                localStorage.setItem('visitors', JSON.stringify(visitors));
                
                // تحديث المستخدم الحالي إذا كان هو نفسه
                const currentUser = this.getCurrentUser();
                if (currentUser && currentUser.id === updatedVisitor.id) {
                    localStorage.setItem('currentUser', JSON.stringify(updatedVisitor));
                }
                
                return { success: true, visitor: updatedVisitor };
            } else {
                return { success: false, error: 'الزائر غير موجود' };
            }
        } catch (error) {
            console.error('خطأ في تحديث الزائر:', error);
            return { success: false, error: error.message };
        }
    }

    // إضافة نتيجة لعبة
    addGameScore(scoreData) {
        try {
            const gameScores = this.getGameScores();
            const newScore = {
                id: this.generateId(),
                visitorId: scoreData.visitorId,
                teamName: scoreData.teamName,
                category: scoreData.category,
                score: scoreData.score,
                questionsAnswered: scoreData.questionsAnswered || 0,
                correctAnswers: scoreData.correctAnswers || 0,
                gameDate: new Date().toISOString(),
                gameDuration: scoreData.gameDuration || 0
            };
            
            gameScores.push(newScore);
            localStorage.setItem('gameScores', JSON.stringify(gameScores));
            
            // تحديث إحصائيات الزائر
            this.updateVisitorStats(scoreData.visitorId, scoreData.score);
            
            return { success: true, score: newScore };
        } catch (error) {
            console.error('خطأ في إضافة نتيجة اللعبة:', error);
            return { success: false, error: error.message };
        }
    }

    // الحصول على نتائج الألعاب
    getGameScores(visitorId = null) {
        try {
            const gameScores = localStorage.getItem('gameScores');
            const scores = gameScores ? JSON.parse(gameScores) : [];
            
            if (visitorId) {
                return scores.filter(score => score.visitorId === visitorId);
            }
            
            return scores;
        } catch (error) {
            console.error('خطأ في الحصول على نتائج الألعاب:', error);
            return [];
        }
    }

    // تحديث إحصائيات الزائر
    updateVisitorStats(visitorId, newScore) {
        try {
            const visitors = this.getVisitors();
            const visitor = visitors.find(v => v.id === visitorId);
            
            if (visitor) {
                visitor.gamesPlayed = (visitor.gamesPlayed || 0) + 1;
                visitor.totalScore = (visitor.totalScore || 0) + newScore;
                this.updateVisitor(visitor);
            }
        } catch (error) {
            console.error('خطأ في تحديث إحصائيات الزائر:', error);
        }
    }

    // إدارة الفرق
    saveTeams(teams) {
        try {
            localStorage.setItem('teams', JSON.stringify(teams));
            return { success: true };
        } catch (error) {
            console.error('خطأ في حفظ الفرق:', error);
            return { success: false, error: error.message };
        }
    }

    getTeams() {
        try {
            const teams = localStorage.getItem('teams');
            return teams ? JSON.parse(teams) : [];
        } catch (error) {
            console.error('خطأ في الحصول على الفرق:', error);
            return [];
        }
    }

    // إدارة إعدادات اللعبة
    saveGameSettings(settings) {
        try {
            localStorage.setItem('gameSettings', JSON.stringify(settings));
            return { success: true };
        } catch (error) {
            console.error('خطأ في حفظ إعدادات اللعبة:', error);
            return { success: false, error: error.message };
        }
    }

    getGameSettings() {
        try {
            const settings = localStorage.getItem('gameSettings');
            return settings ? JSON.parse(settings) : {
                selectedCategories: ['المؤسسات السعودية', 'الموروث الشعبي', 'الاحتفال الشعبية'],
                teamCount: 2,
                currentGame: null
            };
        } catch (error) {
            console.error('خطأ في الحصول على إعدادات اللعبة:', error);
            return {
                selectedCategories: ['المؤسسات السعودية', 'الموروث الشعبي', 'الاحتفال الشعبية'],
                teamCount: 2,
                currentGame: null
            };
        }
    }

    // الحصول على إحصائيات عامة
    getStatistics() {
        try {
            const visitors = this.getVisitors();
            const gameScores = this.getGameScores();
            
            return {
                totalVisitors: visitors.length,
                totalGames: gameScores.length,
                averageScore: gameScores.length > 0 ? 
                    gameScores.reduce((sum, score) => sum + score.score, 0) / gameScores.length : 0,
                topScores: gameScores
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10),
                recentVisitors: visitors
                    .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
                    .slice(0, 10)
            };
        } catch (error) {
            console.error('خطأ في الحصول على الإحصائيات:', error);
            return {
                totalVisitors: 0,
                totalGames: 0,
                averageScore: 0,
                topScores: [],
                recentVisitors: []
            };
        }
    }

    // تصدير البيانات
    exportData() {
        try {
            const data = {
                visitors: this.getVisitors(),
                gameScores: this.getGameScores(),
                teams: this.getTeams(),
                gameSettings: this.getGameSettings(),
                exportDate: new Date().toISOString()
            };
            
            return { success: true, data: data };
        } catch (error) {
            console.error('خطأ في تصدير البيانات:', error);
            return { success: false, error: error.message };
        }
    }

    // استيراد البيانات
    importData(data) {
        try {
            if (data.visitors) {
                localStorage.setItem('visitors', JSON.stringify(data.visitors));
            }
            if (data.gameScores) {
                localStorage.setItem('gameScores', JSON.stringify(data.gameScores));
            }
            if (data.teams) {
                localStorage.setItem('teams', JSON.stringify(data.teams));
            }
            if (data.gameSettings) {
                localStorage.setItem('gameSettings', JSON.stringify(data.gameSettings));
            }
            
            return { success: true };
        } catch (error) {
            console.error('خطأ في استيراد البيانات:', error);
            return { success: false, error: error.message };
        }
    }

    // مسح جميع البيانات
    clearAllData() {
        try {
            localStorage.removeItem('visitors');
            localStorage.removeItem('gameScores');
            localStorage.removeItem('teams');
            localStorage.removeItem('gameSettings');
            localStorage.removeItem('currentUser');
            
            this.initializeDatabase();
            
            return { success: true };
        } catch (error) {
            console.error('خطأ في مسح البيانات:', error);
            return { success: false, error: error.message };
        }
    }

    // توليد معرف فريد
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // التحقق من صحة البريد الإلكتروني
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // التحقق من قوة كلمة المرور
    validatePassword(password) {
        return password && password.length >= 6;
    }
}

// إنشاء مثيل عام من قاعدة البيانات
const bayareqDB = new BayareqDatabase();

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BayareqDatabase;
}

