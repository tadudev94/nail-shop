# Checklist Triển khai cho Khách hàng

Sử dụng checklist này để đảm bảo setup hoàn chỉnh.

## Pre-deployment

- [ ] Có tài khoản Supabase
- [ ] Có tài khoản Vercel
- [ ] Đã download/clone code

## Supabase Setup

- [ ] Tạo project Supabase mới
- [ ] Lưu database password
- [ ] Chạy script `001_create_products_table.sql`
- [ ] Chạy script `002_seed_products.sql`
- [ ] Chạy script `003_add_user_roles.sql`
- [ ] Copy `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copy `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copy `SUPABASE_SERVICE_ROLE_KEY`

## Vercel Deployment

- [ ] Import project vào Vercel
- [ ] Thêm `NEXT_PUBLIC_SUPABASE_URL` vào Environment Variables
- [ ] Thêm `NEXT_PUBLIC_SUPABASE_ANON_KEY` vào Environment Variables
- [ ] Thêm `SUPABASE_SERVICE_ROLE_KEY` vào Environment Variables
- [ ] Thêm `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (http://localhost:3000/admin)
- [ ] Deploy project
- [ ] Deployment thành công

## First Admin Setup

- [ ] Truy cập `https://your-domain.vercel.app/setup`
- [ ] Nhập email admin
- [ ] Nhập mật khẩu (tối thiểu 6 ký tự)
- [ ] Click "Tạo Admin đầu tiên"
- [ ] Kiểm tra email
- [ ] Click link xác nhận trong email
- [ ] Đăng nhập tại `/admin/login`

## Testing

- [ ] Trang chủ hiển thị đúng
- [ ] Sản phẩm hiển thị từ database
- [ ] Có thể đăng nhập admin
- [ ] Dashboard hiển thị thống kê
- [ ] Có thể thêm sản phẩm mới
- [ ] Có thể sửa sản phẩm
- [ ] Có thể xóa sản phẩm
- [ ] User thường không truy cập được `/admin`

## Post-deployment

- [ ] Thay đổi sản phẩm mẫu thành sản phẩm thật
- [ ] Cập nhật thông tin công ty trong footer
- [ ] Cập nhật logo/branding
- [ ] Test trên mobile
- [ ] Chia sẻ URL với team

## Optional

- [ ] Setup custom domain
- [ ] Tắt email confirmation (nếu cần) trong Supabase Auth Settings
- [ ] Thêm Google Analytics
- [ ] Setup monitoring
- [ ] Backup database

## Troubleshooting

### Không đăng nhập được
- Kiểm tra đã xác nhận email chưa
- Kiểm tra role trong database: `select * from profiles;`
- Xem console logs để debug

### Không thấy sản phẩm
- Kiểm tra đã chạy script seed chưa
- Kiểm tra RLS policies: `select * from products;`
- Xem Network tab để debug API calls

### Deploy failed
- Kiểm tra environment variables
- Kiểm tra build logs
- Đảm bảo tất cả dependencies đều có trong package.json
