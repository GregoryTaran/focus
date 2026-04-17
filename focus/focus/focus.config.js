export const OPEN_MENU = [
  { key: 'home', label: 'Главная', href: '/focus/open/index.html' },
  { key: 'about', label: 'О продукте', href: '/focus/open/about.html' },
  { key: 'terms', label: 'Условия использования', href: '/focus/open/terms.html' },
  { key: 'privacy', label: 'Политика конфиденциальности', href: '/focus/open/privacy.html' },
  { key: 'login', label: 'Войти / Зарегистрироваться', href: '/focus/open/login.html' }
];

export const ACCOUNT_MENU = [
  { key: 'home', label: 'Главная', href: '/focus/focus_index.html' },
  { key: 'practicums', label: 'Практикумы', href: '/focus/focus_index.html' },
  { key: 'profile', label: 'Профиль', href: '/profile/profile.html' },
  { key: 'logout', label: 'Выход', href: '#', action: 'logout' }
];

export const PRACTICUMS = {
  alco: {
    slug: 'alco',
    title: 'Практикум: Не вреди себе. Алкоголь',
    shortTitle: 'Не вреди себе. Алкоголь',
    menu: [
      { key: 'today', label: 'Сегодня', href: '/focus/alco/index.html' },
      { key: 'checkup', label: 'Чекап', href: '/focus/alco/checkup.html' },
      { key: 'contract', label: 'Контракт', href: '/focus/alco/contract.html' },
      { key: 'chat', label: 'Чат', href: '/focus/alco/sprint.html' },
      { key: 'meetings', label: 'Встречи', href: '/focus/alco/meetings.html' },
      { key: 'how', label: 'Как пользоваться', href: '/focus/alco/how.html' }
    ],
    related: []
  }
};