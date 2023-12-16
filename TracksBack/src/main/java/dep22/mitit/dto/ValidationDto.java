package dep22.mitit.dto;

import java.util.Map;

public record ValidationDto(String message,
                            Map<String, String> errors) {}
