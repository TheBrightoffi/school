"use client"

import { useState, useEffect } from 'react';
import { getAll, add, remove, get } from '@/lib/db';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', teacherId: '' });
  const { toast } = useToast();

  useEffect(() => {
    loadCourses();
    loadTeachers();
  }, []);

  async function loadCourses() {
    const allCourses = await getAll('courses');
    setCourses(allCourses);
  }

  async function loadTeachers() {
    const allTeachers = await getAll('teachers');
    setTeachers(allTeachers);
  }

  async function handleAddCourse(e) {
    e.preventDefault();
    try {
      await add('courses', { ...newCourse, id: Date.now().toString() });
      setNewCourse({ name: '', description: '', teacherId: '' });
      loadCourses();
      toast({
        title: "Success",
        description: "Course added successfully",
      })
    } catch (error) {
      console.error('Error adding course:', error);
      toast({
        title: "Error",
        description: "Failed to add course",
        variant: "destructive",
      })
    }
  }

  async function handleDeleteCourse(id) {
    try {
      await remove('courses', id);
      loadCourses();
      toast({
        title: "Success",
        description: "Course deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      })
    }
  }

  async function getTeacherName(teacherId) {
    const teacher = await get('teachers', teacherId);
    return teacher ? teacher.name : 'Unknown';
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <form onSubmit={handleAddCourse} className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          required
        />
        <Select
          value={newCourse.teacherId}
          onValueChange={(value) => setNewCourse({ ...newCourse, teacherId: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Teacher" />
          </SelectTrigger>
          <SelectContent>
            {teachers.map((teacher) => (
              <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Add Course</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>{getTeacherName(course.teacherId)}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}