Welcome to the wiki for [Stratify](https://trello-tyler.herokuapp.com/), a [Trello](https://trello.com/) clone.

## Wiki Links
- [API routes](https://github.com/tylernaej/Trello_Clone/wiki/API-Routes)
- [Database Schema](https://github.com/tylernaej/Trello_Clone/wiki/Database-Schema)
- [Features List](https://github.com/tylernaej/Trello_Clone/wiki/Features-List)
- [Redux State Shape](https://github.com/tylernaej/Trello_Clone/wiki/Redux-State-Shape)
- [User Stories](https://github.com/tylernaej/Trello_Clone/wiki/User-Stories)
- [Wireframes](https://github.com/tylernaej/Trello_Clone/wiki/Wireframes)

## Technologies

### Frontend
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Backend
- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

### Hosting
- ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)


## Pages

### Splash Page

![image](https://user-images.githubusercontent.com/104518737/194787295-f94c699f-63e6-4829-a86a-64f1490b69ad.png)

### Home Page

![image](https://user-images.githubusercontent.com/104518737/194787421-618d31c6-8edb-4683-8389-3a3ca0037371.png)

### Board View

![image](https://user-images.githubusercontent.com/104518737/194787461-5a74dc77-f6a1-42fa-adee-a3f8b5e0b855.png)

### Card View

![image](https://user-images.githubusercontent.com/104518737/194787482-74edbc38-c5d4-40cd-b40b-d2d231f15037.png)

### Log-in

![image](https://user-images.githubusercontent.com/104518737/194787317-de8cefb6-7c3d-4ea0-a858-595aee7492df.png)

### Sign-up

![image](https://user-images.githubusercontent.com/104518737/194787335-9310a2db-80c2-4833-ad7d-6148f5f867f9.png)

## Run Locally
- Clone the repository
- cd into the project directory and run ``pipenv install`` 
- Create a ``.env`` file in the root of the project and add the following variables
```
SECRET_KEY=<<SECRET_KEY>>
DATABASE_URL=sqlite:///dev.db
```
- Create another ``.env`` file in the root of the react-app directory and add the following variables
```
REACT_APP_BASE_URL=http://localhost:5000
```
- You will need two terminals to run this locally.
- The first terminal will be used for the backend server, run ``pipenv shell``
- Then run the following commands in the terminal
```
flask db upgrade
flask seed all
```
- The second terminal will be used for the frontend server. cd into the react-app directory and run the following commands
```
npm install
```
- Finally run the following command in the second terminal while still in the react-app directory
```
npm start
```
