// Abrir e fechar menu mobile
document.querySelector('.menu-button').addEventListener('click', () => {
    const navMenu = document.querySelector('nav');
    navMenu.classList.toggle('open');
  });
  
  // Função de validação do formulário de contato
  document.querySelector('.contact form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
  
    // Validação básica
    if (name === '' || email === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    if (!validateEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
  
    alert(`Obrigado por se conectar, ${name}! Em breve entraremos em contato.`);
    document.querySelector('.contact form').reset();
  });
  
  // Função para validação do e-mail
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Função de simulação de login e logout
  const loginLink = document.querySelector('.login');
  const createAccountLink = document.querySelector('.create-account');
  
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    const isLogged = localStorage.getItem('isLogged');
  
    if (isLogged) {
      alert('Você já está logado.');
    } else {
      const userName = prompt('Digite seu nome para fazer login:');
      if (userName) {
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('userName', userName);
        alert(`Bem-vindo, ${userName}!`);
        updateLoginStatus();
      }
    }
  });
  
  createAccountLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (!localStorage.getItem('isLogged')) {
      alert('Conta criada com sucesso! Faça login para acessar sua conta.');
    } else {
      alert('Você já possui uma conta e está logado.');
    }
  });
  
  // Atualizar status de login ao carregar a página
  function updateLoginStatus() {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged) {
      const userName = localStorage.getItem('userName');
      loginLink.textContent = `Sair (${userName})`;
      loginLink.removeEventListener('click', loginHandler);
      loginLink.addEventListener('click', logoutHandler);
    } else {
      loginLink.textContent = 'Login';
      loginLink.removeEventListener('click', logoutHandler);
      loginLink.addEventListener('click', loginHandler);
    }
  }
  
  // Handler para login
  function loginHandler(e) {
    e.preventDefault();
    const userName = prompt('Digite seu nome para fazer login:');
    if (userName) {
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('userName', userName);
      alert(`Bem-vindo, ${userName}!`);
      updateLoginStatus();
    }
  }
  
  // Handler para logout
  function logoutHandler(e) {
    e.preventDefault();
    localStorage.removeItem('isLogged');
    localStorage.removeItem('userName');
    alert('Você saiu da sua conta.');
    updateLoginStatus();
  }
  
  // Chamar a função ao carregar a página para verificar o status de login
  updateLoginStatus();
  