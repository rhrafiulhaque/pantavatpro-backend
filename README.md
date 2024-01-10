# Pantavat API Documentation

Welcome to the Pantavat API documentation. Pantavat is a platform that allows users to explore and order delicious food items. This API provides endpoints for managing reviews, user authentication, categories, food items, orders, and more.

## Table of Contents

1. [Review Routes](#review-routes)
2. [Auth Routes](#auth-routes)
3. [Category Routes](#category-routes)
4. [Food Routes](#food-routes)
5. [Order Routes](#order-routes)

## Review Routes

### 1. Add Review

- **Route**: `/add-review`
- **Method**: `POST`
- **Description**: Adds a new review.
- **Middleware**:
  - `validateRequest(reviewValidation.reviewAddZodSchema)`: Validates the request payload.
- **Controller**: `reviewController.addReview`

### 2. Get Reviews by Food ID

- **Route**: `/getReview/:foodId`
- **Method**: `GET`
- **Description**: Retrieves reviews for a specific food item.
- **Controller**: `reviewController.getReviewsByFoodId`

### 3. Get All Reviews (Admin)

- **Route**: `/getAllReview`
- **Method**: `GET`
- **Description**: Retrieves all reviews. Requires Admin privileges.
- **Middleware**:
  - `auth(ENUM_USER_ROLE.ADMIN)`: Validates Admin authentication.
- **Controller**: `reviewController.getAllReview`

### 4. Get Feedback

- **Route**: `/getfeedback`
- **Method**: `GET`
- **Description**: Retrieves feedback from reviews.
- **Controller**: `reviewController.getFeedBack`

### 5. Get Reviews by User Email

- **Route**: `/getReviewsByUserEmail/:email`
- **Method**: `GET`
- **Description**: Retrieves reviews by user email.
- **Middleware**:
  - `getEmailAuth()`: Authenticates user by email.
- **Controller**: `reviewController.getReviewsByUserEmail`

## Auth Routes

### 1. Log In

- **Route**: `/login`
- **Method**: `POST`
- **Description**: Logs in a user.
- **Middleware**:
  - `validateRequest(authValidation.logInZodSchema)`: Validates the request payload.
- **Controller**: `authController.logIn`

### 2. Refresh Token

- **Route**: `/refreshtoken`
- **Method**: `POST`
- **Description**: Refreshes the user's authentication token.
- **Middleware**:
  - `validateRequest(authValidation.refreshTokenZodSchema)`: Validates the request payload.
- **Controller**: `authController.refreshToken`

## Category Routes

### 1. Add Category Item

- **Route**: `/add-category-item`
- **Method**: `POST`
- **Description**: Adds a new category item.
- **Middleware**:
  - `validateRequest(CategoryValidation.CategoryValidationZodSchema)`: Validates the request payload.
- **Controller**: `categoryController.addCategory`

### 2. Get All Categories

- **Route**: `/get-all-category`
- **Method**: `GET`
- **Description**: Retrieves all categories.
- **Controller**: `categoryController.getAllCategory`

### 3. Get Category by Name

- **Route**: `/categoryname/:category`
- **Method**: `GET`
- **Description**: Retrieves a category by name.
- **Controller**: `categoryController.getCategoryByName`

## Food Routes

### 1. Add Food Item

- **Route**: `/add-food-item`
- **Method**: `POST`
- **Description**: Adds a new food item.
- **Middleware**:
  - `auth(ENUM_USER_ROLE.ADMIN)`: Validates Admin authentication.
  - `validateRequest(FoodValidation.foodItemAddZodSchema)`: Validates the request payload.
- **Controller**: `foodController.addFoodItem`

### 2. Update Food

- **Route**: `/updateFood`
- **Method**: `PATCH`
- **Description**: Updates a food item.
- **Middleware**:
  - `auth(ENUM_USER_ROLE.ADMIN)`: Validates Admin authentication.
- **Controller**: `foodController.updateFood`

### 3. Get All Foods

- **Route**: `/get-all-foods`
- **Method**: `GET`
- **Description**: Retrieves all food items.
- **Controller**: `foodController.getAllFoods`

### 4. Get Foods by Menu

- **Route**: `/getfoodsbymenu/:menuname`
- **Method**: `GET`
- **Description**: Retrieves food items by menu name.
- **Controller**: `foodController.getFoodsByMenu`

### 5. Get Foods by ID

- **Route**: `/getfoodsbyid/:foodId`
- **Method**: `GET`
- **Description**: Retrieves a food item by ID.
- **Controller**: `foodController.getFoodsById`

### 6. Get Search Food

- **Route**: `/getsearchfood/:searchKeyword`
- **Method**: `GET`
- **Description**: Searches for food items based on a keyword.
- **Controller**: `foodController.getSearchFood`

## Order Routes

### 1. Add Order

- **Route**: `/add-order`
- **Method**: `POST`
- **Description**: Adds a new order.
- **Middleware**:
  - `auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER)`: Validates Admin or User authentication.
- **Controller**: `orderController.addOrder`

### 2. Success Payment

- **Route**: `/payment/success/:tranId`
- **Method**: `POST`
- **Description**: Handles successful payment and updates order status.
- **Controller**: `orderController.successPayment`

### 3. Update Delivery Status

- **Route**: `/update-delivery-status`
- **Method**: `PATCH`
- **Description**: Updates the delivery status of an order.
- **Middleware**:
  - `auth(ENUM_USER_ROLE.ADMIN)`: Validates Admin authentication.
- **Controller**: `orderController.updateDeliveryStatus`

### 4. Get All Orders (Admin)

- **Route**: `/getAllOrders`
- **Method**: `GET`
- **Description**: Retrieves all orders. Requires Admin privileges.
- **Middleware**:
  - `auth(ENUM_USER_ROLE.ADMIN)`: Validates Admin authentication.
- **Controller**: `orderController.getAllOrders`

### 5. Get Order List by Email

- **Route**: `/getOrderListByEmail/:email`
- **Method**: `GET`
- **Description**: Retrieves orders by user email.
- **Middleware**:
  - `getEmailAuth()`: Authenticates user by email.
- **Controller**: `orderController.getOrderListByEmail`
