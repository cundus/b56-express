// DTO - Data Transfer Object
// adalah objek yang berisikan informasi yang dibutuhkan oleh aplikasi dalam pengelolaan data
// DTO digunakan untuk mempermudah proses validasi

export interface LoginDto {
   username: string;
   password: string;
}

export interface RegisterDto {
   email: string;
   fullname: string;
   password: string;
   username?: string;
}
