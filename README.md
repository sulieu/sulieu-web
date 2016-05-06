# sulieu-web

> Tóm lược và hiển thị trực quan các thời kỳ, sự kiện, nhân vật lịch sử trên một trục thời gian.

## Giới thiệu

sulieu-web là ứng dụng web được phát triển với mục đích ban đầu để minh họa cho khả năng trình bày 
các nội dung lịch sử phổ thông dưới hình thức trực quan sinh động, cụ thể là kết hợp hình ảnh, phim với 
tư liệu văn bản (tóm tắt) và sắp xếp trực quan trên trục thời gian, nhằm giúp người xem có thể nhanh
chóng hình dung và dễ dàng ghi nhớ thông tin cũng như thời điểm của các sự kiện, nhân vật lịch sử quan
trọng trong lịch sử dựng nước và giữ nước của dân tộc ta.

* Ví dụ về cách bố trí các thời kỳ lịch sử: [trục thời gian theo chiều dọc](http://suviet.net/dong-thoi-gian/thoi-ky-lich-su)
* Ví dụ về cách bố trí thông tin chi tiết nhân vật lịch sử: [trục thời gian theo chiều ngang](http://suviet.net/dong-thoi-gian/nhan-vat/ngo-quyen)

Ứng dụng được triển khai thử nghiệm và liên tục cập nhật trên trang web [suviet.net](http://suviet.net/).

> Lưu ý: Trang web suviet.net chỉ mang tính minh họa cho chức năng của ứng dụng, mặc dù đã cố gắng hết sức
> trong việc chọn lọc thông tin hiển thị, xong không thể tránh khỏi tất cả mọi vấn đề về bản quyền hoặc
> tính chính xác của dữ liệu. Nếu có dữ liệu nào vi phạm trong thời gian chạy thử, xin quý vị vui lòng 
> gửi thư yêu cầu (dỡ bỏ nội dung) về địa chỉ: contact@suviet.net. Mọi thắc mắc về chính sách nội dung 
> xin vui lòng xem trong trang [Phủ nhận chung](http://suviet.net/dong-thoi-gian/phu-nhan-chung).

## Dành cho nhà phát triển

Vì đây là phần mềm mã nguồn mở, nên chúng tôi rất mong những quý vị nào là nhà phát triển ứng dụng dành
chút thời gian quý báu tham gia đóng góp ý kiến, kiểm thử, cài đặt, lập trình bổ sung tính năng, v.v. cho
ứng dụng này. Phần nội dung dưới đây sẽ hướng dẫn tải mã nguồn bằng __git__ và cài đặt chạy ứng dụng. Chúng
tôi giả định rằng các nhà phát triển đã biết về Node.js và cách thức quản lý dự án lập trình trên Node.js.
Với những quý vị chưa tiếp cận Node.js bao giờ, vui lòng dành thời gian tham khảo trước các tài liệu.

### Tải mã nguồn phần mềm

Tải mã nguồn phần mềm từ kho github:

```
$ git clone https://github.com/sulieu/sulieu-web.git
```

Chuyển đến làm việc tại thư mục `sulieu-web` này:

```
$ cd sulieu-web
```

Cài đặt các module Nodejs mà ứng dụng phụ thuộc bằng `npm`:

```
$ npm install
```

### Cấu hình cơ sở dữ liệu

Dữ liệu dùng để chạy ứng dụng sulieu-web. Dữ liệu bao gồm 2 loại:

* Các tệp hình ảnh.
* Dữ liệu xuất (dump) từ CSDL MongoDB.

Khi clone mã nguồn sulieu-web, tất cả dữ liệu này đồng thời được tải luôn về thư mục
`./data` của sulieu-web. Đối với các tệp hình ảnh, chúng ta không cần phải làm gì cả.
Đối với dữ liệu xuất từ MongoDB, chúng ta thực hiện `restore` trở lại theo các bước sau:

Mở cửa sổ dòng lệnh (Terminal), chuyển vào làm việc trong thư mục `./data/mongodata`.

Chạy các lệnh `mongorestore` để khôi phục dữ liệu vào mongodb:

```bash
mongorestore -d suviet-timeline ./suviet-timeline
mongorestore -d suviet-skywall  ./suviet-skywall
```

Sau khi thực hiện xong, kiểm tra lại bằng cách dùng `mongo` để truy vấn dữ liệu:

```
$ mongo
> use suviet-timeline
> db.figure.find()
```

Nếu hiển thị danh sách các danh nhân lịch sử, có thể xem quá trình import thành công.

### Chạy ứng dụng 

Chạy ứng dụng `suviet-web`:

```
$ NODE_DEVEBOT_PROFILE=console NODE_DEVEBOT_SANDBOX=demo node app.js
```

Mở trình duyệt web (tốt nhất là Chrome) và gõ địa chỉ http://localhost:7979.

> Bất cứ thắc mắc nào xin vui lòng liên hệ với chúng tôi theo địa chỉ email đã cung cấp bên trên.

Xin chân thành cảm ơn.

