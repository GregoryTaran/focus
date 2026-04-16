(function () {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  if (!chatForm || !chatInput || !chatMessages) return;

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function createMessage(author, text, type = 'ai') {
    const message = document.createElement('div');
    message.className = `sprint-message ${type === 'user' ? 'sprint-message-user' : 'sprint-message-ai'}`;

    const bubble = document.createElement('div');
    bubble.className = `sprint-bubble ${type === 'user' ? 'sprint-bubble-user' : 'sprint-bubble-ai'}`;

    const authorEl = document.createElement('div');
    authorEl.className = 'sprint-author';
    authorEl.textContent = author;

    const textEl = document.createElement('div');
    textEl.className = 'sprint-message-text';
    textEl.textContent = text;

    bubble.appendChild(authorEl);
    bubble.appendChild(textEl);
    message.appendChild(bubble);

    chatMessages.appendChild(message);
    scrollToBottom();
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.sprint-quick-btn');
    if (!btn) return;

    const action = btn.dataset.action;

    if (action === 'focus-input') {
      chatInput.focus();
      return;
    }

    if (action === 'insert-template') {
      chatInput.value = 'Пока не знаю, но хочу разобраться честно.';
      chatInput.focus();
      return;
    }

    if (action === 'give-example') {
      createMessage(
        'AI',
        'Например: ты мог говорить себе, что усталость не важна, хотя на самом деле уже был перегружен.'
      );
      return;
    }
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = chatInput.value.trim();
    if (!text) return;

    createMessage('Грег', text, 'user');
    chatInput.value = '';
    chatInput.focus();
  });

  scrollToBottom();
})();