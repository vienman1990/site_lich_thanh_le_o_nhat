"use client";

import { useState } from "react";
import { format, isValid } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Mass } from "../types/mass";
import { massesByDate } from "../data/masses";

export const getMassesByDate = (date: string): Mass[] => {
  return massesByDate[date] ?? [];
};

export default function MassCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const selectedMasses: Mass[] = selectedDate
    ? massesByDate[format(selectedDate, "yyyy-MM-dd")] || []
    : [];

  // Map số lượng lễ theo ngày (yyyy-MM-dd)
  const massCounts: Record<string, number> = {};
  Object.entries(massesByDate).forEach(([dateKey, masses]) => {
    massCounts[dateKey] = masses.length;
  });

  const massDays = Object.keys(massesByDate).map((key) => new Date(key));

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Lịch */}
      <div className="w-full lg:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Lịch Thánh Lễ</CardTitle>
            <p className="text-sm mt-5 text-center">
              Nguồn dữ liệu từ: <a href="https://vietcatholicjp.net/" target="blank" className="text-destructive">https://vietcatholicjp.net/</a> <br/>
              Dữ liệu được cập nhật ngày: <span className="text-destructive">30日12月2025年</span>
            </p>
          </CardHeader>
          <CardContent className="flex justify-center max-w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(15)]"
              classNames={{
                day: "relative",
                selected: "bg-primary text-white rounded-md",
                today:
                  "bg-accent text-accent-foreground font-medium rounded-md",
              }}
              modifiers={{ hasMass: massDays }}
              modifiersClassNames={{
                hasMass:
                  "[&>button::after]:content-[''] [&>button::after]:absolute [&>button::after]:bottom-1 [&>button::after]:left-1/2 [&>button::after]:-translate-x-1/2 [&>button::after]:h-2 [&>button::after]:w-2 [&>button::after]:rounded-full [&>button::after]:bg-primary [&>button::after]:pointer-events-none [&>button::after]:z-10",
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Chi tiết Thánh lễ bên phải - giữ nguyên */}
      <Card className="w-full lg:w-1/2">
        <CardHeader>
          <CardTitle>
            {selectedDate
              ? `Thánh lễ ngày ${format(selectedDate, "dd/MM/yyyy")}`
              : "Chọn một ngày để xem chi tiết"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-full">
            {selectedMasses.length > 0 ? (
              <div className="space-y-4">

                <p className="text-xs text-destructive">* ngày và giờ Thánh Lễ có thể bị thay đổi, vui lòng liên hệ cộng đoàn địa phương để xác nhận trước.</p>

                {selectedMasses.map((mass, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-muted/40"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-primary">
                        {mass.time}
                      </span>
                      {mass.celebrant && (
                        <Badge variant="outline">
                          <span className="font-medium">{mass.celebrant}</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {mass.title}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Không có Thánh lễ trong ngày này
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
