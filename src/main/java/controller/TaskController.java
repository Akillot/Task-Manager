package controller;

import dto.TaskRequest;
import dto.TaskResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse create(@RequestBody TaskRequest request){
        return taskService.createTask(request);
    }

    @GetMapping
    public List<TaskResponse> getAll(){
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public TaskResponse getById(@PathVariable Long id){
        return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public TaskResponse update(@PathVariable Long id, @RequestBody TaskRequest request){
        return taskService.updateTask(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id){
        taskService.deleteTaskById(id);
    }

    @GetMapping("/sort-false-first")
    public List<TaskResponse> sortByStatusFalseFirst(){
        return taskService.sortingByStatusFalseFirst();
    }

    @GetMapping("/sort-true-first")
    public List<TaskResponse> sortByStatusTrueFirst(){
        return taskService.sortingByStatusTrueFirst();
    }
}
