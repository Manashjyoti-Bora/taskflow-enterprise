import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, AlertCircle, Trash2, Layers, ArrowRight, ArrowLeft } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Architect Next.js E-Commerce Microfrontend', status: 'todo', priority: 'High' },
    { id: 2, title: 'Implement JWT Authentication & RBAC Middleware', status: 'inProgress', priority: 'High' },
    { id: 3, title: 'Optimize Webpack & Vite Bundle Size by 40%', status: 'completed', priority: 'Medium' },
    { id: 4, title: 'Design Glassmorphic UI Design System in Figma', status: 'inProgress', priority: 'Low' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTitle, status: 'todo', priority }]);
    setNewTitle('');
  };

  const moveTask = (id, targetStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: targetStatus } : t));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const getPriorityColor = (p) => {
    if (p === 'High') return { bg: '#ef444433', text: '#ef4444' };
    if (p === 'Medium') return { bg: '#3b82f633', text: '#60a5fa' };
    return { bg: '#10b98133', text: '#10b981' };
  };

  const renderColumn = (colTitle, status, icon, accentColor) => (
    <div className="column">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', color: accentColor }}>
          {icon} {colTitle}
        </h3>
        <span style={{ background: 'var(--bg-card)', padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
          {tasks.filter(t => t.status === status).length}
        </span>
      </div>

      <div>
        {tasks.filter(t => t.status === status).map(task => {
          const pStyle = getPriorityColor(task.priority);
          return (
            <div key={task.id} className="task-card">
              <span className="badge" style={{ background: pStyle.bg, color: pStyle.text }}>
                {task.priority} Priority
              </span>
              <p style={{ margin: '12px 0', fontSize: '0.95rem', lineHeight: '1.4' }}>{task.title}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #37415144' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {status !== 'todo' && (
                    <button onClick={() => moveTask(task.id, 'todo')} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}>
                      ⬅ To Do
                    </button>
                  )}
                  {status !== 'inProgress' && (
                    <button onClick={() => moveTask(task.id, 'inProgress')} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}>
                      🚧 Progress
                    </button>
                  )}
                  {status !== 'completed' && (
                    <button onClick={() => moveTask(task.id, 'completed')} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}>
                      ✅ Done
                    </button>
                  )}
                </div>
                <Trash2 size={16} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => deleteTask(task.id)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Layers size={32} color="#3b82f6" />
          <div>
            <h1 style={{ fontSize: '1.6rem' }}>TaskFlow Enterprise</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Agile Kanban Board & Task Tracking Suite</p>
          </div>
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Active Sprint Tasks: <strong style={{ color: 'white' }}>{tasks.length}</strong>
        </div>
      </header>

      <form onSubmit={addTask} style={{ maxWidth: '1200px', margin: '0 auto 32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Enter new engineering sprint task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ flex: 1, minWidth: '260px', padding: '12px 16px', borderRadius: '8px', background: 'var(--bg-col)', border: '1px solid var(--border)', color: 'white', outline: 'none' }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: '12px 16px', borderRadius: '8px', background: 'var(--bg-col)', border: '1px solid var(--border)', color: 'white', outline: 'none' }}
        >
          <option value="High">🔥 High Priority</option>
          <option value="Medium">⚡ Medium Priority</option>
          <option value="Low">🌱 Low Priority</option>
        </select>
        <button type="submit" className="btn">
          <Plus size={18} /> Add Task
        </button>
      </form>

      <div className="board-container">
        {renderColumn('Backlog / To Do', 'todo', <AlertCircle size={20} />, '#f59e0b')}
        {renderColumn('In Progress', 'inProgress', <Clock size={20} />, '#3b82f6')}
        {renderColumn('Completed', 'completed', <CheckCircle2 size={20} />, '#10b981')}
      </div>
    </div>
  );
    }
