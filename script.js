const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// ボタンがクリックされた時の処理
themeToggle.addEventListener('click', () => {
  // bodyタグに 'dark-mode' というクラスを付け外しする
  body.classList.toggle('dark-mode');
  
  // 今の状態に合わせてボタンの文字を書き換える
  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️ ライトモード';
  } else {
    themeToggle.textContent = '🌙 ダークモード';
  }
});