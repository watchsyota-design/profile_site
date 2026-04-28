// ボタンと、ページ全体（body）の情報を取得する
const btn = document.getElementById('darkModeBtn');
const body = document.body;

// ボタンがクリックされたときの処理
btn.addEventListener('click', function() {
    // bodyタグに 'dark-mode' というクラス名を行ったり来たり（トグル）させる
    body.classList.toggle('dark-mode');
});