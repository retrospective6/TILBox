# tilbox-server

## 서버 실행하기

도커를 이용하여 서버를 실행하기 위해서는 로컬에서 이미지를 빌드해야 한다.

```shell
$ docker build -t tilbox/api-server:VERSION .
```

이미지를 빌드한 후 실행하기 위해 다음 명령어를 입력한다.

```shell
$ docker run --name tilbox-server -e -d -p 8080:8080 tilbox/api-server:VERSION
```

## 참고

- [Spring Boot 도커 공식 Reference](https://spring.io/guides/gs/spring-boot-docker/)
