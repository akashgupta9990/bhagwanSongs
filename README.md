# Welcome to your Expo app 👋

npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @expo/vector-icons expo-av firebase expo-speech

npm install @react-navigation/native @react-navigation/native-stack react-native-vector-icons nativewind
npx expo install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated react-native-vector-icons

Settings, Festival Calendar, or Daily Aarti?

If you haven't already:
Go to https://console.firebase.google.com

Click “Create Project” → Name it Bhaktipath

Register a Web App inside this project:

Click "Add App" → Select </> (Web app)

Name it bhaktipath-client

Copy the config shown (looks like below):

js
Copy
Edit
// Example Firebase config
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "bhaktipath.firebaseapp.com",
  projectId: "bhaktipath",
  storageBucket: "bhaktipath.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
In your project folder, create firebase.js:

js
Copy
Edit
// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // paste your config here
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
✅ 3. Install Firebase SDK
Install required Firebase libraries:

bash
Copy
Edit
npm install firebase

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
