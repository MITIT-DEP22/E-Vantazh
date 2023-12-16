package dep22.mitit.feature.order;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum Status {
    NEW("Новий тендер"),
    RECEIVING_PROPOSALS("Прийняття пропозицій"),
    PENDING_TENDER("Очікується тендер"),
    TENDER_COMPLETED("Тендер завершився"),
    CLOSED("Тендер закритий"),
    CANCELED("Тендер відмінено");

    private final String name;

    Status(String name) {
        this.name = name;
    }

    public static Status getByValue(String status) {
        return Arrays.stream(values())
                .filter(value -> value.getName().equals(status))
                .findAny()
                .orElse(null);
    }
}
