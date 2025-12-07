import {Component, ElementRef, signal, viewChild} from '@angular/core';
import {ChevronRight, LucideAngularModule} from "lucide-angular";
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
  scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');
  monthScroll = viewChild<ElementRef<HTMLDivElement>>('monthScroll');
  weekScroll = viewChild<ElementRef<HTMLDivElement>>('weekScroll');

// Add scroll sync method
  onScroll(event: Event): void {
    const scrollLeft = (event.target as HTMLElement).scrollLeft;

    const monthEl = this.monthScroll()?.nativeElement;
    const weekEl = this.weekScroll()?.nativeElement;

    if (monthEl) monthEl.scrollLeft = scrollLeft;
    if (weekEl) weekEl.scrollLeft = scrollLeft;
  }

  months = [
    {name: 'JAN 2025', weeks: 4},
    {name: 'FEB 2025', weeks: 4},
    {name: 'MAR 2025', weeks: 4},
    {name: 'APR 2025', weeks: 4},
    {name: 'MAY 2025', weeks: 4}
  ];

  resources = signal<Resource[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Full Stack Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=1',
      availability: 'High',
      weeklyAllocations: [80, 60, 100, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Backend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=2',
      availability: 'High',
      weeklyAllocations: [0, 0, 0, 0, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 0]
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Frontend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=3',
      availability: 'Medium',
      weeklyAllocations: [100, 100, 80, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '4',
      name: 'James Williams',
      role: 'DevOps Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=4',
      availability: 'High',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 20, 0, 0]
    },
    {
      id: '5',
      name: 'Maria Garcia',
      role: 'Tech Lead',
      imageUrl: 'https://i.pravatar.cc/150?img=5',
      availability: 'None',
      weeklyAllocations: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    },
    {
      id: '6',
      name: 'David Kim',
      role: 'UI/UX Designer',
      imageUrl: 'https://i.pravatar.cc/150?img=6',
      availability: 'Low',
      weeklyAllocations: [80, 80, 80, 80, 80, 80, 80, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '7',
      name: 'Lisa Anderson',
      role: 'Product Manager',
      imageUrl: 'https://i.pravatar.cc/150?img=7',
      availability: 'Medium',
      weeklyAllocations: [60, 60, 60, 60, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '8',
      name: 'Robert Taylor',
      role: 'Data Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=8',
      availability: 'High',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 0, 0]
    },
    {
      id: '9',
      name: 'Jennifer Martinez',
      role: 'QA Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=9',
      availability: 'High',
      weeklyAllocations: [40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '10',
      name: 'Chris Brown',
      role: 'Security Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=10',
      availability: 'Medium',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 100, 100, 100, 60, 60, 0, 0, 0, 0]
    },
    {
      id: '11',
      name: 'Amanda White',
      role: 'Mobile Developer',
      imageUrl: 'https://i.pravatar.cc/150?img=11',
      availability: 'Low',
      weeklyAllocations: [100, 100, 100, 100, 80, 80, 80, 80, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '12',
      name: 'Daniel Lee',
      role: 'System Architect',
      imageUrl: 'https://i.pravatar.cc/150?img=12',
      availability: 'None',
      weeklyAllocations: [120, 120, 100, 100, 100, 100, 100, 80, 80, 80, 0, 0, 0, 0, 0]
    },
    {
      id: '13',
      name: 'Sophie Wilson',
      role: 'Scrum Master',
      imageUrl: 'https://i.pravatar.cc/150?img=13',
      availability: 'High',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 40, 40, 40, 40]
    },
    {
      id: '14',
      name: 'Kevin Davis',
      role: 'Cloud Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=14',
      availability: 'Medium',
      weeklyAllocations: [60, 60, 60, 60, 60, 60, 60, 60, 60, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '15',
      name: 'Rachel Green',
      role: 'Business Analyst',
      imageUrl: 'https://i.pravatar.cc/150?img=15',
      availability: 'High',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30, 30]
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

  protected onMouseDown($event: MouseEvent) {
    console.log("onMouseDown", $event);
  }

  protected onMouseMove($event: MouseEvent) {
    console.log("onMouseMove", $event);
  }

  protected onMouseUp() {
    console.log("onMouseUp");
  }

  protected onMouseLeave() {
    console.log("onMouseLeave");
  }
}
