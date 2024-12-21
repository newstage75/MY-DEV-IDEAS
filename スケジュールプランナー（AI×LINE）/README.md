## スケジュールプランナー

アプリの開発案です。
・本日の目標
・取り組む時間
を打ち込むと対話型AIがスケジュールと注意点を教えてくれるアプリを作成したいです。

---
アプリのアイデアを具体化するために、Reactコンポーネントを作成してみましょう。

<img width="677" alt="スクリーンショット 2024-12-21 13 04 09" src="https://github.com/user-attachments/assets/f4d32f5e-5722-427c-85bd-1b764740321e" />

```tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Target, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SchedulePlanner = () => {
  const [goal, setGoal] = useState('');
  const [hours, setHours] = useState('');
  const [schedule, setSchedule] = useState(null);

  const generateSchedule = () => {
    if (!goal || !hours) return;

    const numHours = parseFloat(hours);
    
    // 基本的なスケジュール生成ロジック
    let response = {
      timeBlocks: [],
      tips: []
    };

    // 時間を25分の作業ブロックに分割（ポモドーロテクニック）
    const numBlocks = Math.floor((numHours * 60) / 25);
    
    for (let i = 0; i < numBlocks; i++) {
      response.timeBlocks.push({
        duration: '25分',
        activity: '集中作業',
        break: i < numBlocks - 1 ? '5分休憩' : '達成確認'
      });
    }

    // 作業時間に応じたアドバイス
    if (numHours > 4) {
      response.tips.push('長時間の作業なので、適切な休憩を取ることが重要です');
      response.tips.push('2時間ごとに15-20分の長めの休憩を入れることをお勧めします');
    }
    
    if (numHours < 2) {
      response.tips.push('短時間での目標達成のため、特に集中して取り組みましょう');
      response.tips.push('事前に作業環境を整えておくことをお勧めします');
    }

    setSchedule(response);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-2xl font-bold">
        スケジュールプランナー
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <Input
              placeholder="本日の目標"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <Input
              type="number"
              placeholder="取り組む時間（時間）"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="flex-1"
              min="0.5"
              step="0.5"
            />
          </div>

          <Button 
            onClick={generateSchedule}
            className="w-full"
            disabled={!goal || !hours}
          >
            スケジュールを生成
          </Button>
        </div>

        {schedule && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">推奨スケジュール</h3>
            <div className="space-y-2">
              {schedule.timeBlocks.map((block, index) => (
                <div key={index} className="p-3 bg-gray-100 rounded-lg">
                  <p>⏱ {block.duration}: {block.activity}</p>
                  <p className="text-sm text-gray-600">↓</p>
                  <p className="text-sm text-blue-600">{block.break}</p>
                </div>
              ))}
            </div>

            <Alert>
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <h4 className="font-semibold mb-2">注意点とアドバイス：</h4>
                <ul className="list-disc pl-4">
                  {schedule.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SchedulePlanner;

```

このコンポーネントの主な機能は以下の通りです：

1. 入力機能
- 目標を入力するテキストフィールド
- 作業時間を入力する数値フィールド
- 入力内容に基づいてスケジュールを生成するボタン

2. スケジュール生成機能
- 入力された時間をポモドーロテクニック（25分作業 + 5分休憩）に基づいて分割
- 作業時間に応じた適切な休憩時間の提案
- 目標達成のためのアドバイスを生成

3. UI/UX
- shadcn/uiを使用したモダンなデザイン
- 分かりやすいアイコンとレイアウト
- レスポンシブデザイン

このベースに追加できる機能としては：
- より詳細なスケジュール調整機能
- 進捗管理機能
- 目標の種類に応じたカスタマイズされたアドバイス
- 過去の実績データの保存と分析
- 通知機能

これらの機能を追加することで、より実用的なアプリケーションになると思います。どの機能を優先的に実装したいかお聞かせください。

---

以下の画面イメージもください。
・進捗管理機能
・過去の実績データの保存と分析

---
進捗管理と実績分析の画面を追加したコンポーネントを作成します。

<img width="675" alt="スクリーンショット 2024-12-21 13 04 21" src="https://github.com/user-attachments/assets/17acfaa3-e12f-4892-80df-f3c2da0fbaa8" />

<img width="663" alt="スクリーンショット 2024-12-21 13 06 56" src="https://github.com/user-attachments/assets/f6121664-cff0-40ec-9c8c-29aeffdc9d83" />


```tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Check, Clock, Target, TrendingUp, Calendar } from 'lucide-react';

const ProgressDashboard = () => {
  // サンプルデータ
  const [currentTask] = useState({
    goal: "Reactアプリケーションの開発",
    plannedHours: 4,
    elapsedHours: 2.5,
    completedPomodoros: 6,
    totalPomodoros: 9
  });

  const [historicalData] = useState([
    { date: '12/15', completionRate: 85, plannedHours: 4, actualHours: 3.5 },
    { date: '12/16', completionRate: 90, plannedHours: 3, actualHours: 2.8 },
    { date: '12/17', completionRate: 95, plannedHours: 5, actualHours: 4.8 },
    { date: '12/18', completionRate: 88, plannedHours: 4, actualHours: 3.6 },
    { date: '12/19', completionRate: 92, plannedHours: 3, actualHours: 2.9 },
    { date: '12/20', completionRate: 87, plannedHours: 4, actualHours: 3.5 },
    { date: '12/21', completionRate: 91, plannedHours: 5, actualHours: 4.6 }
  ]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-2xl font-bold">
        進捗管理・実績分析
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="progress">本日の進捗</TabsTrigger>
            <TabsTrigger value="analysis">実績分析</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span className="font-semibold">{currentTask.goal}</span>
                </div>
                <span className="text-sm text-gray-500">
                  残り時間: {(currentTask.plannedHours - currentTask.elapsedHours).toFixed(1)}時間
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>経過時間</span>
                  <span>{currentTask.elapsedHours}時間 / {currentTask.plannedHours}時間</span>
                </div>
                <Progress value={(currentTask.elapsedHours / currentTask.plannedHours) * 100} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>完了ポモドーロ</span>
                  <span>{currentTask.completedPomodoros} / {currentTask.totalPomodoros}</span>
                </div>
                <Progress value={(currentTask.completedPomodoros / currentTask.totalPomodoros) * 100} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">予定効率</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {Math.round((currentTask.elapsedHours / currentTask.plannedHours) * 100)}%
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">完了タスク</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">{currentTask.completedPomodoros}</p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">生産性</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {Math.round((currentTask.completedPomodoros / currentTask.elapsedHours) * 10) / 10}
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="space-y-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">完了率の推移</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="completionRate" 
                        stroke="#2563eb" 
                        name="完了率"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">計画vs実績</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="plannedHours" 
                        stroke="#2563eb" 
                        name="計画時間"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="actualHours" 
                        stroke="#16a34a" 
                        name="実績時間"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">週間平均達成率</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {Math.round(historicalData.reduce((acc, curr) => acc + curr.completionRate, 0) / historicalData.length)}%
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">平均作業時間</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {(historicalData.reduce((acc, curr) => acc + curr.actualHours, 0) / historicalData.length).toFixed(1)}h
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">計画精度</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {Math.round((historicalData.reduce((acc, curr) => acc + (curr.actualHours / curr.plannedHours), 0) / historicalData.length) * 100)}%
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressDashboard;

```

このコンポーネントには以下の主要な機能が含まれています：

1. 本日の進捗管理画面
- 目標と残り時間の表示
- 経過時間のプログレスバー
- 完了したポモドーロ数のプログレスバー
- 3つの主要メトリクス（予定効率、完了タスク数、生産性）

2. 実績分析画面
- 完了率の推移グラフ（折れ線グラフ）
- 計画時間vs実績時間の比較グラフ
- 週間の主要指標（平均達成率、平均作業時間、計画精度）

改善案として以下の機能を追加できます：
- データのエクスポート機能
- 目標タイプごとの分析フィルター
- カスタムな期間での分析
- 詳細なタスクログの表示
- 生産性向上のためのアドバイス機能

これらの機能について、優先順位や具体的な実装方法についてご意見をいただければと思います。

---

投稿をしたら、LINEにメッセージが送られるようにしたいです

---

LINE Notifyを使用して、スケジュール設定時にLINEへ通知を送る機能を実装してみましょう。



```javascript
// server/api/line-notify.js
import axios from 'axios';

export async function sendLineNotification(req, res) {
  const { goal, hours } = req.body;
  const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN; // 環境変数からトークンを取得

  try {
    await axios.post(
      'https://notify-api.line.me/api/notify',
      `message=\n📅 新しいスケジュール\n\n目標: ${goal}\n予定時間: ${hours}時間`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`
        }
      }
    );
    
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('LINE Notify Error:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
}

// components/SchedulePlanner.jsx
// 既存のコンポーネントに通知機能を追加
import React, { useState } from 'react';
import axios from 'axios';

const SchedulePlanner = () => {
  const [goal, setGoal] = useState('');
  const [hours, setHours] = useState('');
  const [isNotifying, setIsNotifying] = useState(false);

  const generateScheduleAndNotify = async () => {
    if (!goal || !hours) return;
    
    setIsNotifying(true);
    
    try {
      // スケジュール生成処理（既存のコード）
      generateSchedule();
      
      // LINE通知の送信
      await axios.post('/api/line-notify', {
        goal,
        hours
      });
      
      alert('スケジュールを作成し、LINEに通知を送信しました！');
    } catch (error) {
      console.error('Notification Error:', error);
      alert('LINE通知の送信に失敗しました。');
    } finally {
      setIsNotifying(false);
    }
  };

  return (
    // 既存のJSXに通知関連の要素を追加
    <Button 
      onClick={generateScheduleAndNotify}
      className="w-full"
      disabled={!goal || !hours || isNotifying}
    >
      {isNotifying ? 'sending...' : 'スケジュールを生成して通知'}
    </Button>
  );
};

export default SchedulePlanner;

```

この機能を実装するために必要な手順は以下の通りです：

1. LINE Notify のセットアップ
- LINE Notify のウェブサイト(https://notify-bot.line.me/ja/)にアクセス
- ログインして新しいトークンを発行
- 発行したトークンを環境変数として設定

2. 環境変数の設定
```env
LINE_NOTIFY_TOKEN=your_line_notify_token
```

3. 必要なパッケージのインストール
```bash
npm install axios
```

主な機能：
- スケジュール作成時に自動でLINE通知を送信
- 通知内容には目標と予定時間を含む
- エラーハンドリングとローディング状態の管理
- ユーザーフレンドリーなフィードバック

カスタマイズ可能なポイント：
1. 通知のフォーマット
```javascript
// より詳細な通知内容にカスタマイズ可能
`message=\n📅 スケジュール通知\n
目標: ${goal}
予定時間: ${hours}時間
開始予定: ${startTime}
推奨休憩回数: ${breakCount}回`
```

2. 通知のトリガー
- スケジュール作成時
- タスク開始時
- 休憩時間の通知
- 目標達成時

3. 通知の頻度設定
- 即時通知
- リマインダー通知
- 進捗報告通知

これらの機能をさらに発展させたい場合、以下のような拡張が可能です：
- 複数のLINEグループへの通知
- 通知テンプレートの作成と選択機能
- 通知履歴の管理
- 通知設定のカスタマイズ画面

実装を進める前に、どの通知機能を優先的に実装すべきか、ご意見をお聞かせください。
