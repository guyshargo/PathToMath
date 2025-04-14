document.addEventListener('DOMContentLoaded', () => {
    const captchaTypeSelect = document.getElementById('captcha-type');
    const imageCaptchaContainer = document.getElementById('image-captcha-container');

    // Image CAPTCHA elements
    const imageChallengeText = document.getElementById('image-challenge-text');
    const imageOptionsContainer = document.getElementById('image-options');
    const imageError = document.getElementById('image-error');
    const refreshImageButton = document.getElementById('refresh-image-captcha');

    const registrationFormCaptcha = document.getElementById('registration-form-captcha');
    const captchaAttemptsError = document.getElementById('captcha-attempts-error');

    let currentCaptchaType = 'image';
    let arithmeticNum1, arithmeticNum2, arithmeticExpectedAnswer;
    let imageChallengeData;
    let incorrectAttempts = 0;
    const maxIncorrectAttempts = 3;

    const imageCaptchaDataOptions = [
        {
            question: "Select all images containing cats",
            images: [
                { url: "https://placecats.com/80/80?id=1", isCat: true },
                { url: "https://dummyimage.com/80x80/cccccc/000000&text=Dog", isCat: false },
                { url: "https://placecats.com/80/80?id=2", isCat: true },
                { url: "https://dummyimage.com/80x80/cccccc/000000&text=Bird", isCat: false },
                { url: "https://placecats.com/80/80?id=3", isCat: true },
                { url: "https://dummyimage.com/80x80/cccccc/000000&text=Fish", isCat: false },
            ],
            correctIndices: [0, 2, 4], // Indices of the cat images
        },
        {
            question: "Select all images containing trees",
            images: [
                { url: "https://dummyimage.com/80x80/808080/FFFFFF&text=Tree", isTree: true },
                { url: "https://dummyimage.com/80x80/cccccc/000000&text=House", isTree: false },
                { url: "https://dummyimage.com/80x80/808080/FFFFFF&text=Tree", isTree: true },
                { url: "https://dummyimage.com/80x80/cccccc/000000&text=Car", isTree: false },
                { url: "https://dummyimage.com/80x80/808080/FFFFFF&text=Tree", isTree: true },
                { url: "https://dummyimage.com/80x80/cccccc/000000&text=Water", isTree: false },
            ],
            correctIndices: [0, 2, 4],
        },
    ];

    function generateImageCaptcha() {
        const randomIndex = Math.floor(Math.random() * imageCaptchaDataOptions.length);
        imageChallengeData = imageCaptchaDataOptions[randomIndex];
        imageChallengeText.textContent = imageChallengeData.question;
        imageOptionsContainer.innerHTML = ''; // Clear previous options

        imageChallengeData.images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = `Captcha Image ${index + 1}`;
            img.classList.add('captcha-image-option');
            img.dataset.index = index;
            img.addEventListener('click', toggleImageSelection);
            imageOptionsContainer.appendChild(img);
        });
        imageError.classList.add('hidden');
    }

    function toggleImageSelection(event) {
        event.target.classList.toggle('selected');
    }

    function checkImageCaptcha() {
        const selectedIndices = Array.from(imageOptionsContainer.querySelectorAll('.captcha-image-option.selected'))
            .map(img => parseInt(img.dataset.index));
        selectedIndices.sort((a, b) => a - b);
        // the sort function sorts the array in ascending order
        // the sort algorithm is O(n log n) in the average case and O(n^2) in the worst case
        // the sort function is stable, meaning that it preserves the relative order of 
        // equal elements
        // the sort function is not guaranteed to be stable in all implementations
        // the sort function is not guaranteed to be in-place, meaning that 
        // it may use additional memory
        const correctIndicesSorted = [...imageChallengeData.correctIndices].sort((a, b) => a - b);
        return JSON.stringify(selectedIndices) === JSON.stringify(correctIndicesSorted);
    }

    function refreshCaptcha() {
        if (currentCaptchaType === 'arithmetic') {
            generateArithmeticCaptcha();
        } else if (currentCaptchaType === 'image') {
            imageOptionsContainer.querySelectorAll('.captcha-image-option.selected').forEach(img => {
                img.classList.remove('selected');
            });
            generateImageCaptcha();
        }
    }

    refreshArithmeticCaptchaButton.addEventListener('click', refreshCaptcha);
    refreshImageButton.addEventListener('click', refreshCaptcha); // Add listener for the image refresh button

    captchaTypeSelect.addEventListener('change', () => {
        currentCaptchaType = captchaTypeSelect.value;
        if (currentCaptchaType === 'arithmetic') {
            arithmeticCaptchaContainer.classList.remove('hidden');
            imageCaptchaContainer.classList.add('hidden');
        } else if (currentCaptchaType === 'image') {
            arithmeticCaptchaContainer.classList.add('hidden');
            imageCaptchaContainer.classList.remove('hidden');
        }
        refreshCaptcha(); // Refresh when the type changes
        arithmeticError.classList.add('hidden');
        imageError.classList.add('hidden');
        captchaAttemptsError.classList.add('hidden');
        incorrectAttempts = 0;
    });

    generateArithmeticCaptcha(); // Generate initial arithmetic captcha
    generateImageCaptcha(); // Generate initial image captcha

    // the preventDefault() method cancels the event if it is cancelable,
    // meaning that the default action that belongs to the event will not occur.
    // For example, this can be useful when you want to prevent a form from being submitted,
    // or to prevent a link from being followed.
    // The preventDefault() method can be called on any event object,
    // and it is commonly used in event handlers to control the behavior of the event.
    // The preventDefault() method does not stop the event from propagating (bubbling) 
    // up or down the DOM tree.
    // To stop the event from propagating, you can use the stopPropagation() method.
    registrationFormCaptcha.addEventListener('submit', function(event) {
        event.preventDefault();

        if (incorrectAttempts >= maxIncorrectAttempts) {
            captchaAttemptsError.classList.remove('hidden');
            return;
        }

        let captchaCorrect = false;
        if (currentCaptchaType === 'arithmetic') {
            const userAnswer = parseInt(arithmeticAnswerInput.value);
            if (!isNaN(userAnswer) && userAnswer === arithmeticExpectedAnswer) {
                captchaCorrect = true;
            } else {
                arithmeticError.classList.remove('hidden');
            }
        } else if (currentCaptchaType === 'image') {
            if (checkImageCaptcha()) {
                captchaCorrect = true;
            } else {
                imageError.classList.remove('hidden');
            }
        }

        if (captchaCorrect) {
            alert('Registration successful (CAPTCHA passed)! - In a real application, data would be sent to the server.');
            incorrectAttempts = 0;
            refreshCaptcha();
        } else {
            incorrectAttempts++;
            if (incorrectAttempts >= maxIncorrectAttempts) {
                captchaAttemptsError.classList.remove('hidden');
                if (currentCaptchaType === 'arithmetic') arithmeticError.classList.add('hidden');
                if (currentCaptchaType === 'image') imageError.classList.add('hidden');
            } else {
                refreshCaptcha();
            }
        }
   });
});