$(document).ready(function()
            {
                // Hàm active tab nào đó
                function activeTab(obj)
                {
                    // Xóa class active tất cả các tab
                    $('.film__content--header span').removeClass('active');

                    // Thêm class active vòa tab đang click
                    $(obj).addClass('active');

                    // Lấy href của tab để show content tương ứng
                    var id = $(obj).data('tab');
                    // Ẩn hết nội dung các tab đang hiển thị
                    $('.tab-item').hide();

                    // Hiển thị nội dung của tab hiện tại
                    $('#' + id).show();
                }

                // Sự kiện click đổi tab
                $('.film__content--header span').click(function(){
                    activeTab(this);
                    return false;
                });

                // Active tab đầu tiên khi trang web được chạy
                activeTab($('.film__content--header span:first-child'));
            });