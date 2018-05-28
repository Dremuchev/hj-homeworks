'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.reduce((emptyElement, element) => {
    emptyElement.appendChild(createComment(element));
    return emptyElement;
  }, document.createDocumentFragment());
  commentsContainer.appendChild(comments);
}

function createComment(comment) {
  const commentWrap = document.createElement('div');
  const photo = document.createElement('div');
  const avatar = document.createElement('div');
  const commentBlock = document.createElement('div');
  const commentText = document.createElement('p');
  const bottomComment = document.createElement('div');
  const commentDate = document.createElement('div');
  const commentActions = document.createElement('ul');
  const complain = document.createElement('li');
  const reply = document.createElement('li');
  commentWrap.className = 'comment-wrap';
  photo.className = 'photo';
  photo.setAttribute('title', `${comment.author.name}`);
  avatar.className = 'avatar';
  avatar.setAttribute('style', `background-image: url(${comment.author.pic})`);
  commentBlock.className = 'comment-block';
  commentText.className = 'comment-text';
  const textArray = comment.text.split('\n');
  const textNode = textArray.reduce((emptyElement, element) => {
    emptyElement.appendChild(document.createTextNode(element));
    emptyElement.appendChild(document.createElement('br'));
    return emptyElement;
  }, document.createDocumentFragment())
  commentText.appendChild(textNode);
  bottomComment.className = 'bottom-comment';
  commentDate.className = 'comment-date';
  commentDate.innerText = new Date(comment.date).toLocaleString('ru-Ru');
  commentActions.className = 'comment-actions';
  complain.className = 'complain';
  complain.innerText = 'Пожаловаться';
  reply.className = 'reply';
  reply.innerText = 'Ответить';
  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);
  photo.appendChild(avatar);
  commentBlock.appendChild(commentText);
  commentBlock.appendChild(bottomComment);
  bottomComment.appendChild(commentDate);
  bottomComment.appendChild(commentActions);
  commentActions.appendChild(complain);
  commentActions.appendChild(reply);
  return commentWrap;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);