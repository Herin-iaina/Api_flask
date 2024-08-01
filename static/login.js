document.addEventListener("DOMContentLoaded", function() {
    // Use let or const for better scoping
    const modalContainer = document.getElementById("modalContainer");
    const btn = document.getElementById("loginBtn");
  
    // Function to load the modal
    function loadModal() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '../templates/login.html', true);
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            modalContainer.innerHTML = xhr.responseText;
  
            // ... rest of the code for handling modal functionality
            // Show the pop-up (toggle visibility)
          loginPopup.classList.remove("hidden");
          } else {
            console.error("Failed to load login.html", xhr.statusText);
            // Optionally display an error message to the user
          }
        }
      };
  
      xhr.onerror = function() {
        console.error("Failed to load login.html");
        // Optionally display an error message to the user
      };
  
      xhr.send();
    }
  
    // Ouverture du modal lors du clic sur le bouton
    // ... votre code existant ...

btn.onclick = function() {
    Swal.fire({
        title: 'Connexion',
        html: `
            <input type="text" id="email" class="swal2-input" placeholder="Email">
            <input type="password" id="password" class="swal2-input" placeholder="Mot de passe">
        `,
        showCancelButton: true,
        confirmButtonText: 'Se connecter',
        preConfirm: () => {
            // Traitement des données du formulaire
        }
    });
};

  
  });
  
 
