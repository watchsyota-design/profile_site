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

// --- お問い合わせフォームとAPIの連携 ---
const contactForm = document.getElementById('contact-form');
const responseMessage = document.getElementById('response-message');

// 送信ボタンが押されたときの処理
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // 画面がリロードされるのを防ぐ（超重要！）

  // 入力された名前とメッセージを取得
  const name = document.getElementById('sender-name').value;
  const message = document.getElementById('sender-message').value;

  responseMessage.textContent = '送信中...';

  try {
    // 【重要】ここでPythonのAPI（http://127.0.0.1:8000/contact）にデータを投げつける！
    const response = await fetch('http://127.0.0.1:8000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // データをJSON文字列に変換して送る
      body: JSON.stringify({ name: name, message: message }),
    });

    if (response.ok) {
      // APIから「受け取ったよ！」という返事（JSON）が返ってきたら読み解く
      const result = await response.json();
      responseMessage.textContent = result.reply; // 画面に返事を表示！
      contactForm.reset(); // 入力欄を空に戻す
    } else {
      responseMessage.textContent = 'エラーが発生しました。';
    }
  } catch (error) {
    responseMessage.textContent = 'サーバーに接続できません。PythonのAPIが起動しているか確認してください。';
  }
});