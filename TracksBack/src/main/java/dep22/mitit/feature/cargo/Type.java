package dep22.mitit.feature.cargo;

import lombok.Getter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Getter
public enum Type {
    PASSENGERS("Пасажири", "alive"),
    CHILDREN("Діти", "alive"),
    PERSONS_WITH_DISABILITIES("Люди з обмеженими можливостями", "alive"),

    LIQUIDS("Рідини", "not alive"),
    EXPLOSIVE("Вибухові", "not alive"),
    PRODUCTS("Продукти", "not alive"),
    NEED_COOLING("Потребую охолодження", "not alive"),
    MILITARY_PURPOSES("Військового призначення", "not alive");

    private final String name;
    private final String category;

    Type(String name, String category) {
        this.name = name;
        this.category = category;
    }

    public static Type getByValue(String name) {
        return Arrays.stream(values())
                .filter(value -> value.getName().equals(name))
                .findAny()
                .orElse(null);
    }

    public static List<Type> getAllByCategory(String category) {
        return Collections.singletonList(Arrays.stream(values())
                .filter(item -> item.getCategory().equals(category))
                .findAny()
                .orElse(null));
    }
}
