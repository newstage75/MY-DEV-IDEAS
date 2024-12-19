import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Image, Wand2 } from 'lucide-react';

const StoryBookCreator = () => {
  const [pages, setPages] = useState([{ text: '', imagePrompt: '' }]);
  const [title, setTitle] = useState('');

  const addPage = () => {
    setPages([...pages, { text: '', imagePrompt: '' }]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            AIストーリーブッククリエーター
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                絵本のタイトル
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タイトルを入力してください"
              />
            </div>

            {pages.map((page, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      ページ {index + 1} のテキスト
                    </label>
                    <Textarea
                      value={page.text}
                      onChange={(e) => {
                        const newPages = [...pages];
                        newPages[index].text = e.target.value;
                        setPages(newPages);
                      }}
                      placeholder="ストーリーを入力してください"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      イラストの説明
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={page.imagePrompt}
                        onChange={(e) => {
                          const newPages = [...pages];
                          newPages[index].imagePrompt = e.target.value;
                          setPages(newPages);
                        }}
                        placeholder="イラストの詳細を説明してください"
                      />
                      <Button variant="outline" className="flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        生成
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex gap-2">
              <Button onClick={addPage} variant="outline" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                ページを追加
              </Button>
              <Button className="flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                絵本を生成
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryBookCreator;