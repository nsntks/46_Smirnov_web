function startGame() {
    const questions = [
        {
            question: "Когда состоялось открытие МПУ, названного в честь 25-летия царствования императора Александра II?",
            options: ["22 февраля 1903 года", "24 февраля 1903 года", "27 февраля 1903 года", "25 февраля 1904 года"],
            correctAnswer: "24 февраля 1903 года"
        },
        {
            question: "Когда МХТИ переименовали в Российский химико-технологический университет имени Д. И. Менделеева?",
            options: ["в 1991 году", "в 1990 году", "в 1992 году", "в 1993 году"],
            correctAnswer: "в 1992 году"
        },
        {
            question: "Когда была образована кафедра ИКТ в РХТУ им. Д.И. Менделеева?",
            options: ["в 2001 году", "в 2000 году", "в 2002 году", "хз"],
            correctAnswer: "в 2001 году"
        }
    ];

    let score = 0;

    alert("Начинаем викторину!");

    for (let i = 0; i < questions.length; i++) {
        const currentQuestion = questions[i];
        let userAnswer;
        const optionsString = currentQuestion.options.map((option, index) => `${index + 1}. ${option}`).join("\n");

        while (true) {
            userAnswer = prompt(`${currentQuestion.question}\n\nВарианты ответов:\n${optionsString}`);
            if (userAnswer === null) {
                // отмена
                const confirmExit = confirm("Уверен, что хочешь выйти? Точно?");
                if (confirmExit) {
                    alert(`Викторина завершена. Твой счёт: ${score} из ${questions.length}`);
                    return;
                } else {
                    continue;
                }
            }
            const answerNumber = parseInt(userAnswer);

            if (isNaN(answerNumber) || answerNumber < 1 || answerNumber > currentQuestion.options.length) {
                alert("Введи номер правильного варианта ответа!");
                continue;
            }

            const selectedOption = currentQuestion.options[answerNumber - 1];

            // проверка правильности
            if (selectedOption === currentQuestion.correctAnswer) {
                alert("Правильно! 🎉");
                score++;
            } else {
                alert(`Провал. Правильный ответ: ${currentQuestion.correctAnswer}`);
            }
            break;
        }
    }

    // итог
    alert(`Викторина завершена! Твой счёт: ${score} из ${questions.length}`);

    const playAgain = confirm("Докажи себе, что всё знаешь! Нажмите 'ОК' для повтора или 'Отмена' для завершения.");
    if (playAgain) {
        startGame();
    } else {
        alert("Чао!");
    }
}

