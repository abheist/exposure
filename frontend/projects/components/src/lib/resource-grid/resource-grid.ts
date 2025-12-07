import {Component, ElementRef, signal, viewChild} from '@angular/core';
import {ChevronRight, LucideAngularModule} from "lucide-angular";
import {NgClass} from '@angular/common';

interface Resource {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  // availability: 'High' | 'Medium' | 'Low' | 'None';
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

  // Add this property to track which container is currently scrolling
  private isScrolling = false;
  private isDragging = false;
  private startX = 0;
  private startScrollLeft = 0;


  // Update scroll sync to prevent loops
  onScroll(event: Event): void {
    if (this.isScrolling) return; // Prevent infinite loop

    const target = event.target as HTMLElement;
    const scrollLeft = target.scrollLeft;

    this.isScrolling = true;

    const monthEl = this.monthScroll()?.nativeElement;
    const weekEl = this.weekScroll()?.nativeElement;
    const contentEl = this.scrollContainer()?.nativeElement;

    // Update all containers except the one that triggered the event
    if (monthEl && target !== monthEl) monthEl.scrollLeft = scrollLeft;
    if (weekEl && target !== weekEl) weekEl.scrollLeft = scrollLeft;
    if (contentEl && target !== contentEl) contentEl.scrollLeft = scrollLeft;

    // Reset flag after scroll completes
    requestAnimationFrame(() => {
      this.isScrolling = false;
    });
  }

  months = [
    {name: 'JAN 2025', weeks: 4},
    {name: 'FEB 2025', weeks: 4},
    {name: 'MAR 2025', weeks: 4},
    {name: 'APR 2025', weeks: 4},
    {name: 'MAY 2025', weeks: 4},
    {name: 'JUN 2025', weeks: 4},
    {name: 'JUL 2025', weeks: 4},
    {name: 'AUG 2025', weeks: 4},
    {name: 'SEP 2025', weeks: 4},
    {name: 'OCT 2025', weeks: 4},
    {name: 'NOV 2025', weeks: 4},
    {name: 'DEC 2025', weeks: 4},
  ];

  resources = signal<Resource[]>([
    // Engineers (IDs 1-30)
    {
      id: '1', name: 'Sarah Johnson', role: 'Full Stack Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=1',
      weeklyAllocations: [80, 80, 80, 80, 60, 60, 100, 100, 100, 80, 80, 60, 40, 0, 0, 0, 0, 80, 80, 80, 80, 80, 60, 60, 40, 40, 0, 0, 0, 0, 100, 100, 100, 80, 60, 40, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '2', name: 'Michael Chen', role: 'Backend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=2',
      weeklyAllocations: [0, 0, 0, 0, 40, 40, 40, 40, 60, 60, 80, 80, 100, 100, 100, 100, 80, 80, 60, 40, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 80, 80, 60, 40, 40, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '3', name: 'Emily Rodriguez', role: 'Frontend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=3',
      weeklyAllocations: [100, 100, 100, 80, 80, 60, 60, 40, 0, 0, 0, 0, 0, 100, 100, 100, 100, 80, 80, 60, 60, 40, 40, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '4', name: 'James Williams', role: 'DevOps Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=4',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 40, 40, 60, 60, 80, 80, 80, 60, 60, 40, 40, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '5', name: 'Maria Garcia', role: 'Tech Lead',
      imageUrl: 'https://i.pravatar.cc/150?img=5',
      weeklyAllocations: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    },
    {
      id: '6', name: 'David Kim', role: 'UI/UX Designer',
      imageUrl: 'https://i.pravatar.cc/150?img=6',
      weeklyAllocations: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 0, 0, 0, 0, 0, 0, 0, 60, 60, 60, 60, 60, 60, 60, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '7', name: 'Lisa Anderson', role: 'Product Manager',
      imageUrl: 'https://i.pravatar.cc/150?img=7',
      weeklyAllocations: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '8', name: 'Robert Taylor', role: 'Data Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=8',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 80, 60, 60, 60, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '9', name: 'Jennifer Martinez', role: 'QA Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=9',
      weeklyAllocations: [40, 40, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0, 60, 60, 60, 60, 60, 60, 60, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 60, 60, 60, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '10', name: 'Chris Brown', role: 'Security Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=10',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 80, 80, 60, 60, 60, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 80, 80, 80, 60, 60, 60, 40, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '11', name: 'Amanda White', role: 'Mobile Developer',
      imageUrl: 'https://i.pravatar.cc/150?img=11',
      weeklyAllocations: [100, 100, 100, 100, 100, 100, 80, 80, 80, 80, 80, 80, 60, 60, 60, 40, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '12', name: 'Daniel Lee', role: 'System Architect',
      imageUrl: 'https://i.pravatar.cc/150?img=12',
      weeklyAllocations: [120, 120, 120, 110, 110, 100, 100, 100, 100, 100, 80, 80, 80, 80, 80, 80, 80, 80, 80, 60, 60, 60, 60, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '13', name: 'Sophie Wilson', role: 'Scrum Master',
      imageUrl: 'https://i.pravatar.cc/150?img=13',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
    },
    {
      id: '14', name: 'Kevin Davis', role: 'Cloud Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=14',
      weeklyAllocations: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '15', name: 'Rachel Green', role: 'Business Analyst',
      imageUrl: 'https://i.pravatar.cc/150?img=15',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    },
    {
      id: '16', name: 'Alex Thompson', role: 'Full Stack Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=16',
      weeklyAllocations: [100, 100, 80, 80, 60, 60, 40, 40, 0, 0, 0, 0, 100, 100, 100, 100, 80, 80, 60, 60, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '17', name: 'Nina Patel', role: 'Backend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=17',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 60, 60, 60, 40, 40, 40, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '18', name: 'Marcus Johnson', role: 'Frontend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=18',
      weeklyAllocations: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
    },
    {
      id: '19', name: 'Olivia Martinez', role: 'DevOps Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=19',
      weeklyAllocations: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
    },
    {
      id: '20', name: 'Ethan Brooks', role: 'Tech Lead',
      imageUrl: 'https://i.pravatar.cc/150?img=20',
      weeklyAllocations: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
    },
    {
      id: '21', name: 'Isabella Garcia', role: 'UI/UX Designer',
      imageUrl: 'https://i.pravatar.cc/150?img=21',
      weeklyAllocations: [0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0, 70, 70, 70, 70, 70, 70, 70, 70, 70, 50, 50, 50, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '22', name: 'Liam Foster', role: 'Product Manager',
      imageUrl: 'https://i.pravatar.cc/150?img=22',
      weeklyAllocations: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
    },
    {
      id: '23', name: 'Sophia Chang', role: 'Data Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=23',
      weeklyAllocations: [100, 100, 100, 100, 100, 80, 80, 80, 60, 60, 60, 40, 40, 40, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '24', name: 'Noah Williams', role: 'QA Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=24',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 80, 80, 80, 60, 60, 60, 40, 40, 40, 20, 20, 0, 0, 0]
    },
    {
      id: '25', name: 'Ava Robinson', role: 'Security Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=25',
      weeklyAllocations: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    },
    {
      id: '26', name: 'Mason Turner', role: 'Mobile Developer',
      imageUrl: 'https://i.pravatar.cc/150?img=26',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 60, 60, 60, 60, 60, 60, 60, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
    },
    {
      id: '27', name: 'Mia Anderson', role: 'System Architect',
      imageUrl: 'https://i.pravatar.cc/150?img=27',
      weeklyAllocations: [110, 110, 110, 110, 110, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    },
    {
      id: '28', name: 'Lucas Harris', role: 'Scrum Master',
      imageUrl: 'https://i.pravatar.cc/150?img=28',
      weeklyAllocations: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
    },
    {
      id: '29', name: 'Charlotte King', role: 'Cloud Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=29',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 80, 80, 80, 60, 60, 40, 20]
    },
    {
      id: '30', name: 'Benjamin Scott', role: 'Business Analyst',
      imageUrl: 'https://i.pravatar.cc/150?img=30',
      weeklyAllocations: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
    },

    // Designers & PMs (IDs 31-40)
    {
      id: '31', name: 'Harper Wright', role: 'UI/UX Designer',
      imageUrl: 'https://i.pravatar.cc/150?img=31',
      weeklyAllocations: [100, 100, 100, 80, 80, 60, 60, 40, 40, 20, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 80, 80, 80, 60, 60, 60, 40, 40, 40, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '32', name: 'Elijah Lopez', role: 'Product Manager',
      imageUrl: 'https://i.pravatar.cc/150?img=32',
      weeklyAllocations: [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]
    },
    {
      id: '33', name: 'Amelia Hill', role: 'UI/UX Designer',
      imageUrl: 'https://i.pravatar.cc/150?img=33',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
    },
    {
      id: '34', name: 'James Allen', role: 'Product Manager',
      imageUrl: 'https://i.pravatar.cc/150?img=34',
      weeklyAllocations: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
    },
    {
      id: '35', name: 'Evelyn Young', role: 'Business Analyst',
      imageUrl: 'https://i.pravatar.cc/150?img=35',
      weeklyAllocations: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
    },
    {
      id: '36', name: 'Sebastian Hall', role: 'UI/UX Designer',
      imageUrl: 'https://i.pravatar.cc/150?img=36',
      weeklyAllocations: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '37', name: 'Abigail Rivera', role: 'Product Manager',
      imageUrl: 'https://i.pravatar.cc/150?img=37',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
    },
    {
      id: '38', name: 'Logan Campbell', role: 'Business Analyst',
      imageUrl: 'https://i.pravatar.cc/150?img=38',
      weeklyAllocations: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
    },
    {
      id: '39', name: 'Ella Mitchell', role: 'UI/UX Designer',
      imageUrl: 'https://i.pravatar.cc/150?img=39',
      weeklyAllocations: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
    },
    {
      id: '40', name: 'Henry Perez', role: 'Scrum Master',
      imageUrl: 'https://i.pravatar.cc/150?img=40',
      weeklyAllocations: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35]
    },

    // Additional Mixed Roles (IDs 41-50)
    {
      id: '41', name: 'Scarlett Roberts', role: 'Full Stack Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=41',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    },
    {
      id: '42', name: 'Jack Carter', role: 'Data Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=42',
      weeklyAllocations: [120, 120, 120, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    },
    {
      id: '43', name: 'Victoria Phillips', role: 'Backend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=43',
      weeklyAllocations: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    },
    {
      id: '44', name: 'Owen Evans', role: 'Frontend Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=44',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80]
    },
    {
      id: '45', name: 'Grace Turner', role: 'DevOps Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=45',
      weeklyAllocations: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
    },
    {
      id: '46', name: 'Carter Collins', role: 'Mobile Developer',
      imageUrl: 'https://i.pravatar.cc/150?img=46',
      weeklyAllocations: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 80, 80, 80, 60, 60, 60, 40, 40, 40, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: '47', name: 'Penelope Stewart', role: 'QA Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=47',
      weeklyAllocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
    },
    {
      id: '48', name: 'Wyatt Morris', role: 'Security Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=48',
      weeklyAllocations: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    },
    {
      id: '49', name: 'Lily Rogers', role: 'Cloud Engineer',
      imageUrl: 'https://i.pravatar.cc/150?img=49',
      weeklyAllocations: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]
    },
    {
      id: '50', name: 'Nathan Reed', role: 'Tech Lead',
      imageUrl: 'https://i.pravatar.cc/150?img=50',
      weeklyAllocations: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
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

  protected onMouseDown(event: MouseEvent) {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    this.isDragging = true;
    this.startX = event.clientX;
    this.startScrollLeft = container.scrollLeft;

    event.preventDefault();
  }

  protected onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    event.preventDefault();

    const x = event.clientX;
    const walk = (x - this.startX);

    container.scrollLeft = this.startScrollLeft - walk;
  }

  protected onMouseUp() {
    this.isDragging = false;
  }

  protected onMouseLeave() {
    this.isDragging = false;
  }

}
