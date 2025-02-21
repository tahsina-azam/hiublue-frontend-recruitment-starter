## **Setup Guide**
## Installation and Setup

1. Install dependencies:
   ```sh
   yarn
2. Start the local development server:
  ```sh
   yarn


Provided Links:

- [**Figma design link**](https://www.figma.com/design/p4aO5zxiLUkws5DDTTWP92/Untitled?node-id=0-1&t=oePPLG5LIUguMtQy-1)
- [**Postman collection**](https://documenter.getpostman.com/view/8605001/2sAYXFiHWQ)

## **Tech Stack**

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** Material UI (MUI)
- **Form Handling:** React Hook Form (validation: zod)
- **Charting:** ApexCharts
- **State Management:** Context API and LocalStorage
- **Version Control:** GitHub (Forked the repo and maintained clean commits)
- **Deployment:** Vercel

## **Features**

### **1. Authentication**

- Implemented login page functionality with api call
- Stored authentication state using **Context API and LocalStorage**.
- Made sure no unauthorized user has access to the dashboard or any other routes.
- Different layouts for **authenticated vs. non-authenticated users**. Non authenticated/ Logged users will be redirecte
d to the login page.

### **2. Admin Dashboard**

- Fetched **real-time data** from the provided API.
- Displayed the data in an table with:
  - Pagination
  - Searching
  - Filtering
- Showed **charts** based on API data using **ApexCharts**.

### **3. Sending Onboarding Offer**

- Implemented a **separate page** where the admin can send onboarding offers to new users.
- Allowed the admin to **select a user** from a list and fill in additional fields. Used MUI autocomplete and performed search using API call.
- Used **React Hook Form**.
- Validated the data before submitting using zod.

### **4. Git & Code Structure**

- Followed a **clean Git workflow** 
- Tried to write **modular, reusable, and well-structured** code.
- Ensured **proper TypeScript typings** throughout the project.

### **5. Responsive design**

- The application is responsive, adapting seamlessly to different screen sizes including mobile.

