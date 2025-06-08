import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const form = document.querySelector('#newsletterForm');
const messageBox = document.querySelector('#newsletterMessage');

function showMessage(text, type = 'success') {
  messageBox.textContent = text;
  messageBox.className = type === 'success' ? 'success' : 'error';

  setTimeout(() => {
    messageBox.textContent = '';
    messageBox.className = '';
  }, 4000);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const button = form.querySelector('button');

  if (!name || !email) {
    showMessage('Please fill in all fields', 'error');
    return;
  }

  button.disabled = true;
  button.textContent = 'Subscribing...';

  try {
    await addDoc(collection(db, "newsletter"), {
      name,
      email,
      timestamp: Date.now(),
      status: 'new'
    });

    showMessage('Successfully subscribed!', 'success');
    form.reset();
  } catch (err) {
    console.error(err);
    showMessage('Subscription failed: ' + err.message, 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Subscribe';
  }
});
