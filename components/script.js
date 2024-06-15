let header = document.querySelector("header");

header.innerHTML = `
<div class="header__container">
<div class="left">
  <a href="./index.html"
    ><img src="./images/icons/Logo.svg" alt="logo"
  /></a>
</div>
<div class="center">
  <input name="Search" placeholder="Search" type="text" />
</div>

<div class="right">
  <a href="#"><img src="./images/icons/Vector.svg" alt="home" /></a>
  <a href="#"><img src="./images/icons/like.svg" alt="like" /></a>
  <a href="#"><img src="./images/icons/Avatar.svg" alt="avatar" /> </a>
</div>
</div>
`;
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  if (userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(user => {
        document.querySelector('.nickname').textContent = user.username;
        document.querySelector('.username').textContent = user.name;
        document.getElementById('profile-picture').src = `https://via.placeholder.com/150/92c952`;

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          .then(response => response.json())
          .then(posts => {
            const userPosts = document.getElementById('user-posts');
            posts.forEach(post => {
              const postElement = document.createElement('div');
              postElement.classList.add('post');
              postElement.innerHTML = `
                <div class="post-header">
                  <div>
                    <img class="profile-picture" src="https://via.placeholder.com/150/92c952" alt="Profile Picture" />
                    <span class="username">${user.username}</span>
                  </div>
                  <div class="more-options">
                    <h2>...</h2>
                  </div>
                </div>
                <div class="post-image">
                  <img src="https://via.placeholder.com/600/${post.id}" alt="Post Image" />
                </div>
                <div class="post-content">
                  <p>${post.title}</p>
                  <p class="body">${post.body}</p>
                </div>
                <div class="post-actions">
                  <div class="image">
                    <img class="action-btn" src="./images/icons/heart.png" alt="Like" />
                    <img class="action-btn" src="./images/icons/comment.png" alt="Comment" />
                    <img class="action-btn" src="./images/icons/send.png" alt="Repost" />
                    <img class="action-btn" src="./images/icons/save.png" alt="Save" />
                  </div>
                  <div class="likes">100 likes</div>
                </div>
              `;
              userPosts.appendChild(postElement);
            });
          });
      });
  }
});
