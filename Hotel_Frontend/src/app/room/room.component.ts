import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RoomComponent implements OnInit {
  rooms: Room[] = [];
  selectedRoom: Room = { roomNumber: '', type: '', price: 0, isAvailable: true };
  isEditing = false;
  errorMessage: string | null = null;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = `Failed to load rooms: ${err.message}`;
      }
    });
  }

  selectRoom(room: Room): void {
    this.selectedRoom = { ...room };
    this.isEditing = true;
    this.errorMessage = null;
  }

  resetForm(): void {
    this.selectedRoom = { roomNumber: '', type: '', price: 0, isAvailable: true };
    this.isEditing = false;
    this.errorMessage = null;
  }

  saveRoom(): void {
    if (this.isEditing && this.selectedRoom.id) {
      this.roomService.updateRoom(this.selectedRoom.id, this.selectedRoom).subscribe({
        next: (updatedRoom) => {
          this.loadRooms();
          this.resetForm();
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = `Failed to update room: ${err.message}`;
        }
      });
    } else {
      this.roomService.createRoom(this.selectedRoom).subscribe({
        next: () => {
          this.loadRooms();
          this.resetForm();
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = `Failed to create room: ${err.message}`;
        }
      });
    }
  }

  deleteRoom(id: number): void {
    this.roomService.deleteRoom(id).subscribe({
      next: () => {
        this.loadRooms();
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = `Failed to delete room: ${err.message}`;
      }
    });
  }
}