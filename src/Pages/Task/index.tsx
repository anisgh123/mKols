import React, { useEffect, useState } from 'react';
import { Card, Checkbox, List, Typography, Button, Progress, Badge, Modal, Form, Input, DatePicker, Space } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.css';
import moment from 'moment';
import { toast } from 'react-toastify';
import axios from 'axios';

const { Title, Text } = Typography;

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  deadline?: string;
  _id:string
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fetch, setFetch] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/task`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching creator profiles:', error);
      }
    };

    fetchTasks();
  }, [fetch]);
  const showAddTaskModal = () => {
    setIsModalVisible(true);
    setIsEditing(false);
    form.resetFields();
  };

  const showEditTaskModal = (task: Task) => {
    setIsEditing(true);
    setEditingTask(task);
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      deadline: task.deadline ? moment(task.deadline) : null,
    });
    setIsModalVisible(true);
  };

  const handleOk =  () => {
    form.validateFields()
      .then(values => {
        const newTask: any = {
          id: isEditing && editingTask ? editingTask.id : tasks.length + 1,
          title: values.title,
          description: values.description,
          completed: false,
          deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : undefined,
        };

        if (isEditing && editingTask) {
          setTasks(prevTasks =>
            prevTasks.map(task =>
              task.id === editingTask.id ? { ...task, ...newTask } : task
            )
          );
        } else {
          try {
            const response =  axios.post(`http://localhost:5000/api/task`,newTask, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            toast.success('Offer accepted  successful');
            setFetch(!fetch)

              } catch (error) {
            console.error('Error fetching creator profiles:', error);
          }
        }

        setIsModalVisible(false);
        form.resetFields();
      })
      .catch(info => {
        console.error('Validation Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    try {
      const response =  axios.delete(`http://localhost:5000/api/task/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('task deleted  successful');
      setFetch(!fetch)
        } catch (error) {
      console.error('Error fetching creator profiles:', error);
    }
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0;

  return (
    <div className="tasks-page">
      <Title level={2}>My Tasks</Title>

      <Card className="tasks-summary" bordered={false}>
        <Progress 
          type="circle" 
          percent={Math.round(completionRate)} 
          format={percent => `${percent}% Completed`}
        />
        <div className="summary-info">
          <Text>{completedTasksCount} of {totalTasks} tasks completed</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddTaskModal}>
          Add New Task
        </Button>
      </Card>

      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={task => (
          <List.Item
            actions={[
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              >
                {task.completed ? 'Completed' : 'Mark as Done'}
              </Checkbox>,
              <Button type="link" icon={<EditOutlined />} onClick={() => showEditTaskModal(task)}>Edit</Button>,
              <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDeleteTask(task._id)}>Delete</Button>
            ]}
          >
            <List.Item.Meta
              title={
                <div className="task-title">
                  <span className={task.completed ? 'completed' : ''}>{task.title}</span>
                  <Badge count={task.completed ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> : <ClockCircleOutlined style={{ color: '#faad14' }} />} />
                </div>
              }
              description={
                <>
                  <Text>{task.description}</Text>
                  <div className="task-deadline">
                    <Text type="secondary">Deadline: {task.deadline}</Text>
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />

      <Modal
        title={isEditing ? 'Edit Task' : 'Add New Task'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEditing ? 'Update' : 'Create'}
      >
        <Form
          form={form}
          layout="vertical"
          name="taskForm"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: 'Please input the task title!' }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Task Description"
            rules={[{ required: true, message: 'Please input the task description!' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter task description" />
          </Form.Item>
          <Form.Item
            name="deadline"
            label="Deadline"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TasksPage;
