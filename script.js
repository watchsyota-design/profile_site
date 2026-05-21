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
    responseMessage.textContent = 'AI翔太が考え中...（初回は30秒ほどかかる場合があります）';
    responseMessage.style.color = 'var(--text-color)';

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
            responseMessage.style.color = 'var(--text-color)'; // AIの返信は青色にするなど
            
            contactForm.reset(); // 入力欄をきれいにする
        } else {
            responseMessage.textContent = 'ごめんなさい、AIがちょっと休憩中のようです。';
        }
    } catch (error) {
        console.error("通信エラー:", error);
        responseMessage.textContent = 'サーバーに接続できませんでした。Renderが起動しているか確認してください。';
    }
});
// ==========================================
// いいねボタンの機能
// ==========================================
const API_URL = "https://portfolio-api-syota.onrender.com"; // バックエンドのURL

// ① サイトを開いた時に「今のいいね数」を取得して表示する
async function fetchLikes() {
    try {
        const response = await fetch(`${API_URL}/likes`);
        const data = await response.json();
        document.getElementById("like-count").innerText = data.likes;
    } catch (error) {
        console.error("いいねの取得に失敗しました", error);
    }
}

// ② ボタンを押した時に「いいねを+1」して画面を更新する
async function addLike() {
    try {
        const response = await fetch(`${API_URL}/likes`, { method: "POST" });
        const data = await response.json();
        document.getElementById("like-count").innerText = data.likes;
        
        // 押した感触を出すためのアニメーション
        const btn = document.getElementById("like-button");
        const originalText = btn.innerText;
        btn.innerText = "✨ Thanks! ✨";
        setTimeout(() => btn.innerText = originalText, 1500);
    } catch (error) {
        console.error("いいねの送信に失敗しました", error);
    }
}

// ③ ボタンにクリックした時の動作をセットする
document.getElementById("like-button").addEventListener("click", addLike);

// ④ ページが読み込まれたら最初に①を実行する
fetchLikes();