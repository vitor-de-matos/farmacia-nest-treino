# 🏥 Pharmacy Management System

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Last Commit](https://img.shields.io/github/last-commit/vitor-de-matos/farmacia-nest-treino)](https://github.com/vitor-de-matos/farmacia-nest-treino/commits)
[![Stars](https://img.shields.io/github/stars/vitor-de-matos/farmacia-nest-treino?style=social)](https://github.com/vitor-de-matos/farmacia-nest-treino)

📄 This README is also available in [Português 🇧🇷](./README.pt-BR.md)

---

## 💡 Description

This is a backend project for a pharmacy management system built with NestJS, using PostgreSQL and TypeORM. It provides features like inventory control, sales, product registration, employee access control, and more.

---

## 🛠️ Technologies Used

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- JWT for authentication
- Swagger for API documentation
- Multer for file uploads
- Dotenv for environment variables
- Class-validator for request validation
- Global exception filter for error handling

---

## 📦 Installation

```bash
git clone https://github.com/vitor-de-matos/farmacia-nest-treino.git
cd farmacia-nest-treino
npm install
cp .env.example .env
```

> ✏️ Edit the `.env` file with your PostgreSQL credentials and other settings.

```bash
npm run start:dev
```

> ⚠️ When connected to a valid PostgreSQL database, all tables will be created automatically via TypeORM.

---

## 🧪 Seed

```bash
npm run start:seed
```

Creates an **admin user**:

- Login: `admin`
- Password: `admin`

> 🔒 It's recommended to change the password after logging in.

---

## 🚪 Protected Routes

Most routes require JWT authentication. After login, use the token in the request header:

```
Authorization: Bearer <token>
```

---

## 📄 Swagger Documentation

You can access the interactive API docs at:

```
http://localhost:3000/api
```

> Swagger documentation includes DTO descriptions and is planned to include more examples and error messages soon.

---

## 📁 Project Structure

```
src/
├── auth/               # Authentication (login, JWT)
├── batch/              # Product batches
├── batchPromotion/     # Batch promotions
├── category/           # Product categories
├── employee-login/     # Employee access
├── itemSale/           # Items in a sale
├── manufacturer/       # Manufacturers
├── media/              # File upload handling
├── payment/            # Payment logic
├── person/             # People (employees, customers)
├── products/           # Product management
├── sales/              # Sales and orders
├── shared/             # Reusable components (DTOs, filters, configs)
├── stock/              # Stock management
├── app.module.ts       # Root module
├── main.ts             # Application entry point
├── seed.ts             # Seed script for initial data
```

---

## 📌 Features

- ✅ JWT authentication
- ✅ Products, categories, manufacturers
- ✅ Inventory by batch/expiration
- ✅ Sales with multiple items
- ✅ Image upload
- ✅ Pagination and filters
- ✅ Swagger (basic)
- ✅ Admin user seed
- ✅ Global error filter
- ✅ DTO validation

---

## 📈 Future Improvements

- Standard API responses
- Enhanced Swagger documentation (examples, errors)
- Custom exception classes
- Structured logging (e.g. with Winston or Pino)
- Unit and integration tests
- Docker support
- Role-based access control

---

## 📢 Developer Note

> This project was created as a personal learning exercise with NestJS.  
> Some features are still in progress or may be refactored.  
> Feel free to use, test, or contribute as you wish.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
