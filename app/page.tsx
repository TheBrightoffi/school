import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to School Management System</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/students">
          <Button className="w-full">Students</Button>
        </Link>
        <Link href="/teachers">
          <Button className="w-full">Teachers</Button>
        </Link>
        <Link href="/courses">
          <Button className="w-full">Courses</Button>
        </Link>
        <Link href="/dashboard">
          <Button className="w-full">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}