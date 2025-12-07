import {Component, signal} from '@angular/core';
import { LucideAngularModule, ChevronRight } from "lucide-angular";
import {NgClass} from '@angular/common';

interface Resource {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  availability: 'High' | 'Medium' | 'Low' | 'None';
  weeklyAllocations: number[];
}

@Component({
  selector: 'lib-resource-grid',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './resource-grid.html',
  styleUrl: './resource-grid.css',
})
export class ResourceGrid {
  ChevronRight = ChevronRight;

  expandedRows = signal(new Set<string>());

  months = [
    {name: 'JAN 2025', weeks: 4},
    {name: 'FEB 2025', weeks: 4},
    {name: 'MAR 2025', weeks: 4},
    {name: 'APR 2025', weeks: 4},
    {name: 'APR 2025', weeks: 4}
  ];

  resources = signal<Resource[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Full Stack Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=1',
      availability: 'High',
      weeklyAllocations: []
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Backend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=2',
      availability: 'High',
      weeklyAllocations: Array(15).fill(40)
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Frontend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=3',
      availability: 'Medium',
      weeklyAllocations: []
    },
    {
      id: '4',
      name: 'James Williams',
      role: 'DevOps Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=4',
      availability: 'High',
      weeklyAllocations: []
    },
    {
      id: '5',
      name: 'Maria Garcia',
      role: 'Tech Lead',
      imageUrl: 'https://i.pravatar.cc/150?img=5',
      availability: 'None',
      weeklyAllocations: []
    },
    {
      id: '6',
      name: 'David Kim',
      role: 'UI/UX Designer',
      imageUrl: 'https://i.pravatar.cc/150?img=6',
      availability: 'Low',
      weeklyAllocations: []
    }
  ]);

  getWeeksArray(count: number): number[] {
    return Array.from({length: count}, (_, i) => i + 1);
  }

  toggleExpand(resourceId: string) {
    this.expandedRows.update(set => {
      const newSet = new Set(set);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  }
}
