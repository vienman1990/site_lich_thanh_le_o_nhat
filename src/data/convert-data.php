<?php

// convert-data.php
// Chạy: php convert-data.php
// Sẽ tạo/ghi đè file masses.json (cùng thư mục hoặc thay đổi đường dẫn)

// Đường dẫn file
$rawFile = 'rawdata.txt';
$outputFile = __DIR__ . '/masses.json';  // Hoặc '../src/data/masses.json' tùy cấu trúc project

if (!file_exists($rawFile)) {
    die("Không tìm thấy file $rawFile\n");
}

$lines = file($rawFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$year = date('Y') + (date('m') == 12 ? 1 : 0); // Tự động chuyển năm nếu đang tháng 12
// $year = 2026; // Hoặc hardcode nếu muốn chắc chắn

$massesByDate = [];
$currentDateKey = null; // Lưu ngày hiện tại để dùng cho các dòng không có ngày

foreach ($lines as $line) {
    $line = trim($line);
    if ($line === '') continue;

    // Case 1: Dòng có ngày tháng đầy đủ → DD/MM : giờ : mô tả
    if (preg_match('/^(\d{2}\/\d{2})\s*:\s*(\d+g?\d*)\s*:\s*(.+)$/', $line, $matches)) {
        [, $datePart, $timePart, $description] = $matches;

        [$day, $month] = explode('/', $datePart);
        $currentDateKey = sprintf('%04d-%02d-%02d', $year, $month, $day);

        $time = normalizeTime($timePart);
        $item = parseDescription($description);
        $item['time'] = $time;

        $massesByDate[$currentDateKey][] = $item;
    }
    // Case 2: Dòng không có ngày tháng → chỉ có giờ : mô tả (dùng ngày của dòng trên)
    elseif ($currentDateKey && preg_match('/^(\d+g?\d*)\s*:\s*(.+)$/', $line, $matches)) {
        [, $timePart, $description] = $matches;

        $time = normalizeTime($timePart);
        $item = parseDescription($description);
        $item['time'] = $time;

        $massesByDate[$currentDateKey][] = $item;
    }
    else {
        echo "Bỏ qua dòng không nhận diện được: $line\n";
    }
}

// Sắp xếp ngày và giờ trong mỗi ngày
ksort($massesByDate);
foreach ($massesByDate as &$masses) {
    usort($masses, fn($a, $b) => $a['time'] <=> $b['time']);
}

// Hàm hỗ trợ chuẩn hóa giờ
function normalizeTime(string $timePart): string {
    $time = str_replace('g', ':', $timePart);
    // Thêm số 0 đầu nếu cần: 9g00 → 09:00
    if (strlen($time) === 4 && $time[1] === ':') {
        $time = '0' . $time;
    }
    return str_pad($time, 5, '0', STR_PAD_LEFT); // Đảm bảo HH:MM
}

// Hàm tách title và celebrant
function parseDescription(string $description): array {
    $title = trim($description);
    $celebrant = null;

    // Fix lỗi chính tả phổ biến
    $title = strtr($title, [
        'nhàthờ' => 'nhà thờ',
        // 'chi-Ken' => 'Aichi-Ken',
        'ChaNhật' => 'Cha Nhật',
        'ChaHùng' => 'Cha Hùng',
        'ChaTƣờng' => 'Cha Tường',
        'Cha Tƣờng' => 'Cha Tường',
        'Cha Phƣơng' => 'Cha Phương',
        'ChaTƣờng' => 'Cha Tường',
    ]);

    if (preg_match('/\(([^)]+)\)$/', $title, $cMatches)) {
        $celebrant = trim($cMatches[1]);
        $title = trim(preg_replace('/\s*\([^)]+\)$/', '', $title));
    }

    return [
        'title' => $title,
        'celebrant' => $celebrant
    ];
}

// Tạo JSON
$jsonContent = json_encode($massesByDate, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if ($jsonContent === false) {
    die("Lỗi encode JSON\n");
}

// Tạo thư mục nếu cần
$dir = dirname($outputFile);
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

file_put_contents($outputFile, $jsonContent);

echo "Đã tạo thành công file $outputFile\n";
echo "Tổng cộng: " . count($massesByDate) . " ngày lễ, với " . array_sum(array_map('count', $massesByDate)) . " thánh lễ.\n";