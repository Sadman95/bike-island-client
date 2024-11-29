## Frontend Features Update (Version 2.0.0)

### New Features

#### User Features
1. **Order Management**:
   - Users can view their order history with detailed order information, including status and items purchased.

2. **Reviews**:
   - Users can leave reviews for purchased products to share their feedback.
   - Enhanced review functionality to ensure reviews are allowed only for purchased items.

3. **Profile Update**:
   - Users can update their profile information, including name, email, and password.

4. **Add Review for Specific Product**:
   - Users can add detailed reviews for individual products they have purchased.

5. **Secure Authentication Flow**:
   - Implemented secure login and registration flow.
   - Added support for token-based authentication with JWT.
   - Integrated Auth0 for managing user authentication.
   - Features include password reset and email verification for enhanced security.
   - ![sign-up](https://github.com/user-attachments/assets/1e0928a4-30d9-413a-baf6-b3170fcf07b2)
![forgot-password](https://github.com/user-attachments/assets/e219d265-6056-4f41-bf19-673de505274a)
![login](https://github.com/user-attachments/assets/815279e1-f342-4dd8-80b9-c99698676de3)


#### Admin Features
1. **Order Management**:
   - Admins can manage orders with options to view, update, or cancel orders.
   - ![admin-orders](https://github.com/user-attachments/assets/77de4a82-4c7a-4aa0-bc34-0a48b812bc6d)


2. **Product Management**:
   - Added functionality for admins to add, update, or delete products in the catalog.
   - ![admin-products](https://github.com/user-attachments/assets/e68713eb-d69c-49e9-9217-faaed09dd6be)


3. **Customer Management**:
   - Admins can view and manage customer details and order histories.

4. **Role and Permission Management**:
   - Admins can manage roles and permissions for users and team members.
   - ![admin-role-permission](https://github.com/user-attachments/assets/f599166f-446b-4251-b657-efb9a16e7848)


5. **Team Member Management**:
   - Admins can add, edit, or remove team members and assign roles with specific permissions.
   - ![admin-teams](https://github.com/user-attachments/assets/1c48f361-6cf0-4a3a-b25b-65070e7bfcaa)

---

### UX/UI Improvements
1. **Navigation**:
   - Avatar-based dropdown menu with user actions:
     - Profile
     - Settings
     - Logout (with tooltip for logout)

2. **Infinite Scroll**:
   - Implemented infinite scrolling for product listings and reviews.

3. **Responsive Design**:
   - Fully responsive frontend for a seamless experience across all device sizes.

4. **Enhanced Review Section**:
   - Display aggregated ratings and user reviews for products in a visually appealing layout.

---

This version delivers significant upgrades to both user and admin experiences, focusing on secure authentication, order management, review functionality, profile customization, and comprehensive admin control.
