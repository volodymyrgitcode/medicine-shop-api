
# Project Overview

The backend is built using Node.js and Express.js, utilizing the Sequelize ORM for interacting with a MySQL relational database. The application follows a default MVC pattern.

## Tech Stack

**Client:** React

**Server:** Node, Express, Sequelize(ORM)

**Database** MySql



## Description

### Shops Table:

- id 
- name
- address
- createdAt
- updatedAt

### Medicines Table:

- id 
- name
- description
- imageUrl
- price
- stock
- createdAt
- shopId    (Foreign Key) references id in the Shops table
- updatedAt
- createdAt
- updatedAt

### Orders Table:

- id 
- username
- email
- phoneNumber
- orderDate
- totalPrice

### OrderMedicines Table:

Represents the relationship between orders and medicines.

- id 
- quantity 
- medicineId    (Foreign Key) references id in the Medicines table
- orderId   (Foreign Key) references id in the Orders table

## Relations:

```javascript
Shop.hasMany(Medicine); // Shop has many Medicines
Medicine.belongsTo(Shop); // Medicine belongs to a Shop

Medicine.hasOne(OrderMedicine); // Medicine has one OrderMedicine
OrderMedicine.belongsTo(Medicine); // OrderMedicine belongs to a Medicine

Order.hasMany(OrderMedicine); // Order has many OrderMedicines
OrderMedicine.belongsTo(Order); // OrderMedicine belongs to an Order
```

## GET Medicines endpoint:

The getMedicines endpoint retrieves a list of medicines based on specified filters and sorting criteria. It also returns paginatin data.

Response scheme:
```javascript
{
    "data": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "imageUrl": "string",
        "price": "string",
        "stock": "number",
        "createdAt": "string",
        "updatedAt": "string",
        "shopId": "string"
      }
    ],
    "pagination": {
      "total": "number",  // Number of all medicines     
      "totalPages": "number",  // Number of all pages
      "currentPage": "number",  // Current page displayed
      "perPage": "number"  // Number of medicines displayed per page
    }
}

```
Endpoint accepts the following query parameters:
- **page**: Page number.
- **perPage**: Number of medicines to display per page.
- **shopIds**: Comma-separated list of shop IDs to filter medicines by shop.
- **sortByPrice**: (asc or desc) the sorting direction.
- **sortByDate**: (asc or desc) the sorting direction.

```javascript
GET /api/medicines?page=1&perPage=10&shopIds=23f21e75-bbdd-4490-b2b6-4e59820af230&sortByPrice=asc&sortByDate=desc
```

## POST Create Order endpoint:

The order contains customer information and goods quantity

Request body scheme:

```javascript
{
  "medicines": [
    {
      "medicineId": "string",
      "quantity": "number"
    }
  ],
  "username": "string",
  "email": "string",
  "address": "string",
  "phoneNumber": "string",
  "totalPrice": "number"
}
```
```javascript
POST /api/orders
```

Endpoint functionality:
- ensures that the order is valid and that there is sufficient stock for each medicine before creating the order.

## GET Retrieve Orders endpoint:

Response body scheme:

```javascript
[
  {
    "id": "string",
    "username": "string",
    "email": "string",
    "address": "string",
    "phoneNumber": "string",
    "totalPrice": "string",
    "medicines": [
      {
        "id": "string",
        "quantity": "number",
        "name": "string",
        "description": "string",
        "imageUrl": "string",
        "price": "string",
        "shopId": "string"
      }
    ]
  }
]
```

```javascript
GET /api/orders
```

## GET Retrieve Order endpoint:

Response body scheme:

```javascript
{
    "id": "string",
    "username": "string",
    "email": "string",
    "address": "string",
    "phoneNumber": "string",
    "totalPrice": "string",
    "medicines": [
        {
        "id": "string",
        "quantity": "number",
        "name": "string",
        "description": "string",
        "imageUrl": "string",
        "price": "string",
        "shopId": "string"
        }
    ]
}
```

```javascript
GET /api/order/02c74807-aeed-4a82-8762-69d82b4bcc03
```


## How to run the application


* Clone the repository:

```
git clone <repository_url>
```
* Navigate to the project directory
```
cd <project_directory>
```

* Install dependencies:
```
npm install 
```

* Create a .env file in the root directory of your project with the necessary configuration parameters. This project requires MySQL as the database.

```
DB_NAME=<your_database_name>
DB_USER=<your_database_user>
DB_PASS=<your_database_password>
DB_HOST=<your_database_host>
DB_DIALECT=mysql
PORT=<your_application_port>
```

* Run the app:
```
node src/app.js
```


