window.onload = function () {
    var inputs = document.querySelectorAll('.contact-form input[required], .contact-form textarea[required]');
    var errorMessage = document.getElementById('error-message');
    var submitButton = document.getElementById('submit-button');
    var form = document.getElementById('contact-form');

    function validateForm() {
        for (var i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                errorMessage.style.display = 'block';
                return false;
            }
        }
        errorMessage.style.display = 'none';
        return true;
    }

    submitButton.addEventListener('click', function (event) {
        if (validateForm()) {
            sendwhatsapp();
            form.submit();
        }
    });

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', validateForm);
    }
}

function sendwhatsapp() {
    var phonenumber = "+5511912552085";

    var name = document.querySelector(".name").value;
    var email = document.querySelector(".email").value;
    var number = document.querySelector(".numero").value;
    var subject = document.querySelector(".assunto").value;
    var message = document.querySelector(".message").value;

    var url = "https://wa.me/" + phonenumber + "?text="
        + "Nome: " + name + "%0a"
        + "E-mail: " + email + "%0a"
        + "Número: " + number + "%0a"
        + "Assunto: " + subject + "%0a"
        + "Mensagem: " + message
        + "%0a%0a"
        + "";

    window.open(url, '_blank').focus();
}