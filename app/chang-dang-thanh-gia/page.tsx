
import changDangData from "./data.json";
import ChangDang from "@/components/ui/chang-dang";
import LoiChua from "@/components/ui/loi-chua";

export default function DangThanhGiaPage() {
  return (
    <main className="dangthanhgia container mx-auto px-5 py-8">
      
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Đàng Thánh Giá Năm 2025</h1>
        <div>Nguồn dữ liệu từ: <a href="https://www.vaticannews.va/vi/pope/news/2025-04/dang-thanh-gia-do-duc-thanh-cha-phanxico-soan.html" target="_blank" rel="noopener noreferrer" className="text-red-500 underline" >https://www.vaticannews.va/vi/</a></div>
      </div>

      {/* Lời mở đầu */}
      <section>
        <div>
          <img src="/img/chang-dang-thanh-gia/station00.jpg" alt="Lời Mở Đầu" />
        </div>
        <div>
          <h2>Lời Mở Đầu</h2>
          <p>Con đường lên Núi Sọ đi ngang qua những nẻo đường đời thường của chúng con. Lạy Chúa, chúng con thường bước ngược hướng với Chúa. Chính trong những lúc ấy, chúng con có thể bắt gặp khuôn mặt của Chúa, gặp được ánh mắt Chúa. Chúng con vẫn bước đi như chưa từng có gì xảy ra, còn Chúa thì đến với chúng con. Đôi mắt Chúa đọc thấu tâm can chúng con. Khi ấy, chúng con chần chừ không muốn tiếp tục như thể chẳng có gì thay đổi. Chúng con có thể quay lại, nhìn Chúa, và theo Chúa. Chúng con có thể hòa mình vào cuộc khổ nạn của Chúa và nhận ra rằng đã đến lúc phải đổi hướng.</p>
          <LoiChua
            reference="Trích Phúc Âm theo Thánh Máccô (10,21)"
            content="Đức Giê-su đưa mắt nhìn anh ta và đem lòng yêu mến. Người bảo anh ta : “Anh chỉ thiếu có một điều, là hãy đi bán những gì anh có mà cho người nghèo, anh sẽ được một kho tàng trên trời. Rồi hãy đến theo tôi.”"
          />
          <p>Lạy Chúa Giêsu, Tên của Chúa thật đúng là “Thiên Chúa cứu độ”. Chúa là Thiên Chúa của Abraham, Đấng kêu gọi; Thiên Chúa của Isaac, Đấng quan phòng; Thiên Chúa của Giacóp, Đấng chúc lành; Thiên Chúa của Israel, Đấng giải thoát. Trong ánh mắt Chúa, lạy Chúa, Đấng đang bước qua Giêrusalem, có một mạc khải trọn vẹn. Trong những bước chân Chúa rời khỏi thành, có cuộc xuất hành của chúng con hướng về miền đất mới. Chúa đến để biến đổi thế gian, và điều đó có nghĩa là chúng con phải đổi hướng, nhận ra sự thiện hảo nơi dấu chân Chúa, để ký ức về ánh mắt Chúa tiếp tục làm việc trong lòng chúng con.</p>
          <p>Đàng Thánh Giá là lời cầu nguyện của những người đang chuyển động. Nó làm gián đoạn những lộ trình quen thuộc của chúng con, để từ sự mệt mỏi, chúng con tiến đến niềm vui. Quả thật, con đường của Chúa Giêsu đòi hỏi chúng ta phải trả giá: trong một thế giới tính toán mọi thứ, sự nhưng không có một cái giá rất đắt. Nhưng trong sự trao ban, mọi sự đều hồi sinh: một thành phố bị chia rẽ bởi các phe phái và xung đột sẽ hướng đến hòa giải; một đời sống đạo khô cằn sẽ tìm lại được sức sống nơi những lời hứa của Thiên Chúa; ngay cả một trái tim chai đá cũng có thể trở nên trái tim bằng thịt. Chỉ cần lắng nghe lời mời gọi: “Hãy đến! Theo Ta!”. Và tin tưởng vào ánh mắt yêu thương ấy.</p>
        </div>
      </section>
      {/* Lặp qua từng chặng và hiển thị */}
      {changDangData.map((item, idx) => (
        <ChangDang key={idx} data={item} index={idx + 1} />
      ))}
      <section className="mb-10">
        <div>
          <img src="/img/chang-dang-thanh-gia/station99.jpg" alt="Lời Nguyện Kết Thúc" />
        </div>
        <div>
          <h2>Lời Nguyện Kết Thúc</h2>
          <p>“Laudato si', mi' Signore” – “Ngợi khen Chúa, lạy Chúa của con”, Thánh Phanxicô Assisi đã ca lên. Trong bài ca tuyệt vời này, Chúa nhắc nhở chúng ta rằng ngôi nhà chung của chúng ta cũng giống như một người chị... Người chị này kêu than vì những tổn hại chúng ta gây ra cho mẹ đất (Thông điệp Laudato si', 1-2).</p>
          <p>“Fratelli tutti” – “Tất cả anh em”, Thánh Phanxicô viết để gửi đến mọi người anh chị em và đề nghị một lối sống mang hương vị Tin Mừng (Thông điệp Fratelli tutti, 1).</p>
          <p>"Người đã yêu thương chúng ta", Thánh Phaolô nói về Đức Kitô... để giúp chúng ta khám phá rằng không có gì có thể tách chúng ta ra khỏi tình yêu này (Thông điệp Dilexit nos, 1).</p>
          <p>Chúng con đã đi qua Đàng Thánh Giá; chúng con đã hướng về tình yêu mà không gì có thể chia lìa. Giờ đây, khi vị Vua ngủ và một sự thinh lặng lớn lao bao trùm khắp mặt đất, chúng con nguyện xin ơn trở về với Chúa bằng chính lời của Thánh Phanxicô:</p>
          <p className="text-lg md:text-2xl/loose! font-semibold italic my-10!">Lạy Thiên Chúa cao cả và vinh quang,<br/>xin soi sáng vào bóng tối trong lòng con.<br/>Xin ban cho con đức tin chân chính,<br/>niềm hy vọng vững vàng,<br/>tình yêu trọn hảo,<br/>và lòng khiêm nhường sâu thẳm.<br/>Xin ban cho con sự khôn ngoan và phân định<br/>để thực hiện thánh ý Chúa. Amen.</p>
        </div>
      </section>
    </main>
  );
}
