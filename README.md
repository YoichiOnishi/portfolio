# 大西陽一ポートフォリオ (Yoichi Onishi Portfolio)

このリポジトリは大西陽一氏のポートフォリオサイトのデザインとコードを含んでいます。

## ディレクトリ構造

```
updated_yoichi_lp/
├── css/                           - スタイルシートフォルダ
│   ├── style.css                  - メインのスタイル（基本設定、変数、共通スタイル）
│   ├── components.css             - 再利用可能なUIコンポーネント（ボタン、カード、フォームなど）
│   ├── sections.css               - 各セクション固有のスタイル（ヒーロー、プロフィール、スキルなど）
│   ├── animations.css             - アニメーションとトランジションの定義
│   └── responsive.css             - レスポンシブデザイン用のメディアクエリ
│
├── js/                            - JavaScriptフォルダ
│   ├── main.js                    - メインのJavaScript機能（ナビゲーション、スクロール、タブなど）
│   ├── animations.js              - アニメーション関連の関数（スクロール連動、パララックスなど）
│   ├── particles-config.js        - パーティクル背景の設定と最適化
│   └── cursor.js                  - カスタムカーソルの機能と効果
│
├── images/                        - 画像フォルダ
│   ├── profile/                   - プロフィール関連画像
│   │   └── avatar.jpg             - プロフィール写真（コピーが必要）
│   │
│   └── favicon/                   - ファビコン関連ファイル
│       ├── favicon.ico            - 標準ファビコン（コピーが必要）
│       └── apple-touch-icon.png   - Appleデバイス用アイコン（コピーが必要）
│
├── index.html                     - メインのHTMLファイル（サイト全体の構造とコンテンツ）
├── robots.txt                     - 検索エンジンクローラー用の設定ファイル
├── sitemap.xml                    - SEO用のサイトマップ
├── UPDATES.html                   - 更新内容と改善点の説明ドキュメント
└── README.md                      - プロジェクト説明ファイル（このファイル）
```

## HTMLの構造

`index.html`は以下のような構造になっています：

```
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- メタタグ、タイトル、CSSリンクなど -->
</head>
<body>
    <!-- ページローダー -->
    <div class="loader-container">...</div>
    
    <!-- パーティクル背景 -->
    <div id="particles-js"></div>
    
    <!-- ナビゲーションメニュー -->
    <nav class="main-nav">...</nav>
    
    <!-- メインコンテンツ -->
    <main class="content-wrapper">
        <!-- ヒーローセクション -->
        <section id="hero" class="section-full">...</section>
        
        <!-- プロフィールセクション -->
        <section id="about" class="section">...</section>
        
        <!-- スキルセクション -->
        <section id="skills" class="section section-alt">...</section>
        
        <!-- 実績セクション -->
        <section id="achievements" class="section">...</section>
        
        <!-- Worksセクション -->
        <section id="works" class="section section-alt">...</section>
        
        <!-- お問い合わせセクション -->
        <section id="contact" class="section">...</section>
    </main>
    
    <!-- フッター -->
    <footer class="footer">...</footer>
    
    <!-- 固定要素（トップに戻るボタン、カーソルフォロワー） -->
    <button id="back-to-top">...</button>
    <div class="cursor-follower">...</div>
    
    <!-- スクリプト読み込み -->
    <script src="..."></script>
</body>
</html>
```

## CSSの構成

1. **style.css**: グローバル変数、リセット、基本スタイル
   - カラー変数（--primary, --secondary, --bg-dark など）
   - タイポグラフィ設定（フォントサイズ、行間など）
   - グローバルセレクタ（body, a, h1-h6 など）
   - ユーティリティクラス（.hidden, .text-center など）

2. **components.css**: 再利用可能なUIコンポーネント
   - ナビゲーション（.main-nav, .nav-links など）
   - ボタン（.btn, .btn-primary, .btn-outline など）
   - カード（.card, .skill-card, .work-card など）
   - フォーム要素（input, textarea, .form-group など）
   - ソーシャルアイコン（.social-icon, .social-links など）

3. **sections.css**: 各セクション固有のスタイル
   - ヒーローセクション（#hero, .hero-title など）
   - プロフィールセクション（.profile-container, .timeline など）
   - スキルセクション（.skills-grid, .skill-progress など）
   - 実績セクション（.achievement-tabs, .award-card など）
   - Worksセクション（.featured-work, .work-info など）
   - お問い合わせセクション（.contact-container, .contact-form など）

4. **animations.css**: アニメーションとトランジション
   - キーフレーム定義（@keyframes fadeIn, slideUp など）
   - アニメーションクラス（.fade-in, .slide-up など）
   - アニメーション遅延（[data-delay="0.1"] など）

5. **responsive.css**: メディアクエリとレスポンシブ調整
   - デスクトップ（1200px以上）
   - ラップトップ（992px〜1199px）
   - タブレット（768px〜991px）
   - モバイル（576px〜767px）
   - 小型モバイル（575px以下）
   - ダークモード設定
   - 印刷用スタイル

## JavaScriptの機能

1. **main.js**: 主要機能
   - ナビゲーション操作（モバイルメニュー開閉など）
   - スムーズスクロール
   - ダークモード切替
   - タブシステム
   - コンタクトフォーム処理
   - タイピング効果

2. **animations.js**: アニメーション制御
   - スクロール連動アニメーション
   - Intersection Observer設定
   - パララックス効果
   - カウンターアニメーション

3. **particles-config.js**: 背景パーティクル設定
   - パーティクルの数、サイズ、色の設定
   - インタラクション設定
   - パフォーマンス最適化

4. **cursor.js**: カスタムカーソル
   - カーソルフォロワー挙動
   - ホバー効果
   - クリック効果
   - タッチデバイス検出と無効化

## 機能

1. **モダンなUI/UXデザイン** - 視覚的に魅力的で使いやすいインターフェイス
2. **レスポンシブデザイン** - モバイル、タブレット、デスクトップに最適化
3. **ダークモード対応** - ユーザーの好みに合わせて明暗のテーマを切り替え可能
4. **スムーズなアニメーション** - スクロールや操作に連動した洗練されたアニメーション
5. **インタラクティブな要素** - パーティクル背景、カスタムカーソルなど
6. **タブシステム** - コンテンツを整理して表示
7. **最適化されたパフォーマンス** - 高速ローディングと滑らかな動作
8. **アクセシビリティ対応** - セマンティックなHTMLとARIA属性の活用
9. **SEO最適化** - 適切なメタタグとsitemap.xmlの実装

## 必要なイメージファイル

既存のポートフォリオから以下のイメージファイルをコピーしてください：

- `images/profile/avatar.jpg` - プロフィール写真
- `images/favicon/favicon.ico` - ファビコン
- `images/favicon/apple-touch-icon.png` - Appleデバイス用アイコン

## デプロイメント

このサイトは静的なHTMLとCSSで構築されています。GitHubページを使用して簡単にデプロイできます：

1. ファイルをGitHubリポジトリにプッシュ
2. Settings > Pages でデプロイを設定
3. メインブランチをソースとして選択

## クレジット

- フォントアイコン: [Font Awesome](https://fontawesome.com/)
- 背景アニメーション: [Particles.js](https://vincentgarreau.com/particles.js/)
- 3Dチルト効果: [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/)
- フォント: [Google Fonts - Inter & Noto Sans JP](https://fonts.google.com/)
