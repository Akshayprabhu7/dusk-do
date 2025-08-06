import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Check, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import robotMascot from "@/assets/robot-mascot.png";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  onOpenSettings: () => void;
}

export function TaskList({ onOpenSettings }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "GYM", completed: false },
    { id: "2", title: "Coding", completed: false },
    { id: "3", title: "Aptitude", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setShowAddForm(false);
      toast({
        title: "Task Added!",
        description: `"${task.title}" has been added to your list.`,
      });
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task Reopened" : "Task Completed!",
        description: `"${task.title}" ${task.completed ? "reopened" : "marked as complete"}.`,
      });
    }
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    if (task) {
      toast({
        title: "Task Deleted",
        description: `"${task.title}" has been removed.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/20 p-6 text-center">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8"></div>
          <h1 className="text-xl font-bold">To Do List</h1>
          <Button variant="ghost" size="icon" onClick={onOpenSettings}>
            <Settings className="w-5 h-5" />
          </Button>
        </div>
        <div className="mx-auto w-20 h-20 mb-4 animate-float">
          <img src={robotMascot} alt="Robot Mascot" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-2xl font-bold mb-2">To DO List</h2>
      </div>

      {/* Tasks */}
      <div className="p-6 space-y-4">
        {tasks.map((task, index) => (
          <div 
            key={task.id} 
            className="animate-bounce-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Button
              variant="task"
              className={`w-full h-16 text-lg justify-between group ${
                task.completed ? "opacity-75 line-through" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                  }}
                  className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <span>{task.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/20 rounded transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Button>
          </div>
        ))}

        {showAddForm && (
          <div className="space-y-3 animate-slide-up">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your new task..."
              className="w-full p-4 rounded-lg border border-border bg-card text-card-foreground text-lg"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <div className="flex gap-2">
              <Button onClick={addTask} variant="task" className="flex-1">
                Add Task
              </Button>
              <Button 
                onClick={() => setShowAddForm(false)} 
                variant="outline" 
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4">
        <div className="flex justify-center">
          <Button
            onClick={() => setShowAddForm(true)}
            variant="task"
            size="lg"
            className="rounded-full w-14 h-14"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}