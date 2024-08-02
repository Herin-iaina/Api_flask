// document.addEventListener("DOMContentLoaded", function() {
//     // Use let or const for better scoping
//     const modalContainer = document.getElementById("modalContainer");
//     const btn = document.getElementById("loginBtn");
  
//     // Function to load the modal
//     function loadModal() {
//       const xhr = new XMLHttpRequest();
//       xhr.open('GET', '../templates/login.html', true);
  
//       xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4) {
//           if (xhr.status === 200) {
//             modalContainer.innerHTML = xhr.responseText;
  
//             // ... rest of the code for handling modal functionality
//             // Show the pop-up (toggle visibility)
//           loginPopup.classList.remove("hidden");
//           } else {
//             console.error("Failed to load login.html", xhr.statusText);
//             // Optionally display an error message to the user
//           }
//         }
//       };
  
//       xhr.onerror = function() {
//         console.error("Failed to load login.html");
//         // Optionally display an error message to the user
//       };
  
//       xhr.send();
//     }
  
//     // Ouverture du modal lors du clic sur le bouton
//     // ... votre code existant ...

// btn.onclick = function() {
//     Swal.fire({
//         title: 'Connexion',
//         html: `
//             <input type="text" id="email" class="swal2-input" placeholder="Email">
//             <input type="password" id="password" class="swal2-input" placeholder="Mot de passe">
//         `,
//         showCancelButton: true,
//         confirmButtonText: 'Se connecter',
//         preConfirm: () => {
//             // Traitement des données du formulaire
//         }
//     });
// };

  
//   });


// const loginBtn = document.getElementById('login-btn');
// const modal = document.getElementById('modal');
// const close = document.getElementsByClassName("close")[0];
// const loginForm = document.getElementById('login-form');

// loginBtn.addEventListener('click', () => {
//     modal.style.display = "block";

//     // Créer les champs dynamiquement
//     const usernameInput = document.createElement('input');
//     usernameInput.type = 'text';
//     usernameInput.placeholder = 'Nom d\'utilisateur';

//     const passwordInput = document.createElement('input');
//     passwordInput.type = 'password';
//     passwordInput.placeholder = 'Mot de passe';

//     const submitBtn = document.createElement('button');
//     submitBtn.type = 'submit';
//     submitBtn.textContent = 'Se connecter';

//     loginForm.appendChild(usernameInput);
//     loginForm.appendChild(passwordInput);
//     loginForm.appendChild(submitBtn);
// });

// close.onclick = () => {
//     modal.style.display = "none";
//     // Supprimer les champs après la fermeture
//     loginForm.innerHTML = '';
// };

// window.onclick = (event) => {
//     if (event.target == modal) {
//         modal.style.display = "none";
//         loginForm.innerHTML = '';
//     }
// };

  
 
