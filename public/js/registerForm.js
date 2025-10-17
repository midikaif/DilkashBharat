// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import {
//   getAuth,
//   signInAnonymously,
//   signInWithCustomToken,
//   createUserWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// // --- MANDATORY FIREBASE SETUP ---
// const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
// const firebaseConfig =
//   typeof __firebase_config !== "undefined" ? JSON.parse(__firebase_config) : {};
// const initialAuthToken =
//   typeof __initial_auth_token !== "undefined" ? __initial_auth_token : null;

// let auth = null;

// async function initializeFirebase() {
//   try {
//     if (Object.keys(firebaseConfig).length === 0) {
//       console.error("Firebase configuration is missing or empty.");
//       auth = { currentUser: { uid: "anonymous" } };
//       return;
//     }

//     const app = initializeApp(firebaseConfig);
//     auth = getAuth(app);

//     if (initialAuthToken) {
//       await signInWithCustomToken(auth, initialAuthToken);
//     } else {
//       await signInAnonymously(auth);
//     }
//     console.log("Firebase initialized and user authenticated.");
//   } catch (error) {
//     console.error(
//       "Error during Firebase initialization or authentication:",
//       error
//     );
//     auth = auth || { currentUser: { uid: crypto.randomUUID() } };
//   }
// }

// --- FORM LOGIC AND VALIDATION ---

const registerForm = document.getElementById("registerForm");
const messageBox = document.getElementById("messageBox");
const registerButton = document.getElementById("registerButton");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

function showMessage(text, isError = false) {
  messageBox.textContent = text;
  messageBox.classList.remove(
    "hidden",
    "bg-red-100",
    "text-red-800",
    "bg-green-100",
    "text-green-800"
  );
  if (isError) {
    messageBox.classList.add("bg-red-100", "text-red-800");
  } else {
    messageBox.classList.add("bg-green-100", "text-green-800");
  }
}

/**
 * Applies CSS classes based on validation result (border only).
 */
function applyValidationStyles(inputElement, isValid) {
  inputElement.classList.remove("input-error", "input-success");
  if (isValid) {
    inputElement.classList.add("input-success");
  } else if (inputElement.value.trim().length > 0) {
    // Only show error border if the user has typed something
    inputElement.classList.add("input-error");
  }
}

/**
 * Runs validation checks for a specific input field.
 * @returns {boolean} True if the field is valid.
 */
function validateField(inputElement) {
  const value = inputElement.value.trim();
  let isValid = false;

  if (inputElement.id === "username") {
    isValid = value.length >= 3;
  } else if (inputElement.id === "email") {
    // Basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  } else if (inputElement.id === "password") {
    // Password must be at least 6 characters (as required by Firebase)
    isValid = value.length >= 6;
  }

  // Apply visual feedback instantly (border only)
  applyValidationStyles(inputElement, isValid);
  return isValid;
}

async function handleRegistration(e) {
  e.preventDefault();

  // Run all validations on submission
  const isUsernameValid = validateField(usernameInput);
  const isEmailValid = validateField(emailInput);
  const isPasswordValid = validateField(passwordInput);

  if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
    showMessage(
      "Please correct the highlighted fields before proceeding.",
      true
    );
    return; // Stop registration if validation fails
  }

  showMessage("Registering user...", false);
  registerButton.disabled = true;

  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value;

  if (!auth) {
    showMessage(
      "Error: Firebase Auth is not initialized. Cannot register.",
      true
    );
    registerButton.disabled = false;
    return;
  }

  try {
    // Firebase function for email/password registration
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Registration successful for user:", userCredential.user.uid);
    showMessage(`Registration successful for user: ${username}!`, false);
  } catch (error) {
    let errorMessage = "Registration failed. Please try again.";

    if (error.code === "auth/email-already-in-use") {
      errorMessage = "The email address is already in use by another account.";
      emailInput.classList.add("input-error");
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "The email address is not valid.";
      emailInput.classList.add("input-error");
    } else if (error.code === "auth/weak-password") {
      errorMessage = "The password is too weak. Choose a stronger one.";
      passwordInput.classList.add("input-error");
    } else {
      console.error("Firebase Auth Error:", error);
    }

    showMessage(errorMessage, true);
  } finally {
    registerButton.disabled = false;
  }
}

// Initial setup and event listeners
window.onload = async () => {
  // await initializeFirebase();
//   registerForm.addEventListener("submit", handleRegistration);

  // Add dynamic validation listener for instant feedback as the user types
//   [usernameInput, emailInput, passwordInput].forEach((input) => {
//     input.addEventListener("input", () => validateField(input));
//   });
};
