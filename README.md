# Renta - Airbnb Clone MVP

## Project Description

Renta is an MVP clone of Airbnb where users can browse, list, favorite, and reserve properties. The project includes secure authentication, listing management, reservation features, and a fully responsive interface.

---

## Tech Stack

### Frontend and Backend:

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand

### Database:

- **Database**: MongoDB Atlas
- **ORM**: Prisma

### Authentication:

- **Authentication**: NextAuth.js
- **Password Encryption**: bcrypt.js

### Image Upload:

- **Image Upload Service**: Cloudinary

### Notifications:

- **Notifications**: react-hot-toast

### Map Integration:

- **Map Component**: Leaflet map library

---

## Features

### 1. Listings

- View all available property listings.
- Add personal property listings by selecting:
  - Category
  - Location (with interactive map)
  - Room count, Guest count, Bathroom count
  - Property title and description
  - Property image
  - Price
- Users can view and manage their own listings (My Properties).
- Users can delete their listings.
- View reservations made on a property.

### 2. Favorites

- Add properties to a favorites list.
- View the list of favorite properties.

### 3. Reservations

- Reserve a property by selecting a listing and date range.
- View upcoming trips.
- View past reservations.
- Cancel reservations.
- Once a property is reserved, no other user can reserve it for the same dates.
- If a reservation is canceled, it becomes available for others to reserve.

### 4. Property Filters

- Filter properties based on:
  - Location
  - Category
  - Room count, Guest count, Bathroom count
- Remove filters to reset the search.

### 5. Security & User Experience

- Full user authentication with secure login/logout using NextAuth.js.
- Passwords are encrypted with bcrypt.js for enhanced security.
- All features are available only to authenticated users.
- Loading and error states are implemented for smooth interaction.
- Fully responsive design.

---

## Project Workflow

1. **Browse Listings**: Users can view all available listings.
2. **Add a Listing**: Logged-in users can add their own property listings with images.
3. **Manage Listings**: View and delete owned listings under the "My Properties" section.
4. **Favorite a Property**: Users can add properties to their favorites list for quick access.
5. **Reserve a Property**: Users can reserve available properties for specific dates.
6. **Cancel Reservation**: Users can cancel their reservations if needed, freeing the dates for other users.
7. **View Reservations & Trips**: See upcoming and past trips/reservations.

---

## Future Enhancements

- Implement reviews and ratings for properties.
- Add dynamic pricing options for property owners.
- Enable messaging between users and property owners.

---

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/renta-airbnb-clone.git
   cd renta-airbnb-clone
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables for:

   - MongoDB Atlas
   - Cloudinary
   - NextAuth.js

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Conclusion

Renta is a simple yet powerful Airbnb clone MVP that provides users with a fully functional platform to list, browse, and reserve properties. It offers a smooth user experience with secure authentication, responsive design, and real-time data updates.
