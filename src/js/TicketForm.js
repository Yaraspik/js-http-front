import TicketService from './TicketService';
import VisualConstructor from './VisualConstructor';

/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor(ticketView) {
    this.ticketView = ticketView;
  }

  createModal() {
    const modal = VisualConstructor.createModal('Создать тикет');

    modal.btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      modal.body.remove();
    });

    modal.btnOk.addEventListener('click', (e) => {
      e.preventDefault();
      const formData = new FormData(modal.form);
      const data = {};

      for (const pair of formData.entries()) {
        const key = pair[0];
        const value = pair[1];

        data[key] = value;
      }

      TicketService.create(data, (ticket) => this.ticketView.createTicket(ticket));
      modal.body.remove();
    });
  }
}
