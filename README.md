# ecom-backoffice

## 📋 Overview
This project is a backoffice system for e-commerce designed to handle essential operations such as products & inventory management, customer management, and order management. The goal is to provide seamless control over core business processes to help businesses operate efficiently.

## 🚀 Features
1. Product & Inventory Management
- Add, update, delete, and list products.
- Manage stock inventory.
2. Customer Management
- CRUD operations for customer information.
- Track customer purchase history and preferences.
3. Order Management
- Process new orders and track their status (e.g., pending, confirmed, canceled).
- Manage returns, cancellations, and refunds.
4. Authentication & Security
- Secure login and role-based access management with Keycloak.
- User roles (e.g., Admin, Product Manager, Order Manager).
  
## 🛠️ Tech Stack
- Backend: Spring Boot 3 (Java)
- Frontend: React.Js (Material UI)
- Database: H2
- Authentication & Authorization: Keycloak
- Build Tool: Maven
- Containerization: Docker

## ⚙️ Project Setup
1. Prerequisites
- Java 17+ installed
- Node.js (for React frontend)
- H2 Database (In Memory Storing)
- Keycloak instance (or Docker container)

2. Microservices (Backend) Setup

```bash
# Clone the repository
git clone https://github.com/AissyAchraf/ecom-backoffice.git

# Navigate into the directory
cd ecom-backoffice

# Navigate into the each microservice directory (for example inventory-microservice)
cd invertory-microservice

# Install dependencies and build the project
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```
3. Frontend Setup

```bash
# Navigate to the frontend directory
cd ecom-frontend

# Install dependencies
npm install

# Run the development server
npm start
```

4. Keycloak Configuration

Run a keycloak instance with the configuration below or just use the Dockerfile in this repository to run keycloak container

- Use Dockerfile
```bash
docker build -t keycloak .

docker run -d --name keycloak-container -p 8080:8080 \
-e KEYCLOAK_ADMIN=admin \
-e KEYCLOAK_ADMIN_PASSWORD=admin \
keycloak
```

- Use local keycloak instance
```bash
keycloak.auth-server-url=http://localhost:8080/
keycloak.realm=ecom-realm
keycloak.resource=ecom-client
```

## 🔄 API Endpoints
- Products
  - GET /api/products – Get all products.
  - POST /api/products/create – Add a new product.

## 📝 Contact
For questions or support, contact:
📧 achrafaissy1@gmail.com
