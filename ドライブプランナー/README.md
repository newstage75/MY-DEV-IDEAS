ドライブプランナーというアプリを作りたいので壁打ちして
### コンセプト
- ドライブに行きたいけど、所要時間・距離（燃料費）・有料道路の費用などがネックになる
- これらを算出し、ドライブプランを提案するサイトを作りたい

### 機能
- 出発地点登録
- 車種登録（燃費算出用として）
- 燃料費はその日の相場で算出

### 追加機能
- ToDoリスト的に、「実際に行った」らそのフィードバックができるといい
- その時の、思い出の画像や感想も登録できたら
- Map上に表示できたりすると良い

### 思いつき
- ゲストユーザーは燃費は概算（リッター15kmとか、数字だけを変更できる）
- ユーザー登録で車種登録し、そのリッターで算出できる

### 使用技術
Next、TypeScript、NextAuth、prisma、zod、sqlite（手始めに）


---
# 🚗 **ドライブプランナー - 壁打ちメモ** with ChatGPT

## 🎯 **コンセプト**
- **ドライブに行きたいけど…**  
  - 所要時間・距離（燃料費）・有料道路の費用がネック  
- **これらを算出し、最適なドライブプランを提案するサイトを作る！**


## 🛠 **機能**
### ✅ **コア機能**
1. **出発地点登録**  
   - 現在地 or 任意の場所を設定  
2. **目的地検索 & ルート計算**  
   - Google Maps API or OpenRouteServiceで距離・所要時間算出  
3. **燃費計算**  
   - ゲスト: デフォルト燃費（例: 15km/L）  
   - ユーザー: 登録した車種の実燃費を適用  
4. **燃料費計算**  
   - 最新のガソリン価格（gogo.gs APIなど）を取得し、距離と燃費からコスト算出  
5. **有料道路の料金計算**  
   - 高速料金データ（NEXCO APIなど？）を使って算出  

### 🔥 **追加機能**
1. **ToDoリスト的な管理**  
   - プラン作成後、「行く予定」に保存  
   - 実際に行ったら「行った！」ボタンを押せる  
2. **フィードバック & 思い出管理**  
   - 行った時の感想をメモ  
   - **写真アップロード**（Cloudinary or Supabase Storage）  
   - **マップに記録**（Google Maps API or Mapbox）  
3. **ユーザー登録 & カスタマイズ**  
   - ゲストは概算燃費  
   - ユーザーは車種を登録し、個別の燃費計算  
4. **SNSシェア機能**（X, Instagram 連携）  


## 🛠 **技術スタック**
| 要素 | 技術選定 |
|------|--------|
| **フロント** | Next.js, TypeScript, shadcn-ui, TailwindCSS |
| **認証** | NextAuth |
| **データ管理** | Prisma + SQLite（初期）→ PostgreSQL |
| **API** | Google Maps API, NEXCO API（要検討）, gogo.gs API |
| **写真管理** | Supabase Storage or Cloudinary |
| **マップ表示** | Google Maps API or Mapbox |


## 🎨 **UI/UXのイメージ**
1. **トップページ**  
   - 出発地 & 目的地を入力 → ざっくり計算  
2. **プラン詳細ページ**  
   - **距離・所要時間・燃料代・高速代** を見やすく表示  
3. **マイページ**  
   - 保存したプラン & 行った履歴、思い出写真の管理  
4. **マップ機能**  
   - 行った場所をプロット  

