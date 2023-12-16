FROM maven:3.9.0-eclipse-temurin-19 as build
WORKDIR /home/evantazh-back

COPY pom.xml .
COPY ./src ./src
COPY ./*.p12 ./*.p12
RUN mvn clean install -Dmaven.test.skip=true -Dmaven.site.skip=true -Dmaven.javadoc.skip=true

FROM openjdk:19-jdk-alpine3.16

MAINTAINER vitalii.dolhushyn@viti.edu.ua

COPY --from=build /home/evantazh-back/target/evantazh*.jar ./evantazh.jar
COPY --from=build /home/evantazh-back/*.p12 ./team2-cert.p12

CMD ["java", "-jar", "evantazh.jar"]
