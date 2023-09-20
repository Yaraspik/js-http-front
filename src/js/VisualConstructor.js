export default class VisualConstructor {
  /**
   * @param {string} tag
   * @param {string} className
   * @param {string} textContent
   *
   */
  static createTicketElement(ticket) {
    const body = VisualConstructor.createHTMLElement('div', 'ticket-body');
    body.dataset.id = ticket.id;
    const round = VisualConstructor.createHTMLElement('input', 'ticket-round-element');
    round.setAttribute('type', 'checkbox');
    if (ticket.status === true) round.checked = true;
    const texts = VisualConstructor.createHTMLElement('div', 'ticket-texts');
    const name = VisualConstructor.createHTMLElement('span', 'ticket-text-content', ticket.name);
    const description = VisualConstructor.createHTMLElement(
      'span',
      ['ticket-text-content', 'ticket-text-content-description', 'hide'],
      ticket.description,
    );
    const created = VisualConstructor.createHTMLElement('span', 'ticket-created', VisualConstructor.dateFormatter(ticket.created));
    const edit = VisualConstructor.createHTMLElement('button', 'ticket-edit');
    const remove = VisualConstructor.createHTMLElement('button', 'ticket-remove');

    texts.append(name, description);
    body.append(round, texts, created, edit, remove);

    return {
      body,
      edit,
      remove,
      round,
      description,
    };
  }

  static createDeleteElModal(name) {
    const body = VisualConstructor.createHTMLElement('div', 'modal-body');
    const title = VisualConstructor.createHTMLElement('span', 'modal-title', name);
    const mess = VisualConstructor.createHTMLElement('span', 'delete-alert', 'Вы уверены, что хотите удалить тикет? Это действие необратимо');

    const btns = VisualConstructor.createHTMLElement('div', 'modal-form-buttons');
    const btnCancel = VisualConstructor.createHTMLElement('button', ['modal-form-button-cancel', 'btn'], 'Cancel');
    const btnOk = VisualConstructor.createHTMLElement('button', ['modal-form-button-ok', 'btn'], 'OK');

    btns.append(btnOk, btnCancel);
    body.append(title, mess, btns);
    document.body.append(body);

    return {
      body,
      btnCancel,
      btnOk,
    };
  }

  /**
   * @param {string} tag
   * @param {string} className
   * @param {string} textContent
   *
   */
  static createModal(name, ticket = {}) {
    const body = VisualConstructor.createHTMLElement('div', 'modal-body');
    const title = VisualConstructor.createHTMLElement('span', 'modal-title', name);
    const form = VisualConstructor.createHTMLElement('form', 'modal-form');

    const descriptionEl = VisualConstructor.createLabelElement('Краткое описание', 'name', 'input', ticket.name);
    const fullDescriptionEl = VisualConstructor.createLabelElement(
      'Подробное описание',
      'description',
      'textarea',
      ticket.description,
    );

    const btns = VisualConstructor.createHTMLElement('div', 'modal-form-buttons');
    const btnCancel = VisualConstructor.createHTMLElement('button', ['modal-form-button-cancel', 'btn'], 'Cancel');
    const btnOk = VisualConstructor.createHTMLElement('button', ['modal-form-button-ok', 'btn'], 'OK');

    btns.append(btnOk, btnCancel);
    form.append(descriptionEl, fullDescriptionEl, btns);
    body.append(title, form);
    document.body.append(body);

    return {
      body,
      form,
      btnCancel,
      btnOk,
    };
  }

  /**
   * @param {string} tag
   * @param {string} className
   * @param {string} textContent
   *
   */
  static createHTMLElement(tag, className, textContent) {
    const body = document.createElement(tag);

    if (Array.isArray(className)) {
      className.forEach((el) => {
        body.classList.add(el);
      });
    } else {
      body.classList.add(className);
    }

    if (textContent && tag !== 'input' && tag !== 'textarea') {
      body.innerText = textContent;
    } else {
      body.value = textContent;
    }

    return body;
  }

  /**
   * @param {string} textContent
   *
   */
  static createLabelElement(name, nameAttribute, tag, inputValue = '') {
    const labelElement = VisualConstructor.createHTMLElement('label', ['modal-form', 'modal-form-description-container']);
    const descriptionTitle = VisualConstructor.createHTMLElement('span', ['modal-form', 'modal-form-description-title'], name);
    const description = VisualConstructor.createHTMLElement(tag, 'modal-form-description', inputValue);
    description.setAttribute('name', nameAttribute);

    labelElement.append(descriptionTitle, description);

    return labelElement;
  }

  static dateFormatter(strDate) {
    const date = new Date(strDate);
    const dateHours = date.getHours();
    let dateMinutes = date.getMinutes();
    let dateDay = date.getDate();
    let dateMonth = date.getMonth() + 1;

    dateMinutes = (dateMinutes < 10) ? `0${dateMinutes}` : dateMinutes;
    dateDay = (dateDay < 10) ? `0${dateDay}` : dateDay;
    dateMonth = (dateMonth < 10) ? `0${dateMonth}` : dateMonth;

    return `${dateDay}.${dateMonth}.${date.getFullYear()} ${dateHours}:${dateMinutes}`;
  }
}
