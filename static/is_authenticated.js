document.getElementById('btn-parametres').addEventListener('click', () => {
    fetch('/check_session')
      .then(response => response.json())
      .then(data => {
        if (data.is_authenticated) {
          // Rediriger vers la page de paramètres si l'utilisateur est authentifié
          window.location.href = '/parametre';
        } else {
          // Si l'utilisateur n'est pas authentifié, afficher un message d'erreur ou rediriger vers la page de connexion
          const errorMessage = document.getElementById('error-message'); // Assurez-vous d'avoir un élément avec cet ID dans votre HTML pour afficher les messages d'erreur
          if (errorMessage) {
            errorMessage.textContent = 'Veuillez vous connecter pour accéder aux paramètres.';
          } else {
            // Rediriger vers la page de connexion si aucun élément d'erreur n'est trouvé
            window.location.href = '/login';
          }
        }
      })
      .catch(error => {
        console.error('Erreur lors de la vérification de la session:', error);
        // Vous pouvez également afficher un message d'erreur générique à l'utilisateur ici
      });
  });