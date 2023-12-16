package dep22.mitit;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
        info = @Info(
                title = "MITIT WebSite",
                description = "MITIT WebSite API documentation",
                contact = @Contact(
                        name = "MITIT Department 22",
                        url = "https://github.com/MITIT-DEP22"
                ),
                version = "1.0"
        ),
        servers = {
                @Server(
                        url = "http://localhost:9090",
                        description = "DEV"
                ),
                @Server(
                        url = "http://46.219.127.6:9090",
                        description = "PROD"
                )
        }
)
@SpringBootApplication
public class TracksApplication {
    public static void main(String[] args) {
        SpringApplication.run(TracksApplication.class, args);
    }
}