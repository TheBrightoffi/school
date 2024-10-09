"use client"

import { useState, useEffect } from 'react';
import { getAll, add, remove } from '@/lib/db';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
  const { toast } = useToast();

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    const allTeachers = await getAll('teachers');
    setTeachers(allTeachers);
  }

  async function handleAddTeacher(e) {
    e.preventDefault();
    try {
      await add('teachers', { ...newTeacher, id: Date.now().toString() });
      setNewTeacher({ name: '', email: '', subject: '' });
      loadTeachers();
      toast({
        title: "Success",
        description: "Teacher added successfully",
      })
    } catch (error) {
      console.error('Error adding teacher:', error);
      toast({
        title: "Error",
        description: "Failed to add teacher",
        variant: "destructive",
      })
    }
  }

  async function handleDeleteTeacher(id) {
    try {
      await remove('teachers', id);
      loadTeachers();
      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast({
        title: "Error",
        description: "Failed to delete teacher",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Teachers</h1>
      <form onSubmit={handleAddTeacher} className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="Name"
          value={newTeacher.name}
          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={newTeacher.email}
          onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
          required
        />
        <Button type="submit">Add Teacher</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.subject}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteTeacher(teacher.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}