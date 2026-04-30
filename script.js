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
// 送信ボタンが押されたときの処理（ここをまるごと書き換え！）
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // 画面リロードを阻止

    // 入力された名前とメッセージを取得
    const name = document.getElementById('sender-name').value;
    const message = document.getElementById('sender-message').value;

    // 画面上のメッセージを「考え中」に変える
    responseMessage.textContent = '翔太のAIが考え中...（初回は30秒ほどかかる場合があります）';
    responseMessage.style.color = '#333';

    try {
        // 【重要】Renderに公開した /chat 窓口にデータを送る
        const response = await fetch('https://portfolio-api-syota.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // 名前とメッセージを合体させてAIに送る
            body: JSON.stringify({ 
                message: `送信者名:${name}さんからの質問です。内容：${message}` 
            }),
        });

        if (response.ok) {
            // AIからの返答（reply）を受け取る
            const data = await response.json();
            
            // 画面にAIの返信を表示！
            responseMessage.textContent = data.reply;
            responseMessage.style.color = '#007bff'; // AIの返信は青色にするなど
            
            contactForm.reset(); // 入力欄をきれいにする
        } else {
            responseMessage.textContent = 'ごめんなさい、AIがちょっと休憩中のようです。';
        }
    } catch (error) {
        console.error("通信エラー:", error);
        responseMessage.textContent = 'サーバーに接続できませんでした。Renderが起動しているか確認してください。';
    }
});