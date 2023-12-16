package dep22.mitit.feature.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dep22.mitit.entity.AbstractBaseEntity;
import dep22.mitit.feature.driver.Driver;
import dep22.mitit.feature.image.Image;
import dep22.mitit.feature.token.Token;
import dep22.mitit.feature.vehicle.Vehicle;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User extends AbstractBaseEntity implements UserDetails {

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Token> tokens;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "rating")
    private double rating;

    @Column(name = "count_of_orders")
    private int countOfOrders;

    private String phone;

    @OneToOne(cascade = CascadeType.ALL)
    private Image image;

    @OneToMany
    @JsonIgnore
    private List<Vehicle> vehicles = new ArrayList<>();

    @OneToMany
    @JsonIgnore
    private List<Driver> drivers = new ArrayList<>();

    private boolean isEnabled = false;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return isEnabled;
    }

    public User(UUID uuid, String firstName, String lastName, String email,
                String password, Role role, List<Token> tokens, String phone, String companyName) {
        super(uuid);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.tokens = tokens;
        this.phone = phone;
        this.companyName = companyName;
    }

    public static class Builder {
        private final String firstName;
        private final String lastName;
        private final String email;
        private String password;
        private UUID id;
        private Role role = Role.USER;
        private List<Token> tokens = new ArrayList<>();
        private String phone;
        private String companyName;

        public Builder(String firstName, String lastName, String email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
        }

        public Builder id(UUID id) {
            this.id = id;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder companyName(String companyName) {
            this.companyName = companyName;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public Builder role(Role role) {
            this.role = role;
            return this;
        }

        public Builder tokens(List<Token> tokens) {
            this.tokens = tokens;
            return this;
        }

        public User build() {
            return new User(id, firstName, lastName, email, password, role, tokens, phone, companyName);
        }
    }
}
