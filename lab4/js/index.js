// смена темы
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// сохр. тема
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// отзывы
let reviews = JSON.parse(localStorage.getItem('reviews')) || [
    {
        name: "Иван",
        text: "С этой подушкой я чувствую себя настоящим монархом. Рекомендую всем!",
        rating: 5,
        date: "2025-03-12T18:00:00Z"
    },
    {
        name: "Мария",
        text: "Подушка настолько удобная, что я начал медитировать прямо на унитазе. Это мой новый способ расслабиться после работы!",
        rating: 4,
        date: "2025-03-12T19:30:00Z"
    }
];

const reviewsContainer = document.getElementById('reviews-container');
const reviewForm = document.getElementById('review-form');

function renderReviews() {
    reviewsContainer.innerHTML = '';
    reviews.forEach((review, index) => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <h3>${review.name}</h3>
            <p>${review.text}</p>
            <p>Оценка: ${review.rating}</p>
            ${review.image ? `<img src="${review.image}" alt="Отзыв ${index}" style="width: 100px;">` : ''}
            <small>${new Date(review.date).toLocaleString()}</small>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;
    const rating = document.getElementById('review-rating').value;
    const imageFile = document.getElementById('review-image').files[0];

    if (!name || !text || !rating) {
        alert('Заполните все поля!');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const review = {
            name,
            text,
            rating,
            image: e.target.result,
            date: new Date().toISOString()
        };
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        renderReviews();
        reviewForm.reset();
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        const review = {
            name,
            text,
            rating,
            date: new Date().toISOString()
        };
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        renderReviews();
        reviewForm.reset();
    }
});

// сортировка 
function sortReviews(criteria) {
    if (criteria === 'date') {
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (criteria === 'rating') {
        reviews.sort((a, b) => b.rating - a.rating);
    }
    renderReviews();
}

// фильтрация
document.getElementById('filter-text').addEventListener('input', (e) => {
    const filteredReviews = reviews.filter(review => review.text.includes(e.target.value));
    reviewsContainer.innerHTML = '';
    filteredReviews.forEach((review, index) => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <h3>${review.name}</h3>
            <p>${review.text}</p>
            <p>Оценка: ${review.rating}</p>
            ${review.image ? `<img src="${review.image}" alt="Отзыв ${index}" style="width: 100px;">` : ''}
            <small>${new Date(review.date).toLocaleString()}</small>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
});


renderReviews();