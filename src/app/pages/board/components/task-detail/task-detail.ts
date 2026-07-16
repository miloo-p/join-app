import { Component, inject, OnInit } from '@angular/core';
import { tasksService } from '../../../../shared/services/tasks-service';
import { contactsService } from '../../../../shared/services/contacts-service'; // WICHTIG: Pfad anpassen!
import { Task } from '../../../../shared/interfaces/tasks';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail implements OnInit {
  dbTasks = inject(tasksService);
  dbContacts = inject(contactsService); // Den neuen Service importieren

  task: Task | null = null;
  isOpen: boolean = false;

  // Lädt die Kontakte in den Speicher, sobald die Komponente im Hintergrund vom Board initialisiert wird
  async ngOnInit() {
    await this.dbContacts.getContacts();
  }

  openDialog(task: Task) {
    this.task = task;
    this.isOpen = true;
  }

  closeDialog() {
    this.isOpen = false;
    setTimeout(() => {
      this.task = null;
    }, 300);
  }

  // --- DIE MAGIE: Nummern in echte UI-Kontakte verwandeln ---
  get assignedContacts() {
    if (!this.task || !this.task.collaborators || this.task.collaborators.length === 0) {
      return [];
    }

    // Wir holen uns die echte Kontakt-Liste aus deinem Signal
    const allContacts = this.dbContacts.contacts();

    // Ein paar schicke Farben für die runden Badges
    const badgeColors = ['#1FD7C1', '#462F8A', '#0038FF', '#FF7A00', '#FF5EB3', '#9327FF'];

    return this.task.collaborators
      .map((id) => {
        // Suche den Kontakt in der Datenbank-Liste
        const contact = allContacts.find((c) => c.id === id);

        if (!contact) return undefined; // Falls ein Kontakt gelöscht wurde, aber die ID noch im Task steht

        // Wir bauen ein neues Objekt, das alles hat, was unser HTML braucht
        return {
          ...contact, // Übernimmt id, firstname, lastname, email, etc.
          fullName: `${contact.firstname} ${contact.lastname}`,
          initials: `${contact.firstname.charAt(0)}${contact.lastname.charAt(0)}`.toUpperCase(),
          // Der Modulo-Trick (%) gibt demselben Kontakt immer dieselbe Farbe, basierend auf seiner ID!
          color: badgeColors[(contact.id || 0) % badgeColors.length],
        };
      })
      .filter((contact) => contact !== undefined); // Schmeißt leere Einträge raus
  }
}
