'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import usersData from '@/data/users.json';
import tasksData from '@/data/tasks.json';
import { UserIcon, PlusIcon } from '@heroicons/react/24/outline';
import TeamMemberSidebar from '@/components/sidebars/TeamMemberSidebar';
import UserInfoPanel from '@/components/elements/UserInfoPanel';

type Task = {
  id: string;
  title: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  priority: 'low' | 'medium' | 'high';
  end_date: string;
  start_date: string;
  created_at: string;
  mother_task: string | null;
  assigned_to: string[];
  project_id: string;
  description: string;
  company?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  phone: string;
  status: string;
  join_date: string;
  projects: string[];
  skills: string[];
  bio: string;
  performance: {
    rating: number;
    completed_projects: number;
    on_time_delivery: number;
  };
  designation?: string;
  salary?: number;
  bonus?: number;
};

// Mock data that might not be in users.json
const teamData: (User & { working_days: number; leave_taken: number; overtime_hours: number; designation: string; salary: number; bonus: number; })[] = (usersData.users as User[]).map(user => ({
  ...user,
  working_days: 240,
  leave_taken: 15,
  overtime_hours: 50,
  designation: user.designation || 'Software Engineer',
  salary: user.salary || 80000,
  bonus: user.bonus || 5000,
}));

// Map task statuses from the data to the expected format
const mapTaskStatus = (status: string): Task['status'] => {
  switch (status) {
    case 'pending':
      return 'planning';
    case 'in_progress':
      return 'doing';
    case 'active':
      return 'doing';
    case 'completed':
      return 'done';
    case 'qc':
      return 'qc';
    case 'redo':
      return 'redo';
    case 'delivered':
      return 'delivered';
    case 'archived':
      return 'archived';
    default:
      return 'planning';
  }
};

const TeamPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(teamData[0]?.id || null);

  const selectedUser = useMemo(() => {
    const userToSelect = teamData.find(u => u.id === selectedUserId) || teamData[0];
    if (!userToSelect) return null;

    const user = teamData.find(u => u.id === userToSelect.id);
    if (!user) return null;

    // Filter and map tasks for the selected user
    const userTasks = tasksData.tasks
      .filter(task => task.assigned_to.includes(user.id))
      .map((task) => ({
        id: task.id,
        title: task.title,
        status: mapTaskStatus(task.status),
        priority: (['low', 'medium', 'high'].includes(task.priority) ? task.priority : 'low') as 'low' | 'medium' | 'high',
        end_date: task.end_date || '',
        start_date: task.start_date || '',
        created_at: task.created_at || '',
        mother_task: task.mother_task || null,
        project_id: task.project_id || '',
        assigned_to: task.assigned_to || [],
        company: (task as { company?: string }).company || '',
        description: task.description || '',
      }))
      .filter((t) => t.id && t.title && t.status && t.priority && t.end_date && t.start_date && t.created_at !== undefined && t.project_id && t.assigned_to && t.company !== undefined && t.description !== undefined);

    const doneWork = userTasks.filter(t => ['done', 'delivered'].includes(t.status)).length;
    const qcWork = userTasks.filter(t => t.status === 'qc').length;
    const redoWork = userTasks.filter(t => t.status === 'redo').length;

    return {
      ...user,
      tasks: userTasks.sort((a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime()),
      stats: {
        assigned: userTasks.length,
        done: doneWork,
        qc: qcWork,
        redo: redoWork,
      }
    };
  }, [selectedUserId]);

  return (
    <div className="h-full flex bg-gray-50 overflow-hidden">
      <TeamMemberSidebar
        users={teamData}
        selectedUserId={selectedUserId}
        onSelectUser={setSelectedUserId}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        {selectedUser ? (
          <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Image 
                      src={selectedUser.avatar} 
                      alt={selectedUser.name} 
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover" 
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h1>
                        <p className="text-md text-gray-500">{selectedUser.designation}</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <PlusIcon className="w-5 h-5"/>
                    <span>Create New Task</span>
                </button>
            </div>
            {/* Temporarily disabled due to type issues */}
            {/* <UserTaskList 
              tasks={selectedUser.tasks as unknown as Task[]} 
              allTasks={tasksData.tasks as unknown as any} 
              projects={projectsData.projects}
              clients={clientsData}
              users={usersData.users}
            /> */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">User Tasks</h3>
              <p className="text-gray-500">Task list component temporarily disabled due to type compatibility issues.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <UserIcon className="w-16 h-16 text-gray-300 mx-auto" />
              <p className="text-gray-500 text-lg mt-4">Select a team member to view their details.</p>
            </div>
          </div>
        )}
      </main>
      <UserInfoPanel user={selectedUser} />
    </div>
  );
};

export default TeamPage; 