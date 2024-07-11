USER MANUAL

1. git clone https://github.com/mitchspiron/SLACK-CLONE-NOVITY.git

2. create a .env file in the server project root and paste these requirements below:

PORT = 3000
DATABASE_URL="mysql://root:@localhost:3306/slack-clone?schema=public"

JWT_SECRET="Sekire_maFybE"
JWT_EXPIRY="1d"

URL_BACK= "http://localhost:3000"

#client server url here
URL_FRONT= "http://localhost:5173"

Run a MySql server

3. Back to root

4. cd server
5. npm install
6. npx prisma db push
7. nest start --watch

8. Back to root
9. cd client
10. npm install
11. npm run dev

NB: Make sure the client serve url will be in URL_BACK

You can test all api endpoint by checking all controllers in the backend.

You can navigate in front too. Till now, only auth and chat message between users works. Channel features will be implemented soon.

Les parties cotées serveurs fonctionnent toutes. Il ne reste que l'implémentation du canal et tout sera OK.

A request from Trello will be sent to you so that you can chek my task management.
