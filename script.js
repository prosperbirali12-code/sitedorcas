document.addEventListener('DOMContentLoaded', function() {
    const progressFill = document.getElementById('progressFill');
    const progressHeart = document.getElementById('progressHeart');
    const targetHeart = document.getElementById('targetHeart');
    const explosionContainer = document.getElementById('explosion-container');
    
    let progress = 10; // Pourcentage de départ
    let isFinished = false;

    // Simulation de la progression de la barre
    const interval = setInterval(() => {
        if (isFinished) return;

        progress += 0.5; // Vitesse de remplissage
        if (progress >= 100) {
            progress = 100;
            isFinished = true;
            clearInterval(interval);
            triggerSuccessAction();
        }

        // Met à jour la largeur de la barre et la position du cœur
        progressFill.style.width = progress + '%';
        progressHeart.style.left = progress + '%';
    }, 50);

    // Fonction déclenchée à l'arrivée à 100%
    function triggerSuccessAction() {
        // 1. Fait briller le cœur cible
        targetHeart.classList.add('shimmer');

        // 2. Déclenche l'explosion de petits cœurs
        createExplosion();

        // 3. Ouvre la nouvelle page après l'animation (ex: 1 seconde plus tard)
        setTimeout(() => {
            // REMPLACEZ 'https://www.google.com' par le lien de votre page cible
            window.location.href = 'final.html'; 
        }, 1000);
    }

    // Fonction qui génère l'effet d'explosion de cœurs autour du cœur cible
    function createExplosion() {
        const rect = targetHeart.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Nombre de mini-cœurs dans l'explosion
        const totalHearts = 25;

        for (let i = 0; i < totalHearts; i++) {
            const miniHeart = document.createElement('div');
            miniHeart.classList.add('mini-heart');
            
            miniHeart.style.left = centerX + 'px';
            miniHeart.style.top = centerY + 'px';
    

            // Direction aléatoire pour chaque petit cœur
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 120 + 40; // Amplitude de l'explosion
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            miniHeart.style.setProperty('--dx', `${dx}px`);
            miniHeart.style.setProperty('--dy', `${dy}px`);

            explosionContainer.appendChild(miniHeart);

            // Nettoyage après l'animation
            setTimeout(() => {
                miniHeart.remove();
            }, 800);
        }
    }
});



/* mot de passe et configuration*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- CONFIGURATION DU MOT DE PASSE ---
    const correctCode = "7384"; // Remplacez "1234" par le code secret de votre choix
    
    let enteredCode = "";
    
    const dots = document.querySelectorAll('.pin-display .dot');
    const keys = document.querySelectorAll('.keypad .key');
    const errorMsg = document.getElementById('error-msg');

    // Écouter les clics sur toutes les touches du pavé
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const digit = key.getAttribute('data-key');
            const action = key.getAttribute('data-action');

            // Si c'est un chiffre (0-9)
            if (digit !== null) {
                if (enteredCode.length < 4) {
                    enteredCode += digit;
                    updateDisplay();
                    
                    // Quand 4 chiffres sont saisis, on vérifie le code
                    if (enteredCode.length === 4) {
                        checkPinCode();
                    }
                }
            }

            // Bouton effacer tout (⌫)
            if (action === 'clear') {
                enteredCode = "";
                updateDisplay();
                errorMsg.textContent = "";
            }

            // Bouton retour arrière (↩️)
            if (action === 'back') {
                enteredCode = enteredCode.slice(0, -1);
                updateDisplay();
                errorMsg.textContent = "";
            }
        });
    });

    // Met à jour l'affichage visuel des points (dots)
    function updateDisplay() {
        dots.forEach((dot, index) => {
            if (index < enteredCode.length) {
                dot.classList.add('active'); // Assurez-vous d'avoir un style .dot.active dans votre CSS pour les colorer
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Vérification du code secret
    function checkPinCode() {
        if (enteredCode === correctCode) {
            errorMsg.style.color = "#4bb543";
            errorMsg.textContent = "Code correct ! Redirection...";
            
            // Redirection vers votre page après une courte pause
            setTimeout(() => {
                window.location.href = 'message.html';
            }, 500);
        } else {
            // Mauvais code
            errorMsg.style.color = "#5e0af9ff";
            errorMsg.textContent = "Code incorrect, réessaie.";
            
            // Réinitialisation après une petite secousse ou un délai
            setTimeout(() => {
                enteredCode = "";
                updateDisplay();
            }, 800);
        }
    }
});

// pour faire clignoter le petit coeur//

document.addEventListener('DOMContentLoaded', () => {
    const floatingContainer = document.getElementById('floating-hearts-container');
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '♥';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 12 + 10) + 'px';
        
        const duration = Math.random() * 8 + 8;
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = (Math.random() * duration) + 's';
        
        floatingContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Générer les cœurs flottants au chargement et en continu
    for (let i = 0; i < 40; i++) {
        createFloatingHeart();
    }
    setInterval(createFloatingHeart, 400);
});





// --- Liste de vos petits mots aléatoires ---
const loadingMessages = [
    "Préparation...",
    "Un peu de patience, la plus belle surprise arrive",
    "Chargement des plus beaux sourires...",
    "Vérification du code secret...",
    "Presque prêt Dorcas...",
    "Encore un tout petit instant..."
];

function startLoadingBar() {
    let currentProgress = 0;
    const durationMs = 3500; // Durée du chargement (0.5secondes)
    const intervalTime = 30;
    const increment = (intervalTime / durationMs) * 100;
    let finished = false;

    const textElement = document.getElementById('loading-text');
    let messageIndex = 0;

    // Changer le texte toutes les 800 millisecondes pendant le chargement
    const textInterval = setInterval(() => {
        if (finished) {
            clearInterval(textInterval);
            return;
        }
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        if (textElement) {
            textElement.textContent = loadingMessages[messageIndex];
        }
    }, 800);

    // Progression de la barre
    const loadInterval = setInterval(() => {
        if (finished) return;
        currentProgress += increment;

        if (currentProgress >= 100) {
            currentProgress = 100;
            finished = true;
            clearInterval(loadInterval);
            clearInterval(textInterval); // Arrête le changement de texte
            
            if (textElement) {
                textElement.textContent = "C'est prêt ! ✨";
            }

            barFill.style.width = '100%';
            progressHeart.style.left = '100%';
            
            triggerExplosionAndRedirect();
        } else {
            barFill.style.width = currentProgress + '%';
            progressHeart.style.left = currentProgress + '%';
        }
    }, intervalTime);
}

