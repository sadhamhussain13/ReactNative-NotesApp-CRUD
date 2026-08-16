# 📝 Notes App

A simple Notes mobile application built with **React Native** and **Expo**.

This project was created as a first React Native application to learn the fundamentals of mobile app development, navigation, state management, CRUD operations, and local data storage.

---

## 🚀 Features

- Create notes
- View individual notes
- Edit existing notes
- Delete notes
- Delete confirmation
- Navigation between screens
- Shared note state using React Context
- Responsive UI using React Native components
- Local persistence with AsyncStorage *(planned / in progress)*

---

## 🛠️ Technologies Used

- React Native
- Expo
- Expo Router
- TypeScript
- React Context API
- AsyncStorage
- JavaScript / TypeScript

---

## 📁 Project Structure

```text
notes-app/
│
├── src/
│   │
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── create.tsx
│   │   ├── view.tsx
│   │   └── edit.tsx
│   │
│   └── context/
│       └── NotesContext.tsx
│
├── assets/
│
├── scripts/
│
├── package.json
├── tsconfig.json
├── app.json
└── README.md

## Get started

1. Clone the project:

   ```bash
   git clone <your-repository-url>
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Chart

                    Home
                     │
             ┌───────┴───────┐
             │               │
             ▼               ▼
        Create Note       Select Note
             │               │
             ▼               ▼
          Save Note       View Note
             │               │
             ▼          ┌────┴────┐
            Home         │         │
                         ▼         ▼
                       Edit      Delete
                         │         │
                         ▼         ▼
                       Save       Home
                         │
                         ▼
                        View