// Sélectionner les éléments du formulaire
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberMeInput = document.getElementById('rememberMe');
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('login-btn');
const errorMessage = document.getElementById('errorMessage'); // Ajout de cette ligne

// Fonction pour gérer la soumission du formulaire
loginForm.addEventListener('submit', (event) => { // Changé 'login-btn' en 'submit'
    event.preventDefault(); // Empêcher le rechargement de la page
  
    // Récupérer les valeurs des champs
    const username = usernameInput.value;
    const password = passwordInput.value;
    const rememberMe = rememberMeInput.checked;
    console.log(username,password,rememberMe)
    // Effectuer une requête AJAX vers le serveur Flask pour vérifier les informations d'identification
    fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, rememberMe })
      })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.is_authenticated) {
          // Rediriger vers la page de paramètres si l'utilisateur est authentifié
          window.location.href = '/parametres';
        } else {
          
        }
        if (data.success) {
          // Rediriger vers la page de paramètres si la connexion est réussie
          window.location.href = '/parametre';
        } else if (data.message) {
          // Afficher un message d'erreur
          errorMessage.textContent = data.message;
        }
      })
      .catch(error => {
        console.error('Erreur lors de la connexion :', error);
        errorMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect';
      });
});
