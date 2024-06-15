document.addEventListener('DOMContentLoaded', () => {
	const swiperContainer = document.querySelector('.swiper-wrapper');
	const postsSection = document.querySelector('.posts-section');
  
	fetch('https://jsonplaceholder.typicode.com/users')
	  .then(response => response.json())
	  .then(users => {
		users.forEach(user => {
		  const slide = document.createElement('div');
		  slide.classList.add('swiper-slide');
		  slide.innerHTML = `
			<div class="story" data-user-id="${user.id}">
			  <div class="border">
				<div class="avatar" style="background-image: url('https://via.placeholder.com/150/${user.id}')"></div>
			  </div>
			  <div class="username">${user.username}</div>
			</div>
		  `;
		  swiperContainer.appendChild(slide);
  
		  slide.querySelector('.story').addEventListener('click', () => {
			const modal = document.getElementById('story-modal');
			const modalImg = document.getElementById('story-image');
			modal.style.display = 'block';
			modalImg.src = `https://via.placeholder.com/600/${user.id}`;
  
			setTimeout(() => {
			  modal.style.display = 'none';
			}, 15000);
		  });
		});
  
		new Swiper('.swiper-container', {
		  slidesPerView: 7,
		  navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		  },
		});
	  });
  
	fetch('https://jsonplaceholder.typicode.com/posts')
	  .then(response => response.json())
	  .then(posts => {
		posts.forEach(post => {
		  fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
			.then(response => response.json())
			.then(user => {
			  const postElement = document.createElement('div');
			  postElement.classList.add('post');
			  postElement.innerHTML = `
				<div class="post-header">
				  <div>
					<img class="profile-picture" src="https://via.placeholder.com/150/${user.id}" alt="Profile Picture" />
					<span class="username" data-user-id="${user.id}">${user.username}</span>
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
			  postsSection.appendChild(postElement);
  
			  postElement.querySelector('.username').addEventListener('click', () => {
				window.location.href = `profile.html?userId=${user.id}`;
			  });
			});
		});
	  });
  
	const modal = document.getElementById('story-modal');
	const span = document.getElementsByClassName('close')[0];
  
	span.onclick = function() {
	  modal.style.display = 'none';
	}
  
	window.onclick = function(event) {
	  if (event.target == modal) {
		modal.style.display = 'none';
	  }
	}
  });
  