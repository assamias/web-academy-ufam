# Trabalho final - Containers

Você ficou responsável por colocar no ar a aplicação de listagem de livros do Web
Academy. Foi sugerido que a aplicação funcionasse de maneira flexível e de fácil
configuração entre ambientes, então você decidiu utilizar o Docker para rodar as aplicações.
A infraestrutura dessa aplicação consistente em:

- Um servidor de banco de dados MySQL
- Uma aplicação backend escrita em Node.js com Typescript
- Uma aplicação frontend escrita em React com Typescript
- Uma aplicação de gerenciamento de banco de dados, o PHPMyAdmin

Cada aplicação está na sua respectiva pasta. Na pasta de banco de dados, está o script para criação e população do mesmo.

## Backend
Na aplicação backend devemos configurar seu acesso ao banco de dados, porta de acesso
e demais configurações que ficam descritas no arquivo .env. Algumas informações
importantes:
- O Dockerfile do backend já está configurado corretamente
- A aplicação backend deverá executar na porta de rede 4444 e mapeada para a porta
4444 do servidor externo
- Deverá ser configurado um volume para salvar os arquivos de log gerados pela
aplicação, que ficarão armazenados na pasta /log dentro da aplicação

## Frontend
Na aplicação frontend não será necessário modificar o arquivo .env, no entanto o mesmo
deverá ser capaz de acessar o backend nas configurações definidas. Algumas informações
importantes:
- O Dockerfile do frontend já está configurado corretamente
- A aplicação está executando dentro de um servidor Nginx, ou seja, dentro do
contêiner a aplicação está rodando na porta de rede 80. Dessa forma, deverá ser
mapeada a porta 8000 no servidor externo

## Banco de Dados
O banco de dados utilizado pela aplicação é o MySQL. Algumas informações importantes:
- As credenciais de autenticação do servidor podem ser configuradas da forma que
achar melhor
- O servidor deverá executar na porta de rede 3306 no contêiner e mapeada para a
porta 3306 do servidor externo
- Deverá ser configurado um volume para salvar os arquivos gerados pelo MySQL

## Entregáveis
Instruções para execução dos contêineres da aplicação, junto com as aplicações
configuradas. Obs.: Evite enviar as aplicações com diretórios e arquivos contidos no arquivo
.gitignore (principalmente a pasta node_modules)

## Modo de entrega
Crie um repositório privado no Github e adicione o
meu perfil como contribuidor no repositório (https://github.com/matiusX).

## Modo de avaliação
 - Irei seguir as instruções de execução dos contêineres e tentar utilizar as funcionalidades
disponíveis no frontend. Irei desligar os contêineres, apagá-los e recriá-los para verificação
das configurações de volumes corretamente. O mapeamento de portas de rede deve estar
de acordo com a definição da especificação do trabalho.
 - No dia após a entrega, enviarei uma lista com todos os repositórios que recebi. Se o seu não estiver lá, entre em contato comigo.
 - Ao final da correção, será publicada a correção em um arquivo CORRECAO.md dentro do
repositório, com as considerações feitas durante a correção do trabalho.
