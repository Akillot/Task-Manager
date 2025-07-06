package app.taskmanagerrestdb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskRequest {
    private String title;
    private String description;
    private Boolean isCompleted;
}
