docker network create rede-db
docker run -d --name dbcontainer -e MYSQL_ROOT_PASSWORD=senha123 -v vol_dbcontainer:/var/lib/mysql --network rede-db -p 3306:3306 mysql
docker exec -it dbcontainer mysql -u root -p 
CREATE DATABASE minha_base_de_dados;
CREATE TABLE minha_base_de_dados.meus_dados (id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(50), idade INT);
EXIT;

docker run -d --name dbguicontainer -e PMA_HOST=dbcontainer -e PMA_PORT=3306 -e PMA_USER=root -e PMA_PASSWORD=senha123 --network rede-db -p 8080:80 phpmyadmin
