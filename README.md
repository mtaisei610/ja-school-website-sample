# Kru Japanese - 設定ガイド

このウェブサイトは、`public/config.toml` ファイルを編集するだけで内容を更新できます。プログラミングの知識がなくても簡単に変更可能です。

## 設定方法

1. **`public/config.toml` を開く**
   GitHubのリポジトリ上で、`public` フォルダの中にある `config.toml` ファイルを開き、編集（鉛筆アイコン）をクリックします。

2. **内容を書き換える**
   各項目の説明に従って、ダブルクォーテーション（`"`）で囲まれた部分を書き換えてください。

   例: `name = "あなたの名前"` -> `name = "新しい名前"`

3. **保存する**
   編集が終わったら、画面右上の「Commit changes...」ボタンを押して保存してください。数分以内にウェブサイトに反映されます（ビルドは不要です）。

## 各項目の説明

### プロフィール設定 (`[profile]`)
- `name`: あなたの名前（タイ語や日本語）
- `title`: 肩書き（例: 「現役高専生が教える日本語教室」）
- `bio`: 自己紹介文
- `image`: プロフィール画像のファイル名（`public/profile.jpg` など）
- `location`: 居住地

### 経歴 (`[[profile.career]]`)
- `year`: 年号
- `event`: 出来事
- 項目を増やしたい場合は、同じ形式で `[[profile.career]]` のブロックを追加してください。

### 資格 (`[profile.qualifications]`)
- `items`: 資格のリスト。 `["JLPT N1", "TOEIC 800"]` のように記述します。

### SNSリンク (`[sns]`)
- `facebook`, `instagram`, `tiktok`: それぞれのプロフィールURLを入力します。空にするとアイコンが表示されなくなります。

### 料金プラン (`[pricing]`)
- `price_per_lesson`: 1コマの料金
- `duration`: 1コマの時間
- `currency`: 通貨（デフォルトは "THB"）
- `bulk_deal`: まとめ買いの特典内容
- `trial`: 無料トライアルの内容

### 申し込み (`[booking]`)
- `google_form_url`: GoogleフォームのURL
- `method_description`: 申し込み方法の説明文

## プロフィール画像の変更方法

1. `public` フォルダに新しい画像をアップロードします。
2. ファイル名を `profile.jpg` にするか、`config.toml` の `image` 項目をアップロードしたファイル名に書き換えてください。
