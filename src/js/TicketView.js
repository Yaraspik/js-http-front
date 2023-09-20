import TicketService from './TicketService';
import VisualConstructor from './VisualConstructor';

/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(ticketList) {
    this.ticketList = ticketList;
    this.editedTicketElement = null;
  }

  createTicket(ticket) {
    const ticketEl = VisualConstructor.createTicketElement(ticket);

    ticketEl.body.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target === ticketEl.edit) {
        this.editedTicketElement = e.target.closest('.ticket-body');
        TicketService.get(ticket.id, (item) => this.showModalEditTicket(item));
        return;
      }

      if (e.target === ticketEl.remove) {
        this.editedTicketElement = e.target.closest('.ticket-body');
        this.showModaDeleteTicket();
        return;
      }

      if (e.target === ticketEl.round) {
        const check = e.target.checked;
        this.editedTicketElement = e.target.closest('.ticket-body');
        const ticketId = this.editedTicketElement.dataset.id;
        TicketService.update(ticketId, { status: check }, (list) => {
          const editedTicket = list.find((item) => item.id === ticket.id);
          this.redrawUpdatedTicket(editedTicket);
        });
        return;
      }

      if (!ticketEl.description.textContent) return;
      ticketEl.description.classList.toggle('hide');
    });

    this.ticketList.append(ticketEl.body);
  }

  drawPrimaryList(list) {
    if (!Array.isArray(list)) throw new Error('Список задач не загружен');
    [...this.ticketList.children].forEach((el) => el.remove());
    list.forEach((item) => this.createTicket(item));
  }

  showModaDeleteTicket() {
    const modal = VisualConstructor.createDeleteElModal('Удалить тикет');

    modal.btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      modal.body.remove();
    });

    modal.btnOk.addEventListener('click', (e) => {
      e.preventDefault();

      TicketService.delete(this.editedTicketElement.dataset.id, () => {
        this.editedTicketElement.remove();
        this.editedTicketElement = null;
      });
      modal.body.remove();
    });
  }

  showModalEditTicket(ticket) {
    const modal = VisualConstructor.createModal('Изменить тикет', ticket);

    modal.btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      modal.body.remove();
    });

    modal.btnOk.addEventListener('click', (e) => {
      e.preventDefault();
      const formData = new FormData(modal.form);
      const iterator = formData.entries();
      const data = {};

      for (const pair of iterator) {
        const key = pair[0];
        const value = pair[1];

        data[key] = value;
      }

      TicketService.update(ticket.id, data, (list) => {
        const editedTicket = list.find((item) => item.id === ticket.id);
        this.redrawUpdatedTicket(editedTicket);
      });
      modal.body.remove();
    });
  }

  redrawUpdatedTicket(ticket) {
    this.editedTicketElement.querySelector('.ticket-text-content').innerText = ticket.name;
    this.editedTicketElement.querySelector('.ticket-text-content-description').innerText = ticket.description;
    this.editedTicketElement.querySelector('.ticket-round-element').checked = ticket.status;

    this.editedTicketElement = null;
  }
}
