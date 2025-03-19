class Block {
    constructor(content) {
        this.content = content;
    }

    render() {
        throw new Error("Метод render должен быть реализован в подклассе");
    }
}

//верт. блок
class VerticalBlock extends Block {
    render() {
        return `
        <div class="vertical-block">
            <img src="${this.content.image}" alt="Profile Image">
            <header>
                <h1 class="editable" data-key="name">${this.content.name}</h1>
                <p class="editable" data-key="description">${this.content.description}</p>
            </header>
            <section class="intro">
                <h2>Краткая информация</h2>
                <p class="editable" data-key="introText">${this.content.introText}</p>
                <button onclick="downloadCV()">Пасхалка</button>
            </section>
        </div>
        `;
    }
}

// гориз. блоки
class HorizontalBlock extends Block {
    constructor(title, content, buttonText, onClick) {
        super(content);
        this.title = title;
        this.buttonText = buttonText;
        this.onClick = onClick;
    }

    render() {
        return `
        <section>
            <h2 class="editable" data-key="title">${this.title}</h2>
            <p class="editable" data-key="content">${this.content}</p>
            ${this.buttonText ? `<button onclick="${this.onClick}">${this.buttonText}</button>` : ''}
        </section>
        `;
    }
}

// блок контактов
class ContactBlock extends Block {
    constructor(email, phone, socialMedia) {
        super({ email, phone, socialMedia });
    }

    render() {
        return `
        <section class="contact-block">
            <h2 class="editable" data-key="contactsTitle">Контакты</h2>
            <p><strong class="editable" data-key="emailLabel">Email:</strong> <span class="editable" data-key="email">${this.content.email}</span></p>
            <p><strong class="editable" data-key="phoneLabel">Телефон:</strong> <span class="editable" data-key="phone">${this.content.phone}</span></p>
            <p><strong class="editable" data-key="socialMediaLabel">Социальные сети:</strong> <span class="editable" data-key="socialMedia">${this.content.socialMedia}</span></p>
        </section>
        `;
    }
}

// сборка
function buildPage() {
    const profileCard = document.getElementById("profile-card");

    const verticalBlock = new VerticalBlock({
        image: "img/ura.webp", 
        name: "Юра Борисов",
        description: "российский актёр",
        introText: "Юрий Александрович Борисов — российский актёр театра, кино и телевидения. Родился 8 декабря 1992 года в городе Реутове Московской области."
    });

    const horizontalBlocks = [
        new HorizontalBlock(
            "Образование",
            "Занимался в школьной театральной студии. В 16 лет поступил в Высшее театральное училище имени М. С. Щепкина (курс Владимира Бейлиса и Виталия Иванова), которое окончил в 2013 году. На 4-м курсе стал лауреатом премии «Золотой лист» в категории «Лучшая мужская роль» за роль Александра Тарасовича Аметистова в спектакле «Зойкина квартира».",
        ),
        new HorizontalBlock(
            "Награды",
            "2013 — театральная премия «Золотой лист» за лучшую мужскую роль среди выпускников Щепкинского училища (спектакль «Зойкина квартира»). 2021 — премия «Золотой орел» в номинации «Лучшая мужская роль в кино» (фильм «Калашников»). 2022 — премия «Белый слон» в номинации «Лучшая главная мужская роль» (фильм «Капитан Волконогов бежал»).2024 — премия Ассоциации кинокритиков Лос-Анджелеса в номинации «Лучшая мужская роль второго плана» (фильм «Анора»)."
        ),
        new HorizontalBlock(
            "Личная жизнь",
            "C 2014 года Борисов женат на актрисе Анне Шевчук. Будущую жену он встретил в 16 лет, когда они одновременно поступили в Щепкинское училище, потом учились на одном курсе. Борисов долго ухаживал за Анной, встречаться же они начали только к финалу четвертого курса. В 2015 году у пары родилась старшая дочь, Марфа, а в 2017-м — младшая, Акулина."
        )
    ];

    const contactBlock = new ContactBlock(
        "ura@yandex.ru",
        "+номер",
        "VK: @urabor "
    );

    profileCard.innerHTML = verticalBlock.render();
    const horizontalContainer = document.createElement("div");
    horizontalContainer.className = "horizontal-blocks";
    horizontalBlocks.forEach(block => {
        horizontalContainer.innerHTML += block.render();
    });
    profileCard.appendChild(horizontalContainer);
    profileCard.innerHTML += contactBlock.render();
}


function downloadCV() {
    alert("Оскар так и не взял"); 
}

// редактирование
let isEditMode = false;

function toggleEditMode() {
    const profileCard = document.getElementById("profile-card");
    const toggleButton = document.getElementById("toggle-edit-mode");

    isEditMode = !isEditMode;

    if (isEditMode) {
        profileCard.classList.add("edit-mode");
        toggleButton.textContent = "Режим просмотра";

        document.querySelectorAll(".editable").forEach(element => {
            element.contentEditable = true;
        });
    } else {
        profileCard.classList.remove("edit-mode");
        toggleButton.textContent = "Режим редактирования";

        document.querySelectorAll(".editable").forEach(element => {
            element.contentEditable = false;
        });
    }
}


document.addEventListener("DOMContentLoaded", () => {
    buildPage();
    document.getElementById("toggle-edit-mode").addEventListener("click", toggleEditMode);
});