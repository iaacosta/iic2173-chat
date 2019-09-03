# Chat App - IIC2173

Ignacio Acosta ~ iaacosta@uc.cl

## Stack

La aplicación se desarrollo con las siguientes herramientas:

| Servicio   | Lenguaje   | Framework | Source code      |
| ---------- | ---------- | --------- | ---------------- |
| API        | Python     | flask     | `~/api`          |
| Storage    | SQL        | sqlite3   | `~/api/database` |
| Frontend   | Javascript | React.js  | `~/client`       |
| Web server | nginx      | -         | `~/nginx.conf`   |

El deploy se realizó con Docker.

## Nginx

Se aplicó un proxy inverso de todas las requests `~/api` a el servidor de flask, mientras que cualquier otra URL se redirige a `index.html`, que está servido directamente por nginx.

Para el certificado SSL y el redireccionamiento, no se aplicó Certbot, sino que una configuración específica [(cortesía del crack EngineerMan)](https://youtu.be/IZmz39gGxCM?t=2864), donde todos se abren dos servidores en los puertos: 
- **80:** Redirecciona todo a https://ignacioacostaj.com con status code 301.
- **443:** Tiene configurado el reverse proxy y el root directory con el index.

Todos los cambios fueron directamente aplicados sobre el archivo `/etc/nginx/nginx.conf`.
