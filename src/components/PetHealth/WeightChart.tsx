// src/components/dashboard/WeightChart.tsx
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import type { HealthLog } from '../../types/Pet';

Chart.register(...registerables);
interface WeightChartProps {
  logs?: HealthLog[];
  unit?: string | null;
}

export const WeightChart: React.FC<WeightChartProps> = ({ logs, unit }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Đảo ngược thứ tự log nếu cần (như logic hiện tại)
    const reversedLogs = (logs || []).slice().reverse();

    const weightLabels = reversedLogs.map((log) => {
      const date = new Date(log.recorded_at);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const weightValues = reversedLogs.map((log) => ({
      // Chart.js có thể lưu trữ dữ liệu tùy chỉnh trong mảng data
      x: `${new Date(log.recorded_at).getMonth() + 1}/${new Date(log.recorded_at).getDate()}`,
      y: parseFloat(log.value),
      description: log.description, // <-- [NEW] Lưu trữ description vào data
    }));

    const weightData = {
      labels: weightLabels,
      datasets: [{
        label: 'Cân nặng',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: 'rgb(99, 102, 241)',
        data: weightValues, // Sử dụng mảng đối tượng
        fill: true,
        tension: 0.3
      }]
    };

    const weightConfig: any = {
      type: 'line',
      data: weightData,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              // [UPDATED] Thay đổi callback để truy cập description
              label: function (context: any) {
                // context.raw là đối tượng {x, y, description} mà chúng ta đã tạo
                const value = context.parsed.y + ' ' + (unit || '');
                const description = context.raw.description;

                // Trả về một mảng để tạo nhiều dòng trong tooltip
                const lines = [value];
                if (description) {
                  // Thêm description, có thể giới hạn độ dài nếu quá dài
                  lines.push(`Ghi chú: ${description}`); 
                }
                return lines;
              },
              title: function (context: any) {
                // Giữ lại phần hiển thị ngày/tháng
                return context[0].label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value: any) { return value + ' ' + (unit || ''); }
            }
          }
        }
      }
    };

    const chartInstance = new Chart(chartRef.current, weightConfig);

    return () => {
      chartInstance.destroy();
    };
  }, [logs, unit]); // <-- [UPDATED] Thêm logs và unit vào dependency array

  // Xử lý trường hợp không có logs
  if (!logs || logs.length === 0) {
    return <div className="p-4 text-center text-gray-500">Chưa có dữ liệu cân nặng để hiển thị biểu đồ.</div>;
  }
  
  return <canvas ref={chartRef}></canvas>;
};