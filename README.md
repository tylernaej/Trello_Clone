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
