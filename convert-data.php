<?php

$data = file_get_contents('raw-data.txt');

$data_converted = parseMassSchedule($data);

// Đường dẫn file JSON bạn muốn lưu
$file_path = 'data/data.json';

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
          'name' => $name,
          'slug' => slugify($title)."-".$dateTime->format('Y-m-d')
      ];
  }
  
  return $schedule;
}

function slugify($text) {
  // Bảng thay thế các ký tự tiếng Việt thành không dấu
  $transliteration = [
      'à' => 'a', 'á' => 'a', 'ả' => 'a', 'ã' => 'a', 'ạ' => 'a',
      'ă' => 'a', 'ằ' => 'a', 'ắ' => 'a', 'ẳ' => 'a', 'ẵ' => 'a', 'ặ' => 'a',
      'â' => 'a', 'ầ' => 'a', 'ấ' => 'a', 'ẩ' => 'a', 'ẫ' => 'a', 'ậ' => 'a',
      'è' => 'e', 'é' => 'e', 'ẻ' => 'e', 'ẽ' => 'e', 'ẹ' => 'e',
      'ê' => 'e', 'ề' => 'e', 'ế' => 'e', 'ể' => 'e', 'ễ' => 'e', 'ệ' => 'e',
      'ì' => 'i', 'í' => 'i', 'ỉ' => 'i', 'ĩ' => 'i', 'ị' => 'i',
      'ò' => 'o', 'ó' => 'o', 'ỏ' => 'o', 'õ' => 'o', 'ọ' => 'o',
      'ô' => 'o', 'ồ' => 'o', 'ố' => 'o', 'ổ' => 'o', 'ỗ' => 'o', 'ộ' => 'o',
      'ơ' => 'o', 'ờ' => 'o', 'ớ' => 'o', 'ở' => 'o', 'ỡ' => 'o', 'ợ' => 'o',
      'ù' => 'u', 'ú' => 'u', 'ủ' => 'u', 'ũ' => 'u', 'ụ' => 'u',
      'ư' => 'u', 'ừ' => 'u', 'ứ' => 'u', 'ử' => 'u', 'ữ' => 'u', 'ự' => 'u',
      'ỳ' => 'y', 'ý' => 'y', 'ỷ' => 'y', 'ỹ' => 'y', 'ỵ' => 'y',
      'đ' => 'd',
      'À' => 'A', 'Á' => 'A', 'Ả' => 'A', 'Ã' => 'A', 'Ạ' => 'A',
      'Ă' => 'A', 'Ằ' => 'A', 'Ắ' => 'A', 'Ẳ' => 'A', 'Ẵ' => 'A', 'Ặ' => 'A',
      'Â' => 'A', 'Ầ' => 'A', 'Ấ' => 'A', 'Ẩ' => 'A', 'Ẫ' => 'A', 'Ậ' => 'A',
      'È' => 'E', 'É' => 'E', 'Ẻ' => 'E', 'Ẽ' => 'E', 'Ẹ' => 'E',
      'Ê' => 'E', 'Ề' => 'E', 'Ế' => 'E', 'Ể' => 'E', 'Ễ' => 'E', 'Ệ' => 'E',
      'Ì' => 'I', 'Í' => 'I', 'Ỉ' => 'I', 'Ĩ' => 'I', 'Ị' => 'I',
      'Ò' => 'O', 'Ó' => 'O', 'Ỏ' => 'O', 'Õ' => 'O', 'Ọ' => 'O',
      'Ô' => 'O', 'Ồ' => 'O', 'Ố' => 'O', 'Ổ' => 'O', 'Ỗ' => 'O', 'Ộ' => 'O',
      'Ơ' => 'O', 'Ờ' => 'O', 'Ớ' => 'O', 'Ở' => 'O', 'Ỡ' => 'O', 'Ợ' => 'O',
      'Ù' => 'U', 'Ú' => 'U', 'Ủ' => 'U', 'Ũ' => 'U', 'Ụ' => 'U',
      'Ư' => 'U', 'Ừ' => 'U', 'Ứ' => 'U', 'Ử' => 'U', 'Ữ' => 'U', 'Ự' => 'U',
      'Ỳ' => 'Y', 'Ý' => 'Y', 'Ỷ' => 'Y', 'Ỹ' => 'Y', 'Ỵ' => 'Y',
      'Đ' => 'D'
  ];

  // Thay thế các ký tự tiếng Việt bằng ký tự không dấu
  $text = strtr($text, $transliteration);

  // Chuyển thành chữ thường
  $text = strtolower($text);

  // Thay thế các ký tự đặc biệt và khoảng trắng bằng dấu gạch nối
  $text = preg_replace('/[^a-z0-9]+/', '-', $text);

  // Loại bỏ dấu gạch nối thừa ở đầu và cuối
  $text = trim($text, '-');

  // Trả về chuỗi slug
  return $text;
}