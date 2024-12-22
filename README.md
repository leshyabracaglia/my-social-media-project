# Hi <3

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the frontend

   ```bash
    npx expo start
   ```

3. Enter backend env

   ```bash
    cd backend/
    source ./venv/bin/activate
   ```

4. Start backend

   ```bash
    python3 main.py
   ```

5. Start SQL docker container

   ```bash
    cd sql
    docker-compose up
   ```

6. Create ngrok public endpoint for backend api

   ```bash
    ngrok http http://127.0.0.1:5000
   ```

7. In useBackend.ts, replace value of BACKEND_URL with provided public ngrok url

Enter sql database:
docker exec -it my-social-media-project-db psql -U postgres

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
