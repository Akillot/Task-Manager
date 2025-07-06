package app.taskmanagerrestdb.service;

import app.taskmanagerrestdb.dto.TaskRequest;
import app.taskmanagerrestdb.dto.TaskResponse;
import app.taskmanagerrestdb.entity.Task;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import app.taskmanagerrestdb.repository.TaskRepo;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepo taskRepo;

    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public TaskResponse createTask(@NotNull TaskRequest taskRequest) {
        Task task = new Task();
        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setIsCompleted(taskRequest.getIsCompleted());

        Task savedTask = taskRepo.save(task);
        return mapToResponse(savedTask);
    }

    public List<TaskResponse> getAllTasks(){
        return taskRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse getTaskById(Long id){
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No task with id " + id));
        return mapToResponse(task);
    }

    public void deleteTaskById(Long id){
        if(!taskRepo.existsById(id)) throw new NoSuchElementException("No task with id " + id);
        taskRepo.deleteById(id);
    }

    public List<TaskResponse> sortingByStatusFalseFirst(){
        return taskRepo.findAll().stream()
                .sorted((t1,t2) -> Boolean.compare(t1.getIsCompleted(), t2.getIsCompleted()))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<TaskResponse> sortingByStatusTrueFirst(){
        return taskRepo.findAll().stream()
                .sorted((t1,t2) -> Boolean.compare(t2.getIsCompleted(), t1.getIsCompleted()))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse updateTask(Long id, TaskRequest request){
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No task with id " + id));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setIsCompleted(request.getIsCompleted());

        Task updatedTask = taskRepo.save(task);
        return mapToResponse(updatedTask);
    }

    private TaskResponse mapToResponse(Task task){
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setIsCompleted(task.getIsCompleted());
        return response;
    }
}
