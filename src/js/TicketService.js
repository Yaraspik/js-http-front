import createRequest from './api/createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  static async list(callback) {
    const query = '?method=allTickets';
    const res = await createRequest({ query, method: 'GET' });

    callback(res);
  }

  static async get(id, callback) {
    const encodeId = encodeURIComponent(id);
    const query = `?method=ticketById&id=${encodeId}`;
    const res = await createRequest({ query, method: 'GET' });

    callback(res);
  }

  static async create(data, callback) {
    const options = JSON.stringify(data);
    const query = '?method=createTicket';
    const res = await createRequest({ query, method: 'POST', body: options });

    callback(res);
  }

  static async update(id, data, callback) {
    const encodeId = encodeURIComponent(id);
    const options = JSON.stringify(data);
    const query = `?method=updateById&id=${encodeId}`;
    const res = await createRequest({ query, method: 'POST', body: options });

    callback(res);
  }

  static async delete(id, callback) {
    const encodeId = encodeURIComponent(id);
    const query = `?method=deleteById&id=${encodeId}`;
    const res = await createRequest({ query, method: 'GET' });

    callback(res);
  }
}
