import { Component, OnInit } from '@angular/core';
import { GiftIdea } from '@secret-santa/shared/types';

@Component({
  selector: 'app-gift-idea-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Gift Ideas Administration</h1>
      
      <div class="mb-4">
        <label class="mr-2">Filter by status:</label>
        <select [(ngModel)]="selectedStatus" (change)="filterIdeas()" class="rounded border p-2">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div class="grid gap-4">
        <div *ngFor="let idea of filteredIdeas" class="border rounded p-4">
          <h3 class="text-lg font-medium">{{idea.title}}</h3>
          <p class="text-gray-600">{{idea.description}}</p>
          <p class="text-sm text-gray-500">Price: ${{idea.price}}</p>
          <p class="text-sm text-gray-500">Status: {{idea.status}}</p>
          <div class="mt-2" *ngIf="idea.status === 'pending'">
            <button (click)="updateStatus(idea.id, 'approved')" class="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Approve
            </button>
            <button (click)="updateStatus(idea.id, 'rejected')" class="bg-red-500 text-white px-4 py-2 rounded">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class GiftIdeaListComponent implements OnInit {
  ideas: GiftIdea[] = [];
  filteredIdeas: GiftIdea[] = [];
  selectedStatus: string = 'all';

  async ngOnInit() {
    await this.fetchIdeas();
  }

  async fetchIdeas() {
    try {
      const response = await fetch('http://localhost:3333/api/gift-ideas');
      this.ideas = await response.json();
      this.filterIdeas();
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  }

  filterIdeas() {
    this.filteredIdeas = this.selectedStatus === 'all'
      ? this.ideas
      : this.ideas.filter(idea => idea.status === this.selectedStatus);
  }

  async updateStatus(id: string, status: 'approved' | 'rejected') {
    try {
      const response = await fetch(`http://localhost:3333/api/gift-ideas/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        await this.fetchIdeas();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }
}