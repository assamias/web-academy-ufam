FROM ubuntu:lastest
RUN apt-get update -y
RUN apt-get install -y iputils-ping
CMD ["sleep", "1d"]