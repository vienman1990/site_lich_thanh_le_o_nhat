<?php

$data = file_get_contents('raw-data.txt');

$data_converted = parseMassSchedule($data);

// Đường dẫn file JSON bạn muốn lưu
$file_path = 'public/data.json';

$json_data = json_encode($data_converted, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

file_put_contents($file_path, $json_data);

// Kiểm tra xem lưu thành công chưa
if (file_exists($file_path)) {
  echo "Đã lưu file JSON thành công tại: " . $file_path;
} else {
  echo "Lưu file thất bại!";
}


function parseMassSchedule($text) {
  $lines = explode("\n", trim($text)); // Tách thành từng dòng
  $schedule = [];
  $current_year = date('Y');
  
  foreach ($lines as $line) {
      $line = trim($line);
      if (empty($line)) continue; // Bỏ qua dòng trống
      
      // Tách các phần bằng dấu :
      $parts = explode(':', $line);
      if (count($parts) < 2) continue; // Đảm bảo có đủ phần tử
      
      if (count($parts) == 2) {
        // Lấy giờ
        $time = trim($parts[0]);

        // Lấy title và name
        $titlePart = trim($parts[1]);
      } else {
        // Lấy ngày
        $date = trim($parts[0]);
        
        // Lấy giờ
        $time = trim($parts[1]);

        // Lấy title và name
        $titlePart = trim($parts[2]);
      }
      
      
      preg_match('/^(.*?)\s*\((.*?)\)$/', $titlePart, $matches);
      
      if (count($matches) >= 3) {
          $title = trim($matches[1]);
          $name = trim($matches[2]);
      } else {
          $title = $titlePart;
          $name = '';
      }

      $time = str_replace('g', ':', trim($time)); // "19g00" -> "19:00"
      $date_explode = explode('/', $date);
      // Chuyển thành định dạng ISO 8601
      // $dateTime = "{$current_year}-" . $date_explode[1] . "-" . $date_explode[0] . "{$time}:00:00+09:00";
      $dateTime = new DateTime("{$current_year}-" . $date_explode[1] . "-" . $date_explode[0] . " {$time}:00", new DateTimeZone('Asia/Tokyo')); // JST là +9

      $isoDate = $dateTime->format('c');

      // Thêm vào mảng
      $schedule[] = [
          'date' => $isoDate,
          'time' => $time,
          'title' => $title,
          'name' => $name
      ];
  }
  
  return $schedule;
}