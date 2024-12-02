"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GradeSelectorProps {
  grade: string;
  setGrade: (value: string) => void;
  disabled?: boolean;
}

export function GradeSelector({ grade, setGrade, disabled }: GradeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Grade Level</label>
      <Select
        value={grade}
        onValueChange={setGrade}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select grade level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="elementary">Elementary (Grades 1-5)</SelectItem>
          <SelectItem value="middle">Middle School (Grades 6-8)</SelectItem>
          <SelectItem value="high">High School (Grades 9-12)</SelectItem>
          <SelectItem value="college">College Level</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}