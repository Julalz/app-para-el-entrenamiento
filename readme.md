# APP PARA EL ENTRENAMIENTO

## Instalación y Ejecución del proyecto

1. Moverse dentro de la carpeta del repositorio.
2. Ejecutar `npm install`.
3. Crear el fichero `.env` con las variables propias de nuestro proyecto en local. Si en vez de crearlo lo estamos clonando copiar variables del fichero `template.env` o `env.sample`.
4. Ejecutar script nodemon `"npm run dev"`.

## Endpoints API

### API Users - /api/v1/users/

| Method |               userRouter                |     usersControllers     |  Type   |                                                   Description |
| :----- | :-------------------------------------: | :----------------------: | :-----: | ------------------------------------------------------------: |
| GET    |          /api/v1/users/profile          |       userProfile        | Privado | Muestra el perfil del usuario que esta logeado en ese momento |
| POST   |          /api/v1/users/signup           |      createAccount       | Pública |                               Permite el registro del usuario |
| POST   |           /api/v1/users/login           |        loginUser         | Pública |                                   Permite al usuario logearse |
| POST   | /api/v1/users/profile/:userId/favorites |   addExerciseFavorites   | Privado |              Permite al usuario añadir ejercicios a favoritos |
| GET    | /api/v1/users/profile/:userId/favorites | getUserExerciseFavorites | Privado |               Permite al usuario ver los ejercicios favoritos |
| DELETE | /api/v1/users/profile/:userId/favorites | removeExerciseFavorites  | Privado |           Permite al usuario eliminar ejercicios de favoritos |

- POST /api/v1/users/signup =>
  {
  "name": "nombre_usuario",
  "email": "email_usuario",
  "password": "contraseña_usuario"
  }

- POST /api/v1/users/login =>
  {
  "email": "email_usuario",
  "password": "contraseña_usuario"
  }

- POST /api/v1/users/profile/:userId/favorites
  {
  "user_id":"userId",
  "workout_id":"workoutId"
  }

-DELETE /api/v1/users/profile/:userId/favorites
{
"user_id":"userId",
"workout_id":"workoutId"
}

### API Exercises - /api/v1/exercise/

| Method |           exerciseRouter            | exercise-controllers |  Type   |                                   Description |
| :----- | :---------------------------------: | :------------------: | :-----: | --------------------------------------------: |
| POST   |          /api/v1/exercise/          |    createExercise    |  Admin  |                Crear un ejercicio. Solo Admin |
| DELETE |        /api/v1/exercise/:id         |  deleteExerciseById  |  Admin  | Eliminar el ejercicio según el ID. Solo Admin |
| GET    |       /api/v1/exercise/getall       |    getAllExercise    | Publica |                  Muestra todos los ejercicios |
| POST   |  /api/v1/exercise/like/:workoutId   |    addLikeWorkout    | Privada |                    Añade un like al ejercicio |
| DELETE |  /api/v1/exercise/like/:workoutId   |  removeLikeWorkout   | Privada |                 Elimina el like del ejercicio |
| PATCH  |     /api/v1/exercise/:workoutId     |    updateExercise    | Privada |                        Actualiza el ejercicio |
| GET    |   /api/v1/exercise/muscle/:muscle   |   filterExercises    | Privada |               Filtra el ejercicio por músculo |
| GET    | /api/v1/exercise/typology/:typology |   filterExercises    | Privada |             Filtra el ejercicio por tipología |

- POST /api/v1/exercise/
  {
  "name": "nombre_ejercicio",
  "description": "descripcion_ejercicio",
  "image":"imagen.png",
  "typology":"tipologia_ejercicio",
  "muscle":"musculo_ejercicio"
  }

- POST /api/v1/exercise/like/:workoutId
  {
  "userId": "user_id"
  }

- DELETE /api/v1/exercise/like/:workoutId
  {
  "userId": "user_id"
  }

- PATCH /api/v1/exercise/:workoutId
  {
  "name": "nombre_ejercicio",
  "description": "descripcion_ejercicio",
  "image":"imagen.png",
  "typology":"tipologia_ejercicio",
  "muscle":"musculo_ejercicio"
  }

Se pueden cambiar toda la información a la vez o los parámetros que deseemos, por ejemplo:

{
"image":"imagen.png",
"typology":"tipologia_ejercicio",
}
