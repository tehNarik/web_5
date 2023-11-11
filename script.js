var navBlock = document.getElementById('nav');
var rightBlock = document.getElementById('right_down');
navBlock.outerHTML = '<div id="right_down"><p>Тут може бути ваша реклама</p></div>';
rightBlock.outerHTML = '<nav id="nav"><p>\tМеню    Відгуки    Контакти </p>  </nav>';




function getSquare(){
    var block = document.getElementById('main');
    return (block.offsetHeight*block.offsetWidth);
}
//alert("Площа паралелограма: " + getSquare() + " пікселів");





// Function to find the maximum digit in a given number
function findMaxDigit() {
    // Get the input value from the form
    var numberInput = document.getElementById("numberInput").value;

    // Validate if the input is a natural number
    if (/^[1-9]\d*$/.test(numberInput)) {
        // Convert the input to an array of digits
        var digits = numberInput.split('').map(Number);

        // Find the maximum digit
        var maxDigit = Math.max.apply(null, digits);

        // Display the result using a dialog box
        alert("Максимальна цифра: " + maxDigit);

        // Save the result in cookies
        document.cookie = "maxDigit=" + maxDigit;
    } else {
        alert("Будь ласка, введіть натуральне число.");
    }
}

// Function to display the information stored in cookies on page reload
function displayStoredInfo() {
    // Check if the "maxDigit" cookie is set
    var maxDigitCookie = getCookie("maxDigit");

    if (maxDigitCookie) {
        // Display the stored information using a dialog box
        var userChoice = confirm("Максимальна цифра, збережена в cookies: " + maxDigitCookie +
                                 "\nНатисніть 'ОК', щоб видалити ці дані, або 'Скасувати', щоб залишити.");

        if (userChoice) {
            // Delete the "maxDigit" cookie
            document.cookie = "maxDigit=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }
}




// Function to get the value of a specific cookie
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();

        // Check if the cookie starts with the specified name
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}

// Call the function to display stored information on page reload
displayStoredInfo();








  document.addEventListener("DOMContentLoaded", function () {
    var radioButtons = document.getElementsByName("alignment");
    var storedAlignmentValue = localStorage.getItem('alignmentValue');
    var mouseEvent = 'ontouchstart' in window ? 'touchstart' : 'mouseout';
    // Завантаження значення з localStorage, якщо воно є
    if (storedAlignmentValue) {
        alignmentValue = storedAlignmentValue;
        // Встановлення відповідної радіо-кнопки при завантаженні сторінки
        radioButtons.forEach(function (radio) {
            if (radio.value === storedAlignmentValue) {
                radio.checked = true;
            }
        });
        alignRight(); // Виклик функції для встановлення відповідного вирівнювання
    }

    radioButtons.forEach(function (radio) {
        radio.addEventListener("change", function () {
            if (radio.checked) {
                alignmentValue = radio.value;
                localStorage.setItem('alignmentValue', alignmentValue);
                alignRight();
            }
        });
    });

    // Додаємо обробники подій onmouseout для кожного блоку
    document.getElementById('left_aside').addEventListener(mouseEvent, alignRight);
    document.getElementById('main').addEventListener(mouseEvent, alignRight);
    document.getElementById('right_aside').addEventListener(mouseEvent, alignRight);

});

function alignRight() {
    var container1 = document.getElementById('left_aside');
    var container2 = document.getElementById('main');
    var container3 = document.getElementById('right_aside');

    if (alignmentValue === 'left') {
        container1.style.textAlign = 'right';
        container2.style.textAlign = 'center';
        container3.style.textAlign = 'center';
    } else if (alignmentValue === 'center') {
        container1.style.textAlign = 'center';
        container2.style.textAlign = 'right';
        container3.style.textAlign = 'center';
    } else if (alignmentValue === 'right') {
        container1.style.textAlign = 'center';
        container2.style.textAlign = 'center';
        container3.style.textAlign = 'right';
    }
}



var maxItems = 13;
var itemCount = document.getElementById('dynamicList').childElementCount;

var savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

function addItemToList() {
    var selectedValue = document.getElementById('dynamicSelect').value;

    if (itemCount < maxItems) {
        var newItem = document.createElement('li');
        newItem.textContent = selectedValue;
        document.getElementById('dynamicList').appendChild(newItem);

        savedItems.push(selectedValue);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));

        itemCount++;
    } else {
        alert('Досягнуто максимальну кількість елементів (13). Оновіть сторінку.');
    }
}

window.addEventListener('beforeunload', function() {
    localStorage.removeItem('savedItems');
});