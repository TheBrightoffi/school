"use client"

import { useState, useEffect } from 'react';
import { getAll, add, remove } from '@/lib/db';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '' });
  const { toast } = useToast();

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const allStudents = await getAll('students');
    setStudents(allStudents);
  }

  async function handleAddStudent(e) {
    e.preventDefault();
    try {
      await add('students', { ...newStudent, id: Date.now().toString() });
      setNewStudent({ name: '', email: '', grade: '' });
      loadStudents();
      toast({
        title: "Success",
        description: "Student added successfully",
      })
    } catch (error) {
      console.error('Error adding student:', error);
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      })
    }
  }

  async function handleDeleteStudent(id) {
    try {
      await remove('students', id);
      loadStudents();
      toast({
        title: "Success",
        description: "Student deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <form onSubmit={handleAddStudent} className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Grade"
          value={newStudent.grade}
          onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
          required
        />
        <Button type="submit">Add Student</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}