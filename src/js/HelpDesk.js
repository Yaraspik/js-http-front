import TicketService from './TicketService';
import TicketView from './TicketView';
import TicketForm from './TicketForm';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketList = this.container.querySelector('.ticket-list');
    this.btnAddTicket = this.container.querySelector('.ticket-add-btn');
    this.btnEditTicket = this.container.querySelector('.ticket-edit');
    this.loader = this.container.querySelector('.loader');

    this.ticketView = new TicketView(this.ticketList);
    this.ticketForm = new TicketForm(this.ticketView);

    this.openModal = this.openModal.bind(this);
  }

  init() {
    TicketService.list((list) => this.ticketView.drawPrimaryList(list));
    this.btnAddTicket.addEventListener('click', this.openModal);
  }

  openModal() {
    this.ticketForm.createModal();
  }
}
