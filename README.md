# 🍽️ Restaurant Management System

A full-stack Restaurant Management System built with **.NET 10 Web API** and **Angular 17**, using **MySQL** as the database.

## Features
- 📋 **Menu Page** — Browse all food items by category
- 🛒 **Cart** — Add/remove items, update quantities
- 💳 **Payment Page** — Place order with Cash / Card / UPI
- ⚙️ **Admin Panel** — Add, Edit, Delete menu items

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Angular 17 (Standalone Components) |
| Backend | .NET 10 Web API |
| Database | MySQL |
| ORM | Entity Framework Core (Pomelo) |

## How to Run Locally

### Prerequisites
- Node.js v18+
- .NET 10 SDK
- MySQL Server running locally

### 1. Clone the repo
```bash
git clone https://github.com/panidhargudupa/restaurant-management-system.git
cd restaurant-management-system
```

### 2. Setup Backend
```bash
cd backend/RestaurantAPI

# Update your MySQL password in appsettings.json
# Change: "Password=YOUR_MYSQL_PASSWORD" to your actual password

dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```
Backend runs at: `http://localhost:5000`

### 3. Setup Frontend
```bash
cd frontend
npm install
ng serve
```
Frontend runs at: `http://localhost:4200`

### 4. Open in browser
Go to `http://localhost:4200`

---

## 🔁 After Laptop Restart (Day to Day)

No need to run migrations again — that's only done **once**.
Just open **2 terminals** and run:

**Terminal 1 — Backend:**
```bash
cd C:\Users\PANIDHAR\projects\restaurant-management-system\backend\RestaurantAPI
dotnet run
```

**Terminal 2 — Frontend:**
```bash
cd C:\Users\PANIDHAR\projects\restaurant-management-system\frontend
ng serve
```

Then open browser → `http://localhost:4200` ✅

---

## Screenshots
> Menu Page → Cart → Payment → Order Confirmed ✅

##Intership Company
Loginware Softtech Pvt Ltd.

## Author
Panidhar Gudupa — MCA Graduate, Full Stack Developer

