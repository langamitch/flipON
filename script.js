// ... existing code ...
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA-leTOOlg9lIgBgqMYCoVRqV2gkRKDGGQ",
    authDomain: "jobsapp-23a0f.firebaseapp.com",
    projectId: "jobsapp-23a0f",
    storageBucket: "jobsapp-23a0f.firebasestorage.app",
    messagingSenderId: "956724263847",
    appId: "1:956724263847:web:b3548e955bc1597cbc1482"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to create post card
function createPostCard(post, docId) {
    const card = document.createElement('div');
    card.className = 'post-card';
    
    card.innerHTML = `
        <div class="post-header">
            <div class="profile-picture"> <img src="live/images/profile.jpg" alt="profile picture" >
</div>
            <div class="post-meta">
                <h3 class="post-name">${post.name}</h3>
                <span class="post-time">${formatTime(post.timestamp)}</span>
            </div>
        </div>
        
        <p class="post-description">${post.description}</p>

        <div class="reactions">
            <button class="like"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m480-146.93-44.15-39.69q-99.46-90.23-164.5-155.07-65.04-64.85-103.08-115.43-38.04-50.57-53.15-92.27Q100-591.08 100-634q0-85.15 57.42-142.58Q214.85-834 300-834q52.38 0 99 24.5t81 70.27q34.38-45.77 81-70.27 46.62-24.5 99-24.5 85.15 0 142.58 57.42Q860-719.15 860-634q0 42.92-15.12 84.61-15.11 41.7-53.15 92.27-38.04 50.58-102.89 115.43Q624-276.85 524.15-186.62L480-146.93Z"/></svg> <span id="like-count-${docId}">${post.reactions?.like ?? 0}</span></button>
            <button class="dislike"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M440-501Zm0 354.07-86.61-77.84Q271.77-299 215.66-354.62q-56.12-55.61-90.77-101.57-34.66-45.96-49.77-86.43Q60-583.08 60-626q0-85.15 57.42-142.27 57.43-57.11 142.58-57.11 52.38 0 99 24.5t81 70.27q34.38-45.77 81-70.27 46.62-24.5 99-24.5 77.46 0 139.54 54.38 62.07 54.39 62.07 144.61 0 15.93-2.96 33.35t-8.88 35.35h-64.23q6.92-19.93 10.5-37.66 3.58-17.73 3.58-33.27 0-72.69-48.85-104.73-48.85-32.04-90.77-32.04-49.85 0-88.19 27.5-38.35 27.5-72.27 77.89h-39.08q-33.69-50.77-73.38-78.08-39.7-27.31-87.08-27.31-57.77 0-98.88 39.7Q120-686 120-626q0 33.38 14 67.77 14 34.38 50 79.27 36 44.88 98 105.15T440-228q28.31-25.31 60.62-53.77 32.3-28.46 54.46-49.61l6.69 6.69L576.46-310l14.69 14.69 6.69 6.69q-22.76 21.16-54.26 48.93-31.5 27.77-59.43 53.07L440-146.93ZM594.61-410v-60h300v60h-300Z"/></svg>  <span id="dislike-count-${docId}">${post.reactions?.dislike ?? 0}</span></button>
            <button class="save"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M180-100v-530.77q0-29.92 21.19-51.11 21.2-21.2 51.12-21.2h301.15q29.92 0 51.12 21.2 21.19 21.19 21.19 51.11V-100L403.08-213.08 180-100Zm60-92.54 163.08-86.38 162.69 86.38v-438.23q0-5.38-3.46-8.85-3.46-3.46-8.85-3.46H252.31q-5.39 0-8.85 3.46-3.46 3.47-3.46 8.85v438.23Zm480-58.61v-536.54q0-5.39-3.46-8.85t-8.85-3.46H295.77v-60h411.92q29.92 0 51.12 21.19Q780-817.61 780-787.69v536.54h-60ZM240-643.08h325.77H240Z"/></svg><span id="save-count-${docId}">${post.reactions?.save ?? 0}</span></button>
            <button class="share"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M252.31-60Q222-60 201-81q-21-21-21-51.31v-415.38Q180-578 201-599q21-21 51.31-21h102.3v60h-102.3q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v415.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-415.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85h-102.3v-60h102.3Q738-620 759-599q21 21 21 51.31v415.38Q780-102 759-81q-21 21-51.31 21H252.31ZM450-330v-441.23l-74 74L333.85-740 480-886.15 626.15-740 584-697.23l-74-74V-330h-60Z"/></svg><span id="share-count-${docId}">${post.reactions?.share ?? 0}</span></button>
        </div>
    `;
    
    return card;
}

// Function to load posts
async function loadPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '<div class="loading">Loading posts...</div>';

    try {
        const q = query(collection(db, "community"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        
        postsContainer.innerHTML = '';
        
        if (querySnapshot.empty) {
            postsContainer.innerHTML = '<div class="loading">No posts yet. Be the first to post!</div>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postCard = createPostCard(post, doc.id);
            postsContainer.appendChild(postCard);
        });
    } catch (error) {
        console.error("Error loading posts:", error);
        postsContainer.innerHTML = '<div class="loading">Error loading posts. Please try again later.</div>';
    }
}

// Load posts when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});
// ... existing code ...