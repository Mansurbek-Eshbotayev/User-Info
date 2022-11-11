let elUserList = document.querySelector(".user__name");
let elUserPost = document.querySelector(".user__post");
let elUserComment = document.querySelector(".user__comment");


function createUser(){
  
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(req => req.json())
  .then(data => {
    if (data.length > 0) {
      elUserList.innerHTML = ""
      let  userFtagment = new DocumentFragment();
      data.forEach(item => {
        let newUserItem = document.createElement("li");
        newUserItem.setAttribute("class" ,"uset__item mb-3")
        let infoUser =
        `
        <div class="uset__info bg-light p-3">
        <button class="btn btn-success mb-2">${item.username}</button>
        <h3 class="h3">${item.name}</h3>
        <p class="text-success fw-bold">${item.company.name}</p>
        <p class="">${item.phone}</p>
        <p class="text-secondary">${item.address.city} ${item.address.street}</p>
        <a href="">
        <a class="link" target="__blank"
        href="https://www.google.com/maps/place/${item.address.geo.lng}">Location</a>
        <span class="user__id fs-3 text-secondary">${item.id}</span>
        <button class="btn pluss__btn btn-primary mb-2 " data-id=${item.id}>more</button>
        </div>
        `
        newUserItem.innerHTML = infoUser;
        userFtagment.appendChild(newUserItem);
        elUserList.appendChild(userFtagment);
      })
    }
    
  })
};

function createPost(arr,element){
  
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${arr}`)
  .then(req => req.json())
  .then(data => {
    if (data.length > 0) {
      element.innerHTML = ""
      let  userPostFtagment = new DocumentFragment();
      data.forEach(item => {
        let newUserItem = document.createElement("li");
        newUserItem.setAttribute("class" ,"uset__post mb-3")
        let infoUser =
        `
        <div class="uset__info bg-light p-3">
        <h4 class="h4">${item.title}</h4>
        <p class="d-block w-100">${item.body}</p>
        <button class="btn post__btn btn-primary mb-2 " data-id=${item.id}>comment</button>
        </div>
        `
        newUserItem.innerHTML = infoUser;
        userPostFtagment.appendChild(newUserItem);
        element.appendChild(userPostFtagment);
      })
    }
    
  })
}

function createComment(arr,element){
  // element.innerHTML = ""
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${arr}`)
  .then(req => req.json())
  .then(data => {
    if (data.length > 0) {
      element.innerHTML = "";
      let  userPostFtagment = new DocumentFragment();
    data.forEach(item => {
      console.log(item.body);
      let newUserItem = document.createElement("li");
      newUserItem.setAttribute("class" ,"uset__comm mb-3")
      let infoUser =
      `
      <div class="uset__info bg-light p-3" data-id=${item.postId}>
      <h5 class="h5">${item.name}</h5>
      <a href="${item.email}">${item.email}</a>
      <p class="">${item.body}</p>
      </div>
      `
      newUserItem.innerHTML = infoUser;
      userPostFtagment.appendChild(newUserItem);
      element.appendChild(userPostFtagment);
    })
    }
    
  })
}

createUser()

elUserList.addEventListener("click",function(evt){
  let btnId = evt.target.dataset.id;
  if (btnId) {
    createPost(btnId,elUserPost)
    // elUserComment.innerHTML=""
  }
});

elUserPost.addEventListener("click",function(evt){
  let btnId = evt.target.dataset.id;
  console.log(btnId);
  if (btnId) {
    createComment(btnId,elUserComment)
  }
})

