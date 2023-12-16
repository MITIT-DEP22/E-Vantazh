package dep22.mitit.feature.image;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "image")
public class Image {

    @Id
    private UUID id;

    @Column(name = "fileName")
    private String fileName;

    @Column(name = "mimeType")
    private String mimeType;

    @Column(name = "path")
    private String path;
}
