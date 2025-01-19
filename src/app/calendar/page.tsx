import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Calendar() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">誕生日カレンダー</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>カレンダー</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for actual calendar component */}
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              カレンダー配置予定
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>誕生日の設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="birthday">誕生日</Label>
                <div className="relative">
                  <Input type="date" id="birthday" className="pl-10" />
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                </div>
              </div>
              <Button className="w-full font-bold">保存</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
