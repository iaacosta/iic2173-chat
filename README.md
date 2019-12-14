# Entrega final - IIC2173

## Integrantes
...

## Stack

La aplicación se desarrollo con las siguientes herramientas:

| Servicio   | Lenguaje   | Framework | Source code      |
| ---------- | ---------- | --------- | ---------------- |
| API        | Python     | flask     | `~/api`          |
| Storage    | SQL        | sqlite3   | `~/api/database` |
| Frontend   | Typescript | React.js  | `~/client`       |
| Web server | nginx      | -         | `~/nginx.conf`   |

## Instrucciones

### Local
- Instalar `yarn@^1.13.0`, `node@^10.0.0` y `python@^3.7`
- Instalar `pipenv` en `python`
- En el directorio de la `api/`, correr los siguientes comandos para instalar
  ```sh
  pipenv shell
  pipenv install
  ```
  Y posteriormente correr `pipenv run seed` para hacer la base de datos inicial.
- En el directorio del `client/`, correr el siguiente comando:
  ```sh
  yarn
  ```
- Correr ambos servicios en paralelo con `pipenv run dev` en `api/` y `yarn start` en `client/`
  
### Docker
- Construir contenedores con `docker-compose build`
- Correr contenedores con `docker-compose up`

## Deploy

### Variables de entorno

Debes definir las siguientes variables de entorno

| Variable    | Signficado                                                             |
| ----------- | ---------------------------------------------------------------------- |
| ECR_URL     | URL del container en Amazon Elastic Container Registry (url/container) |
| ECS_CLUSTER | Nombre del cluster al cual hacer el deploy                             |
| ECS_SERVICE | Nombre del servicio que corre los containers en el cluster             |

### Instrucciones

1. Asegurarse de que tengas acceso al repositorio en Docker. Si no tienes acceso, debes usar la consola de AWS.
   1. Configurar tu credencial IAM con `aws configure` (debes tener un ID y SECRET de una credencial IAM de la cuenta del repositorio). **NOTA**: toma en cuenta las regiones.
   2. Iniciar sesión en repositorio para Docker con `eval $(aws ecr get-login --no-include-email --region us-east-1)`.
2. Correr el script con `bash deploy_ecs.sh` o `sh deploy_ecs.sh`.
