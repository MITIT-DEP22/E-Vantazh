package dep22.mitit.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

import static dep22.mitit.feature.user.Role.*;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authProvider;
    private final LogoutHandler logoutHandler;

    private static final String[] WHITE_LIST_URL = {
            "/api/v1/auth/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html",
            "/api/v1",
            "/api/v1/routes",
            "/api/v1/routes/**"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL).permitAll()
                                .requestMatchers(GET, "/api/v1/vehicles").permitAll()
                                .requestMatchers(GET, "/api/v1/vehicles/**").permitAll()
                                .requestMatchers(POST, "/api/v1/vehicles").permitAll()
                                .requestMatchers(DELETE, "/api/v1/vehicles/**").permitAll()

                                .requestMatchers(GET, "/api/v1/drivers").hasAnyRole(OPERATOR.name(), ADMIN.name())
                                .requestMatchers(GET, "/api/v1/drivers/**").hasAnyRole(OPERATOR.name(), ADMIN.name())
                                .requestMatchers(POST, "/api/v1/drivers").hasAnyRole(OPERATOR.name(), ADMIN.name())
                                .requestMatchers(DELETE, "/api/v1/drives/**").hasAnyRole(OPERATOR.name(), ADMIN.name())

                                .requestMatchers(POST, "/api/v1/orders").hasAnyRole(CUSTOMER.name(), ADMIN.name())
                                .requestMatchers(DELETE, "/api/v1/orders/**").hasAnyRole(CUSTOMER.name(), ADMIN.name())
                                .requestMatchers(PUT, "/api/v1/orders").hasAnyRole(CUSTOMER.name(), ADMIN.name())

//                                .requestMatchers(GET, "/api/v1/routes").hasAnyRole(CUSTOMER.name(), OPERATOR.name(), ADMIN.name())
//                                .requestMatchers(GET, "/api/v1/routes/**").hasAnyRole(CUSTOMER.name(), OPERATOR.name(), ADMIN.name())
//                                .requestMatchers(POST, "/api/v1/routes").hasAnyRole(CUSTOMER.name(), OPERATOR.name(), ADMIN.name())
//                                .requestMatchers(DELETE, "/api/v1/routes/**").hasAnyRole(CUSTOMER.name(), OPERATOR.name(), ADMIN.name())
//                                .requestMatchers(PUT, "/api/v1/routes").hasAnyRole(CUSTOMER.name(), OPERATOR.name(), ADMIN.name())
                                .anyRequest().authenticated()
                )
                .headers(headers -> headers
                        .defaultsDisabled()
                        .cacheControl(Customizer.withDefaults()))
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                )
        ;


        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("*"));
        configuration.setAllowedMethods(Collections.singletonList("*"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
